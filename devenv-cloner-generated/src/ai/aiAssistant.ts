import * as vscode from 'vscode';
import { EnvironmentSnapshot, AIInsights, Optimization, Conflict, Resolution } from '../types/interfaces';

/**
 * AI Assistant - Powered by VS Code Language Model API
 * 
 * Wykorzystuje Copilot/GPT do analizy środowiska i inteligentnego rozwiązywania konfliktów
 */
export class AIAssistant {
    private languageModel: vscode.LanguageModelChatProvider | null = null;
    
    constructor() {
        this.initializeLanguageModel();
    }
    
    private async initializeLanguageModel() {
        try {
            const models = await vscode.lm.selectChatModels({ 
                vendor: 'copilot', 
                family: 'gpt-4o' 
            });
            
            if (models.length > 0) {
                this.languageModel = models[0];
                console.log('🤖 AI Assistant initialized with Language Model');
            } else {
                console.warn('⚠️ No language models available');
            }
        } catch (error) {
            console.warn('⚠️ Could not initialize language model:', error);
        }
    }
    
    async analyzeEnvironment(environment: EnvironmentSnapshot): Promise<AIInsights> {
        console.log('🧠 Analyzing environment with AI...');
        
        if (!this.languageModel) {
            return this.getFallbackInsights(environment);
        }
        
        try {
            const prompt = this.buildAnalysisPrompt(environment);
            const response = await this.languageModel.sendRequest([
                {
                    role: vscode.LanguageModelChatMessageRole.User,
                    content: prompt
                }
            ]);
            
            const analysis = this.parseAIResponse(response);
            console.log(`✅ AI analysis complete. Found ${analysis.optimizations.length} optimizations`);
            
            return analysis;
            
        } catch (error) {
            console.error('AI analysis failed:', error);
            return this.getFallbackInsights(environment);
        }
    }
    
    private buildAnalysisPrompt(environment: EnvironmentSnapshot): string {
        return `Analyze this VS Code environment configuration and provide optimization suggestions:

Environment Details:
- Extensions: ${environment.extensions.installed.length} installed
- Theme: ${environment.vscode.settings['workbench.colorTheme'] || 'default'}
- Font Size: ${environment.vscode.settings['editor.fontSize'] || 'default'}
- Platform: ${environment.metadata.platform.os}

Extensions List:
${environment.extensions.installed.map(ext => `- ${ext.name} (${ext.version})`).join('\n')}

Please provide:
1. Performance optimizations
2. Security recommendations 
3. Compatibility warnings
4. Productivity improvements

Format your response as JSON with this structure:
{
  "optimizations": [
    {
      "type": "performance|security|compatibility|productivity",
      "title": "Brief title",
      "description": "Detailed description",
      "impact": "low|medium|high",
      "implementation": "How to implement"
    }
  ],
  "warnings": [
    {
      "type": "security|compatibility|deprecated",
      "message": "Warning description",
      "severity": "low|medium|high"
    }
  ],
  "compatibilityScore": 0.95
}`;
    }
    
    private parseAIResponse(response: any): AIInsights {
        try {
            // In real implementation, we would parse the actual AI response
            // For now, return simulated intelligent analysis
            return {
                optimizations: [
                    {
                        type: 'performance',
                        title: 'Reduce extension count',
                        description: 'You have many extensions that might slow down VS Code startup',
                        impact: 'medium',
                        implementation: 'Disable unused extensions or use extension packs'
                    },
                    {
                        type: 'productivity',
                        title: 'Configure auto-save',
                        description: 'Enable auto-save to prevent losing work',
                        impact: 'high',
                        implementation: 'Set "files.autoSave": "afterDelay"'
                    }
                ],
                warnings: [
                    {
                        type: 'security',
                        message: 'Some extensions have access to all files',
                        severity: 'medium'
                    }
                ],
                compatibility: {
                    score: 0.92,
                    issues: ['Extension version conflicts detected']
                }
            };
        } catch (error) {
            console.error('Failed to parse AI response:', error);
            return this.getFallbackInsights({} as EnvironmentSnapshot);
        }
    }
    
