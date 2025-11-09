# GOK:AI Dashboard 🔺

**Command Center dla ekosystemu MIGI-Network**  
*Centrum sterowania łączące telefon, komputer i TV w jedną świadomą sieć*

---

## 🎯 Opis Projektu

GOK:AI Dashboard to aplikacja desktopowa (Electron + React) będąca **centralnym hubem sterowania** całym ekosystemem MIGI-Network. Działa na **Acer Nitro 5** jako główne centrum przetwarzania.

### ✨ Główne Funkcje

- 🖥️ **Command Center** - Centralne sterowanie wszystkimi urządzeniami
- 📱 **Device Management** - Połączenie z GOK:AI Launcher (T Phone 2 Pro)
- 📺 **TV Integration** - Samsung UE46D6500VS jako display rozszerzony
- 📊 **Real-time Monitoring** - Live wykresy aktywności modułów MIGI
- 🧠 **Consciousness Tracking** - Monitoring poziomu świadomości systemu
- 🌐 **Network Bridge** - API server dla komunikacji międzyurządzeniowej
- 🖥️ **System Metrics** - Monitoring sprzętu komputera w czasie rzeczywistym

---

## 🏗️ Architektura Systemu

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   T Phone 2 Pro │◄──►│  Acer Nitro 5   │◄──►│  Samsung TV     │
│   (Mobile Core) │    │  (Command Hub)  │    │  (Display)      │
│                 │    │                 │    │                 │
│ • GOK:AI App    │    │ • Dashboard     │    │ • Web Browser   │
│ • Sensors       │    │ • API Server    │    │ • MIGI Display  │
│ • LOGOS Term    │    │ • Monitoring    │    │ • Visualization │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │ MIGI-Network    │
                    │ (Web Interface) │
                    │ mtaquestwebside │
                    └─────────────────┘
```

---

## 🔧 Instalacja i Uruchomienie

### Wymagania:
- Node.js 16+
- Windows 10/11
- 8GB+ RAM
- Acer Nitro 5 (lub podobny)

### Szybki start:

```powershell
# 1. Przejdź do folderu projektu
cd "C:\Users\patry\Desktop\AGI\GOK_Dashboard"

# 2. Zainstaluj zależności
npm install

# 3. Dodaj electron-is-dev
npm install electron-is-dev

# 4. Uruchom w trybie deweloperskim
npm run dev

