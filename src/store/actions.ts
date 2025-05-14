import { 
  toggleDevice, 
  setDeviceLevel, 
  updatePowerConsumption,
  selectDevice 
} from './slices/devicesSlice';
import {
  updateEnvironment,
  setCurrentRoom,
  setTimeOfDay,
  toggleDayNightCycle
} from './slices/environmentSlice';
import {
  updateTotalPower,
  updateVirtualTime,
  setSimulationMode,
  setSimulationStatus,
  setTimeMultiplier,
  resetSimulation
} from './slices/simulationSlice';
import {
  setActivePanel,
  toggleHUD,
  toggleRoomLabels,
  setCameraMode,
  toggleDeviceDetails
} from './slices/uiSlice';

export {
  // Device actions
  toggleDevice,
  setDeviceLevel,
  updatePowerConsumption,
  selectDevice,
  
  // Environment actions
  updateEnvironment,
  setCurrentRoom,
  setTimeOfDay,
  toggleDayNightCycle,
  
  // Simulation actions
  updateTotalPower,
  updateVirtualTime,
  setSimulationMode,
  setSimulationStatus,
  setTimeMultiplier,
  resetSimulation,
  
  // UI actions
  setActivePanel,
  toggleHUD,
  toggleRoomLabels,
  setCameraMode,
  toggleDeviceDetails
};