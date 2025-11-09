"use strict";
/**
 * Struktury Danych dla NSF (Neuro-Semantyczny Przepływomierz)
 *
 * SenseAtom - Podstawowa jednostka informacji w Absolut Memory Core 3.0
 * RelationalGraph - Sieć relacyjna łącząca Sense Atomy
 *
 * Inspirowane neurobiologią: każdy SenseAtom reprezentuje grupę neuronów
 * kodujących określone znaczenie, a RelationalGraph to sieć synaptyczna
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationalGraph = exports.SenseAtom = void 0;
/**
 * SenseAtom - Podstawowa jednostka pamięci semantycznej
 * Reprezentuje atomarną jednostkę znaczenia z wagą, zanikiem i kontekstem emocjonalnym
 */
class SenseAtom {
    constructor(id, label, initialWeight = 1.0, pierwiastki) {
        this.id = id;
        this.label = label;
        this.createdAt = Date.now();
        this.senseWeight = initialWeight;
        this.baseSenseWeight = initialWeight;
        this.decayRate = 0.05; // 5% decay per cycle by default
        this.detectedPierwiastki = pierwiastki || [];
        this.neuralPathways = [];
        this.lastAccessTime = Date.now();
        this.totalActivations = 0;
        this.connections = new Map();
        this.clusters = [];
        this.tags = [];
    }
    /**
     * Aktywuje Sense Atom - aktualizuje statystyki dostępu
     */
    activate() {
        this.lastAccessTime = Date.now();
        this.totalActivations++;
        console.log(`⚡ SenseAtom ${this.id} aktywowany (${this.totalActivations}x)`);
    }
    /**
     * Dodaje połączenie z innym atomem
     */
    addConnection(targetId, strength, type = 'SEMANTIC') {
        this.connections.set(targetId, { strength, type, createdAt: Date.now() });
    }
    /**
     * Usuwa połączenie
     */
    removeConnection(targetId) {
        return this.connections.delete(targetId);
    }
    /**
     * Zwraca wszystkie połączenia powyżej progu siły
     */
    getStrongConnections(threshold = 0.5) {
        const strong = [];
        this.connections.forEach((conn, id) => {
            if (conn.strength >= threshold) {
                strong.push({ id, strength: conn.strength, type: conn.type });
            }
        });
        return strong.sort((a, b) => b.strength - a.strength);
    }
    /**
     * Oblicza aktualną siłę atomu (waga + połączenia + aktywacje)
     */
    calculateOverallStrength() {
        const connectionBonus = this.connections.size * 0.1;
        const activationBonus = Math.log(this.totalActivations + 1) * 0.1;
        const ageBonus = this.consolidationTime ? 0.2 : 0;
        return this.senseWeight + connectionBonus + activationBonus + ageBonus;
    }
    /**
     * Sprawdza czy atom powinien zostać skonsolidowany w pamięci długoterminowej
     */
    shouldConsolidate() {
        const minActivations = 5;
        const minWeight = 0.3;
        const hasEmotionalSignificance = this.amygdalaActivationLevel &&
            ['HIGH', 'EXTREME'].includes(this.amygdalaActivationLevel);
        return (this.totalActivations >= minActivations && this.senseWeight >= minWeight) ||
            hasEmotionalSignificance ||
            this.connections.size >= 3;
    }
    /**
     * Eksportuje atom do formatu JSON
     */
    toJSON() {
        return {
            id: this.id,
            label: this.label,
            senseWeight: this.senseWeight,
            detectedPierwiastki: this.detectedPierwiastki,
            primaryPierwiastek: this.primaryPierwiastek,
            lastAccessTime: this.lastAccessTime,
            totalActivations: this.totalActivations,
            amygdalaActivationLevel: this.amygdalaActivationLevel,
            connections: Array.from(this.connections.entries()),
            overallStrength: this.calculateOverallStrength()
        };
    }
}
exports.SenseAtom = SenseAtom;
/**
 * RelationalGraph - Sieć relacyjna Sense Atomów
 * Zarządza połączeniami między atomami i operacjami na całej sieci
 */
