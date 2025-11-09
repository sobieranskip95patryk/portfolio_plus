import * as vscode from 'vscode';
import * as fs from 'fs-extra';
import * as path from 'path';
import { EnvironmentSnapshot, VSCodeSettings, ExtensionInfo } from '../types/interfaces';

/**
 * Environment Scanner - AI-Enhanced
 * 
 * Skanuje obecne środowisko VS Code i generuje snapshot
 * z wykorzystaniem AI do analizy i optymalizacji
 */
export class EnvironmentScanner {
    
    async scanCurrentEnvironment(): Promise<EnvironmentSnapshot> {
        console.log('🔍 Starting environment scan...');
        
        const snapshot: EnvironmentSnapshot = {
            metadata: await this.generateMetadata(),
            vscode: await this.scanVSCodeSettings(),
            extensions: await this.scanExtensions(),
            repositories: await this.scanRepositories(),
            dependencies: await this.scanDependencies(),
            aiInsights: {
                optimizations: [],
                warnings: [],
                compatibility: { score: 1.0, issues: [] }
            }
        };
        
        console.log(`✅ Environment scan complete. Found ${snapshot.extensions.installed.length} extensions`);
        return snapshot;
    }
    
    private async generateMetadata() {
        const workspaceName = vscode.workspace.name || 'Unknown Workspace';
        
        return {
            id: this.generateId(),
            name: workspaceName,
            version: '1.0.0',
            created: new Date(),
            author: {
                name: 'Current User',
                email: 'user@example.com'
            },
            tags: ['auto-generated'],
            platform: {
                os: process.platform,
                arch: process.arch,
                nodeVersion: process.version
            }
        };
    }
    
    private async scanVSCodeSettings(): Promise<VSCodeSettings> {
        const config = vscode.workspace.getConfiguration();
        
        // Get all settings (this is simplified - real implementation would be more comprehensive)
        const settings = {
            // Editor settings
            'editor.fontSize': config.get('editor.fontSize'),
            'editor.fontFamily': config.get('editor.fontFamily'),
            'editor.theme': config.get('workbench.colorTheme'),
            'editor.tabSize': config.get('editor.tabSize'),
            'editor.insertSpaces': config.get('editor.insertSpaces'),
            
            // Workbench settings
            'workbench.colorTheme': config.get('workbench.colorTheme'),
            'workbench.iconTheme': config.get('workbench.iconTheme'),
            'workbench.sideBar.location': config.get('workbench.sideBar.location'),
            
            // Terminal settings
            'terminal.integrated.fontSize': config.get('terminal.integrated.fontSize'),
            'terminal.integrated.shell.windows': config.get('terminal.integrated.shell.windows'),
        };
        
        return {
            version: vscode.version,
            settings: this.filterNonNullSettings(settings),
            keybindings: [], // TODO: Implement keybinding scanning
            snippets: [], // TODO: Implement snippet scanning
            tasks: [], // TODO: Implement task scanning
            launch: [] // TODO: Implement launch config scanning
        };
    }
    
    private async scanExtensions(): Promise<{ installed: ExtensionInfo[], disabled: string[], recommendations: string[] }> {
        const extensions = vscode.extensions.all;
        
        const installed: ExtensionInfo[] = extensions
            .filter(ext => !ext.id.startsWith('vscode.'))
            .map(ext => ({
                id: ext.id,
                version: ext.packageJSON.version,
                name: ext.packageJSON.displayName || ext.packageJSON.name,
                publisher: ext.packageJSON.publisher,
                enabled: true, // Simplified - should check actual state
                settings: {} // TODO: Extract extension-specific settings
            }));
            
        return {
            installed,
            disabled: [], // TODO: Detect disabled extensions
            recommendations: [] // TODO: Get workspace recommendations
        };
    }
    
    private async scanRepositories() {
        const workspaceFolders = vscode.workspace.workspaceFolders || [];
        
        const repositories = [];
        for (const folder of workspaceFolders) {
            const gitPath = path.join(folder.uri.fsPath, '.git');
            if (await fs.pathExists(gitPath)) {
                repositories.push({
                    name: folder.name,
                    path: folder.uri.fsPath,
                    remote: await this.getGitRemote(folder.uri.fsPath),
                    branch: await this.getGitBranch(folder.uri.fsPath)
                });
            }
        }
        
        return {
            workspace: workspaceFolders.map(f => ({
                name: f.name,
                uri: f.uri.toString()
            })),
            git: repositories
        };
    }
    
    private async scanDependencies() {
        // TODO: Implement dependency scanning
        // This would scan package.json, requirements.txt, etc.
        return {
            system: [],
            runtime: [],
            tools: []
        };
    }
    
    private async getGitRemote(repoPath: string): Promise<string | null> {
        try {
            // TODO: Implement git remote detection
            return null;
        } catch (error) {
            console.warn('Could not detect git remote:', error);
            return null;
        }
    }
    
    private async getGitBranch(repoPath: string): Promise<string | null> {
        try {
            // TODO: Implement git branch detection
            return null;
        } catch (error) {
            console.warn('Could not detect git branch:', error);
            return null;
        }
    }
    
    private filterNonNullSettings(settings: any): any {
        const filtered: any = {};
        for (const [key, value] of Object.entries(settings)) {
            if (value !== undefined && value !== null) {
                filtered[key] = value;
            }
        }
        return filtered;
    }
    
    private generateId(): string {
        return 'env_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    async exportToFile(environment: EnvironmentSnapshot, filePath: string): Promise<void> {
        await fs.writeJSON(filePath, environment, { spaces: 2 });
        console.log(`📄 Environment exported to: ${filePath}`);
    }
    
    async loadFromFile(filePath: string): Promise<EnvironmentSnapshot> {
        const environment = await fs.readJSON(filePath);
        console.log(`📄 Environment loaded from: ${filePath}`);
        return environment;
    }
}