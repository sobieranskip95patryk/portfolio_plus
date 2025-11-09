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
exports.EnvironmentScanner = void 0;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
/**
 * Environment Scanner - AI-Enhanced
 *
 * Skanuje obecne środowisko VS Code i generuje snapshot
 * z wykorzystaniem AI do analizy i optymalizacji
 */
class EnvironmentScanner {
    async scanCurrentEnvironment() {
        console.log('🔍 Starting environment scan...');
        const snapshot = {
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
    async generateMetadata() {
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
    async scanVSCodeSettings() {
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
    async scanExtensions() {
        const extensions = vscode.extensions.all;
        const installed = extensions
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
    async scanRepositories() {
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
    async scanDependencies() {
        // TODO: Implement dependency scanning
        // This would scan package.json, requirements.txt, etc.
        return {
            system: [],
            runtime: [],
            tools: []
        };
    }
    async getGitRemote(repoPath) {
        try {
            // TODO: Implement git remote detection
            return null;
        }
        catch (error) {
            console.warn('Could not detect git remote:', error);
            return null;
        }
    }
    async getGitBranch(repoPath) {
        try {
            // TODO: Implement git branch detection
            return null;
        }
        catch (error) {
            console.warn('Could not detect git branch:', error);
            return null;
        }
    }
    filterNonNullSettings(settings) {
        const filtered = {};
        for (const [key, value] of Object.entries(settings)) {
            if (value !== undefined && value !== null) {
                filtered[key] = value;
            }
        }
        return filtered;
    }
    generateId() {
        return 'env_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    async exportToFile(environment, filePath) {
        await fs.writeJSON(filePath, environment, { spaces: 2 });
        console.log(`📄 Environment exported to: ${filePath}`);
    }
    async loadFromFile(filePath) {
        const environment = await fs.readJSON(filePath);
        console.log(`📄 Environment loaded from: ${filePath}`);
        return environment;
    }
}
exports.EnvironmentScanner = EnvironmentScanner;
