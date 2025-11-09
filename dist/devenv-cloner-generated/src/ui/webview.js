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
exports.WebviewController = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
/**
 * Webview Controller for Environment Cloner Dashboard
 */
class WebviewController {
    constructor(context) {
        this.context = context;
    }
    async openDashboard() {
        if (this.panel) {
            this.panel.reveal();
            return;
        }
        this.panel = vscode.window.createWebviewPanel('devenvDashboard', '🚀 Environment Cloner Dashboard', vscode.ViewColumn.One, {
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.file(path.join(this.context.extensionPath, 'webview'))
            ]
        });
        this.panel.webview.html = this.getWebviewContent();
        this.panel.webview.onDidReceiveMessage(message => this.handleMessage(message), undefined, this.context.subscriptions);
        this.panel.onDidDispose(() => {
            this.panel = undefined;
        });
    }
    getWebviewContent() {
        const webviewPath = path.join(this.context.extensionPath, 'webview');
        const htmlPath = path.join(webviewPath, 'index.html');
        // In real implementation, we would read the HTML file
        return `<!DOCTYPE html>
<html>
<head>
    <title>Environment Cloner Dashboard</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .dashboard { max-width: 800px; margin: 20px auto; padding: 20px; }
        .card { border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin: 10px 0; }
        button { background: #007acc; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; }
        button:hover { background: #005a9e; }
    </style>
</head>
<body>
    <div class="dashboard">
        <h1>🚀 Development Environment Cloner</h1>
        
        <div class="card">
            <h2>📤 Export Environment</h2>
            <p>Create a snapshot of your current VS Code setup</p>
            <button onclick="exportEnvironment()">Export Now</button>
        </div>
        
        <div class="card">
            <h2>📥 Import Environment</h2>
            <p>Load an environment from a snapshot file</p>
            <button onclick="importEnvironment()">Import File</button>
        </div>
        
        <div class="card">
            <h2>🤖 AI Analysis</h2>
            <p>Get intelligent optimization suggestions</p>
            <button onclick="analyzeEnvironment()">Analyze</button>
        </div>
    </div>
    
    <script>
        const vscode = acquireVsCodeApi();
        
        function exportEnvironment() {
            vscode.postMessage({ command: 'export' });
        }
        
        function importEnvironment() {
            vscode.postMessage({ command: 'import' });
        }
        
        function analyzeEnvironment() {
            vscode.postMessage({ command: 'analyze' });
        }
    </script>
</body>
</html>`;
    }
    async handleMessage(message) {
        switch (message.command) {
            case 'export':
                await vscode.commands.executeCommand('devenv.exportEnvironment');
                break;
            case 'import':
                await vscode.commands.executeCommand('devenv.importEnvironment');
                break;
            case 'analyze':
                vscode.window.showInformationMessage('🤖 AI Analysis coming soon!');
                break;
        }
    }
}
exports.WebviewController = WebviewController;
