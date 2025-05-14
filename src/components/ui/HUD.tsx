import React from 'react';
import { useSelector } from 'react-redux';
import { 
  Thermometer, 
  Droplets, 
  Clock, 
  Zap
} from 'lucide-react';
import { RootState } from '../../store';

const HUD: React.FC = () => {
  const currentRoom = useSelector((state: RootState) => state.environment.currentRoom);
  const timeOfDay = useSelector((state: RootState) => state.environment.timeOfDay);
  const temperature = useSelector((state: RootState) => 
    state.environment.temperature[currentRoom]);
  const humidity = useSelector((state: RootState) => 
    state.environment.humidity[currentRoom]);
  const totalPower = useSelector((state: RootState) => 
    state.simulation.totalPowerConsumption);
  
  // Format time of day
  const formatTime = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.floor((hours - h) * 60);
    const period = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${m.toString().padStart(2, '0')} ${period}`;
  };
  
  // Get room name in display format
  const getRoomDisplayName = (roomId: string) => {
    switch (roomId) {
      case 'living-room': return 'Living Room';
      case 'kitchen': return 'Kitchen';
      case 'bedroom': return 'Bedroom';
      case 'bathroom': return 'Bathroom';
      default: return roomId;
    }
  };
  
  return (
    <div className="absolute top-4 left-4 z-10">
      <div className="bg-gray-900 bg-opacity-70 backdrop-blur-sm rounded-lg p-3 w-64">
        <div className="text-white mb-2 flex justify-between items-center">
          <h3 className="font-medium">
            {getRoomDisplayName(currentRoom)}
          </h3>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1 text-blue-400" />
            <span className="text-sm">{formatTime(timeOfDay)}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 bg-gray-800 rounded flex items-center">
            <Thermometer className="w-5 h-5 mr-2 text-red-400" />
            <div>
              <p className="text-xs text-gray-400">Temperature</p>
              <p className="text-sm text-white">{temperature}°C</p>
            </div>
          </div>
          
          <div className="p-2 bg-gray-800 rounded flex items-center">
            <Droplets className="w-5 h-5 mr-2 text-blue-400" />
            <div>
              <p className="text-xs text-gray-400">Humidity</p>
              <p className="text-sm text-white">{humidity}%</p>
            </div>
          </div>
          
          <div className="p-2 bg-gray-800 rounded flex items-center col-span-2">
            <Zap className="w-5 h-5 mr-2 text-yellow-400" />
            <div>
              <p className="text-xs text-gray-400">Power Usage</p>
              <p className="text-sm text-white">{totalPower} Watts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HUD;