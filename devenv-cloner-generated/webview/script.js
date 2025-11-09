const vscode = acquireVsCodeApi();

function exportEnvironment() {
    vscode.postMessage({ 
        command: 'export',
        data: { timestamp: Date.now() }
    });
}

function importEnvironment() {
    vscode.postMessage({ 
        command: 'import',
        data: { timestamp: Date.now() }
    });
}

function analyzeEnvironment() {
    vscode.postMessage({ 
        command: 'analyze',
        data: { timestamp: Date.now() }
    });
}

// Listen for messages from extension
window.addEventListener('message', event => {
    const message = event.data;
    
    switch (message.type) {
        case 'analysisResult':
            displayAnalysisResult(message.data);
            break;
        case 'exportComplete':
            showNotification('✅ Environment exported successfully!');
            break;
        case 'importComplete':
            showNotification('✅ Environment imported successfully!');
            break;
    }
});

function displayAnalysisResult(data) {
    const container = document.getElementById('insights-container');
    container.innerHTML = `
        <h3>🤖 AI Analysis Results</h3>
        <p>Found ${data.optimizations || 0} optimization suggestions</p>
        <p>Compatibility Score: ${data.score || 'N/A'}</p>
    `;
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}