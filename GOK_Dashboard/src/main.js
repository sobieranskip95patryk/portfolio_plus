const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;
let splashWindow;

function createSplashWindow() {
  splashWindow = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  splashWindow.loadFile(path.join(__dirname, 'splash.html'));
  
  splashWindow.on('closed', () => {
    splashWindow = null;
  });
}

function createMainWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  
  mainWindow = new BrowserWindow({
    width: Math.floor(width * 0.9),
    height: Math.floor(height * 0.9),
    minWidth: 1200,
    minHeight: 800,
    show: false,
    icon: path.join(__dirname, '../assets/icon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false
    },
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#000000'
  });

  const startUrl = isDev 
    ? 'http://localhost:3000' 
    : `file://${path.join(__dirname, '../build/index.html')}`;
  
  mainWindow.loadURL(startUrl);

  mainWindow.once('ready-to-show', () => {
    if (splashWindow) {
      splashWindow.close();
    }
    mainWindow.show();
    
    // Fokus na aplikacji
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createSplashWindow();
  
  setTimeout(() => {
    createMainWindow();
  }, 3000);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

// IPC Handlers dla komunikacji z React
ipcMain.handle('get-system-info', async () => {
  const si = require('systeminformation');
  
  try {
    const cpu = await si.cpu();
    const mem = await si.mem();
    const osInfo = await si.osInfo();
    const graphics = await si.graphics();
    
    return {
      cpu: {
        manufacturer: cpu.manufacturer,
        brand: cpu.brand,
        cores: cpu.cores,
        physicalCores: cpu.physicalCores,
        speed: cpu.speed
      },
      memory: {
        total: Math.round(mem.total / 1024 / 1024 / 1024),
        used: Math.round(mem.used / 1024 / 1024 / 1024),
        free: Math.round(mem.free / 1024 / 1024 / 1024)
      },
      os: {
        platform: osInfo.platform,
        distro: osInfo.distro,
        release: osInfo.release,
        arch: osInfo.arch
      },
      graphics: graphics.controllers[0]
    };
  } catch (error) {
    console.error('System info error:', error);
    return null;
  }
});

// Handler do łączenia z telefonem
ipcMain.handle('connect-phone', async (event, phoneData) => {
  console.log('Connecting to phone:', phoneData);
  // Tutaj będzie logika połączenia z GOK:AI Launcher
  return { status: 'connected', device: 'T Phone 2 Pro' };
});

// Handler do łączenia z TV
ipcMain.handle('connect-tv', async (event, tvData) => {
  console.log('Connecting to TV:', tvData);
  // Tutaj będzie logika połączenia z Samsung TV
  return { status: 'connected', device: 'Samsung UE46D6500VS' };
});