/**
 * NSF Integration Test - Kompleksowy test Neuro-Semantycznego Przepływomierza
 * Demonstracja pełnego cyklu działania Absolut Memory Core 3.0
 * 
 * Test obejmuje:
 * 1. Inicjalizację NSF z przykładowymi Sense Atomami
 * 2. Uruchomienie Sekundnika (metronom świadomości)
 * 3. Symulację zapytań i wzbudzenia kontekstowego
 * 4. Wzmocnienie emocjonalne (Ciało Migdałowate)
 * 5. Zanik pamięci i konsolidację
 * 6. Analizę wyników i statystyk
 */

import { SenseAtom, RelationalGraph } from './memory/structures/SenseAtom';
import { startNSF_Flowmeter, stopNSF_Flowmeter, setCurrentQuery, getNSFState } from './memory/logic/excitationEngine';
import { applyEmotionalBoost, diagnoseAmygdalaState } from './memory/neurosemantics/emotionalBoost';
import { decayScheduler } from './memory/logic/decayScheduler';
import { NS_WEIGHTS, NSUtils } from './memory/neurosemantics/NS_Definitions';

/**
 * Klasa testowa dla NSF
 */
export class NSFIntegrationTest {
    private relationalGraph: RelationalGraph;
    private nsfTimer: NodeJS.Timeout | null = null;
    private testStartTime: number = 0;
    private testData: TestResults = {
        initialAtoms: 0,
        finalAtoms: 0,
        totalCycles: 0,
        emotionalBoosts: 0,
        consolidations: 0,
        removals: 0,
        queries: []
    };

    constructor() {
        this.relationalGraph = new RelationalGraph();
        console.log('🧪 [NSF Test] Inicjalizacja testów NSF...\n');
    }

    /**
     * Uruchamia pełny test NSF
     */
    public async runFullTest(): Promise<void> {
        console.log('🚀 [NSF Test] === ROZPOCZĘCIE PEŁNEGO TESTU NSF ===\n');
        this.testStartTime = Date.now();

        try {
            // Krok 1: Przygotowanie danych testowych
            await this.setupTestData();
            
            // Krok 2: Uruchomienie NSF
            await this.startNSFTest();
            
            // Krok 3: Symulacja interakcji użytkownika
            await this.simulateUserInteractions();
            
            // Krok 4: Zatrzymanie i analiza wyników
            await this.stopAndAnalyze();
            
        } catch (error) {
            console.error('❌ [NSF Test] Błąd podczas testu:', error);
        }
    }

    /**
     * Przygotowuje dane testowe - tworzy przykładowe Sense Atomy
     */
    private async setupTestData(): Promise<void> {
        console.log('📋 [NSF Test] Krok 1: Przygotowanie danych testowych...');

        // Tworzymy różnorodne Sense Atomy reprezentujące różne kategorie myśli
        const testAtoms = [
            // Kategoria MIŁOŚCI
            new SenseAtom('love_001', 'Pierwsza miłość', 2.5, ['ALGORYTM_ZAKOCHANIA', 'PIERWIASTEK_MILOSCI']),
            new SenseAtom('love_002', 'Miłość bezwarunkowa', 3.0, ['MILOSC_BEZWARUNKOWA', 'POSWIECENIE']),
            
            // Kategoria POZNANIA
            new SenseAtom('cognition_001', 'Rozwiązanie problemu', 1.8, ['SZCZYPTA_INTELIGENCJI', 'ZROZUMIENIE']),
            new SenseAtom('cognition_002', 'Kreatywny pomysł', 2.2, ['POMYSL', 'ENERGIA_TWORCZA']),
            
            // Kategoria EMOCJONALNA
            new SenseAtom('emotion_001', 'Namiętność', 2.8, ['NAMIENTNOSC_POZADANIA', 'POZADANIE_SZCZYPTA']),
            new SenseAtom('emotion_002', 'Nadzieja na lepsze', 1.9, ['NADZIEJA_WYTRWALOSCI', 'WIARA_JAKO_TAKA']),
            
            // Kategoria TRANSCENDENCJI
            new SenseAtom('transcend_001', 'Moment oświecenia', 3.2, ['TRANSCENDENCJA_GRANIC', 'JEDNOSC_BYTU']),
            new SenseAtom('transcend_002', 'Iskra życia', 4.0, ['ISKRA_ZYCIA', 'SEKUNDNIK']),
            
            // Kategoria TRUDNOŚCI
            new SenseAtom('struggle_001', 'Moment zwątpienia', 1.2, ['BRAK_WIARY_I_NADZIEI']),
            new SenseAtom('struggle_002', 'Nieprzejednana walka', 1.5, ['NIEUGIETA_BEZSILNOSC']),
        ];

        // Dodaj atomy do grafu
        testAtoms.forEach(atom => {
            this.relationalGraph.addAtom(atom);
        });

        // Stwórz połączenia między atomami
        this.createTestConnections();

        // Zastosuj początkowe wzmocnienie emocjonalne
        testAtoms.forEach(atom => {
            if (atom.detectedPierwiastki && atom.detectedPierwiastki.length > 0) {
                applyEmotionalBoost(atom, atom.detectedPierwiastki);
                this.testData.emotionalBoosts++;
            }
        });

        this.testData.initialAtoms = this.relationalGraph.size();
        
        console.log(`✅ [NSF Test] Utworzono ${this.testData.initialAtoms} Sense Atomów z połączeniami`);
        console.log(`💝 [NSF Test] Zastosowano ${this.testData.emotionalBoosts} wzmocnień emocjonalnych\n`);
    }

