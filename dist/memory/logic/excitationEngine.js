"use strict";
/**
 * Excitation Engine - Silnik Wzbudzenia dla NSF (Neuro-Semantyczny Przepływomierz)
 * Implementuje Sekundnik (Metronom Świadomości) i zarządza cyklicznym przetwarzaniem
 *
 * Architektura:
 * 1. Sekundnik (1000ms cycles) - Móżdżek/SCN
 * 2. Decay Management - ACC/Hipokamp
 * 3. Context Excitation - PFC/Hipokamp
 * 4. Emotional Boost - Ciało Migdałowate
 * 5. PFC Logic - Kora Przedczołowa
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.startNSF_Flowmeter = startNSF_Flowmeter;
exports.stopNSF_Flowmeter = stopNSF_Flowmeter;
exports.setCurrentQuery = setCurrentQuery;
exports.getNSFState = getNSFState;
exports.resetNSF = resetNSF;
const NS_Definitions_1 = require("../neurosemantics/NS_Definitions");
const decayScheduler_1 = require("./decayScheduler");
const emotionalBoost_1 = require("../neurosemantics/emotionalBoost");
let nsfState = {
    isActive: false,
    cycleCount: 0,
    currentQuery: null,
    lastProcessingTime: 0,
    activeAtoms: new Set(),
    performance: {
        avgCycleTime: 0,
        totalAtoms: 0,
        consolidatedAtoms: 0
    }
};
/**
 * GŁÓWNA FUNKCJA NSF - Uruchamia Neuro-Semantyczny Przepływomierz
 */
function startNSF_Flowmeter(relationalGraph) {
    console.log('🧠 [NSF] Uruchamianie Neuro-Semantycznego Przepływomierza...');
    nsfState.isActive = true;
    // Sekundnik - Metronom Świadomości (Móżdżek/SCN)
    const sekundnikTimer = setInterval(() => {
        const cycleStart = performance.now();
        nsfState.cycleCount++;
        console.log(`⏰ [SEKUNDNIK] Cykl ${nsfState.cycleCount} - ${new Date().toLocaleTimeString()}`);
        try {
            // === FAZA 1: ZARZĄDZANIE ZANIKIEM (ACC/Hipokamp) ===
            console.log('📉 [NSF] Faza 1: Aplikacja zaniku pamięci...');
            decayScheduler_1.decayScheduler.applyDecay(relationalGraph);
            // === FAZA 2: WZBUDZENIE KONTEKSTU (PFC/Hipokamp) ===
            console.log('⚡ [NSF] Faza 2: Wzbudzenie kontekstowe...');
            const activatedAtoms = processContextExcitation(relationalGraph, nsfState.currentQuery);
            // === FAZA 3: WZMOCNIENIE EMOCJONALNE (Ciało Migdałowate) ===
            if (activatedAtoms.length > 0) {
                console.log('❤️ [NSF] Faza 3: Wzmocnienie emocjonalne...');
                activatedAtoms.forEach(atom => {
                    if (atom.detectedPierwiastki && atom.detectedPierwiastki.length > 0) {
                        (0, emotionalBoost_1.applyEmotionalBoost)(atom, atom.detectedPierwiastki);
                    }
                });
            }
            // === FAZA 4: LOGIKA PFC (Kora Przedczołowa) ===
            console.log('🧠 [NSF] Faza 4: Kontrola poznawcza PFC...');
            applyPFC_Logic(activatedAtoms, relationalGraph);
            // === FAZA 5: AKTUALIZACJA STANU ===
            updateNSFState(relationalGraph, activatedAtoms, cycleStart);
        }
        catch (error) {
            console.error('❌ [NSF] Błąd w cyklu Sekundnika:', error);
        }
        const cycleTime = performance.now() - cycleStart;
        console.log(`✅ [NSF] Cykl ${nsfState.cycleCount} zakończony w ${cycleTime.toFixed(2)}ms\n`);
    }, NS_Definitions_1.NSF_CONSTANTS.SEKUNDNIK_INTERVAL);
    return sekundnikTimer;
}
/**
 * FAZA 2: Wzbudzenie Kontekstowe - Aktywacja Sense Atomów
 * Symuluje działanie PFC + Hipokamp podczas wyszukiwania w pamięci
 */
