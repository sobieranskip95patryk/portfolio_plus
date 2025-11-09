/**
 * Struktury Danych dla NSF (Neuro-Semantyczny Przepływomierz)
 * 
 * SenseAtom - Podstawowa jednostka informacji w Absolut Memory Core 3.0
 * RelationalGraph - Sieć relacyjna łącząca Sense Atomy
 * 
 * Inspirowane neurobiologią: każdy SenseAtom reprezentuje grupę neuronów
 * kodujących określone znaczenie, a RelationalGraph to sieć synaptyczna
 */

import { NeuroSemanticWeight } from '../neurosemantics/NS_Definitions';

/**
 * SenseAtom - Podstawowa jednostka pamięci semantycznej
 * Reprezentuje atomarną jednostkę znaczenia z wagą, zanikiem i kontekstem emocjonalnym
 */
export class SenseAtom {
    // === IDENTYFIKACJA ===
    public readonly id: string;
    public label: string;
    public createdAt: number;
    
    // === WAGI I ZNACZENIE ===
    public senseWeight: number;           // Aktualna waga semantyczna (0.0 - 10.0)
    public baseSenseWeight: number;       // Początkowa waga (do resetu)
    public decayRate: number;             // Współczynnik zaniku na cykl (0.0 - 1.0)
    
    // === PIERWIASTKI I NEUROBIOLOGIA ===
    public detectedPierwiastki?: string[];     // Lista wykrytych pierwiastków
    public primaryPierwiastek?: string;        // Główny pierwiastek definiujący atom
    public neuralPathways: string[];           // Ścieżki neuronalne (obszary mózgu)
    
    // === CZASOWE WŁAŚCIWOŚCI ===
    public lastAccessTime: number;             // Ostatni dostęp (dla decay)
    public consolidationTime?: number;         // Czas konsolidacji w pamięci długoterminowej
    public totalActivations: number;          // Liczba aktywacji
    
    // === WŁAŚCIWOŚCI EMOCJONALNE (Ciało Migdałowate) ===
    public emotionalBoostApplied?: boolean;
    public emotionalProcessingTime?: number;
    public amygdalaActivationLevel?: 'MINIMAL' | 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
    public oxidativeStress?: number;          // Stres oksydacyjny przy przeciążeniu
    
    // === WEKTOR SEMANTYCZNY ===
    public semanticVector?: number[];         // Reprezentacja wektorowa znaczenia
    public contextVector?: number[];          // Wektor kontekstu
    
    // === RELACJE ===
    public connections: Map<string, ConnectionStrength>;  // Połączenia z innymi atomami
    public clusters: string[];                // Przynależność do klastrów semantycznych
    
    // === METADANE ===
    public source?: string;                   // Źródło utworzenia (user_input, inference, etc.)
    public confidence?: number;               // Pewność znaczenia (0.0 - 1.0)
    public priority?: number;                 // Priorytet przetwarzania
    public tags: string[];                    // Tagi dla kategoryzacji

