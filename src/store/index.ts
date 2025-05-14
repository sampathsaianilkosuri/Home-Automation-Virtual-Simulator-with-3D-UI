import { configureStore } from '@reduxjs/toolkit';
import devicesReducer from './slices/devicesSlice';
import environmentReducer from './slices/environmentSlice';
import simulationReducer from './slices/simulationSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    devices: devicesReducer,
    environment: environmentReducer,
    simulation: simulationReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;