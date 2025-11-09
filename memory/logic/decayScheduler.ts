/**
 * Decay Scheduler - Scheduler Zaniku Pamięci
 * Symuluje naturalne procesy zanikania pamięci w mózgu
 * 
 * Mechanizmy neurobiologiczne:
 * 1. Hipokamp - Konsolidacja vs zanikanie śladów pamięciowych
 * 2. ACC (Anterior Cingulate Cortex) - Monitorowanie i selekcja
 * 3. PFC - Kontrola wykonawcza nad procesami pamięciowymi
 * 4. Ciało Migdałowate - Wzmacnianie ważnych emocjonalnie wspomnień
 */

import { NS_WEIGHTS, NSF_CONSTANTS } from '../neurosemantics/NS_Definitions';
import { SenseAtom, RelationalGraph } from '../structures/SenseAtom';

/**
 * Statystyki zaniku dla monitorowania wydajności
 */
interface DecayStatistics {
    totalProcessed: number;
    atomsDecayed: number;
    atomsRemoved: number;
    atomsConsolidated: number;
    averageDecayRate: number;
    lastDecayRun: number;
    memoryOptimization: number; // Procent zaoszczędzonej pamięci
}

/**
 * Konfiguracja procesu zaniku
 */
interface DecayConfig {
    enableAdaptiveDecay: boolean;        // Adaptacyjny zanik oparty na użyciu
    consolidationThreshold: number;      // Próg konsolidacji w pamięci długoterminowej
    removalThreshold: number;           // Próg usunięcia z pamięci
    emotionalProtection: boolean;       // Ochrona treści emocjonalnych
    temporalBonus: boolean;             // Bonus dla niedawno używanych atomów
    connectionPreservation: boolean;    // Zachowanie atomów z licznymi połączeniami
}

class DecayScheduler {
    private statistics: DecayStatistics;
    private config: DecayConfig;
    private adaptiveRates: Map<string, number>; // Adaptacyjne współczynniki dla różnych typów atomów

    constructor() {
        this.statistics = {
            totalProcessed: 0,
            atomsDecayed: 0,
            atomsRemoved: 0,
            atomsConsolidated: 0,
            averageDecayRate: NSF_CONSTANTS.BASE_DECAY_RATE,
            lastDecayRun: 0,
            memoryOptimization: 0
        };

        this.config = {
            enableAdaptiveDecay: true,
            consolidationThreshold: NSF_CONSTANTS.CONSOLIDATION_THRESHOLD,
            removalThreshold: NSF_CONSTANTS.MIN_SENSE_WEIGHT,
            emotionalProtection: true,
            temporalBonus: true,
            connectionPreservation: true
        };

        this.adaptiveRates = new Map();
        this.initializeAdaptiveRates();
    }

