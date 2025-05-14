import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import {
  toggleRoomLabels,
  setCameraMode,
  toggleDeviceDetails,
  resetSimulation
} from '../../store/actions';
import {
  Settings,
  Tag,
  Camera,
  Eye,
  RefreshCw,
  Info
} from 'lucide-react';

const SettingsPanel: React.FC = () => {
  const dispatch = useDispatch();
  const showRoomLabels = useSelector((state: RootState) => state.ui.showRoomLabels);
  const cameraMode = useSelector((state: RootState) => state.ui.cameraMode);
  const showDeviceDetails = useSelector((state: RootState) => state.ui.showDeviceDetails);
  
  return (
    <div className="absolute top-4 right-4 z-20 w-80 bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Settings className="mr-2 h-5 w-5 text-blue-400" />
          Simulator Settings
        </h2>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Visual Settings */}
        <div className="space-y-3">
          <h3 className="text-white font-medium mb-1">Visual Settings</h3>
          
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
            <div className="flex items-center">
              <Tag className="h-4 w-4 text-blue-400 mr-2" />
              <span className="text-white text-sm">Room Labels</span>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showRoomLabels}
                onChange={() => dispatch(toggleRoomLabels())}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
            <div className="flex items-center">
              <Info className="h-4 w-4 text-blue-400 mr-2" />
              <span className="text-white text-sm">Device Details</span>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showDeviceDetails}
                onChange={() => dispatch(toggleDeviceDetails())}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
        
        {/* Camera Settings */}
        <div className="space-y-3">
          <h3 className="text-white font-medium mb-1">Camera Mode</h3>
          
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => dispatch(setCameraMode('orbit'))}
              className={`p-2 flex items-center justify-center rounded-lg text-sm ${
                cameraMode === 'orbit'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Camera className="h-4 w-4 mr-2" />
              Orbit
            </button>
            
            <button
              onClick={() => dispatch(setCameraMode('firstPerson'))}
              className={`p-2 flex items-center justify-center rounded-lg text-sm ${
                cameraMode === 'firstPerson'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Eye className="h-4 w-4 mr-2" />
              First Person
            </button>
          </div>
        </div>
        
        {/* Reset */}
        <div className="pt-4 border-t border-gray-700">
          <button
            onClick={() => dispatch(resetSimulation())}
            className="w-full p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset Simulation
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;