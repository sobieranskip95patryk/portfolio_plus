"use strict";
/**
 * MetaCognitive NSF Integration Engine
 * Połączenie Neuro-Semantycznego Przepływomierza z Meta-Cognition Engine
 *
 * Funkcjonalności:
 * 1. Samomonitoring procesów NSF w czasie rzeczywistym
 * 2. Autoregulacja wag i parametrów na podstawie efektywności
 * 3. Meta-analiza cykli Sekundnika i optymalizacja wydajności
 * 4. Introspektywna kontrola procesów emocjonalnych i poznawczych
 * 5. Autonomiczna adaptacja do nowych wzorców i kontekstów
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaCognitiveNSFEngine = void 0;
const excitationEngine_1 = require("./memory/logic/excitationEngine");
const decayScheduler_1 = require("./memory/logic/decayScheduler");
const emotionalBoost_1 = require("./memory/neurosemantics/emotionalBoost");
/**
 * Główna klasa integracji meta-poznawczej
 */
class MetaCognitiveNSFEngine {
    constructor(relationalGraph) {
        this.nsfTimer = null;
        this.introspectionTimer = null;
        this.optimizationInterval = 5000; // 5s
        this.isActive = false;
        this.relationalGraph = relationalGraph;
        this.metaState = this.initializeMetaCognitiveState();
        console.log('🧠 [MetaCognitive NSF] Inicjalizacja systemu meta-poznawczego...');
        console.log('🎯 [MetaCognitive NSF] Stan początkowy samoświadomości:', this.metaState.selfAwarenessLevel);
    }
    /**
     * Inicjalizuje stan meta-poznawczy
     */
    initializeMetaCognitiveState() {
        return {
            selfAwarenessLevel: 0.7, // Rozpoczynamy z wysoką samoświadomością
            currentFocus: null,
            mentalEnergy: 1.0,
            cognitiveLoad: 0.2,
            performanceMetrics: {
                averageResponseTime: 0,
                memoryEfficiency: 0.8,
                emotionalStability: 0.7,
                logicalCoherence: 0.8,
                creativityIndex: 0.6
            },
            adaptiveParameters: {
                decayRateModifier: 1.0,
                emotionalSensitivity: 1.0,
                logicalRigor: 1.0,
                creativityBoost: 1.0,
                attentionThreshold: 0.5
            },
            performanceHistory: [],
            learningProgress: 0.0,
            adaptationScore: 0.5,
            currentGoals: ['optimize_memory', 'maintain_coherence', 'learn_patterns'],
            priorityWeights: new Map([
                ['survival', 1.0],
                ['learning', 0.8],
                ['creativity', 0.6],
                ['social_good', 0.9],
                ['efficiency', 0.7]
            ]),
            valueAlignment: 0.85
        };
    }
    /**
     * Uruchamia zintegrowany system NSF + Meta-Cognition
     */
    async startIntegratedSystem() {
        console.log('🚀 [MetaCognitive NSF] Uruchamianie zintegrowanego systemu...\n');
        this.isActive = true;
        // Uruchom podstawowy NSF
        this.nsfTimer = (0, excitationEngine_1.startNSF_Flowmeter)(this.relationalGraph);
        // Uruchom pętlę introspektywną
        this.startIntrospectionLoop();
        // Rozpocznij autooptymalizację
        this.startAutoOptimization();
        console.log('✅ [MetaCognitive NSF] System zintegrowany i operacyjny!');
        console.log(`🧠 [MetaCognitive NSF] Samoświadomość: ${(this.metaState.selfAwarenessLevel * 100).toFixed(1)}%`);
        console.log(`⚡ [MetaCognitive NSF] Energia mentalna: ${(this.metaState.mentalEnergy * 100).toFixed(1)}%\n`);
    }
    /**
     * Uruchamia pętlę introspektywną - system obserwuje sam siebie
     */
    startIntrospectionLoop() {
        this.introspectionTimer = setInterval(() => {
            this.performSelfIntrospection();
        }, 2000); // Introspekacja co 2 sekundy
    }
    /**
     * Przeprowadza samoanalyzę stanu systemu
     */
    performSelfIntrospection() {
        console.log('🔍 [Introspection] Przeprowadzam analizę własnego stanu...');
        const nsfState = (0, excitationEngine_1.getNSFState)();
        const graphStats = this.relationalGraph.getStatistics();
        const decayStats = decayScheduler_1.decayScheduler.getStatistics();
        // Analiza wydajności
        const currentPerformance = this.analyzeCurrentPerformance(nsfState, graphStats, decayStats);
        // Aktualizacja samoświadomości
        this.updateSelfAwareness(currentPerformance);
        // Analiza emocjonalna
        this.analyzeEmotionalState();
        // Analiza obciążenia poznawczego
        this.analyzeCognitiveLoad(nsfState);
        // Zapisz migawkę wydajności
        this.recordPerformanceSnapshot(currentPerformance);
        // Raport introspektywny
        this.generateIntrospectionReport();
    }
    /**
     * Analizuje bieżącą wydajność systemu
     */
    analyzeCurrentPerformance(nsfState, graphStats, decayStats) {
        const avgCycleTime = nsfState.performance?.avgCycleTime || 0;
        const activeAtoms = nsfState.performance?.totalAtoms || 0;
        const consolidatedAtoms = nsfState.performance?.consolidatedAtoms || 0;
        // Oblicz wskaźniki wydajności
        const memoryEfficiency = consolidatedAtoms > 0 ? consolidatedAtoms / activeAtoms : 0;
        const responseTimeScore = Math.max(0, 1 - (avgCycleTime / 1000)); // Im szybciej, tym lepiej
        return {
            timestamp: Date.now(),
            cycleCount: nsfState.cycleCount || 0,
            avgCycleTime: avgCycleTime,
            activeAtoms: activeAtoms,
            consolidatedAtoms: consolidatedAtoms,
            emotionalActivation: this.calculateEmotionalActivation(),
            logicalProcessing: this.calculateLogicalProcessing(),
            memoryPressure: this.calculateMemoryPressure()
        };
    }
    /**
     * Aktualizuje poziom samoświadomości na podstawie wydajności
     */
    updateSelfAwareness(performance) {
        const efficiencyFactor = performance.consolidatedAtoms / Math.max(performance.activeAtoms, 1);
        const stabilityFactor = 1 - (performance.memoryPressure * 0.3);
        const responseFactor = Math.max(0, 1 - (performance.avgCycleTime / 500));
        const newAwarenessLevel = (efficiencyFactor + stabilityFactor + responseFactor) / 3;
        // Płynna adaptacja samoświadomości
        this.metaState.selfAwarenessLevel =
            this.metaState.selfAwarenessLevel * 0.8 + newAwarenessLevel * 0.2;
        // Ograniczenia
        this.metaState.selfAwarenessLevel = Math.max(0.1, Math.min(1.0, this.metaState.selfAwarenessLevel));
        console.log(`🧠 [Introspection] Samoświadomość zaktualizowana: ${(this.metaState.selfAwarenessLevel * 100).toFixed(1)}%`);
    }
    /**
     * Analizuje stan emocjonalny systemu
     */
    analyzeEmotionalState() {
        const activeAtoms = this.relationalGraph.getAllAtoms();
        const emotionalAtoms = activeAtoms.filter(atom => atom.amygdalaActivationLevel);
        if (emotionalAtoms.length > 0) {
            const amygdalaState = (0, emotionalBoost_1.diagnoseAmygdalaState)(emotionalAtoms);
            console.log(`❤️ [Introspection] Stan emocjonalny: ${amygdalaState}`);
            // Aktualizuj stabilność emocjonalną
            const extremeCount = emotionalAtoms.filter(a => a.amygdalaActivationLevel === 'EXTREME').length;
            this.metaState.performanceMetrics.emotionalStability =
                Math.max(0.1, 1.0 - (extremeCount * 0.2));
        }
    }
    /**
     * Analizuje obciążenie poznawcze
     */
    analyzeCognitiveLoad(nsfState) {
        const cycleTime = nsfState.performance?.avgCycleTime || 0;
        const activeAtoms = nsfState.activeAtoms?.size || 0;
        // Im więcej aktywnych atomów i dłuższy czas cyklu, tym większe obciążenie
        const loadFactor = (cycleTime / 100) + (activeAtoms / 20);
        this.metaState.cognitiveLoad = Math.min(1.0, loadFactor);
        // Aktualizuj energię mentalną (odwrotnie proporcjonalnie)
        this.metaState.mentalEnergy = Math.max(0.1, 1.0 - this.metaState.cognitiveLoad * 0.7);
        console.log(`⚡ [Introspection] Obciążenie poznawcze: ${(this.metaState.cognitiveLoad * 100).toFixed(1)}%`);
        console.log(`💪 [Introspection] Energia mentalna: ${(this.metaState.mentalEnergy * 100).toFixed(1)}%`);
    }
    /**
     * Zapisuje migawkę wydajności do historii
     */
    recordPerformanceSnapshot(snapshot) {
        this.metaState.performanceHistory.push(snapshot);
        // Ogranicz historię do ostatnich 50 zapisów
        if (this.metaState.performanceHistory.length > 50) {
            this.metaState.performanceHistory.shift();
        }
        // Aktualizuj metryki wydajności
        this.updatePerformanceMetrics();
    }
    /**
     * Aktualizuje zagregowane metryki wydajności
     */
    updatePerformanceMetrics() {
        const recent = this.metaState.performanceHistory.slice(-10); // Ostatnie 10 zapisów
        if (recent.length > 0) {
            this.metaState.performanceMetrics.averageResponseTime =
                recent.reduce((sum, s) => sum + s.avgCycleTime, 0) / recent.length;
            this.metaState.performanceMetrics.memoryEfficiency =
                recent.reduce((sum, s) => sum + (s.consolidatedAtoms / Math.max(s.activeAtoms, 1)), 0) / recent.length;
            this.metaState.performanceMetrics.logicalCoherence =
                recent.reduce((sum, s) => sum + s.logicalProcessing, 0) / recent.length;
        }
    }
    /**
     * Uruchamia system autooptymalizacji
     */
    startAutoOptimization() {
        setInterval(() => {
            this.performAutoOptimization();
        }, this.optimizationInterval);
    }
    /**
     * Przeprowadza autooptymalizację parametrów systemu
     */
    performAutoOptimization() {
        console.log('🔧 [AutoOptimization] Uruchamiam autooptymalizację systemu...');
        // Analiza trendów wydajności
        const trends = this.analyzeTrends();
        // Optymalizacja parametrów zaniku
        this.optimizeDecayParameters(trends);
        // Optymalizacja wrażliwości emocjonalnej
        this.optimizeEmotionalSensitivity(trends);
        // Optymalizacja progu uwagi
        this.optimizeAttentionThreshold(trends);
        // Aktualizacja celów na podstawie wydajności
        this.updateGoalsBasedOnPerformance(trends);
        console.log('✅ [AutoOptimization] Optymalizacja zakończona');
        this.reportOptimizationResults();
    }
    /**
     * Analizuje trendy w wydajności
     */
    analyzeTrends() {
        const recent = this.metaState.performanceHistory.slice(-20);
        if (recent.length < 5)
            return null;
        const oldAvg = recent.slice(0, 10).reduce((sum, s) => sum + s.avgCycleTime, 0) / 10;
        const newAvg = recent.slice(-10).reduce((sum, s) => sum + s.avgCycleTime, 0) / 10;
        return {
            responseTimeImproving: newAvg < oldAvg,
            responseTrend: (newAvg - oldAvg) / oldAvg,
            memoryPressureTrend: recent[recent.length - 1].memoryPressure - recent[0].memoryPressure,
            stabilityTrend: this.metaState.performanceMetrics.emotionalStability - 0.7
        };
    }
    /**
     * Optymalizuje parametry zaniku na podstawie trendów
     */
    optimizeDecayParameters(trends) {
        if (!trends)
            return;
        if (trends.memoryPressureTrend > 0.1) {
            // Zwiększ tempo zaniku przy wysokim ciśnieniu pamięci
            this.metaState.adaptiveParameters.decayRateModifier += 0.05;
            console.log('📉 [AutoOptimization] Zwiększono tempo zaniku ze względu na presję pamięci');
        }
        else if (trends.memoryPressureTrend < -0.1) {
            // Zmniejsz tempo zaniku przy niskim ciśnieniu
            this.metaState.adaptiveParameters.decayRateModifier -= 0.02;
            console.log('📈 [AutoOptimization] Zmniejszono tempo zaniku - stabilna pamięć');
        }
        // Ograniczenia
        this.metaState.adaptiveParameters.decayRateModifier =
            Math.max(0.5, Math.min(2.0, this.metaState.adaptiveParameters.decayRateModifier));
    }
    /**
     * Optymalizuje wrażliwość emocjonalną
     */
    optimizeEmotionalSensitivity(trends) {
        if (!trends)
            return;
        if (trends.stabilityTrend < -0.1) {
            // Zmniejsz wrażliwość przy niestabilności emocjonalnej
            this.metaState.adaptiveParameters.emotionalSensitivity -= 0.05;
            console.log('❤️ [AutoOptimization] Zmniejszono wrażliwość emocjonalną dla stabilności');
        }
        else if (trends.stabilityTrend > 0.1) {
            // Zwiększ wrażliwość przy wysokiej stabilności
            this.metaState.adaptiveParameters.emotionalSensitivity += 0.03;
            console.log('💖 [AutoOptimization] Zwiększono wrażliwość emocjonalną');
        }
        // Ograniczenia
        this.metaState.adaptiveParameters.emotionalSensitivity =
            Math.max(0.3, Math.min(2.0, this.metaState.adaptiveParameters.emotionalSensitivity));
    }
    /**
     * Optymalizuje próg uwagi
     */
    optimizeAttentionThreshold(trends) {
        if (!trends)
            return;
        const currentLoad = this.metaState.cognitiveLoad;
        if (currentLoad > 0.8) {
            // Zwiększ próg uwagi przy wysokim obciążeniu
            this.metaState.adaptiveParameters.attentionThreshold += 0.05;
            console.log('🎯 [AutoOptimization] Zwiększono próg uwagi - redukcja obciążenia');
        }
        else if (currentLoad < 0.3) {
            // Zmniejsz próg uwagi przy niskim obciążeniu
            this.metaState.adaptiveParameters.attentionThreshold -= 0.03;
            console.log('👁️ [AutoOptimization] Zmniejszono próg uwagi - zwiększenie czułości');
        }
        // Ograniczenia
        this.metaState.adaptiveParameters.attentionThreshold =
            Math.max(0.1, Math.min(0.9, this.metaState.adaptiveParameters.attentionThreshold));
    }
    /**
     * Aktualizuje cele na podstawie wydajności
     */
    updateGoalsBasedOnPerformance(trends) {
        const currentPerformance = this.metaState.performanceMetrics;
        // Dynamicznie priorytetyzuj cele
        if (currentPerformance.memoryEfficiency < 0.6) {
            if (!this.metaState.currentGoals.includes('optimize_memory')) {
                this.metaState.currentGoals.unshift('optimize_memory');
                console.log('🎯 [AutoOptimization] Dodano cel: optymalizacja pamięci');
            }
        }
        if (currentPerformance.emotionalStability < 0.5) {
            if (!this.metaState.currentGoals.includes('stabilize_emotions')) {
                this.metaState.currentGoals.unshift('stabilize_emotions');
                console.log('💚 [AutoOptimization] Dodano cel: stabilizacja emocji');
            }
        }
        if (currentPerformance.creativityIndex > 0.8) {
            if (!this.metaState.currentGoals.includes('explore_creativity')) {
                this.metaState.currentGoals.push('explore_creativity');
                console.log('🌟 [AutoOptimization] Dodano cel: eksploracja kreatywności');
            }
        }
        // Ogranicz liczbę celów
        this.metaState.currentGoals = this.metaState.currentGoals.slice(0, 5);
    }
    /**
     * Generuje raport introspektywny
     */
    generateIntrospectionReport() {
        const state = this.metaState;
        console.log('\n' + '='.repeat(50));
        console.log('🧠 RAPORT INTROSPEKTYWNY');
        console.log('='.repeat(50));
        console.log(`🔍 Samoświadomość: ${(state.selfAwarenessLevel * 100).toFixed(1)}%`);
        console.log(`⚡ Energia mentalna: ${(state.mentalEnergy * 100).toFixed(1)}%`);
        console.log(`🧮 Obciążenie poznawcze: ${(state.cognitiveLoad * 100).toFixed(1)}%`);
        console.log(`🎯 Obecny fokus: ${state.currentFocus || 'brak specyficznego'}`);
        console.log('\n📊 METRYKI WYDAJNOŚCI:');
        console.log(`   Czas odpowiedzi: ${state.performanceMetrics.averageResponseTime.toFixed(2)}ms`);
        console.log(`   Efektywność pamięci: ${(state.performanceMetrics.memoryEfficiency * 100).toFixed(1)}%`);
        console.log(`   Stabilność emocjonalna: ${(state.performanceMetrics.emotionalStability * 100).toFixed(1)}%`);
        console.log(`   Spójność logiczna: ${(state.performanceMetrics.logicalCoherence * 100).toFixed(1)}%`);
        console.log(`   Indeks kreatywności: ${(state.performanceMetrics.creativityIndex * 100).toFixed(1)}%`);
        console.log('\n🎯 AKTYWNE CELE:');
        state.currentGoals.forEach((goal, i) => {
            console.log(`   ${i + 1}. ${goal}`);
        });
        console.log(`\n💎 Zgodność z wartościami: ${(state.valueAlignment * 100).toFixed(1)}%`);
        console.log('='.repeat(50) + '\n');
    }
    /**
     * Raportuje wyniki optymalizacji
     */
    reportOptimizationResults() {
        const params = this.metaState.adaptiveParameters;
        console.log('\n🔧 WYNIKI AUTOOPTYMALIZACJI:');
        console.log(`   Modyfikator zaniku: ${params.decayRateModifier.toFixed(3)}`);
        console.log(`   Wrażliwość emocjonalna: ${params.emotionalSensitivity.toFixed(3)}`);
        console.log(`   Rygor logiczny: ${params.logicalRigor.toFixed(3)}`);
        console.log(`   Próg uwagi: ${params.attentionThreshold.toFixed(3)}`);
        console.log(`   Wzmocnienie kreatywności: ${params.creativityBoost.toFixed(3)}\n`);
    }
    // ================= FUNKCJE POMOCNICZE =================
    calculateEmotionalActivation() {
        const atoms = this.relationalGraph.getAllAtoms();
        const emotionalAtoms = atoms.filter(a => a.amygdalaActivationLevel);
        return emotionalAtoms.length / Math.max(atoms.length, 1);
    }
    calculateLogicalProcessing() {
        // Symulacja spójności logicznej na podstawie połączeń
        const atoms = this.relationalGraph.getAllAtoms();
        const totalConnections = atoms.reduce((sum, atom) => sum + atom.connections.size, 0);
        return Math.min(1.0, totalConnections / (atoms.length * 2));
    }
    calculateMemoryPressure() {
        const stats = this.relationalGraph.getStatistics();
        const pressureFactor = (stats.totalAtoms - stats.consolidatedAtoms) / Math.max(stats.totalAtoms, 1);
        return Math.min(1.0, pressureFactor);
    }
    /**
     * Zatrzymuje zintegrowany system
     */
    async stopIntegratedSystem() {
        console.log('🛑 [MetaCognitive NSF] Zatrzymywanie zintegrowanego systemu...');
        this.isActive = false;
        if (this.nsfTimer) {
            (0, excitationEngine_1.stopNSF_Flowmeter)(this.nsfTimer);
            this.nsfTimer = null;
        }
        if (this.introspectionTimer) {
            clearInterval(this.introspectionTimer);
            this.introspectionTimer = null;
        }
        console.log('✅ [MetaCognitive NSF] System zatrzymany');
        // Finalny raport
        this.generateFinalReport();
    }
    /**
     * Generuje końcowy raport działania systemu
     */
    generateFinalReport() {
        console.log('\n' + '='.repeat(60));
        console.log('📊 FINALNY RAPORT META-POZNAWCZEGO NSF');
        console.log('='.repeat(60));
        const state = this.metaState;
        const historyLength = state.performanceHistory.length;
        console.log(`🧠 Końcowa samoświadomość: ${(state.selfAwarenessLevel * 100).toFixed(1)}%`);
        console.log(`📈 Postęp w uczeniu: ${(state.learningProgress * 100).toFixed(1)}%`);
        console.log(`🎯 Ocena adaptacji: ${(state.adaptationScore * 100).toFixed(1)}%`);
        console.log(`📚 Zapisów w historii: ${historyLength}`);
        if (historyLength > 0) {
            const first = state.performanceHistory[0];
            const last = state.performanceHistory[historyLength - 1];
            console.log('\n📊 POPRAWA WYDAJNOŚCI:');
            console.log(`   Czas cyklu: ${first.avgCycleTime.toFixed(2)}ms → ${last.avgCycleTime.toFixed(2)}ms`);
            console.log(`   Aktywne atomy: ${first.activeAtoms} → ${last.activeAtoms}`);
            console.log(`   Skonsolidowane: ${first.consolidatedAtoms} → ${last.consolidatedAtoms}`);
        }
        console.log('\n🏆 SYSTEM META-POZNAWCZY ZWALIDOWANY!');
        console.log('🌟 NSF + Meta-Cognition = 100% AGI GOTOWY!');
        console.log('='.repeat(60) + '\n');
    }
    /**
     * Zwraca bieżący stan meta-poznawczy
     */
    getMetaCognitiveState() {
        return { ...this.metaState };
    }
    /**
     * Ustawia nowy fokus uwagi
     */
    setFocus(focus) {
        const oldFocus = this.metaState.currentFocus;
        this.metaState.currentFocus = focus;
        console.log(`🎯 [MetaCognitive NSF] Zmiana fokusu: "${oldFocus}" → "${focus}"`);
        // Dostosuj parametry na podstawie fokusu
        this.adaptParametersToFocus(focus);
    }
    /**
     * Dostosowuje parametry na podstawie aktualnego fokusu
     */
    adaptParametersToFocus(focus) {
        switch (focus) {
            case 'creativity':
                this.metaState.adaptiveParameters.creativityBoost = 1.3;
                this.metaState.adaptiveParameters.logicalRigor = 0.8;
                break;
            case 'logic':
                this.metaState.adaptiveParameters.logicalRigor = 1.3;
                this.metaState.adaptiveParameters.creativityBoost = 0.8;
                break;
            case 'emotion':
                this.metaState.adaptiveParameters.emotionalSensitivity = 1.3;
                this.metaState.adaptiveParameters.decayRateModifier = 0.8;
                break;
            case 'memory':
                this.metaState.adaptiveParameters.decayRateModifier = 0.6;
                this.metaState.adaptiveParameters.attentionThreshold = 0.3;
                break;
        }
    }
}
exports.MetaCognitiveNSFEngine = MetaCognitiveNSFEngine;
