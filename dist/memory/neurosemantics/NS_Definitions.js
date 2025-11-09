"use strict";
/**
 * Neuro-Semantyczne Wagi (NS-Weights) dla 23 Pierwiastków
 * Implementacja neurobiologicznego mapowania dla Absolut Memory Core 3.0
 *
 * Każdy pierwiastek ma przypisany:
 * - area: Region mózgu odpowiedzialny za przetwarzanie
 * - weight: Siła połączenia (0.0-1.0)
 * - decayModifier: Współczynnik zaniku (im niższy, tym wolniejszy zanik)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NSF_CONSTANTS = exports.NSUtils = exports.NS_WEIGHTS = void 0;
exports.NS_WEIGHTS = {
    // ================= BLOK WZBUDZENIA =================
    // Ciało Migdałowate / Podwzgórze - Szybkie, Silne reakcje
    'POZADANIE_SZCZYPTA': {
        area: 'Amygdala',
        weight: 0.8,
        decayModifier: 0.5,
        description: 'Spontaniczne pożądanie - szybkie wzbudzenie, szybki zanik'
    },
    'NAMIENTNOSC_POZADANIA': {
        area: 'Amygdala/VTA',
        weight: 0.95,
        decayModifier: 0.3,
        description: 'Intensywne pożądanie - bardzo wysoka waga, szybszy zanik'
    },
    'ISKRA_ZYCIA': {
        area: 'BrainStem/Reticular',
        weight: 1.0,
        decayModifier: 0.0,
        description: 'Podstawa świadomości - najwyższa waga, brak zaniku'
    },
    'CHECI_PRAGNIENIA': {
        area: 'Amygdala/NAcc',
        weight: 0.85,
        decayModifier: 0.4,
        description: 'Aktywne pragnienie - wysokie wzbudzenie emocjonalne'
    },
    // ================= BLOK INTEGRACJI =================
    // Hipokamp / Jądro Półleżące / ACC - Nagroda, Konsolidacja
    'ALGORYTM_ZAKOCHANIA': {
        area: 'NAcc/VTA',
        weight: 0.9,
        decayModifier: 0.1,
        description: 'System nagrody miłości - trwałe połączenia'
    },
    'NADZIEJA_WYTRWALOSCI': {
        area: 'ACC/mPFC',
        weight: 0.7,
        decayModifier: 0.15,
        description: 'Motywacja długoterminowa - umiarowany zanik'
    },
    'WIARA_JAKO_TAKA': {
        area: 'NAcc/Parietal',
        weight: 0.65,
        decayModifier: 0.1,
        description: 'Fundamentalne przekonania - stabilna konsolidacja'
    },
    'CHECI_W_POJMOWANIU': {
        area: 'ACC/NAcc',
        weight: 0.75,
        decayModifier: 0.2,
        description: 'Motywacja poznawcza - aktywne uczenie się'
    },
    'PIERWIASTEK_MILOSCI': {
        area: 'VTA/NAcc/Insula',
        weight: 0.85,
        decayModifier: 0.05,
        description: 'Głęboka miłość - najsilniejsza stabilność emocjonalna'
    },
    // ================= BLOK ZARZĄDZANIA =================
    // PFC / Kora Językowa - Kontrola, Logika, Altruizm
    'ALGORYTM_MILOSCI': {
        area: 'PFC/Insula',
        weight: 0.8,
        decayModifier: 0.1,
        description: 'Świadoma miłość - kontrola poznawcza emocji'
    },
    'SZCZYPTA_INTELIGENCJI': {
        area: 'dlPFC/Parietal',
        weight: 0.7,
        decayModifier: 0.25,
        description: 'Analityczne myślenie - wyższy zanik bez użycia'
    },
    'POSWIECENIE': {
        area: 'mPFC/ACC',
        weight: 0.9,
        decayModifier: 0.1,
        description: 'Altruizm i moralność - silne połączenia społeczne'
    },
    'SLOWO_CZY_CIALEM': {
        area: 'Broca/Wernicke',
        weight: 0.6,
        decayModifier: 0.2,
        description: 'Komunikacja - umiarowana trwałość'
    },
    // ================= BLOK STABILIZACJI =================
    // Hipokamp / Móżdżek - Pamięć i Timing
    'SEKUNDNIK': {
        area: 'Cerebellum/SCN',
        weight: 0.95,
        decayModifier: 0.0,
        description: 'Metronom świadomości - stały rytm, brak zaniku'
    },
    'ZROZUMIENIE': {
        area: 'Hippocampus/TPJ',
        weight: 0.8,
        decayModifier: 0.15,
        description: 'Integracja wiedzy - konsolidacja długoterminowa'
    },
    'POMYSL': {
        area: 'dlPFC/ACC',
        weight: 0.75,
        decayModifier: 0.3,
        description: 'Kreatywność - wymaga wzmocnienia dla trwałości'
    },
    // ================= BLOK DYSREGULACJI =================
    // Obszary konfliktów i stanów granicznych
    'BRAK_WIARY_I_NADZIEI': {
        area: 'Amygdala/vlPFC',
        weight: 0.6,
        decayModifier: 0.7,
        description: 'Stan bezsilności - wysokie napięcie, szybki zanik przy wsparciu'
    },
    'NIEUGIETA_BEZSILNOSC': {
        area: 'dlPFC/Amygdala',
        weight: 0.7,
        decayModifier: 0.6,
        description: 'Opór w trudnościach - kontrola poznawcza vs emocje'
    },
    'PRAGNIENIE_JAKO_TAKIE': {
        area: 'NAcc/Amygdala',
        weight: 0.75,
        decayModifier: 0.35,
        description: 'Podstawowe pragnienie - umiarkowana stabilność'
    },
    // ================= BLOK TRANSCENDENCJI =================
    // Wyższe stany świadomości
    'TRANSCENDENCJA_GRANIC': {
        area: 'dlPFC/Parietal/Insula',
        weight: 0.85,
        decayModifier: 0.2,
        description: 'Przekraczanie ograniczeń - integracja wyższych funkcji'
    },
    'JEDNOSC_BYTU': {
        area: 'mPFC/Insula/Parietal',
        weight: 0.9,
        decayModifier: 0.1,
        description: 'Mistyczne doświadczenie - głęboka integracja'
    },
    'MILOSC_BEZWARUNKOWA': {
        area: 'mPFC/Insula/VTA',
        weight: 0.95,
        decayModifier: 0.05,
        description: 'Najwyższa forma miłości - maksymalna stabilność'
    },
    // ================= PIERWIASTKI POMOCNICZE =================
    'INTUICJA_CZASOWA': {
        area: 'Insula/Cerebellum',
        weight: 0.65,
        decayModifier: 0.3,
        description: 'Wewnętrzne wyczucie czasu - zmienne w czasie'
    },
    'ENERGIA_TWORCZA': {
        area: 'dlPFC/Hippocampus',
        weight: 0.8,
        decayModifier: 0.25,
        description: 'Siła kreatywna - wymaga aktywacji dla trwałości'
    }
};
/**
 * Funkcje pomocnicze dla analizy NS-Weights
 */