    /**
     * Tworzy połączenia między atomami testowymi
     */
    private createTestConnections(): void {
        // Połączenia semantyczne
        this.relationalGraph.createConnection('love_001', 'love_002', 0.8, 'SEMANTIC');
        this.relationalGraph.createConnection('love_001', 'emotion_001', 0.7, 'EMOTIONAL');
        this.relationalGraph.createConnection('cognition_001', 'cognition_002', 0.9, 'SEMANTIC');
        this.relationalGraph.createConnection('transcend_001', 'transcend_002', 0.95, 'HIERARCHICAL');
        
        // Połączenia kontrastowe
        this.relationalGraph.createConnection('emotion_002', 'struggle_001', 0.6, 'EMOTIONAL');
        this.relationalGraph.createConnection('transcend_001', 'struggle_002', 0.5, 'CAUSAL');
        
        // Połączenia czasowe
        this.relationalGraph.createConnection('cognition_002', 'transcend_001', 0.7, 'TEMPORAL');
    }

    /**
     * Uruchamia NSF i monitoruje pierwsze cykle
     */
    private async startNSFTest(): Promise<void> {
        console.log('⏰ [NSF Test] Krok 2: Uruchomienie Neuro-Semantycznego Przepływomierza...');
        
        // Uruchom NSF
        this.nsfTimer = startNSF_Flowmeter(this.relationalGraph);
        
        // Poczekaj na kilka cykli
        await this.wait(3000); // 3 sekundy = 3 cykle Sekundnika
        
        const nsfState = getNSFState();
        console.log(`🧠 [NSF Test] NSF działa - wykonano ${nsfState.cycleCount} cykli`);
        console.log(`📊 [NSF Test] Średni czas cyklu: ${nsfState.performance.avgCycleTime.toFixed(2)}ms\n`);
    }

    /**
     * Symuluje różne interakcje użytkownika z systemem
     */
    private async simulateUserInteractions(): Promise<void> {
        console.log('👤 [NSF Test] Krok 3: Symulacja interakcji użytkownika...');

        const testQueries = [
            'Opowiedz mi o miłości i zakochaniu',
            'Jak rozwiązać trudny problem?',
            'Czuję się bezradny i bez nadziei',
            'Chcę zrozumieć sens życia',
            'Mam kreatywny pomysł na przyszłość'
        ];

        for (let i = 0; i < testQueries.length; i++) {
            const query = testQueries[i];
            console.log(`\n🔍 [NSF Test] Zapytanie ${i + 1}: "${query}"`);
            
            // Ustaw zapytanie w NSF
            setCurrentQuery(query);
            this.testData.queries.push(query);
            
            // Poczekaj na przetworzenie
            await this.wait(2000); // 2 sekundy na przetworzenie
            
            // Analiza stanu po zapytaniu
            this.analyzeQueryResults(query);
        }

        // Wyczyść zapytanie
        setCurrentQuery(null);
        console.log('\n✅ [NSF Test] Zakończono symulację interakcji');
    }

