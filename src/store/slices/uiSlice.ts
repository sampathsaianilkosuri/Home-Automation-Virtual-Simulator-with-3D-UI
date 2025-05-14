import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ActivePanel = 'none' | 'controls' | 'devices' | 'analytics' | 'settings';

export interface UiState {
  activePanel: ActivePanel;
  showHUD: boolean;
  showRoomLabels: boolean;
  showTooltips: boolean;
  cameraMode: 'orbit' | 'firstPerson';
  showDeviceDetails: boolean;
}

const initialState: UiState = {
  activePanel: 'none',
  showHUD: true,
  showRoomLabels: true,
  showTooltips: true,
  cameraMode: 'orbit',
  showDeviceDetails: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActivePanel: (state, action: PayloadAction<ActivePanel>) => {
      // Toggle panel if it's already active
      if (state.activePanel === action.payload) {
        state.activePanel = 'none';
      } else {
        state.activePanel = action.payload;
      }
    },
    toggleHUD: (state) => {
      state.showHUD = !state.showHUD;
    },
    toggleRoomLabels: (state) => {
      state.showRoomLabels = !state.showRoomLabels;
    },
    toggleTooltips: (state) => {
      state.showTooltips = !state.showTooltips;
    },
    setCameraMode: (state, action: PayloadAction<'orbit' | 'firstPerson'>) => {
      state.cameraMode = action.payload;
    },
    toggleDeviceDetails: (state) => {
      state.showDeviceDetails = !state.showDeviceDetails;
    },
  },
});

export const { 
  setActivePanel, 
  toggleHUD, 
  toggleRoomLabels, 
  toggleTooltips,
  setCameraMode,
  toggleDeviceDetails
} = uiSlice.actions;

export default uiSlice.reducer;