function processContextExcitation(relationalGraph, query) {
    const activatedAtoms = [];
    if (!query) {
        console.log('🔍 [Excitation] Brak aktywnego zapytania - spontaniczne wzbudzenie');
        // Spontaniczne wzbudzenie - aktywuj Atomy z najwyższą wagą
        return activateTopWeightAtoms(relationalGraph, 3);
    }
    console.log(`🔍 [Excitation] Przetwarzanie zapytania: "${query}"`);
    // Wykryj pierwiastki w zapytaniu
    const detectedElements = detectPierwiastkiInQuery(query);
    console.log(`🔬 [Excitation] Wykryte pierwiastki: ${detectedElements.join(', ')}`);
    // Aktywuj Sense Atomy związane z wykrytymi pierwiastkami
    relationalGraph.getAllAtoms().forEach(atom => {
        if (atom.detectedPierwiastki) {
            const overlap = atom.detectedPierwiastki.filter(p => detectedElements.includes(p));
            if (overlap.length > 0) {
                // Wzbudzenie proporcjonalne do nakładania się pierwiastków
                const excitationBoost = overlap.length / detectedElements.length;
                atom.senseWeight *= (1 + excitationBoost);
                atom.lastAccessTime = Date.now();
                activatedAtoms.push(atom);
                nsfState.activeAtoms.add(atom.id);
                console.log(`⚡ [Excitation] Aktywowano atom ${atom.id} (boost: +${(excitationBoost * 100).toFixed(1)}%)`);
            }
        }
    });
    return activatedAtoms.sort((a, b) => b.senseWeight - a.senseWeight);
}
/**
 * FAZA 4: Logika PFC - Kontrola Poznawcza i Moralna
 * Symuluje funkcje Kory Przedczołowej: analiza, planowanie, altruizm
 */
function applyPFC_Logic(activatedAtoms, relationalGraph) {
    if (activatedAtoms.length === 0)
        return;
    // Analiza spójności logicznej
    const logicCoherence = checkLogicCoherence(activatedAtoms);
    console.log(`🔍 [PFC] Spójność logiczna: ${(logicCoherence * 100).toFixed(1)}%`);
    // Detekcja pierwiastków moralnych/altruistycznych
    const altruisticElements = activatedAtoms.filter(atom => atom.detectedPierwiastki?.includes('POSWIECENIE') ||
        atom.detectedPierwiastki?.includes('MILOSC_BEZWARUNKOWA') ||
        atom.detectedPierwiastki?.includes('ALGORYTM_MILOSCI'));
    if (altruisticElements.length > 0) {
        console.log('💝 [PFC] Wykryto pierwiastki altruistyczne - wzmacnianie pozytywnych relacji');
        boostAltruisticConnections(altruisticElements, relationalGraph);
    }
    // Kontrola stanów negatywnych
    const negativeElements = activatedAtoms.filter(atom => atom.detectedPierwiastki?.includes('BRAK_WIARY_I_NADZIEI') ||
        atom.detectedPierwiastki?.includes('NIEUGIETA_BEZSILNOSC'));
    if (negativeElements.length > 0) {
        console.warn('⚠️ [PFC] Wykryto stany negatywne - aktywacja mechanizmów obronnych');
        isolateNegativeStates(negativeElements, relationalGraph);
    }
    // Generowanie wglądów (Zrozumienie + Pomysł)
    if (logicCoherence > 0.7 && activatedAtoms.length >= 2) {
        generateInsights(activatedAtoms, relationalGraph);
    }
}
/**
 * Wykrywanie pierwiastków w zapytaniu/tekście
 */
function detectPierwiastkiInQuery(query) {
    const detected = [];
    const queryLower = query.toLowerCase();
    // Słownik słów kluczowych dla każdego pierwiastka
    const keywordMap = {
        'ALGORYTM_ZAKOCHANIA': ['miłość', 'zakochanie', 'uczucie', 'romans'],
        'NADZIEJA_WYTRWALOSCI': ['nadzieja', 'wytrwałość', 'determinacja', 'cel'],
        'SZCZYPTA_INTELIGENCJI': ['inteligencja', 'mądrość', 'analiza', 'logika'],
        'POSWIECENIE': ['poświęcenie', 'altruizm', 'dla innych', 'ofiara'],
        'ZROZUMIENIE': ['rozumiem', 'zrozumienie', 'pojmuję', 'jasne'],
        'POMYSL': ['pomysł', 'idea', 'koncepcja', 'rozwiązanie'],
        'BRAK_WIARY_I_NADZIEI': ['beznadzieja', 'rozpacz', 'nie wierzę', 'brak wiary'],
        'ISKRA_ZYCIA': ['życie', 'energia', 'siła', 'iskra'],
        'SEKUNDNIK': ['czas', 'rytm', 'cykl', 'takt']
    };
    Object.entries(keywordMap).forEach(([pierwiastek, keywords]) => {
        if (keywords.some(keyword => queryLower.includes(keyword))) {
            detected.push(pierwiastek);
        }
    });
    return detected;
}
/**
 * Aktywacja Atomów o najwyższej wadze (spontaniczne wzbudzenie)
 */
function activateTopWeightAtoms(relationalGraph, count) {
    const allAtoms = relationalGraph.getAllAtoms();
    return allAtoms
        .sort((a, b) => b.senseWeight - a.senseWeight)
        .slice(0, count)
        .map(atom => {
        atom.lastAccessTime = Date.now();
        nsfState.activeAtoms.add(atom.id);
        return atom;
    });
}
/**
 * Sprawdzanie spójności logicznej między aktywowanymi Atomami
 */