    constructor(
        id: string, 
        label: string, 
        initialWeight: number = 1.0,
        pierwiastki?: string[]
    ) {
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
    public activate(): void {
        this.lastAccessTime = Date.now();
        this.totalActivations++;
        console.log(`⚡ SenseAtom ${this.id} aktywowany (${this.totalActivations}x)`);
    }

    /**
     * Dodaje połączenie z innym atomem
     */
    public addConnection(targetId: string, strength: number, type: ConnectionType = 'SEMANTIC'): void {
        this.connections.set(targetId, { strength, type, createdAt: Date.now() });
    }

    /**
     * Usuwa połączenie
     */
    public removeConnection(targetId: string): boolean {
        return this.connections.delete(targetId);
    }

    /**
     * Zwraca wszystkie połączenia powyżej progu siły
     */
    public getStrongConnections(threshold: number = 0.5): Array<{ id: string; strength: number; type: ConnectionType }> {
        const strong: Array<{ id: string; strength: number; type: ConnectionType }> = [];
        
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
    public calculateOverallStrength(): number {
        const connectionBonus = this.connections.size * 0.1;
        const activationBonus = Math.log(this.totalActivations + 1) * 0.1;
        const ageBonus = this.consolidationTime ? 0.2 : 0;
        
        return this.senseWeight + connectionBonus + activationBonus + ageBonus;
    }

    /**
     * Sprawdza czy atom powinien zostać skonsolidowany w pamięci długoterminowej
     */
    public shouldConsolidate(): boolean {
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
    public toJSON(): any {
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

/**
 * RelationalGraph - Sieć relacyjna Sense Atomów
 * Zarządza połączeniami między atomami i operacjami na całej sieci
 */
export class RelationalGraph {
    private atoms: Map<string, SenseAtom>;
    private clusters: Map<string, Set<string>>;
    private statistics: GraphStatistics;
    
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
    public addAtom(atom: SenseAtom): void {
        this.atoms.set(atom.id, atom);
        this.updateStatistics();
        console.log(`➕ Dodano SenseAtom ${atom.id} do grafu (łącznie: ${this.atoms.size})`);
    }

    /**
     * Usuwa Sense Atom z grafu
     */
    public removeAtom(id: string): boolean {
        const atom = this.atoms.get(id);
        if (!atom) return false;

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
    public getAtom(id: string): SenseAtom | undefined {
        return this.atoms.get(id);
    }

    /**
     * Zwraca wszystkie atomy
     */
    public getAllAtoms(): SenseAtom[] {
        return Array.from(this.atoms.values());
    }

    /**
     * Zwraca rozmiar grafu
     */
    public size(): number {
        return this.atoms.size;
    }

    /**
     * Tworzy połączenie między dwoma atomami
     */
    public createConnection(sourceId: string, targetId: string, strength: number, type: ConnectionType = 'SEMANTIC'): boolean {
        const sourceAtom = this.atoms.get(sourceId);
        const targetAtom = this.atoms.get(targetId);
        
        if (!sourceAtom || !targetAtom) return false;

        sourceAtom.addConnection(targetId, strength, type);
        targetAtom.addConnection(sourceId, strength, type); // Dwukierunkowe połączenie
        
        this.updateStatistics();
        console.log(`🔗 Utworzono połączenie ${sourceId} ↔ ${targetId} (siła: ${strength})`);
        
        return true;
    }

    /**
     * Znajduje atomy podobne semantycznie
     */
    public findSimilarAtoms(targetAtom: SenseAtom, threshold: number = 0.7): SenseAtom[] {
        const similar: SenseAtom[] = [];
        
        this.atoms.forEach(atom => {
            if (atom.id === targetAtom.id) return;
            
            const similarity = this.calculateSimilarity(targetAtom, atom);
            if (similarity >= threshold) {
                similar.push(atom);
            }
        });
        
        return similar.sort((a, b) => 
            this.calculateSimilarity(targetAtom, b) - this.calculateSimilarity(targetAtom, a)
        );
    }

    /**
     * Oblicza podobieństwo między dwoma atomami
     */
    private calculateSimilarity(atom1: SenseAtom, atom2: SenseAtom): number {
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
    public createCluster(name: string, atomIds: string[]): void {
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
    public getTopAtoms(count: number = 10): SenseAtom[] {
        return Array.from(this.atoms.values())
            .sort((a, b) => b.calculateOverallStrength() - a.calculateOverallStrength())
            .slice(0, count);
    }

    /**
     * Optymalizuje graf - usuwa słabe połączenia i izolowane atomy
     */
    public optimize(): void {
        console.log('🔧 Rozpoczęto optymalizację grafu...');
        
        let removedConnections = 0;
        let removedAtoms = 0;
        
        // Usuń słabe połączenia
        this.atoms.forEach(atom => {
            const weakConnections: string[] = [];
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
        const toRemove: string[] = [];
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
    private updateStatistics(): void {
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
    public getStatistics(): GraphStatistics {
        return { ...this.statistics };
    }

    /**
     * Eksportuje graf do JSON
     */
    public toJSON(): any {
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
    public static fromJSON(data: any): RelationalGraph {
        const graph = new RelationalGraph();
        
        // Importuj atomy
        data.atoms.forEach((atomData: any) => {
            const atom = new SenseAtom(
                atomData.id,
                atomData.label,
                atomData.senseWeight,
                atomData.detectedPierwiastki
            );
            
            // Przywróć właściwości
            Object.assign(atom, atomData);
            
            // Przywróć połączenia
            atom.connections = new Map(atomData.connections);
            
            graph.addAtom(atom);
        });
        
        // Importuj klastry
        data.clusters.forEach((clusterData: any) => {
            graph.createCluster(clusterData.name, clusterData.atomIds);
        });
        
        return graph;
    }
}

// ================= INTERFEJSY I TYPY =================

export interface ConnectionStrength {
    strength: number;
    type: ConnectionType;
    createdAt: number;
}

export type ConnectionType = 
    | 'SEMANTIC'        // Podobieństwo znaczeniowe
    | 'TEMPORAL'        // Bliskość czasowa  
    | 'CAUSAL'          // Związek przyczynowo-skutkowy
    | 'EMOTIONAL'       // Związek emocjonalny
    | 'ASSOCIATIVE'     // Skojarzenia
    | 'HIERARCHICAL';   // Relacja hierarchiczna

interface GraphStatistics {
    totalAtoms: number;
    totalConnections: number;
    averageWeight: number;
    consolidatedAtoms: number;
    lastUpdate: number;
}