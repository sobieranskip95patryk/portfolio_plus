"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloningEngine = void 0;
const vscode = __importStar(require("vscode"));
/**
 * Cloning Engine - Environment Import/Export
 */
class CloningEngine {
    async importEnvironment(environment) {
        console.log('📥 Starting environment import...');
        const result = {
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
        }
        catch (error) {
            result.errors.push(`Import failed: ${error}`);
            console.error('Import error:', error);
        }
        return result;
    }
    async detectConflicts(environment) {
        const conflicts = [];
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
    async applyResolution(resolution) {
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
    async installExtensions(extensions) {
        let installed = 0;
        for (const ext of extensions) {
            try {
                await vscode.commands.executeCommand('workbench.extensions.installExtension', ext.id);
                installed++;
                console.log(`✅ Installed extension: ${ext.name}`);
            }
            catch (error) {
                console.warn(`⚠️ Failed to install ${ext.name}:`, error);
            }
        }
        return installed;
    }
    async installSingleExtension(extensionId) {
        await vscode.commands.executeCommand('workbench.extensions.installExtension', extensionId);
    }
    async applySettings(settings) {
        let applied = 0;
        const config = vscode.workspace.getConfiguration();
        for (const [key, value] of Object.entries(settings)) {
            try {
                await config.update(key, value, vscode.ConfigurationTarget.Global);
                applied++;
                console.log(`✅ Applied setting: ${key}`);
            }
            catch (error) {
                console.warn(`⚠️ Failed to apply setting ${key}:`, error);
            }
        }
        return applied;
    }
    async applySetting(key, value) {
        const config = vscode.workspace.getConfiguration();
        await config.update(key, value, vscode.ConfigurationTarget.Global);
    }
    async cloneRepositories(repositories) {
        let cloned = 0;
        for (const repo of repositories) {
            if (repo.remote) {
                try {
                    // This would use git commands to clone
                    console.log(`📦 Would clone repository: ${repo.name} from ${repo.remote}`);
                    cloned++;
                }
                catch (error) {
                    console.warn(`⚠️ Failed to clone ${repo.name}:`, error);
                }
            }
        }
        return cloned;
    }
}
exports.CloningEngine = CloningEngine;
