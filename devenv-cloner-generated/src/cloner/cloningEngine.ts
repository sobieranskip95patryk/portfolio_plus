import * as vscode from 'vscode';
import * as fs from 'fs-extra';
import { EnvironmentSnapshot, Conflict, Resolution, CloneResult } from '../types/interfaces';

/**
 * Cloning Engine - Environment Import/Export
 */
export class CloningEngine {
    
    async importEnvironment(environment: EnvironmentSnapshot): Promise<CloneResult> {
        console.log('📥 Starting environment import...');
        
        const result: CloneResult = {
            success: false,
            extensionsInstalled: 0,
            settingsApplied: 0,
            repositoriesCloned: 0,
            errors: [],
            warnings: []
        };
        
        try {
            // Install extensions
            result.extensionsInstalled = await this.installExtensions(environment.extensions.installed);
            
            // Apply settings
            result.settingsApplied = await this.applySettings(environment.vscode.settings);
            
            // Clone repositories
            result.repositoriesCloned = await this.cloneRepositories(environment.repositories.git);
            
            result.success = true;
            console.log('✅ Environment import completed successfully');
            
        } catch (error) {
            result.errors.push(`Import failed: ${error}`);
            console.error('Import error:', error);
        }
        
        return result;
    }
    
    async detectConflicts(environment: EnvironmentSnapshot): Promise<Conflict[]> {
        const conflicts: Conflict[] = [];
        const currentConfig = vscode.workspace.getConfiguration();
        
        // Check setting conflicts
        for (const [key, incomingValue] of Object.entries(environment.vscode.settings)) {
            const currentValue = currentConfig.get(key);
            
            if (currentValue !== undefined && currentValue !== incomingValue) {
                conflicts.push({
                    type: 'setting',
                    path: key,
                    description: `Setting ${key} has different values`,
                    severity: 'medium',
                    currentValue,
                    incomingValue
                });
            }
        }
        
        // Check extension conflicts
        const currentExtensions = vscode.extensions.all.map(ext => ext.id);
        for (const ext of environment.extensions.installed) {
            if (currentExtensions.includes(ext.id)) {
                // Extension already installed - could be version conflict
                const currentExt = vscode.extensions.getExtension(ext.id);
                if (currentExt && currentExt.packageJSON.version !== ext.version) {
                    conflicts.push({
                        type: 'extension',
                        path: ext.id,
                        description: `Extension ${ext.name} version conflict`,
                        severity: 'low',
                        currentValue: currentExt.packageJSON.version,
                        incomingValue: ext.version
                    });
                }
            }
        }
        
        console.log(`🔍 Detected ${conflicts.length} conflicts`);
        return conflicts;
    }
    
    async applyResolution(resolution: Resolution): Promise<void> {
        console.log(`🔧 Applying resolution strategy: ${resolution.strategy}`);
        
        for (const action of resolution.actions) {
            switch (action.type) {
                case 'setting':
                    await this.applySetting(action.target, action.value);
                    break;
                case 'extension':
                    if (action.action === 'install') {
                        await this.installSingleExtension(action.target);
                    }
                    break;
            }
        }
    }
    
    private async installExtensions(extensions: any[]): Promise<number> {
        let installed = 0;
        
        for (const ext of extensions) {
            try {
                await vscode.commands.executeCommand('workbench.extensions.installExtension', ext.id);
                installed++;
                console.log(`✅ Installed extension: ${ext.name}`);
            } catch (error) {
                console.warn(`⚠️ Failed to install ${ext.name}:`, error);
            }
        }
        
        return installed;
    }
    
    private async installSingleExtension(extensionId: string): Promise<void> {
        await vscode.commands.executeCommand('workbench.extensions.installExtension', extensionId);
    }
    
    private async applySettings(settings: { [key: string]: any }): Promise<number> {
        let applied = 0;
        const config = vscode.workspace.getConfiguration();
        
        for (const [key, value] of Object.entries(settings)) {
            try {
                await config.update(key, value, vscode.ConfigurationTarget.Global);
                applied++;
                console.log(`✅ Applied setting: ${key}`);
            } catch (error) {
                console.warn(`⚠️ Failed to apply setting ${key}:`, error);
            }
        }
        
        return applied;
    }
    
    private async applySetting(key: string, value: any): Promise<void> {
        const config = vscode.workspace.getConfiguration();
        await config.update(key, value, vscode.ConfigurationTarget.Global);
    }
    
    private async cloneRepositories(repositories: any[]): Promise<number> {
        let cloned = 0;
        
        for (const repo of repositories) {
            if (repo.remote) {
                try {
                    // This would use git commands to clone
                    console.log(`📦 Would clone repository: ${repo.name} from ${repo.remote}`);
                    cloned++;
                } catch (error) {
                    console.warn(`⚠️ Failed to clone ${repo.name}:`, error);
                }
            }
        }
        
        return cloned;
    }
}