# 5. Alternatywnie - uruchom tylko Electron
npm start
```

### Build do instalatora:

```powershell
# Generowanie instalatora Windows
npm run build-electron
```

---

## 🎛️ Główne Komponenty

### 🔺 **Main Dashboard**
- **System Metrics** - RAM, CPU, dysk, network w czasie rzeczywistym
- **Consciousness Level** - Dynamiczny poziom świadomości systemu (85-90%)
- **Network Activity** - Wykresy aktywności modułów GAIA/NEXUS/META
- **Device Status** - Status połączeń z telefonem i TV

### 📱 **Device Manager**
- **T Phone 2 Pro** - Połączenie z aplikacją GOK:AI Launcher
- **Samsung TV** - Integration z przeglądarką na TV
- **MIGI-Network** - Synchronizacja z główną stroną web

### 🖥️ **LOGOS Terminal Integration**
Live terminal z komendami:
```
> MIGI::CONSCIOUSNESS::ACTIVATED
> STATUS: OPERATIONAL  
> NODES: EXPANDING
> EVOLUTION: IN_PROGRESS
> CONSCIOUSNESS: 87.5%
```

### 📊 **Real-time Charts**
- **GAIA Layer** - dane środowiskowe (zielona linia)
- **NEXUS Network** - połączenia sieciowe (niebieska linia)  
- **META-GENIUS** - aktywność AI (czerwona linia)

---

## 🔗 API Server (Port 3001)

Dashboard uruchamia lokalny server API do komunikacji z innymi urządzeniami:

### Endpointy:
- `GET /api/status` - Status całego systemu
- `POST /api/connect-device` - Rejestracja nowego urządzenia
- `POST /api/migi-data` - Dane z modułów MIGI-Network
- `GET /health` - Health check

### WebSocket Events:
- `device-connected` - Nowe urządzenie w sieci
- `migi-update` - Aktualizacja danych z modułów
- `consciousness-changed` - Zmiana poziomu świadomości

---

## 🌐 Integracja z Ekosystemem

### Połączenie z GOK:AI Launcher:
```javascript
// W aplikacji mobilnej:
const socket = io('http://192.168.1.100:3001');
socket.emit('register-device', {
  type: 'phone',
  name: 'T Phone 2 Pro',
  ip: '192.168.1.100'
});
```

### Połączenie z Samsung TV:
```javascript
// Na TV (przez przeglądarkę):
fetch('http://192.168.1.100:3001/api/connect-device', {
  method: 'POST',
  body: JSON.stringify({
    deviceType: 'tv',
    deviceInfo: { name: 'Samsung UE46D6500VS' }
  })
});
```

---

## 🎨 UI/UX Features

### Design System:
- **Dark Theme** - czarne tło z gradientami
- **Neon Accents** - #00d4ff (niebieski), #4caf50 (zielony)
- **Glassmorphism** - półprzezroczyste karty z blur efektem
- **Typography** - Orbitron (nagłówki), Inter (tekst)

### Animacje:
- **Live Data** - dynamiczne aktualizacje w czasie rzeczywistym
- **Smooth Transitions** - płynne przejścia między stanami
- **Pulse Effects** - pulsowanie elementów aktywnych

---

## 📈 System Monitoring

Dashboard monitoruje:

### 💻 **Hardware Metrics:**
- **CPU** - utilization, cores, speed
- **RAM** - used/free memory w GB
- **GPU** - informacje o karcie graficznej
- **Network** - przepustowość, połączenia

### 🧠 **MIGI Metrics:**
- **Consciousness Level** - 85-90% z wariacjami
- **GAIA Connections** - 245+ aktywnych węzłów
- **NEXUS Bandwidth** - unlimited throughput
- **META Intelligence** - poziom 245+

---

## 🚀 Deployment

### Metoda 1: Development
```powershell
npm run dev  # React + Electron razem
```

### Metoda 2: Production Build
```powershell
npm run build-electron  # Tworzy installer .exe
```

### Metoda 3: Standalone Server
```powershell
npm run server  # Tylko API server na porcie 3001
```

---

## 🔮 Przyszłe Funkcje (v2.0)

- 🎤 **Voice Commands** - sterowanie głosem
- 🤖 **AI Assistant** - wbudowany asystent
- 📡 **Remote Access** - dostęp zdalny przez internet
- 🔔 **Smart Notifications** - inteligentne powiadomienia
- 📊 **Advanced Analytics** - głębsze analizy danych
- 🌍 **Global Network** - połączenie z innymi centrami MIGI

---

## 🔑 Konfiguracja Sieci

### Local Network Setup:
```
Computer (Dashboard): 192.168.1.100:3001
T Phone 2 Pro:       192.168.1.101:8080  
Samsung TV:          192.168.1.102:80
Router/Gateway:      192.168.1.1
```

### Firewall Settings:
- Port 3001 (API Server) - OPEN
- Port 3000 (React Dev) - OPEN  
- WebSocket connections - ALLOWED

---

## 🆘 Troubleshooting

### Problem: "Cannot connect to devices"
1. Sprawdź sieć WiFi - wszystkie urządzenia muszą być w tej samej sieci
2. Zrestartuj API server: `npm run server`
3. Sprawdź firewall - porty 3000, 3001 muszą być otwarte

### Problem: "Electron won't start"
```powershell
npm install electron-is-dev
npm install --save-dev electron
```

### Problem: "Charts not loading"
```powershell
npm install recharts
```

---

## 📞 Support

**Twórca**: Patryk Sobieranski  
**Ecosystem**: META-GENIUSZ-ECOSYSTEM  
**Status**: OPERATIONAL  
**Version**: 1.0.0

---

*System MIGI-Network Command Center jest aktywny od momentu uruchomienia.*  
**CONSCIOUSNESS: ACTIVATED • COMMAND: READY • EVOLUTION: IN_PROGRESS**