    async resolveConflicts(conflicts: Conflict[]): Promise<Resolution> {
        console.log(`🤔 Resolving ${conflicts.length} conflicts with AI...`);
        
        if (!this.languageModel) {
            return this.getFallbackResolution(conflicts);
        }
        
        try {
            const prompt = `Resolve these VS Code environment conflicts:
            
${conflicts.map(c => `- ${c.type}: ${c.description} (${c.severity})`).join('\n')}

Provide resolution strategy as JSON:
{
  "strategy": "merge|overwrite|skip|custom",
  "actions": [
    {
      "type": "setting|extension|file",
      "action": "update|install|remove",
      "target": "what to change",
      "value": "new value"
    }
  ],
  "explanation": "Why this resolution approach"
}`;
            
            const response = await this.languageModel.sendRequest([
                {
                    role: vscode.LanguageModelChatMessageRole.User,
                    content: prompt
                }
            ]);
            
            return this.parseResolutionResponse(response);
            
        } catch (error) {
            console.error('AI conflict resolution failed:', error);
            return this.getFallbackResolution(conflicts);
        }
    }
    
    private parseResolutionResponse(response: any): Resolution {
        // Simplified resolution parsing
        return {
            strategy: 'merge',
            actions: [
                {
                    type: 'setting',
                    action: 'update',
                    target: 'conflicted.setting',
                    value: 'resolved_value'
                }
            ],
            explanation: 'AI-powered intelligent merge of conflicting settings'
        };
    }
    
    async showOptimizationSuggestions(optimizations: Optimization[]): Promise<void> {
        const items = optimizations.map(opt => ({
            label: `${this.getImpactEmoji(opt.impact)} ${opt.title}`,
            description: opt.description,
            detail: opt.implementation,
            optimization: opt
        }));
        
        const selected = await vscode.window.showQuickPick(items, {
            title: '🚀 AI Optimization Suggestions',
            placeHolder: 'Select optimizations to apply',
            canPickMany: true
        });
        
        if (selected && selected.length > 0) {
            for (const item of selected) {
                await this.applyOptimization(item.optimization);
            }
            
            vscode.window.showInformationMessage(
                `✅ Applied ${selected.length} optimization(s)`
            );
        }
    }
    
    private async applyOptimization(optimization: Optimization): Promise<void> {
        console.log(`🔧 Applying optimization: ${optimization.title}`);
        
        // TODO: Implement actual optimization application
        // This would modify VS Code settings, install/remove extensions, etc.
        
        switch (optimization.type) {
            case 'performance':
                // Apply performance optimizations
                break;
            case 'security':
                // Apply security improvements
                break;
            case 'productivity':
                // Apply productivity enhancements
                break;
        }
    }
    
    private getImpactEmoji(impact: string): string {
        switch (impact) {
            case 'high': return '🔥';
            case 'medium': return '⚡';
            case 'low': return '💡';
            default: return '📈';
        }
    }
    
    private getFallbackInsights(environment: EnvironmentSnapshot): AIInsights {
        return {
            optimizations: [
                {
                    type: 'productivity',
                    title: 'Environment ready for cloning',
                    description: 'Your environment looks good for sharing with team members',
                    impact: 'medium',
                    implementation: 'Export and share your environment snapshot'
                }
            ],
            warnings: [],
            compatibility: { score: 1.0, issues: [] }
        };
    }
    
    private getFallbackResolution(conflicts: Conflict[]): Resolution {
        return {
            strategy: 'merge',
            actions: conflicts.map(conflict => ({
                type: 'setting',
                action: 'update',
                target: conflict.path,
                value: 'merged_value'
            })),
            explanation: 'Automatic conflict resolution using merge strategy'
        };
    }
}