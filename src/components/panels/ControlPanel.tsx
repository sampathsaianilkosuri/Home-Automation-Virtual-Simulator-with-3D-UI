import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { 
  setTimeOfDay, 
  toggleDayNightCycle,
  setTimeMultiplier,
  setSimulationMode
} from '../../store/actions';
import { 
  Sun, 
  Moon, 
  FastForward,
  Hourglass
} from 'lucide-react';

const ControlPanel: React.FC = () => {
  const dispatch = useDispatch();
  const timeOfDay = useSelector((state: RootState) => state.environment.timeOfDay);
  const dayNightCycle = useSelector((state: RootState) => state.environment.dayNightCycle);
  const simulationMode = useSelector((state: RootState) => state.simulation.mode);
  const timeMultiplier = useSelector((state: RootState) => state.simulation.timeMultiplier);
  
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTimeOfDay(parseFloat(e.target.value)));
  };
  
  const handleCycleToggle = () => {
    dispatch(toggleDayNightCycle());
  };
  
  const handleModeChange = (mode: 'real-time' | 'accelerated') => {
    dispatch(setSimulationMode(mode));
  };
  
  const handleMultiplierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTimeMultiplier(parseFloat(e.target.value)));
  };
  
  return (
    <div className="absolute top-4 right-4 z-20 w-80 bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Hourglass className="mr-2 h-5 w-5 text-blue-400" />
          Simulation Controls
        </h2>
      </div>
      
      <div className="p-4 space-y-6">
        {/* Time of Day */}
        <div>
          <div className="flex justify-between mb-2">
            <h3 className="text-white font-medium">Time of Day</h3>
            <span className="text-blue-400 text-sm">
              {Math.floor(timeOfDay)}:{Math.floor((timeOfDay % 1) * 60).toString().padStart(2, '0')}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Moon className="h-5 w-5 text-gray-400" />
            <input
              type="range"
              min="0"
              max="24"
              step="0.5"
              value={timeOfDay}
              onChange={handleTimeChange}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <Sun className="h-5 w-5 text-yellow-400" />
          </div>
          
          <div className="mt-2 flex items-center">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={dayNightCycle}
                onChange={handleCycleToggle}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-300">Auto Day/Night Cycle</span>
            </label>
          </div>
        </div>
        
        {/* Simulation Speed */}
        <div>
          <div className="flex justify-between mb-2">
            <h3 className="text-white font-medium">Simulation Mode</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              onClick={() => handleModeChange('real-time')}
              className={`py-2 px-4 rounded-md text-sm font-medium ${
                simulationMode === 'real-time'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Real Time
            </button>
            <button
              onClick={() => handleModeChange('accelerated')}
              className={`py-2 px-4 rounded-md text-sm font-medium ${
                simulationMode === 'accelerated'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Accelerated
            </button>
          </div>
          
          {simulationMode === 'accelerated' && (
            <div>
              <div className="flex justify-between mb-2">
                <h3 className="text-white font-medium">Time Multiplier</h3>
                <span className="text-blue-400 text-sm">{timeMultiplier}x</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-sm">1x</span>
                <input
                  type="range"
                  min="1"
                  max="60"
                  step="1"
                  value={timeMultiplier}
                  onChange={handleMultiplierChange}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <FastForward className="h-5 w-5 text-blue-400" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;