import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { 
  setActivePanel, 
  toggleHUD,
  setSimulationStatus,
  resetSimulation
} from '../../store/actions';
import { 
  Home, 
  Settings, 
  Sliders, 
  PieChart, 
  Power, 
  Play, 
  Pause, 
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const activePanel = useSelector((state: RootState) => state.ui.activePanel);
  const showHUD = useSelector((state: RootState) => state.ui.showHUD);
  const simulationStatus = useSelector((state: RootState) => state.simulation.status);
  
  const isActive = (panel: string) => activePanel === panel ? 'bg-blue-800' : 'hover:bg-gray-700';
  
  return (
    <header className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6">
      <div className="flex items-center space-x-2">
        <Power className="h-6 w-6 text-blue-400" />
        <h1 className="text-xl font-bold text-white">Home Automation Simulator</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Simulation Controls */}
        <div className="flex items-center space-x-2 mr-6">
          <button 
            onClick={() => dispatch(setSimulationStatus(
              simulationStatus === 'running' ? 'paused' : 'running'
            ))}
            className="p-2 rounded-full hover:bg-gray-700"
            title={simulationStatus === 'running' ? 'Pause Simulation' : 'Resume Simulation'}
          >
            {simulationStatus === 'running' ? (
              <Pause className="h-5 w-5 text-white" />
            ) : (
              <Play className="h-5 w-5 text-white" />
            )}
          </button>
          
          <button 
            onClick={() => dispatch(resetSimulation())}
            className="p-2 rounded-full hover:bg-gray-700"
            title="Reset Simulation"
          >
            <RefreshCw className="h-5 w-5 text-white" />
          </button>
        </div>
        
        {/* Main Navigation */}
        <button 
          onClick={() => dispatch(setActivePanel('controls'))}
          className={`p-2 rounded-full ${isActive('controls')}`}
          title="Control Panel"
        >
          <Sliders className="h-5 w-5 text-white" />
        </button>
        
        <button 
          onClick={() => dispatch(setActivePanel('devices'))}
          className={`p-2 rounded-full ${isActive('devices')}`}
          title="Devices"
        >
          <Home className="h-5 w-5 text-white" />
        </button>
        
        <button 
          onClick={() => dispatch(setActivePanel('analytics'))}
          className={`p-2 rounded-full ${isActive('analytics')}`}
          title="Analytics"
        >
          <PieChart className="h-5 w-5 text-white" />
        </button>
        
        <button 
          onClick={() => dispatch(setActivePanel('settings'))}
          className={`p-2 rounded-full ${isActive('settings')}`}
          title="Settings"
        >
          <Settings className="h-5 w-5 text-white" />
        </button>
        
        <button 
          onClick={() => dispatch(toggleHUD())}
          className="p-2 rounded-full hover:bg-gray-700 ml-4"
          title={showHUD ? 'Hide HUD' : 'Show HUD'}
        >
          {showHUD ? (
            <EyeOff className="h-5 w-5 text-white" />
          ) : (
            <Eye className="h-5 w-5 text-white" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;