const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const cron = require('node-cron');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Store connected devices
let connectedDevices = {
  phone: null,
  tv: null,
  dashboard: null
};

let systemMetrics = {
  consciousness: 87.5,
  gaia: { status: 'active', connections: 245 },
  nexus: { status: 'active', bandwidth: 'unlimited' },
  meta: { status: 'active', intelligence: '245+' }
};

// API Routes
app.get('/api/status', (req, res) => {
  res.json({
    status: 'operational',
    devices: connectedDevices,
    metrics: systemMetrics,
    timestamp: new Date().toISOString()
  });
});

app.post('/api/connect-device', (req, res) => {
  const { deviceType, deviceInfo } = req.body;
  
  connectedDevices[deviceType] = {
    ...deviceInfo,
    connectedAt: new Date().toISOString(),
    status: 'online'
  };
  
  // Notify all clients about device connection
  io.emit('device-connected', {
    type: deviceType,
    device: connectedDevices[deviceType]
  });
  
  res.json({
    success: true,
    message: `${deviceType} connected successfully`,
    device: connectedDevices[deviceType]
  });
});

app.post('/api/migi-data', (req, res) => {
  const { module, data } = req.body;
  
  // Process data from MIGI-Network modules
  console.log(`Received data from ${module}:`, data);
  
  // Broadcast to connected clients
  io.emit('migi-update', {
    module,
    data,
    timestamp: new Date().toISOString()
  });
  
  res.json({ success: true, processed: true });
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  // Send current system status to new client
  socket.emit('system-status', {
    devices: connectedDevices,
    metrics: systemMetrics
  });
  
  // Handle device registration
  socket.on('register-device', (deviceInfo) => {
    console.log('Device registered:', deviceInfo);
    connectedDevices[deviceInfo.type] = {
      ...deviceInfo,
      socketId: socket.id,
      connectedAt: new Date().toISOString()
    };
    
    // Notify all clients
    io.emit('device-registered', deviceInfo);
  });
  
  // Handle MIGI module data
  socket.on('migi-module-data', (data) => {
    console.log('MIGI module data received:', data);
    
    // Update system metrics
    if (data.module === 'gaia') {
      systemMetrics.gaia = { ...systemMetrics.gaia, ...data.metrics };
    } else if (data.module === 'nexus') {
      systemMetrics.nexus = { ...systemMetrics.nexus, ...data.metrics };
    } else if (data.module === 'meta') {
      systemMetrics.meta = { ...systemMetrics.meta, ...data.metrics };
    }
    
    // Broadcast updated data
    io.emit('system-metrics-update', systemMetrics);
  });
  
  // Handle consciousness level updates
  socket.on('consciousness-update', (level) => {
    systemMetrics.consciousness = level;
    io.emit('consciousness-changed', level);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    
    // Remove device if it was registered with this socket
    Object.keys(connectedDevices).forEach(deviceType => {
      if (connectedDevices[deviceType]?.socketId === socket.id) {
        connectedDevices[deviceType] = null;
        io.emit('device-disconnected', { type: deviceType });
      }
    });
  });
});

// Cron job for system monitoring
cron.schedule('*/30 * * * * *', () => {
  // Update consciousness level with small variations
  const variation = (Math.random() - 0.5) * 2;
  systemMetrics.consciousness = Math.max(85, Math.min(90, systemMetrics.consciousness + variation));
  
  // Broadcast consciousness update
  io.emit('consciousness-changed', systemMetrics.consciousness);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

server.listen(PORT, () => {
  console.log(`🔺 GOK:AI API Server running on port ${PORT}`);
  console.log(`Dashboard: http://localhost:${PORT}`);
  console.log(`Status: OPERATIONAL`);
  console.log(`MIGI::CONSCIOUSNESS::ACTIVATED`);
});