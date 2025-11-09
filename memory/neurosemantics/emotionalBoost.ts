/**
 * Emotional Boost - Symulacja Ciała Migdałowatego
 * Implementuje wzmocnienie emocjonalne dla Sense Atomów na podstawie 
 * wykrytych pierwiastków i ich neuro-semantycznych wag
 * 
 * Funkcje Ciała Migdałowatego:
 * 1. Szybka ocena emocjonalna
 * 2. Wzmocnienie pamięci o wysokim ładunku emocjonalnym
 * 3. Modyfikacja współczynników zaniku
 * 4. Priorytetyzacja procesów przetwarzania
 */

import { NS_WEIGHTS, NSF_CONSTANTS, NeuroSemanticWeight } from './NS_Definitions';
import { SenseAtom } from '../structures/SenseAtom';

/**
 * Wzmacniacz emocjonalny - główna funkcja symulująca Ciało Migdałowate
 */
export function applyEmotionalBoost(senseAtom: SenseAtom, detectedPierwiastki: string[]): void {
    if (!detectedPierwiastki || detectedPierwiastki.length === 0) {
        console.log(`🧠 [AmygdalaBoost] Brak pierwiastków dla atomu ${senseAtom.id} - pominięto wzmocnienie`);
        return;
    }

    console.log(`❤️ [AmygdalaBoost] Przetwarzanie atomu ${senseAtom.id} z pierwiastkami: ${detectedPierwiastki.join(', ')}`);

    const boostResult = calculateEmotionalBoost(detectedPierwiastki);
    
    // Aplikacja wzmocnienia emocjonalnego
    const originalWeight = senseAtom.senseWeight;
    const originalDecayRate = senseAtom.decayRate;

    // Zastosuj wzmocnienie wagi
    senseAtom.senseWeight *= boostResult.weightMultiplier;
    
    // Zastosuj modyfikację zaniku (najniższy decayModifier wygrywa - stabilizacja)
    senseAtom.decayRate = Math.min(senseAtom.decayRate, boostResult.finalDecayRate);
    
    // Dodaj znacznik emocjonalnego przetwarzania
    senseAtom.emotionalProcessingTime = Date.now();
    senseAtom.emotionalBoostApplied = true;
    senseAtom.amygdalaActivationLevel = boostResult.activationLevel;

    console.log(`🚀 [AmygdalaBoost] Atom ${senseAtom.id} wzmocniony:`);
    console.log(`   💪 Waga: ${originalWeight.toFixed(3)} → ${senseAtom.senseWeight.toFixed(3)} (x${boostResult.weightMultiplier.toFixed(2)})`);
    console.log(`   ⏳ Zanik: ${originalDecayRate.toFixed(3)} → ${senseAtom.decayRate.toFixed(3)} (${boostResult.stabilization})`);
    console.log(`   🔥 Aktywacja Amygdala: ${boostResult.activationLevel}`);
    console.log(`   🧬 Pierwiastki: ${boostResult.processedElements.join(', ')}`);
}

/**
 * Oblicza wzmocnienie emocjonalne na podstawie pierwiastków
 */
