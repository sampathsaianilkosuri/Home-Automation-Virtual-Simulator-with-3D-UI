import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Room = 'living-room' | 'kitchen' | 'bedroom' | 'bathroom';

export interface EnvironmentState {
  currentRoom: Room;
  timeOfDay: number; // 0-24 hours
  dayNightCycle: boolean;
  temperature: Record<Room, number>;
  humidity: Record<Room, number>;
}

const initialState: EnvironmentState = {
  currentRoom: 'living-room',
  timeOfDay: 12, // Noon
  dayNightCycle: true,
  temperature: {
    'living-room': 22,
    'kitchen': 23,
    'bedroom': 21,
    'bathroom': 24,
  },
  humidity: {
    'living-room': 45,
    'kitchen': 55,
    'bedroom': 40,
    'bathroom': 65,
  },
};

const environmentSlice = createSlice({
  name: 'environment',
  initialState,
  reducers: {
    setCurrentRoom: (state, action: PayloadAction<Room>) => {
      state.currentRoom = action.payload;
    },
    setTimeOfDay: (state, action: PayloadAction<number>) => {
      // Ensure time is between 0-24
      state.timeOfDay = Math.max(0, Math.min(24, action.payload));
    },
    toggleDayNightCycle: (state) => {
      state.dayNightCycle = !state.dayNightCycle;
    },
    updateTemperature: (state, action: PayloadAction<{ room: Room; value: number }>) => {
      state.temperature[action.payload.room] = action.payload.value;
    },
    updateHumidity: (state, action: PayloadAction<{ room: Room; value: number }>) => {
      state.humidity[action.payload.room] = action.payload.value;
    },
    updateEnvironment: (state, action: PayloadAction<{ devices: any[] }>) => {
      // Simulate temperature and humidity changes based on device states
      const roomsWithFans = new Set(
        action.payload.devices
          .filter(d => d.type === 'fan' && d.state)
          .map(d => d.room)
      );
      
      Object.keys(state.temperature).forEach(room => {
        // Decrease temperature slightly if fan is on
        if (roomsWithFans.has(room)) {
          state.temperature[room as Room] = Math.max(
            18, 
            state.temperature[room as Room] - 0.2
          );
          state.humidity[room as Room] = Math.max(
            30, 
            state.humidity[room as Room] - 0.5
          );
        } else {
          // Slowly return to baseline
          const baseline = 22;
          state.temperature[room as Room] += 
            state.temperature[room as Room] < baseline ? 0.1 : -0.1;
          
          const humidityBaseline = 50;
          state.humidity[room as Room] += 
            state.humidity[room as Room] < humidityBaseline ? 0.2 : -0.2;
        }
      });
    },
  },
});

export const { 
  setCurrentRoom, 
  setTimeOfDay, 
  toggleDayNightCycle,
  updateTemperature,
  updateHumidity,
  updateEnvironment
} = environmentSlice.actions;

export default environmentSlice.reducer;