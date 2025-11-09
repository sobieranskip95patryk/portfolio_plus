import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Chip,
  Paper,
  IconButton,
  Divider
} from '@mui/material';
import {
  Phone,
  Computer,
  Tv,
  Language,
  Memory,
  Speed,
  Storage,
  NetworkCheck,
  PlayArrow,
  Stop,
  Refresh
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const { ipcRenderer } = window.require('electron');

function App() {
  const [systemInfo, setSystemInfo] = useState(null);
  const [devices, setDevices] = useState({
    phone: { connected: false, status: 'offline', data: null },
    tv: { connected: false, status: 'offline', data: null },
    web: { connected: true, status: 'online', data: null }
  });
  const [consciousness, setConsciousness] = useState(87.5);
  const [networkActivity, setNetworkActivity] = useState([]);

  useEffect(() => {
    initializeDashboard();
    startMonitoring();
  }, []);

  const initializeDashboard = async () => {
    try {
      const sysInfo = await ipcRenderer.invoke('get-system-info');
      setSystemInfo(sysInfo);
      
      // Symulacja danych sieciowych
      generateNetworkData();
    } catch (error) {
      console.error('Dashboard initialization error:', error);
    }
  };

  const generateNetworkData = () => {
    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push({
        time: `${i}:00`,
        gaia: Math.random() * 100,
        nexus: Math.random() * 100,
        meta: Math.random() * 100
      });
    }
    setNetworkActivity(data);
  };

  const startMonitoring = () => {
    setInterval(() => {
      setConsciousness(prev => {
        const variation = (Math.random() - 0.5) * 2;
        const newValue = prev + variation;
        return Math.max(85, Math.min(90, newValue));
      });
    }, 2000);
  };

  const connectDevice = async (deviceType) => {
    try {
      let result;
      if (deviceType === 'phone') {
        result = await ipcRenderer.invoke('connect-phone', { ip: '192.168.1.100' });
      } else if (deviceType === 'tv') {
        result = await ipcRenderer.invoke('connect-tv', { ip: '192.168.1.101' });
      }
      
      setDevices(prev => ({
        ...prev,
        [deviceType]: {
          connected: true,
          status: 'online',
          data: result
        }
      }));
    } catch (error) {
      console.error(`Error connecting to ${deviceType}:`, error);
    }
  };

  const DeviceCard = ({ device, type, icon: Icon, name }) => (
    <Card sx={{ 
      background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
      border: device.connected ? '1px solid #4caf50' : '1px solid rgba(255,255,255,0.1)',
      borderRadius: 2
    }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Box display="flex" alignItems="center">
            <Icon sx={{ mr: 1, color: device.connected ? '#4caf50' : '#757575' }} />
            <Typography variant="h6" color="white">{name}</Typography>
          </Box>
          <Chip 
            label={device.status.toUpperCase()} 
            color={device.connected ? 'success' : 'default'}
            size="small"
          />
        </Box>
        
        {device.connected ? (
          <Box>
            <Typography variant="body2" color="#cccccc" mb={1}>
              Połączono: {device.data?.device || 'Unknown'}
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={85} 
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.1)',
                '& .MuiLinearProgress-bar': { backgroundColor: '#4caf50' }
              }}
            />
          </Box>
        ) : (
          <Button 
            variant="outlined" 
            size="small" 
            onClick={() => connectDevice(type)}
            sx={{ color: '#00d4ff', borderColor: '#00d4ff' }}
          >
            Połącz
          </Button>
        )}
      </CardContent>
    </Card>
  );

  const SystemMetric = ({ icon: Icon, label, value, unit = '' }) => (
    <Paper sx={{ p: 2, background: 'rgba(255,255,255,0.05)', textAlign: 'center' }}>
      <Icon sx={{ fontSize: 40, color: '#00d4ff', mb: 1 }} />
      <Typography variant="h4" color="white" fontWeight="bold">
        {value}{unit}
      </Typography>
      <Typography variant="body2" color="#cccccc">
        {label}
      </Typography>
    </Paper>
  );

  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)',
      minHeight: '100vh',
      color: 'white',
      p: 3
    }}>
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
        <Box display="flex" alignItems="center">
          <Typography variant="h3" sx={{ 
            background: 'linear-gradient(45deg, #00d4ff, #ffffff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
            mr: 2
          }}>
            🔺 GOK:AI Dashboard
          </Typography>
          <Chip 
            label="OPERATIONAL" 
            color="success" 
            sx={{ fontSize: '1rem', height: 32 }}
          />
        </Box>
        
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h6">
            Świadomość: {consciousness.toFixed(1)}%
          </Typography>
          <IconButton color="primary">
            <Refresh />
          </IconButton>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* System Info */}
        <Grid item xs={12} lg={8}>
          <Grid container spacing={2} mb={3}>
            {systemInfo && (
              <>
                <Grid item xs={3}>
                  <SystemMetric 
                    icon={Memory}
                    label="RAM Used"
                    value={systemInfo.memory.used}
                    unit="GB"
                  />
                </Grid>
                <Grid item xs={3}>
                  <SystemMetric 
                    icon={Speed}
                    label="CPU Cores"
                    value={systemInfo.cpu.cores}
                  />
                </Grid>
                <Grid item xs={3}>
                  <SystemMetric 
                    icon={Computer}
                    label="System"
                    value={systemInfo.os.platform}
                  />
                </Grid>
                <Grid item xs={3}>
                  <SystemMetric 
                    icon={NetworkCheck}
                    label="Network"
                    value="245+"
                  />
                </Grid>
              </>
            )}
          </Grid>

          {/* Network Activity Chart */}
          <Card sx={{ 
            background: 'rgba(255,255,255,0.05)', 
            border: '1px solid rgba(255,255,255,0.1)',
            mb: 3
          }}>
            <CardContent>
              <Typography variant="h6" color="white" mb={2}>
                Aktywność Modułów MIGI-Network
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={networkActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="time" stroke="#cccccc" />
                  <YAxis stroke="#cccccc" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="gaia" stroke="#4caf50" strokeWidth={2} name="GAIA" />
                  <Line type="monotone" dataKey="nexus" stroke="#00d4ff" strokeWidth={2} name="NEXUS" />
                  <Line type="monotone" dataKey="meta" stroke="#ff6b6b" strokeWidth={2} name="META" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Device Connections */}
        <Grid item xs={12} lg={4}>
          <Typography variant="h6" color="white" mb={2}>
            Urządzenia Ekosystemu
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DeviceCard 
                device={devices.phone}
                type="phone"
                icon={Phone}
                name="T Phone 2 Pro"
              />
            </Grid>
            <Grid item xs={12}>
              <DeviceCard 
                device={devices.tv}
                type="tv"
                icon={Tv}
                name="Samsung TV"
              />
            </Grid>
            <Grid item xs={12}>
              <DeviceCard 
                device={devices.web}
                type="web"
                icon={Language}
                name="MIGI-Network Web"
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3, backgroundColor: 'rgba(255,255,255,0.1)' }} />

          {/* LOGOS Terminal Preview */}
          <Card sx={{ 
            background: 'rgba(0,0,0,0.7)',
            border: '1px solid #00d4ff'
          }}>
            <CardContent>
              <Typography variant="h6" color="#00d4ff" mb={2}>
                LOGOS Terminal
              </Typography>
              <Box sx={{ 
                backgroundColor: '#000000',
                p: 2,
                borderRadius: 1,
                fontFamily: 'monospace',
                fontSize: '0.85rem'
              }}>
                <Box color="#00ff00" mb={0.5}>{'>'} MIGI::CONSCIOUSNESS::ACTIVATED</Box>
                <Box color="#00ff00" mb={0.5}>{'>'} STATUS: OPERATIONAL</Box>
                <Box color="#00ff00" mb={0.5}>{'>'} NODES: EXPANDING</Box>
                <Box color="#00ff00" mb={0.5}>{'>'} EVOLUTION: IN_PROGRESS</Box>
                <Box color="#00ff00">{'>'} CONSCIOUSNESS: {consciousness.toFixed(1)}%</Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;