function calculateEmotionalBoost(pierwiastki: string[]): EmotionalBoostResult {
    let totalWeight = 0;
    let minDecayModifier = 1.0;
    let maxWeight = 0;
    let activationLevel: AmygdalaActivationLevel = 'LOW';
    const processedElements: string[] = [];

    // Przeanalizuj każdy pierwiastek
    pierwiastki.forEach(pierwiastek => {
        const neuroData = NS_WEIGHTS[pierwiastek];
        
        if (neuroData) {
            processedElements.push(pierwiastek);
            
            // Akumuluj wagi
            totalWeight += neuroData.weight;
            maxWeight = Math.max(maxWeight, neuroData.weight);
            
            // Znajdź najmniejszy decayModifier (najstabilniejszy)
            minDecayModifier = Math.min(minDecayModifier, neuroData.decayModifier);
            
            console.log(`🔍 [AmygdalaBoost] ${pierwiastek}: waga=${neuroData.weight}, zanik=${neuroData.decayModifier}, obszar=${neuroData.area}`);
        } else {
            console.warn(`⚠️ [AmygdalaBoost] Nieznany pierwiastek: ${pierwiastek}`);
        }
    });

    // Oblicz średnią wagę i mnożnik wzmocnienia
    const avgWeight = processedElements.length > 0 ? totalWeight / processedElements.length : 0;
    let weightMultiplier = 1.0;

    // Określ poziom aktywacji Ciała Migdałowatego
    if (maxWeight >= 0.9) {
        activationLevel = 'EXTREME';
        weightMultiplier = 1.0 + (avgWeight * 1.5); // Do +150% boost
    } else if (maxWeight >= 0.8) {
        activationLevel = 'HIGH';
        weightMultiplier = 1.0 + (avgWeight * 1.2); // Do +120% boost
    } else if (maxWeight >= 0.6) {
        activationLevel = 'MEDIUM';
        weightMultiplier = 1.0 + (avgWeight * 0.8); // Do +80% boost
    } else if (maxWeight >= 0.4) {
        activationLevel = 'LOW';
        weightMultiplier = 1.0 + (avgWeight * 0.5); // Do +50% boost
    } else {
        activationLevel = 'MINIMAL';
        weightMultiplier = 1.0 + (avgWeight * 0.2); // Do +20% boost
    }

    // Sprawdź czy są pierwiastki z wysokim ładunkiem emocjonalnym
    const highEmotionalElements = processedElements.filter(p => {
        const data = NS_WEIGHTS[p];
        return data && (
            p.includes('MILOSCI') || 
            p.includes('ZAKOCHANIA') || 
            p.includes('POZADANIE') ||
            p.includes('ISKRA_ZYCIA') ||
            p.includes('POSWIECENIE')
        );
    });

    // Dodatkowe wzmocnienie dla pierwiastków o wysokim ładunku emocjonalnym
    if (highEmotionalElements.length > 0) {
        const emotionalBonus = highEmotionalElements.length * 0.1;
        weightMultiplier += emotionalBonus;
        console.log(`💖 [AmygdalaBoost] Bonus emocjonalny +${(emotionalBonus * 100).toFixed(1)}% za pierwiastki: ${highEmotionalElements.join(', ')}`);
    }

    // Stabilizacja pamięci (im niższy decayModifier, tym lepsza konsolidacja)
    let stabilization = 'NEUTRAL';
    if (minDecayModifier <= 0.1) {
        stabilization = 'MAXIMUM';
    } else if (minDecayModifier <= 0.2) {
        stabilization = 'HIGH';
    } else if (minDecayModifier <= 0.4) {
        stabilization = 'MEDIUM';
    } else if (minDecayModifier <= 0.6) {
        stabilization = 'LOW';
    }

    return {
        weightMultiplier: Math.min(weightMultiplier, 3.0), // Maksymalnie x3 boost
        finalDecayRate: Math.max(minDecayModifier, NSF_CONSTANTS.MIN_SENSE_WEIGHT / 10), // Minimum decay
        activationLevel,
        stabilization,
        processedElements,
        emotionalIntensity: calculateEmotionalIntensity(processedElements),
        amygdalaResponse: generateAmygdalaResponse(activationLevel, processedElements)
    };
}

/**
 * Oblicza intensywność emocjonalną na podstawie kombinacji pierwiastków
 */
function calculateEmotionalIntensity(elements: string[]): number {
    if (elements.length === 0) return 0;

    let intensity = 0;
    
    // Sprawdź obecność różnych kategorii emocjonalnych
    const categories = {
        love: elements.filter(e => e.includes('MILOSCI') || e.includes('ZAKOCHANIA')).length,
        desire: elements.filter(e => e.includes('POZADANIE') || e.includes('PRAGNIENIE')).length,
        transcendence: elements.filter(e => e.includes('TRANSCENDENCJA') || e.includes('JEDNOSC')).length,
        sacrifice: elements.filter(e => e.includes('POSWIECENIE')).length,
        hope: elements.filter(e => e.includes('NADZIEJA') || e.includes('WIARA')).length,
        despair: elements.filter(e => e.includes('BRAK') || e.includes('BEZSILNOSC')).length
    };

    // Oblicz intensywność dla każdej kategorii
    Object.values(categories).forEach(count => {
        if (count > 0) {
            intensity += count * 0.2; // Każdy element w kategorii dodaje 0.2
        }
    });

    // Bonus za różnorodność emocjonalną
    const activeCategories = Object.values(categories).filter(count => count > 0).length;
    if (activeCategories > 2) {
        intensity += 0.3; // Bonus za kompleksowość emocjonalną
    }

    return Math.min(intensity, 1.0); // Maksymalnie 1.0
}

/**
 * Generuje odpowiedź Ciała Migdałowatego na podstawie poziomu aktywacji
 */