class RelationalGraph {
    constructor() {
        this.atoms = new Map();
        this.clusters = new Map();
        this.statistics = {
            totalAtoms: 0,
            totalConnections: 0,
            averageWeight: 0,
            consolidatedAtoms: 0,
            lastUpdate: Date.now()
        };
    }
    /**
     * Dodaje nowy Sense Atom do grafu
     */
    addAtom(atom) {
        this.atoms.set(atom.id, atom);
        this.updateStatistics();
        console.log(`➕ Dodano SenseAtom ${atom.id} do grafu (łącznie: ${this.atoms.size})`);
    }
    /**
     * Usuwa Sense Atom z grafu
     */
    removeAtom(id) {
        const atom = this.atoms.get(id);
        if (!atom)
            return false;
        // Usuń wszystkie połączenia TO tego atomu
        this.atoms.forEach(otherAtom => {
            otherAtom.removeConnection(id);
        });
        // Usuń atom z klastrów
        this.clusters.forEach(cluster => {
            cluster.delete(id);
        });
        const removed = this.atoms.delete(id);
        if (removed) {
            this.updateStatistics();
            console.log(`🗑️ Usunięto SenseAtom ${id} z grafu`);
        }
        return removed;
    }
    /**
     * Pobiera Sense Atom po ID
     */
    getAtom(id) {
        return this.atoms.get(id);
    }
    /**
     * Zwraca wszystkie atomy
     */
    getAllAtoms() {
        return Array.from(this.atoms.values());
    }
    /**
     * Zwraca rozmiar grafu
     */
    size() {
        return this.atoms.size;
    }
    /**
     * Tworzy połączenie między dwoma atomami
     */
    createConnection(sourceId, targetId, strength, type = 'SEMANTIC') {
        const sourceAtom = this.atoms.get(sourceId);
        const targetAtom = this.atoms.get(targetId);
        if (!sourceAtom || !targetAtom)
            return false;
        sourceAtom.addConnection(targetId, strength, type);
        targetAtom.addConnection(sourceId, strength, type); // Dwukierunkowe połączenie
        this.updateStatistics();
        console.log(`🔗 Utworzono połączenie ${sourceId} ↔ ${targetId} (siła: ${strength})`);
        return true;
    }
    /**
     * Znajduje atomy podobne semantycznie
     */
    findSimilarAtoms(targetAtom, threshold = 0.7) {
        const similar = [];
        this.atoms.forEach(atom => {
            if (atom.id === targetAtom.id)
                return;
            const similarity = this.calculateSimilarity(targetAtom, atom);
            if (similarity >= threshold) {
                similar.push(atom);
            }
        });
        return similar.sort((a, b) => this.calculateSimilarity(targetAtom, b) - this.calculateSimilarity(targetAtom, a));
    }
    /**
     * Oblicza podobieństwo między dwoma atomami
     */
    calculateSimilarity(atom1, atom2) {
        // Podobieństwo na podstawie wspólnych pierwiastków
        const elements1 = new Set(atom1.detectedPierwiastki || []);
        const elements2 = new Set(atom2.detectedPierwiastki || []);
        const intersection = new Set([...elements1].filter(x => elements2.has(x)));
        const union = new Set([...elements1, ...elements2]);
        const jaccardSimilarity = union.size > 0 ? intersection.size / union.size : 0;
        // Podobieństwo na podstawie wag
        const weightSimilarity = 1 - Math.abs(atom1.senseWeight - atom2.senseWeight) / 10;
        // Podobieństwo na podstawie czasów (atomy z podobnego okresu)
        const timeDiff = Math.abs(atom1.createdAt - atom2.createdAt);
        const timeSimilarity = Math.exp(-timeDiff / (24 * 60 * 60 * 1000)); // Wykładniczy spadek po 24h
        return (jaccardSimilarity * 0.5 + weightSimilarity * 0.3 + timeSimilarity * 0.2);
    }
    /**
     * Tworzy klaster semantyczny
     */
    createCluster(name, atomIds) {
        const cluster = new Set(atomIds);
        this.clusters.set(name, cluster);
        // Dodaj atomy do klastra
        atomIds.forEach(id => {
            const atom = this.atoms.get(id);
            if (atom) {
                atom.clusters.push(name);
            }
        });
        console.log(`🎯 Utworzono klaster '${name}' z ${atomIds.length} atomami`);
    }
    /**
     * Znajduje najsilniejsze atomy
     */
    getTopAtoms(count = 10) {
        return Array.from(this.atoms.values())
            .sort((a, b) => b.calculateOverallStrength() - a.calculateOverallStrength())
            .slice(0, count);
    }
    /**
     * Optymalizuje graf - usuwa słabe połączenia i izolowane atomy
     */
    optimize() {
        console.log('🔧 Rozpoczęto optymalizację grafu...');
        let removedConnections = 0;
        let removedAtoms = 0;
        // Usuń słabe połączenia
        this.atoms.forEach(atom => {
            const weakConnections = [];
            atom.connections.forEach((conn, targetId) => {
                if (conn.strength < 0.1) {
                    weakConnections.push(targetId);
                }
            });
            weakConnections.forEach(targetId => {
                atom.removeConnection(targetId);
                removedConnections++;
            });
        });
        // Usuń izolowane atomy o niskiej wadze
        const toRemove = [];
        this.atoms.forEach(atom => {
            if (atom.connections.size === 0 &&
                atom.senseWeight < 0.1 &&
                atom.totalActivations < 2) {
                toRemove.push(atom.id);
            }
        });
        toRemove.forEach(id => {
            this.removeAtom(id);
            removedAtoms++;
        });
        this.updateStatistics();
        console.log(`✅ Optymalizacja zakończona: usunięto ${removedConnections} połączeń i ${removedAtoms} atomów`);
    }
    /**
     * Aktualizuje statystyki grafu
     */
    updateStatistics() {
        this.statistics.totalAtoms = this.atoms.size;
        this.statistics.totalConnections = Array.from(this.atoms.values())
            .reduce((sum, atom) => sum + atom.connections.size, 0) / 2; // Dzielenie przez 2 bo połączenia są dwukierunkowe
        if (this.atoms.size > 0) {
            this.statistics.averageWeight = Array.from(this.atoms.values())
                .reduce((sum, atom) => sum + atom.senseWeight, 0) / this.atoms.size;
        }
        this.statistics.consolidatedAtoms = Array.from(this.atoms.values())
            .filter(atom => atom.shouldConsolidate()).length;
        this.statistics.lastUpdate = Date.now();
    }
    /**
     * Zwraca statystyki grafu
     */
    getStatistics() {
        return { ...this.statistics };
    }
    /**
     * Eksportuje graf do JSON
     */
    toJSON() {
        return {
            atoms: Array.from(this.atoms.values()).map(atom => atom.toJSON()),
            clusters: Array.from(this.clusters.entries()).map(([name, atomIds]) => ({
                name,
                atomIds: Array.from(atomIds)
            })),
            statistics: this.statistics
        };
    }
    /**
     * Importuje graf z JSON
     */
    static fromJSON(data) {
        const graph = new RelationalGraph();
        // Importuj atomy
        data.atoms.forEach((atomData) => {
            const atom = new SenseAtom(atomData.id, atomData.label, atomData.senseWeight, atomData.detectedPierwiastki);
            // Przywróć właściwości
            Object.assign(atom, atomData);
            // Przywróć połączenia
            atom.connections = new Map(atomData.connections);
            graph.addAtom(atom);
        });
        // Importuj klastry
        data.clusters.forEach((clusterData) => {
            graph.createCluster(clusterData.name, clusterData.atomIds);
        });
        return graph;
    }
}
exports.RelationalGraph = RelationalGraph;
