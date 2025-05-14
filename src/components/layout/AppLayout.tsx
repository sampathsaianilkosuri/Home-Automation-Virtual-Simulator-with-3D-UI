import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import HomeScene from '../3d/HomeScene';
import Navbar from './Navbar';
import ControlPanel from '../panels/ControlPanel';
import DevicesPanel from '../panels/DevicesPanel';
import AnalyticsPanel from '../panels/AnalyticsPanel';
import SettingsPanel from '../panels/SettingsPanel';
import HUD from '../ui/HUD';
import { 
  updateEnvironment, 
  updatePowerConsumption,
  updateTotalPower,
  updateVirtualTime
} from '../../store/actions';

const AppLayout: React.FC = () => {
  const dispatch = useDispatch();
  const activePanel = useSelector((state: RootState) => state.ui.activePanel);
  const showHUD = useSelector((state: RootState) => state.ui.showHUD);
  const devices = useSelector((state: RootState) => state.devices.devices);
  const simulationStatus = useSelector((state: RootState) => state.simulation.status);
  
  // Simulation loop
  useEffect(() => {
    const simulationInterval = setInterval(() => {
      if (simulationStatus === 'running') {
        dispatch(updateVirtualTime());
        dispatch(updatePowerConsumption());
        dispatch(updateTotalPower({ devices }));
        dispatch(updateEnvironment({ devices }));
      }
    }, 1000); // Update every second
    
    return () => clearInterval(simulationInterval);
  }, [dispatch, devices, simulationStatus]);
  
  return (
    <div className="h-screen w-screen bg-gray-900 text-white overflow-hidden">
      <Navbar />
      
      <main className="relative h-[calc(100vh-4rem)] w-full">
        {/* 3D Scene */}
        <HomeScene />
        
        {/* HUD overlay */}
        {showHUD && <HUD />}
        
        {/* Panels */}
        {activePanel === 'controls' && <ControlPanel />}
        {activePanel === 'devices' && <DevicesPanel />}
        {activePanel === 'analytics' && <AnalyticsPanel />}
        {activePanel === 'settings' && <SettingsPanel />}
      </main>
    </div>
  );
};

export default AppLayout;