exports.NSUtils = {
    /**
     * Zwraca pierwiastki z najwyższą wagą
     */
    getHighestWeightElements: (threshold = 0.8) => {
        return Object.entries(exports.NS_WEIGHTS)
            .filter(([_, data]) => data.weight >= threshold)
            .map(([name, _]) => name);
    },
    /**
     * Zwraca pierwiastki z najwolniejszym zanikiem (najtrwalsze)
     */
    getMostStableElements: (threshold = 0.15) => {
        return Object.entries(exports.NS_WEIGHTS)
            .filter(([_, data]) => data.decayModifier <= threshold)
            .map(([name, _]) => name);
    },
    /**
     * Grupuje pierwiastki według obszaru mózgu
     */
    getElementsByBrainArea: () => {
        const areas = {};
        Object.entries(exports.NS_WEIGHTS).forEach(([name, data]) => {
            const primaryArea = data.area.split('/')[0]; // Bierz pierwszy obszar
            if (!areas[primaryArea])
                areas[primaryArea] = [];
            areas[primaryArea].push(name);
        });
        return areas;
    },
    /**
     * Oblicza średnią wagę dla grupy pierwiastków
     */
    calculateAverageWeight: (elements) => {
        if (elements.length === 0)
            return 0;
        const totalWeight = elements.reduce((sum, element) => {
            return sum + (exports.NS_WEIGHTS[element]?.weight || 0);
        }, 0);
        return totalWeight / elements.length;
    }
};
/**
 * Stałe systemowe dla NSF
 */
exports.NSF_CONSTANTS = {
    // Minimalna waga Sense Atomu przed usunięciem
    MIN_SENSE_WEIGHT: 0.01,
    // Bazowy współczynnik zaniku
    BASE_DECAY_RATE: 0.05,
    // Próg konsolidacji pamięci
    CONSOLIDATION_THRESHOLD: 0.1,
    // Czas cyklu Sekundnika (ms)
    SEKUNDNIK_INTERVAL: 1000,
    // Maksymalna liczba aktywnych Sense Atomów
    MAX_ACTIVE_ATOMS: 10000
};