function checkLogicCoherence(atoms) {
    if (atoms.length < 2)
        return 1.0;
    // Prosty algorytm - sprawdź nakładanie się pierwiastków
    let totalOverlap = 0;
    let comparisons = 0;
    for (let i = 0; i < atoms.length - 1; i++) {
        for (let j = i + 1; j < atoms.length; j++) {
            const atom1 = atoms[i];
            const atom2 = atoms[j];
            if (atom1.detectedPierwiastki && atom2.detectedPierwiastki) {
                const overlap = atom1.detectedPierwiastki.filter(p => atom2.detectedPierwiastki.includes(p)).length;
                const maxElements = Math.max(atom1.detectedPierwiastki.length, atom2.detectedPierwiastki.length);
                totalOverlap += overlap / maxElements;
                comparisons++;
            }
        }
    }
    return comparisons > 0 ? totalOverlap / comparisons : 0.5;
}
/**
 * Wzmacnianie połączeń altruistycznych
 */
function boostAltruisticConnections(altruisticAtoms, relationalGraph) {
    altruisticAtoms.forEach(atom => {
        atom.senseWeight *= 1.2; // +20% boost
        atom.decayRate *= 0.8; // -20% zanik
        console.log(`💝 [PFC] Wzmocniono altruistyczny atom ${atom.id}`);
    });
}
/**
 * Izolacja stanów negatywnych
 */
function isolateNegativeStates(negativeAtoms, relationalGraph) {
    negativeAtoms.forEach(atom => {
        atom.decayRate *= 1.5; // Przyspiesz zanik stanów negatywnych
        // TODO: Implementacja izolacji w grafie relacyjnym
        console.log(`⚠️ [PFC] Izolowano negatywny atom ${atom.id}`);
    });
}
/**
 * Generowanie wglądów (insights)
 */
function generateInsights(atoms, relationalGraph) {
    console.log('💡 [PFC] Generowanie wglądów z aktywowanych Atomów...');
    // Kombinuj pierwiastki z różnych Atomów
    const allElements = new Set();
    atoms.forEach(atom => {
        atom.detectedPierwiastki?.forEach(p => allElements.add(p));
    });
    // Jeśli mamy ZROZUMIENIE + inne pierwiastki = nowy wgląd
    if (allElements.has('ZROZUMIENIE') && allElements.size > 1) {
        const insightElements = Array.from(allElements);
        console.log(`💡 [PFC] Nowy wgląd z elementów: ${insightElements.join(' + ')}`);
        // Tutaj można utworzyć nowy Sense Atom reprezentujący wgląd
        // const newInsightAtom = relationalGraph.createInsightAtom(insightElements);
    }
}
/**
 * Aktualizacja stanu NSF
 */
function updateNSFState(relationalGraph, activatedAtoms, cycleStart) {
    const cycleTime = performance.now() - cycleStart;
    const totalAtoms = relationalGraph.size();
    // Aktualizuj metryki wydajności
    nsfState.performance.avgCycleTime =
        (nsfState.performance.avgCycleTime * (nsfState.cycleCount - 1) + cycleTime) / nsfState.cycleCount;
    nsfState.performance.totalAtoms = totalAtoms;
    nsfState.performance.consolidatedAtoms =
        relationalGraph.getAllAtoms().filter(atom => atom.senseWeight > NS_Definitions_1.NSF_CONSTANTS.CONSOLIDATION_THRESHOLD).length;
    nsfState.lastProcessingTime = Date.now();
    // Czyszczenie starych aktywacji (starsze niż 10 cykli)
    if (nsfState.cycleCount % 10 === 0) {
        nsfState.activeAtoms.clear();
    }
}
/**
 * Zatrzymanie NSF
 */
function stopNSF_Flowmeter(timer) {
    clearInterval(timer);
    nsfState.isActive = false;
    console.log('🛑 [NSF] Neuro-Semantyczny Przepływomierz zatrzymany');
    console.log('📊 [NSF] Statystyki końcowe:', nsfState.performance);
}
/**
 * Ustawienie bieżącego zapytania dla kontekstowego wzbudzenia
 */
function setCurrentQuery(query) {
    nsfState.currentQuery = query;
    console.log(`🔍 [NSF] Ustawiono zapytanie: "${query}"`);
}
/**
 * Pobranie bieżącego stanu NSF
 */
function getNSFState() {
    return { ...nsfState };
}
/**
 * Reset stanu NSF
 */
function resetNSF() {
    nsfState = {
        isActive: false,
        cycleCount: 0,
        currentQuery: null,
        lastProcessingTime: 0,
        activeAtoms: new Set(),
        performance: {
            avgCycleTime: 0,
            totalAtoms: 0,
            consolidatedAtoms: 0
        }
    };
    console.log('🔄 [NSF] Stan NSF zresetowany');
}