    /**
     * GŁÓWNA FUNKCJA - Aplikuje zanik do całej sieci relacyjnej
     */
    public applyDecay(relationalGraph: RelationalGraph): void {
        console.log('📉 [DecayScheduler] Rozpoczęcie cyklu zaniku pamięci...');
        
        const startTime = performance.now();
        const initialSize = relationalGraph.size();
        
        // Reset statystyk dla bieżącego cyklu
        this.statistics.totalProcessed = 0;
        this.statistics.atomsDecayed = 0;
        this.statistics.atomsRemoved = 0;
        this.statistics.atomsConsolidated = 0;

        const atomsToRemove: string[] = [];
        const atomsToConsolidate: string[] = [];
        let totalDecayApplied = 0;

        // Przetwarzaj każdy Sense Atom
        relationalGraph.getAllAtoms().forEach(atom => {
            this.statistics.totalProcessed++;
            
            const decayResult = this.processAtomDecay(atom, relationalGraph);
            totalDecayApplied += decayResult.decayApplied;
            
            // Oznacz do usunięcia lub konsolidacji
            if (decayResult.shouldRemove) {
                atomsToRemove.push(atom.id);
            } else if (decayResult.shouldConsolidate) {
                atomsToConsolidate.push(atom.id);
            }
            
            if (decayResult.decayApplied > 0) {
                this.statistics.atomsDecayed++;
            }
        });

        // Usuń oznaczone atomy
        atomsToRemove.forEach(id => {
            if (relationalGraph.removeAtom(id)) {
                this.statistics.atomsRemoved++;
            }
        });

        // Skonsoliduj oznaczone atomy
        atomsToConsolidate.forEach(id => {
            const atom = relationalGraph.getAtom(id);
            if (atom) {
                this.consolidateAtom(atom);
                this.statistics.atomsConsolidated++;
            }
        });

        // Aktualizuj statystyki
        this.statistics.averageDecayRate = 
            this.statistics.totalProcessed > 0 ? totalDecayApplied / this.statistics.totalProcessed : 0;
        
        this.statistics.memoryOptimization = 
            initialSize > 0 ? (this.statistics.atomsRemoved / initialSize) * 100 : 0;
        
        this.statistics.lastDecayRun = Date.now();

        const executionTime = performance.now() - startTime;
        
        console.log(`✅ [DecayScheduler] Cykl zaniku zakończony w ${executionTime.toFixed(2)}ms:`);
        console.log(`   📊 Przetworzono: ${this.statistics.totalProcessed} atomów`);
        console.log(`   📉 Uległo zanikowi: ${this.statistics.atomsDecayed} atomów`);
        console.log(`   🗑️ Usunięto: ${this.statistics.atomsRemoved} atomów`);
        console.log(`   💎 Skonsolidowano: ${this.statistics.atomsConsolidated} atomów`);
        console.log(`   🎯 Optymalizacja pamięci: ${this.statistics.memoryOptimization.toFixed(1)}%`);
        console.log(`   ⚡ Średni zanik: ${(this.statistics.averageDecayRate * 100).toFixed(2)}%\n`);

        // Optymalizacja grafu po zaniku
        if (this.statistics.atomsRemoved > 0) {
            relationalGraph.optimize();
        }
    }

    /**
     * Przetwarza zanik pojedynczego Sense Atomu
     */
    private processAtomDecay(atom: SenseAtom, graph: RelationalGraph): DecayResult {
        const currentTime = Date.now();
        const originalWeight = atom.senseWeight;
        
        // Oblicz podstawowy współczynnik zaniku
        let decayRate = atom.decayRate || NSF_CONSTANTS.BASE_DECAY_RATE;
        
        // === MODYFIKACJE WSPÓŁCZYNNIKA ZANIKU ===
        
        // 1. Modyfikacja na podstawie pierwiastków (NS-Weights)
        decayRate = this.applyElementBasedDecay(atom, decayRate);
        
        // 2. Adaptacyjny zanik oparty na użyciu
        if (this.config.enableAdaptiveDecay) {
            decayRate = this.applyAdaptiveDecay(atom, decayRate, currentTime);
        }
        
        // 3. Ochrona emocjonalna (Ciało Migdałowate)
        if (this.config.emotionalProtection) {
            decayRate = this.applyEmotionalProtection(atom, decayRate);
        }
        
        // 4. Bonus czasowy dla niedawno używanych
        if (this.config.temporalBonus) {
            decayRate = this.applyTemporalBonus(atom, decayRate, currentTime);
        }
        
        // 5. Ochrona dla atomów z licznymi połączeniami
        if (this.config.connectionPreservation) {
            decayRate = this.applyConnectionProtection(atom, decayRate);
        }
        
        // === APLIKACJA ZANIKU ===
        
        // Zmniejsz wagę Sense Atomu
        const decayAmount = atom.senseWeight * decayRate;
        atom.senseWeight = Math.max(atom.senseWeight - decayAmount, 0);
        
        // Określ dalszy los atomu
        const shouldRemove = atom.senseWeight < this.config.removalThreshold &&
                           !this.isProtectedFromRemoval(atom);
        
        const shouldConsolidate = atom.shouldConsolidate() && 
                                atom.senseWeight >= this.config.consolidationThreshold;
        
        // Logowanie szczegółowe dla ważnych zmian
        if (decayAmount > originalWeight * 0.1) { // Jeśli zanik > 10%
            console.log(`📉 [Decay] ${atom.id}: ${originalWeight.toFixed(3)} → ${atom.senseWeight.toFixed(3)} (-${(decayRate * 100).toFixed(1)}%)`);
        }
        
        return {
            decayApplied: decayRate,
            decayAmount,
            shouldRemove,
            shouldConsolidate,
            finalWeight: atom.senseWeight
        };
    }

