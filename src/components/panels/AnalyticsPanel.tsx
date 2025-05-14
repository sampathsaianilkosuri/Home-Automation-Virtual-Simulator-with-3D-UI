import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { 
  BarChart, 
  DollarSign, 
  Zap, 
  AreaChart,
  Thermometer,
  Lightbulb,
  Fan
} from 'lucide-react';

// Simple chart component
const SimpleChart = ({ data, height = 100, color = '#3366FF' }: any) => {
  const maxValue = Math.max(...data.map((d: any) => d.value), 1);
  
  return (
    <div style={{ height: `${height}px` }} className="w-full relative">
      <div className="absolute inset-0 flex items-end">
        {data.map((point: any, index: number) => (
          <div 
            key={index} 
            className="flex-1 flex items-end mx-px"
            title={`${point.value} W`}
          >
            <div 
              style={{ 
                height: `${(point.value / maxValue) * 100}%`,
                backgroundColor: color
              }} 
              className="w-full rounded-t"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const AnalyticsPanel: React.FC = () => {
  const devices = useSelector((state: RootState) => state.devices.devices);
  const totalPower = useSelector((state: RootState) => state.simulation.totalPowerConsumption);
  const powerHistory = useSelector((state: RootState) => state.simulation.powerHistory);
  const temperature = useSelector((state: RootState) => state.environment.temperature);
  
  // Calculate energy cost (assuming $0.15 per kWh)
  const hourlyEnergyCost = totalPower * 0.15 / 1000;
  const dailyEnergyCost = hourlyEnergyCost * 24;
  
  // Calculate device usage stats
  const deviceStats = useMemo(() => {
    const activeDevices = devices.filter(d => d.state);
    
    const byType = {
      light: {
        count: devices.filter(d => d.type === 'light').length,
        active: activeDevices.filter(d => d.type === 'light').length,
        power: activeDevices
          .filter(d => d.type === 'light')
          .reduce((sum, d) => sum + d.powerConsumption, 0)
      },
      fan: {
        count: devices.filter(d => d.type === 'fan').length,
        active: activeDevices.filter(d => d.type === 'fan').length,
        power: activeDevices
          .filter(d => d.type === 'fan')
          .reduce((sum, d) => sum + d.powerConsumption, 0)
      }
    };
    
    return byType;
  }, [devices]);
  
  // Prepare chart data
  const chartData = useMemo(() => {
    // If no history, generate some sample data
    if (powerHistory.length === 0) {
      return Array(12).fill(0).map((_, i) => ({
        value: Math.random() * 100 + 50
      }));
    }
    
    return powerHistory.map(entry => ({
      value: entry.value
    }));
  }, [powerHistory]);
  
  return (
    <div className="absolute top-4 right-4 z-20 w-80 bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white flex items-center">
          <BarChart className="mr-2 h-5 w-5 text-blue-400" />
          Usage Analytics
        </h2>
      </div>
      
      <div className="p-4 space-y-6">
        {/* Current Power Usage */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-gray-300 text-sm mb-1">Total Power Consumption</h3>
          <div className="flex justify-between items-end">
            <div className="flex items-center">
              <Zap className="h-5 w-5 text-yellow-400 mr-2" />
              <span className="text-2xl font-bold text-white">{totalPower}</span>
              <span className="text-gray-400 ml-1">Watts</span>
            </div>
            <div className="text-right">
              <div className="text-green-400 text-sm flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                <span>${hourlyEnergyCost.toFixed(2)}/hr</span>
              </div>
              <div className="text-gray-400 text-xs">
                ${dailyEnergyCost.toFixed(2)}/day
              </div>
            </div>
          </div>
        </div>
        
        {/* Power Usage Chart */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-white font-medium flex items-center">
              <AreaChart className="mr-2 h-4 w-4 text-blue-400" />
              Power History
            </h3>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <SimpleChart data={chartData} height={120} />
            <div className="flex justify-between mt-1 text-xs text-gray-400">
              <span>Past</span>
              <span>Now</span>
            </div>
          </div>
        </div>
        
        {/* Device Stats */}
        <div>
          <h3 className="text-white font-medium mb-2">Device Stats</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="flex items-center mb-2">
                <Lightbulb className="h-4 w-4 text-yellow-400 mr-2" />
                <span className="text-white">Lights</span>
              </div>
              <div className="grid grid-cols-2 gap-1 text-sm">
                <div className="text-gray-400">Active:</div>
                <div className="text-white">{deviceStats.light.active}/{deviceStats.light.count}</div>
                <div className="text-gray-400">Power:</div>
                <div className="text-white">{deviceStats.light.power}W</div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="flex items-center mb-2">
                <Fan className="h-4 w-4 text-blue-400 mr-2" />
                <span className="text-white">Fans</span>
              </div>
              <div className="grid grid-cols-2 gap-1 text-sm">
                <div className="text-gray-400">Active:</div>
                <div className="text-white">{deviceStats.fan.active}/{deviceStats.fan.count}</div>
                <div className="text-gray-400">Power:</div>
                <div className="text-white">{deviceStats.fan.power}W</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Temperature Map */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-white font-medium flex items-center">
              <Thermometer className="mr-2 h-4 w-4 text-red-400" />
              Temperature Map
            </h3>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-3 grid grid-cols-2 gap-2 text-sm">
            <div className="p-2 rounded" style={{background: 'rgba(255,100,100,0.2)'}}>
              <div className="text-gray-300 text-xs">Living Room</div>
              <div className="text-white">{temperature['living-room']}°C</div>
            </div>
            <div className="p-2 rounded" style={{background: 'rgba(255,150,100,0.2)'}}>
              <div className="text-gray-300 text-xs">Kitchen</div>
              <div className="text-white">{temperature['kitchen']}°C</div>
            </div>
            <div className="p-2 rounded" style={{background: 'rgba(100,150,255,0.2)'}}>
              <div className="text-gray-300 text-xs">Bedroom</div>
              <div className="text-white">{temperature['bedroom']}°C</div>
            </div>
            <div className="p-2 rounded" style={{background: 'rgba(100,255,200,0.2)'}}>
              <div className="text-gray-300 text-xs">Bathroom</div>
              <div className="text-white">{temperature['bathroom']}°C</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;