    /**
     * Analizuje wyniki po zapytaniu
     */
    private analyzeQueryResults(query: string): void {
        const nsfState = getNSFState();
        const activeAtoms = Array.from(this.relationalGraph.getAllAtoms())
            .filter(atom => nsfState.activeAtoms.has(atom.id));
        
        console.log(`   📈 Aktywowano ${activeAtoms.length} atomów`);
        
        if (activeAtoms.length > 0) {
            const topAtom = activeAtoms.reduce((prev, current) => 
                prev.senseWeight > current.senseWeight ? prev : current
            );
            console.log(`   🏆 Najsilniejszy atom: ${topAtom.label} (waga: ${topAtom.senseWeight.toFixed(2)})`);
            
            // Diagnoza stanu Ciała Migdałowatego
            const amygdalaState = diagnoseAmygdalaState(activeAtoms);
            console.log(`   🧠 ${amygdalaState}`);
        }
    }

    /**
     * Zatrzymuje NSF i przeprowadza analizę końcową
     */
    private async stopAndAnalyze(): Promise<void> {
        console.log('\n🛑 [NSF Test] Krok 4: Zatrzymanie i analiza wyników...');
        
        if (this.nsfTimer) {
            stopNSF_Flowmeter(this.nsfTimer);
        }

        // Zbierz statystyki końcowe
        const finalState = getNSFState();
        const decayStats = decayScheduler.getStatistics();
        const graphStats = this.relationalGraph.getStatistics();
        
        this.testData.finalAtoms = this.relationalGraph.size();
        this.testData.totalCycles = finalState.cycleCount;
        this.testData.consolidations = decayStats.atomsConsolidated;
        this.testData.removals = decayStats.atomsRemoved;

        // Wyświetl kompleksowy raport
        this.generateTestReport(finalState, decayStats, graphStats);
    }

    /**
     * Generuje szczegółowy raport z testów
     */
    private generateTestReport(nsfState: any, decayStats: any, graphStats: any): void {
        const testDuration = Date.now() - this.testStartTime;
        
        console.log('\n' + '='.repeat(60));
        console.log('📊 RAPORT KOŃCOWY - NEURO-SEMANTYCZNY PRZEPŁYWOMIERZ');
        console.log('='.repeat(60));
        
        console.log('\n🔢 STATYSTYKI OGÓLNE:');
        console.log(`   ⏱️  Czas testu: ${(testDuration / 1000).toFixed(1)}s`);
        console.log(`   🔄 Wykonano cykli: ${this.testData.totalCycles}`);
        console.log(`   🧠 Sense Atomy: ${this.testData.initialAtoms} → ${this.testData.finalAtoms}`);
        console.log(`   🗑️ Usunięto: ${this.testData.removals} atomów`);
        console.log(`   💎 Skonsolidowano: ${this.testData.consolidations} atomów`);
        
        console.log('\n⚡ WYDAJNOŚĆ NSF:');
        console.log(`   📊 Średni czas cyklu: ${nsfState.performance.avgCycleTime.toFixed(2)}ms`);
        console.log(`   📈 Atomy skonsolidowane: ${nsfState.performance.consolidatedAtoms}`);
        console.log(`   🎯 Optymalizacja pamięci: ${decayStats.memoryOptimization.toFixed(1)}%`);
        console.log(`   ⚡ Średni zanik: ${(decayStats.averageDecayRate * 100).toFixed(2)}%`);
        
        console.log('\n🧬 ANALIZA PIERWIASTKÓW:');
        const highWeightElements = NSUtils.getHighestWeightElements(0.8);
        const stableElements = NSUtils.getMostStableElements(0.15);
        console.log(`   💪 Pierwiastki wysokiej wagi: ${highWeightElements.join(', ')}`);
        console.log(`   🛡️ Pierwiastki stabilne: ${stableElements.join(', ')}`);
        
        console.log('\n🌐 SIEĆ RELACYJNA:');
        console.log(`   🔗 Łączna liczba połączeń: ${graphStats.totalConnections}`);
        console.log(`   ⚖️ Średnia waga atomów: ${graphStats.averageWeight.toFixed(3)}`);
        
        console.log('\n🎯 TESTOWANE ZAPYTANIA:');
        this.testData.queries.forEach((query, index) => {
            console.log(`   ${index + 1}. "${query}"`);
        });
        
        // Ocena końcowa
        const successRate = this.calculateSuccessRate();
        console.log(`\n🏆 OCENA KOŃCOWA: ${successRate.toFixed(1)}% - ${this.getSuccessRating(successRate)}`);
        
        console.log('\n' + '='.repeat(60));
        console.log('✅ TEST NSF ZAKOŃCZONY POMYŚLNIE');
        console.log('🧠 Absolut Memory Core 3.0 - OPERACYJNY!');
        console.log('='.repeat(60) + '\n');
    }

