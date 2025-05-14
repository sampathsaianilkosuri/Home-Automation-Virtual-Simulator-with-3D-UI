import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Device {
  id: string;
  name: string;
  type: 'light' | 'fan';
  state: boolean;
  level: number; // brightness for lights, speed for fans
  powerConsumption: number;
  room: string;
  relayChannel: number;
}

export interface DevicesState {
  devices: Device[];
  selectedDevice: string | null;
}

const initialDevices: Device[] = [
  // Lights
  {
    id: 'light-living-1',
    name: 'Living Room Main Light',
    type: 'light',
    state: false,
    level: 100,
    powerConsumption: 60,
    room: 'living-room',
    relayChannel: 0,
  },
  {
    id: 'light-kitchen-1',
    name: 'Kitchen Light',
    type: 'light',
    state: false,
    level: 100,
    powerConsumption: 40,
    room: 'kitchen',
    relayChannel: 1,
  },
  {
    id: 'light-bedroom-1',
    name: 'Bedroom Light',
    type: 'light',
    state: false,
    level: 100,
    powerConsumption: 35,
    room: 'bedroom',
    relayChannel: 2,
  },
  {
    id: 'light-bathroom-1',
    name: 'Bathroom Light',
    type: 'light',
    state: false,
    level: 100,
    powerConsumption: 25,
    room: 'bathroom',
    relayChannel: 3,
  },
  // Fans
  {
    id: 'fan-living-1',
    name: 'Living Room Fan',
    type: 'fan',
    state: false,
    level: 3,
    powerConsumption: 75,
    room: 'living-room',
    relayChannel: 4,
  },
  {
    id: 'fan-kitchen-1',
    name: 'Kitchen Fan',
    type: 'fan',
    state: false,
    level: 3,
    powerConsumption: 65,
    room: 'kitchen',
    relayChannel: 5,
  },
  {
    id: 'fan-bedroom-1',
    name: 'Bedroom Fan',
    type: 'fan',
    state: false,
    level: 2,
    powerConsumption: 60,
    room: 'bedroom',
    relayChannel: 6,
  },
  {
    id: 'fan-bathroom-1',
    name: 'Bathroom Fan',
    type: 'fan',
    state: false,
    level: 1,
    powerConsumption: 45,
    room: 'bathroom',
    relayChannel: 7,
  },
];

const initialState: DevicesState = {
  devices: initialDevices,
  selectedDevice: null,
};

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    toggleDevice: (state, action: PayloadAction<string>) => {
      const device = state.devices.find((d) => d.id === action.payload);
      if (device) {
        device.state = !device.state;
      }
    },
    setDeviceLevel: (state, action: PayloadAction<{ id: string; level: number }>) => {
      const device = state.devices.find((d) => d.id === action.payload.id);
      if (device) {
        device.level = action.payload.level;
      }
    },
    selectDevice: (state, action: PayloadAction<string | null>) => {
      state.selectedDevice = action.payload;
    },
    updatePowerConsumption: (state) => {
      state.devices.forEach(device => {
        if (device.state) {
          // Calculate power consumption based on device type and level
          const levelFactor = device.type === 'light' ? device.level / 100 : device.level / 5;
          device.powerConsumption = device.type === 'light' 
            ? Math.round(25 + (35 * levelFactor))
            : Math.round(45 + (30 * levelFactor));
        } else {
          device.powerConsumption = 0;
        }
      });
    },
  },
});

export const { toggleDevice, setDeviceLevel, selectDevice, updatePowerConsumption } = devicesSlice.actions;

export default devicesSlice.reducer;