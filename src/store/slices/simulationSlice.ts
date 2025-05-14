import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SimulationMode = 'real-time' | 'accelerated';
export type SimulationStatus = 'running' | 'paused';

export interface SimulationState {
  mode: SimulationMode;
  status: SimulationStatus;
  timeMultiplier: number; // For accelerated mode
  totalPowerConsumption: number;
  powerHistory: { timestamp: number; value: number }[];
  virtualTime: number; // milliseconds since simulation start
  lastUpdateTime: number;
}

const initialState: SimulationState = {
  mode: 'real-time',
  status: 'running',
  timeMultiplier: 1,
  totalPowerConsumption: 0,
  powerHistory: [],
  virtualTime: Date.now(),
  lastUpdateTime: Date.now(),
};

const simulationSlice = createSlice({
  name: 'simulation',
  initialState,
  reducers: {
    setSimulationMode: (state, action: PayloadAction<SimulationMode>) => {
      state.mode = action.payload;
    },
    setSimulationStatus: (state, action: PayloadAction<SimulationStatus>) => {
      state.status = action.payload;
    },
    setTimeMultiplier: (state, action: PayloadAction<number>) => {
      state.timeMultiplier = action.payload;
    },
    updateTotalPower: (state, action: PayloadAction<{ devices: any[] }>) => {
      // Calculate total power based on active devices
      state.totalPowerConsumption = action.payload.devices
        .filter(device => device.state)
        .reduce((total, device) => total + device.powerConsumption, 0);
      
      // Record power history every minute of simulation time
      const now = Date.now();
      if (now - state.lastUpdateTime > 60000) { // 1 minute in real time
        state.powerHistory.push({
          timestamp: state.virtualTime,
          value: state.totalPowerConsumption
        });
        
        // Keep only last 24 hours of data
        const dayInMs = 24 * 60 * 60 * 1000;
        const cutoffTime = state.virtualTime - dayInMs;
        state.powerHistory = state.powerHistory.filter(
          entry => entry.timestamp >= cutoffTime
        );
        
        state.lastUpdateTime = now;
      }
    },
    updateVirtualTime: (state) => {
      const now = Date.now();
      const elapsed = now - state.lastUpdateTime;
      
      if (state.status === 'running') {
        // Update virtual time based on multiplier
        state.virtualTime += elapsed * state.timeMultiplier;
      }
      
      state.lastUpdateTime = now;
    },
    resetSimulation: (state) => {
      state.virtualTime = Date.now();
      state.powerHistory = [];
      state.totalPowerConsumption = 0;
    },
  },
});

export const { 
  setSimulationMode, 
  setSimulationStatus, 
  setTimeMultiplier,
  updateTotalPower,
  updateVirtualTime,
  resetSimulation
} = simulationSlice.actions;

export default simulationSlice.reducer;