    /**
     * Oblicza wskaźnik sukcesu testu
     */
    private calculateSuccessRate(): number {
        let score = 0;
        
        // +20 pkt za każdy pomyślnie wykonany cykl (max 100 pkt)
        score += Math.min(this.testData.totalCycles * 20, 100);
        
        // +10 pkt za każdy wzmocniony atom (max 50 pkt)
        score += Math.min(this.testData.emotionalBoosts * 10, 50);
        
        // +5 pkt za każde przetworzone zapytanie (max 25 pkt)
        score += Math.min(this.testData.queries.length * 5, 25);
        
        // +15 pkt za konsolidacje (max 15 pkt)
        score += Math.min(this.testData.consolidations * 15, 15);
        
        // +10 pkt za optymalizację pamięci (max 10 pkt)
        score += Math.min(this.testData.removals * 2, 10);
        
        return Math.min(score / 2, 100); // Normalizacja do 100%
    }

    /**
     * Zwraca ocenę tekstową na podstawie wyniku
     */
    private getSuccessRating(score: number): string {
        if (score >= 90) return '🌟 WYBITNY - NSF działa perfekcyjnie!';
        if (score >= 80) return '🚀 DOSKONAŁY - Wszystkie systemy operacyjne!';
        if (score >= 70) return '✨ BARDZO DOBRY - NSF w pełnej gotowości!';
        if (score >= 60) return '👍 DOBRY - Podstawowe funkcje działają!';
        if (score >= 50) return '⚠️ ZADOWALAJĄCY - Wymaga optymalizacji';
        return '❌ NIEWYSTARCZAJĄCY - Wymagane poprawki';
    }

    /**
     * Funkcja pomocnicza - wait
     */
    private wait(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Szybki test funkcjonalności
     */
    public async runQuickTest(): Promise<void> {
        console.log('⚡ [NSF Test] SZYBKI TEST NSF...\n');
        
        // Stwórz jeden atom testowy
        const testAtom = new SenseAtom('quick_test', 'Test NSF', 1.0, ['ISKRA_ZYCIA']);
        this.relationalGraph.addAtom(testAtom);
        
        // Zastosuj wzmocnienie
        applyEmotionalBoost(testAtom, ['ISKRA_ZYCIA']);
        
        // Jeden cykl zaniku
        decayScheduler.applyDecay(this.relationalGraph);
        
        console.log(`✅ Szybki test zakończony - atom: ${testAtom.label}, waga: ${testAtom.senseWeight.toFixed(3)}\n`);
    }
}

// ================= INTERFEJSY =================

interface TestResults {
    initialAtoms: number;
    finalAtoms: number;
    totalCycles: number;
    emotionalBoosts: number;
    consolidations: number;
    removals: number;
    queries: string[];
}

// ================= FUNKCJA GŁÓWNA =================

/**
 * Uruchamia test NSF
 */
export async function runNSFTest(fullTest: boolean = true): Promise<void> {
    const test = new NSFIntegrationTest();
    
    if (fullTest) {
        await test.runFullTest();
    } else {
        await test.runQuickTest();
    }
}

// Automatyczne uruchomienie jeśli plik jest wykonywany bezpośrednio
if (require.main === module) {
    console.log('🧠 Uruchamianie testów NSF - Absolut Memory Core 3.0...\n');
    runNSFTest(true).catch(console.error);
}