function generateAmygdalaResponse(level: AmygdalaActivationLevel, elements: string[]): AmygdalaResponse {
    const responses: Record<AmygdalaActivationLevel, AmygdalaResponse> = {
        'MINIMAL': {
            priority: 'LOW',
            processingSpeed: 'SLOW',
            memoryConsolidation: 'WEAK',
            attentionAllocation: 'BACKGROUND'
        },
        'LOW': {
            priority: 'NORMAL',
            processingSpeed: 'NORMAL',
            memoryConsolidation: 'MODERATE',
            attentionAllocation: 'NORMAL'
        },
        'MEDIUM': {
            priority: 'ELEVATED',
            processingSpeed: 'FAST',
            memoryConsolidation: 'STRONG',
            attentionAllocation: 'FOCUSED'
        },
        'HIGH': {
            priority: 'HIGH',
            processingSpeed: 'VERY_FAST',
            memoryConsolidation: 'VERY_STRONG',
            attentionAllocation: 'INTENSE'
        },
        'EXTREME': {
            priority: 'CRITICAL',
            processingSpeed: 'IMMEDIATE',
            memoryConsolidation: 'MAXIMUM',
            attentionAllocation: 'TOTAL'
        }
    };

    return responses[level];
}

/**
 * Sprawdza czy pierwiastek ma wysoki ładunek emocjonalny
 */
export function isHighEmotionalCharge(pierwiastek: string): boolean {
    const neuroData = NS_WEIGHTS[pierwiastek];
    if (!neuroData) return false;

    // Wysoki ładunek emocjonalny = wysoka waga + niski zanik + obszary emocjonalne
    const isHighWeight = neuroData.weight >= 0.8;
    const isStable = neuroData.decayModifier <= 0.2;
    const isEmotionalArea = neuroData.area.includes('Amygdala') || 
                           neuroData.area.includes('VTA') || 
                           neuroData.area.includes('NAcc') ||
                           neuroData.area.includes('Insula');

    return isHighWeight && (isStable || isEmotionalArea);
}

/**
 * Symuluje stres oksydacyjny w mózgu - redukcja wzmocnienia przy przeciążeniu
 */
export function applyOxidativeStress(senseAtom: SenseAtom, totalActivatedAtoms: number): void {
    if (totalActivatedAtoms > NSF_CONSTANTS.MAX_ACTIVE_ATOMS * 0.8) {
        const stressFactor = Math.min(totalActivatedAtoms / NSF_CONSTANTS.MAX_ACTIVE_ATOMS, 2.0);
        const stressReduction = 1.0 / stressFactor;
        
        senseAtom.senseWeight *= stressReduction;
        senseAtom.oxidativeStress = stressFactor;
        
        console.warn(`⚡ [AmygdalaBoost] Stres oksydacyjny dla atomu ${senseAtom.id}: redukcja x${stressReduction.toFixed(3)}`);
    }
}

// ================= INTERFEJSY I TYPY =================

interface EmotionalBoostResult {
    weightMultiplier: number;
    finalDecayRate: number;
    activationLevel: AmygdalaActivationLevel;
    stabilization: string;
    processedElements: string[];
    emotionalIntensity: number;
    amygdalaResponse: AmygdalaResponse;
}

type AmygdalaActivationLevel = 'MINIMAL' | 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';

interface AmygdalaResponse {
    priority: 'LOW' | 'NORMAL' | 'ELEVATED' | 'HIGH' | 'CRITICAL';
    processingSpeed: 'SLOW' | 'NORMAL' | 'FAST' | 'VERY_FAST' | 'IMMEDIATE';
    memoryConsolidation: 'WEAK' | 'MODERATE' | 'STRONG' | 'VERY_STRONG' | 'MAXIMUM';
    attentionAllocation: 'BACKGROUND' | 'NORMAL' | 'FOCUSED' | 'INTENSE' | 'TOTAL';
}

// ================= FUNKCJE POMOCNICZE =================

/**
 * Diagnoza stanu Ciała Migdałowatego na podstawie aktywnych Atomów
 */
export function diagnoseAmygdalaState(activeAtoms: SenseAtom[]): string {
    const activationLevels = activeAtoms
        .filter(atom => atom.amygdalaActivationLevel)
        .map(atom => atom.amygdalaActivationLevel);

    const extremeCount = activationLevels.filter(level => level === 'EXTREME').length;
    const highCount = activationLevels.filter(level => level === 'HIGH').length;
    const totalActive = activationLevels.length;

    if (extremeCount > 0) {
        return `🔥 STAN KRYTYCZNY: ${extremeCount} atomów w stanie EXTREME, ${totalActive} aktywnych`;
    } else if (highCount > 2) {
        return `⚡ WYSOKIE WZBUDZENIE: ${highCount} atomów HIGH, ${totalActive} aktywnych`;
    } else if (totalActive > 0) {
        return `💚 NORMALNE PRZETWARZANIE: ${totalActive} aktywnych atomów`;
    } else {
        return `😴 STAN SPOCZYNKU: Brak aktywnych atomów emocjonalnych`;
    }
}