    /**
     * Modyfikacja zaniku na podstawie pierwiastków (NS-Weights)
     */
    private applyElementBasedDecay(atom: SenseAtom, baseDecayRate: number): number {
        if (!atom.detectedPierwiastki || atom.detectedPierwiastki.length === 0) {
            return baseDecayRate;
        }

        // Znajdź najniższy decayModifier (najsilniejsza ochrona)
        let minDecayModifier = 1.0;
        atom.detectedPierwiastki.forEach(pierwiastek => {
            const neuroData = NS_WEIGHTS[pierwiastek];
            if (neuroData) {
                minDecayModifier = Math.min(minDecayModifier, neuroData.decayModifier);
            }
        });

        // Użyj najsilniejszej ochrony
        const modifiedDecayRate = baseDecayRate * minDecayModifier;
        
        console.log(`🧬 [Decay] ${atom.id}: Modyfikacja pierwiastkowa ${baseDecayRate.toFixed(3)} → ${modifiedDecayRate.toFixed(3)}`);
        
        return modifiedDecayRate;
    }

    /**
     * Adaptacyjny zanik oparty na częstości użycia
     */
    private applyAdaptiveDecay(atom: SenseAtom, baseDecayRate: number, currentTime: number): number {
        const timeSinceLastAccess = currentTime - atom.lastAccessTime;
        const daysSinceAccess = timeSinceLastAccess / (1000 * 60 * 60 * 24);
        
        // Im dłużej nie używany, tym szybszy zanik
        let adaptiveMultiplier = 1.0;
        
        if (daysSinceAccess > 30) {        // Miesiąc bez użycia
            adaptiveMultiplier = 2.0;
        } else if (daysSinceAccess > 7) {  // Tydzień bez użycia  
            adaptiveMultiplier = 1.5;
        } else if (daysSinceAccess > 1) {  // Dzień bez użycia
            adaptiveMultiplier = 1.2;
        } else if (daysSinceAccess < 0.1) { // Używany w ostatnich 2.4h
            adaptiveMultiplier = 0.5;      // Wolniejszy zanik
        }
        
        // Bonus za częste aktywacje
        if (atom.totalActivations > 10) {
            adaptiveMultiplier *= 0.8;
        } else if (atom.totalActivations > 5) {
            adaptiveMultiplier *= 0.9;
        }
        
        return baseDecayRate * adaptiveMultiplier;
    }

    /**
     * Ochrona emocjonalna - wzmocnienie z Ciała Migdałowatego
     */
    private applyEmotionalProtection(atom: SenseAtom, baseDecayRate: number): number {
        if (!atom.amygdalaActivationLevel) return baseDecayRate;
        
        const protectionMultipliers = {
            'MINIMAL': 1.0,
            'LOW': 0.9,
            'MEDIUM': 0.7,
            'HIGH': 0.5,
            'EXTREME': 0.2
        };
        
        const protection = protectionMultipliers[atom.amygdalaActivationLevel];
        console.log(`❤️ [Decay] ${atom.id}: Ochrona emocjonalna (${atom.amygdalaActivationLevel}) x${protection}`);
        
        return baseDecayRate * protection;
    }

    /**
     * Bonus czasowy dla niedawno używanych atomów
     */
    private applyTemporalBonus(atom: SenseAtom, baseDecayRate: number, currentTime: number): number {
        const timeSinceAccess = currentTime - atom.lastAccessTime;
        const hoursSinceAccess = timeSinceAccess / (1000 * 60 * 60);
        
        if (hoursSinceAccess < 1) {        // Ostatnia godzina
            return baseDecayRate * 0.3;    // 70% redukcja zaniku
        } else if (hoursSinceAccess < 6) { // Ostatnie 6 godzin
            return baseDecayRate * 0.6;    // 40% redukcja zaniku  
        } else if (hoursSinceAccess < 24) { // Ostatnie 24 godziny
            return baseDecayRate * 0.8;    // 20% redukcja zaniku
        }
        
        return baseDecayRate;
    }

    /**
     * Ochrona dla atomów z licznymi połączeniami
     */
    private applyConnectionProtection(atom: SenseAtom, baseDecayRate: number): number {
        const connectionCount = atom.connections.size;
        
        if (connectionCount >= 5) {
            return baseDecayRate * 0.6;    // 40% redukcja dla bardzo połączonych
        } else if (connectionCount >= 3) {
            return baseDecayRate * 0.8;    // 20% redukcja dla dobrze połączonych
        }
        
        return baseDecayRate;
    }

