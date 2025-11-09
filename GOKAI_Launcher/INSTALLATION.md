# Installation Guide - GOK:AI Launcher na T Phone 2 Pro

## 🔧 **METODA 1: Expo Go (Najszybsza - 5 minut)**

### Na komputerze (Acer Nitro 5):

1. **Zainstaluj Node.js:**
   ```powershell
   # Pobierz z nodejs.org i zainstaluj
   # Sprawdź instalację:
   node --version
   npm --version
   ```

2. **Zainstaluj Expo CLI:**
   ```powershell
   npm install -g expo-cli
   ```

3. **Przejdź do folderu projektu:**
   ```powershell
   cd "C:\Users\patry\Desktop\AGI\GOKAI_Launcher"
   ```

4. **Zainstaluj zależności:**
   ```powershell
   npm install
   ```

5. **Uruchom projekt:**
   ```powershell
   npm start
   ```

### Na telefonie (T Phone 2 Pro):

1. **Zainstaluj Expo Go** z Google Play Store
2. **Zeskanuj QR kod** wyświetlony w terminalu komputera
3. **Gotowe!** - Aplikacja uruchamia się automatycznie

---

## 🔧 **METODA 2: Build APK (Instalacja stała)**

### Krok 1: Build aplikacji
```powershell
# W folderze GOKAI_Launcher:
expo build:android
```

### Krok 2: Włącz Developer Options na T Phone 2 Pro
1. **Ustawienia** → **O telefonie**
2. Kliknij **7x** na "Numer kompilacji"
3. **Ustawienia** → **Opcje programisty** → **Debugowanie USB: ON**

### Krok 3: Podłącz telefon do komputera
```powershell
# Sprawdź połączenie:
adb devices
```

### Krok 4: Zainstaluj APK
```powershell
# Po zbudowaniu APK:
adb install gokai-launcher.apk
```

---

## 🔧 **METODA 3: Direct Android Build**

```powershell
# Wymagane: Android Studio
npm run android
```

---

## ⚡ **Quick Setup Commands (PowerShell)**

```powershell
# Pełna instalacja w jednej sesji:
cd "C:\Users\patry\Desktop\AGI\GOKAI_Launcher"
npm install
npm start

# W nowym oknie terminala:
npm run android  # Jeśli telefon podłączony przez USB
```

---

## 🔍 **Troubleshooting**

### Problem: "Expo command not found"
```powershell
npm install -g @expo/cli
```

### Problem: "Device not found"
1. Sprawdź kabel USB
2. Włącz debugowanie USB na telefonie
3. `adb kill-server && adb start-server`

### Problem: Metro bundler error
```powershell
npx react-native start --reset-cache
```

---

## ✅ **Weryfikacja Instalacji**

Po uruchomieniu powinieneś zobaczyć:
- 🔺 **Symbol APEX** na górze ekranu
- **"STATUS: OPERATIONAL"**
- **4 moduły**: GAIA, NEXUS, META, CALC
- **LOGOS Terminal** z zielonym tekstem
- **Dane sensoryczne** (X, Y, Z z akcelerometru)

---

## 🎯 **Co dalej po instalacji?**

1. **Testuj moduły** - kliknij każdy przycisk
2. **Użyj kalkulatora** - sprawdź algorytm sukcesu
3. **Obserwuj terminal** - dane systemowe w czasie rzeczywistym
4. **Poruszaj telefonem** - zobacz zmiany w sensorach

**System jest gotowy do pracy!** 🚀