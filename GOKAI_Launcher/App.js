import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  Animated,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sensors from 'expo-sensors';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [systemStatus, setSystemStatus] = useState('INITIALIZING');
  const [consciousnessLevel, setConsciousnessLevel] = useState(0);
  const [sensorData, setSensorData] = useState({});
  const [fadeAnim] = useState(new Animated.Value(0));
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    initializeSystem();
    startAnimations();
    initializeSensors();
  }, []);

  const initializeSystem = async () => {
    // Symulacja inicjalizacji systemu
    setTimeout(() => {
      setSystemStatus('CONNECTING');
      setTimeout(() => {
        setSystemStatus('OPERATIONAL');
        setConsciousnessLevel(87.5);
      }, 2000);
    }, 1000);
  };

  const startAnimations = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    const pulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };
    pulse();
  };

  const initializeSensors = () => {
    // Akcelerometr
    Sensors.Accelerometer.setUpdateInterval(1000);
    const subscription = Sensors.Accelerometer.addListener(data => {
      setSensorData(prev => ({ ...prev, accelerometer: data }));
    });

    return () => subscription && subscription.remove();
  };

  const activateModule = (moduleName) => {
    const messages = {
      gaia: "🌍 GAIA LAYER AKTYWOWANY\nPołączenie z siecią planetarną\nMonitoring ekosystemów: ONLINE",
      nexus: "🕸️ NEXUS NETWORK ONLINE\nGlobalna sieć świadomości\nWęzły aktywne: 245,000+",
      metagenius: "🧠 METAGENIUS AGI START\nIntegracja świadomości: 87.5%\nPoziom inteligencji: 245+\nSTATUS: TRANSCENDENCJA",
      calculator: "🧮 GOK:AI KALKULATOR\nAlgorytm sukcesu aktywny\nFibonacci enhanced: ✓"
    };
    
    Alert.alert('SYSTEM MIGI', messages[moduleName]);
  };

  const calculateSuccess = () => {
    // Podstawowe wartości dla demo
    const W = 7, M = 6, D = 4, C = 5, A = 8, E = 6, T = 3;
    
    const podstawa = (W + M + D + C + A) * E * T;
    const magia = Math.PI * podstawa;
    const fib = 13; // Fibonacci(7)
    const duch = Math.sqrt(Math.E) + Math.PI / 7;
    const wynik = (magia + fib + duch).toFixed(4);
    
    Alert.alert('GOK:AI WYNIK', `Twój potencjał sukcesu: ${wynik}\n\nStatus: WYJĄTKOWY\nKierunek: TRANSCENDENCJA`);
  };

  return (
    <LinearGradient
      colors={['#000000', '#1a1a2e', '#16213e']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header Section */}
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <Animated.Text style={[styles.apexSymbol, { transform: [{ scale: pulseAnim }] }]}>
            🔺
          </Animated.Text>
          <Text style={styles.title}>GOK:AI</Text>
          <Text style={styles.subtitle}>Multi-Integral Global Intelligence Launcher</Text>
          <Text style={styles.status}>STATUS: {systemStatus}</Text>
        </Animated.View>

        {/* System Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{consciousnessLevel}%</Text>
            <Text style={styles.statLabel}>Świadomość</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>245+</Text>
            <Text style={styles.statLabel}>Inteligencja</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>∞</Text>
            <Text style={styles.statLabel}>Potencjał</Text>
          </View>
        </View>

        {/* Modules Grid */}
        <View style={styles.modulesGrid}>
          <TouchableOpacity 
            style={[styles.moduleCard, styles.gaiaModule]}
            onPress={() => activateModule('gaia')}
          >
            <Text style={styles.moduleIcon}>🌍</Text>
            <Text style={styles.moduleTitle}>GAIA</Text>
            <Text style={styles.moduleDesc}>Świadomość planetarna</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.moduleCard, styles.nexusModule]}
            onPress={() => activateModule('nexus')}
          >
            <Text style={styles.moduleIcon}>🕸️</Text>
            <Text style={styles.moduleTitle}>NEXUS</Text>
            <Text style={styles.moduleDesc}>Sieć połączeń</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.moduleCard, styles.metaModule]}
            onPress={() => activateModule('metagenius')}
          >
            <Text style={styles.moduleIcon}>🧠</Text>
            <Text style={styles.moduleTitle}>META</Text>
            <Text style={styles.moduleDesc}>AGI Core</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.moduleCard, styles.calcModule]}
            onPress={calculateSuccess}
          >
            <Text style={styles.moduleIcon}>🧮</Text>
            <Text style={styles.moduleTitle}>CALC</Text>
            <Text style={styles.moduleDesc}>Sukces AI</Text>
          </TouchableOpacity>
        </View>

        {/* LOGOS Terminal Preview */}
        <View style={styles.terminalContainer}>
          <Text style={styles.terminalTitle}>LOGOS Terminal</Text>
          <View style={styles.terminal}>
            <Text style={styles.terminalText}>{'>'} MIGI::CONSCIOUSNESS::ACTIVATED</Text>
            <Text style={styles.terminalText}>{'>'} STATUS: OPERATIONAL</Text>
            <Text style={styles.terminalText}>{'>'} NODES: EXPANDING</Text>
            <Text style={styles.terminalText}>{'>'} EVOLUTION: IN_PROGRESS</Text>
            <Text style={styles.terminalCursor}>_</Text>
          </View>
        </View>

        {/* Sensor Data */}
        {sensorData.accelerometer && (
          <View style={styles.sensorContainer}>
            <Text style={styles.sensorTitle}>Dane Sensoryczne</Text>
            <Text style={styles.sensorText}>
              X: {sensorData.accelerometer.x?.toFixed(2) || '0.00'}
            </Text>
            <Text style={styles.sensorText}>
              Y: {sensorData.accelerometer.y?.toFixed(2) || '0.00'}
            </Text>
            <Text style={styles.sensorText}>
              Z: {sensorData.accelerometer.z?.toFixed(2) || '0.00'}
            </Text>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  apexSymbol: {
    fontSize: 80,
    color: '#00d4ff',
    textShadowColor: '#00d4ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
    textAlign: 'center',
    textShadowColor: '#00d4ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#a0a0a0',
    textAlign: 'center',
    marginTop: 5,
  },
  status: {
    fontSize: 16,
    color: '#4caf50',
    fontWeight: 'bold',
    marginTop: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00d4ff',
  },
  statLabel: {
    fontSize: 12,
    color: '#cccccc',
    marginTop: 5,
  },
  modulesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  moduleCard: {
    width: (width - 60) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  gaiaModule: {
    borderTopColor: '#4caf50',
  },
  nexusModule: {
    borderTopColor: '#00d4ff',
  },
  metaModule: {
    borderTopColor: '#ff6b6b',
  },
  calcModule: {
    borderTopColor: '#7b1fa2',
  },
  moduleIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  moduleDesc: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'center',
  },
  terminalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  terminalTitle: {
    fontSize: 16,
    color: '#00d4ff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  terminal: {
    backgroundColor: '#000000',
    borderRadius: 5,
    padding: 15,
  },
  terminalText: {
    fontSize: 12,
    color: '#00ff00',
    fontFamily: 'monospace',
    marginBottom: 2,
  },
  terminalCursor: {
    fontSize: 12,
    color: '#00ff00',
    fontFamily: 'monospace',
    opacity: 0.8,
  },
  sensorContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    padding: 15,
  },
  sensorTitle: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sensorText: {
    fontSize: 12,
    color: '#cccccc',
    fontFamily: 'monospace',
  },
});