    /**
     * Sprawdza czy atom jest chroniony przed usunięciem
     */
    private isProtectedFromRemoval(atom: SenseAtom): boolean {
        // Ochrona przed usunięciem:
        // 1. Atomy o wysokim ładunku emocjonalnym
        if (atom.amygdalaActivationLevel && ['HIGH', 'EXTREME'].includes(atom.amygdalaActivationLevel)) {
            return true;
        }
        
        // 2. Atomy z kluczowymi pierwiastkami
        const criticalElements = ['ISKRA_ZYCIA', 'SEKUNDNIK', 'PIERWIASTEK_MILOSCI'];
        if (atom.detectedPierwiastki?.some(p => criticalElements.includes(p))) {
            return true;
        }
        
        // 3. Atomy z licznymi połączeniami (centra sieci)
        if (atom.connections.size >= 5) {
            return true;
        }
        
        // 4. Niedawno skonsolidowane
        if (atom.consolidationTime && (Date.now() - atom.consolidationTime) < 24 * 60 * 60 * 1000) {
            return true;
        }
        
        return false;
    }

    /**
     * Konsoliduje atom w pamięci długoterminowej
     */
    private consolidateAtom(atom: SenseAtom): void {
        atom.consolidationTime = Date.now();
        atom.decayRate *= 0.5; // Zmniejsz tempo zaniku o połowę
        atom.baseSenseWeight = atom.senseWeight; // Ustaw nową bazową wagę
        
        console.log(`💎 [Decay] Skonsolidowano atom ${atom.id} w pamięci długoterminowej`);
    }

    /**
     * Inicjalizuje adaptacyjne współczynniki dla różnych typów atomów
     */
    private initializeAdaptiveRates(): void {
        // Pierwiastki z różnymi charakterystykami zaniku
        const elementCategories = {
            'STABLE': ['ISKRA_ZYCIA', 'SEKUNDNIK', 'PIERWIASTEK_MILOSCI'],
            'EMOTIONAL': ['ALGORYTM_ZAKOCHANIA', 'NAMIENTNOSC_POZADANIA', 'POSWIECENIE'],
            'COGNITIVE': ['SZCZYPTA_INTELIGENCJI', 'ZROZUMIENIE', 'POMYSL'],
            'TEMPORAL': ['NADZIEJA_WYTRWALOSCI', 'CHECI_W_POJMOWANIU']
        };

        Object.entries(elementCategories).forEach(([category, elements]) => {
            elements.forEach(element => {
                this.adaptiveRates.set(element, this.getCategoryDecayRate(category));
            });
        });
    }

    /**
     * Zwraca współczynnik zaniku dla kategorii
     */
    private getCategoryDecayRate(category: string): number {
        const rates: Record<string, number> = {
            'STABLE': 0.01,     // Bardzo wolny zanik
            'EMOTIONAL': 0.03,  // Wolny zanik  
            'COGNITIVE': 0.05,  // Średni zanik
            'TEMPORAL': 0.07    // Szybszy zanik
        };
        
        return rates[category] || NSF_CONSTANTS.BASE_DECAY_RATE;
    }

    /**
     * Zwraca statystyki zaniku
     */
    public getStatistics(): DecayStatistics {
        return { ...this.statistics };
    }

    /**
     * Aktualizuje konfigurację
     */
    public updateConfig(newConfig: Partial<DecayConfig>): void {
        this.config = { ...this.config, ...newConfig };
        console.log('⚙️ [DecayScheduler] Zaktualizowano konfigurację:', newConfig);
    }

    /**
     * Reset statystyk
     */
    public resetStatistics(): void {
        this.statistics = {
            totalProcessed: 0,
            atomsDecayed: 0,
            atomsRemoved: 0,
            atomsConsolidated: 0,
            averageDecayRate: NSF_CONSTANTS.BASE_DECAY_RATE,
            lastDecayRun: 0,
            memoryOptimization: 0
        };
        console.log('🔄 [DecayScheduler] Statystyki zresetowane');
    }
}

// ================= INTERFEJSY I TYPY =================

interface DecayResult {
    decayApplied: number;
    decayAmount: number;
    shouldRemove: boolean;
    shouldConsolidate: boolean;
    finalWeight: number;
}

// Singleton instance
export const decayScheduler = new DecayScheduler();