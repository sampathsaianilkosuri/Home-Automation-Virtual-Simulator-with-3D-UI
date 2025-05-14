import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { 
  toggleDevice, 
  setDeviceLevel 
} from '../../store/actions';
import { 
  Lightbulb, 
  Fan,
  Power, 
  ToggleLeft, 
  ToggleRight,
} from 'lucide-react';

const DevicesPanel: React.FC = () => {
  const dispatch = useDispatch();
  const devices = useSelector((state: RootState) => state.devices.devices);
  const currentRoom = useSelector((state: RootState) => state.environment.currentRoom);
  
  // Filter devices by room
  const roomDevices = devices.filter(device => device.room === currentRoom);
  
  // Group devices by type
  const lights = roomDevices.filter(device => device.type === 'light');
  const fans = roomDevices.filter(device => device.type === 'fan');
  
  const handleToggleDevice = (deviceId: string) => {
    dispatch(toggleDevice(deviceId));
  };
  
  const handleSetLevel = (deviceId: string, level: number) => {
    dispatch(setDeviceLevel({ id: deviceId, level }));
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
    <div className="absolute top-4 right-4 z-20 w-80 bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Power className="mr-2 h-5 w-5 text-blue-400" />
          {getRoomDisplayName(currentRoom)} Devices
        </h2>
      </div>
      
      <div className="p-4 space-y-6">
        {/* Lights Section */}
        {lights.length > 0 && (
          <div>
            <h3 className="text-white font-medium mb-3 flex items-center">
              <Lightbulb className="mr-2 h-4 w-4 text-yellow-400" />
              Lights
            </h3>
            
            <div className="space-y-4">
              {lights.map(light => (
                <div key={light.id} className="bg-gray-800 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white">{light.name}</span>
                    <button
                      onClick={() => handleToggleDevice(light.id)}
                      className="text-white"
                    >
                      {light.state ? (
                        <ToggleRight className="h-6 w-6 text-blue-400" />
                      ) : (
                        <ToggleLeft className="h-6 w-6 text-gray-500" />
                      )}
                    </button>
                  </div>
                  
                  {light.state && (
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-400 text-sm">Brightness</span>
                        <span className="text-blue-400 text-sm">{light.level}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={light.level}
                        onChange={(e) => handleSetLevel(light.id, parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                      
                      <div className="mt-2 text-gray-400 text-sm flex justify-between">
                        <span>Power: {light.powerConsumption}W</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Fans Section */}
        {fans.length > 0 && (
          <div>
            <h3 className="text-white font-medium mb-3 flex items-center">
              <Fan className="mr-2 h-4 w-4 text-blue-400" />
              Fans
            </h3>
            
            <div className="space-y-4">
              {fans.map(fan => (
                <div key={fan.id} className="bg-gray-800 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white">{fan.name}</span>
                    <button
                      onClick={() => handleToggleDevice(fan.id)}
                      className="text-white"
                    >
                      {fan.state ? (
                        <ToggleRight className="h-6 w-6 text-blue-400" />
                      ) : (
                        <ToggleLeft className="h-6 w-6 text-gray-500" />
                      )}
                    </button>
                  </div>
                  
                  {fan.state && (
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-400 text-sm">Speed</span>
                        <span className="text-blue-400 text-sm">{fan.level}</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={fan.level}
                        onChange={(e) => handleSetLevel(fan.id, parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                      
                      <div className="mt-2 text-gray-400 text-sm flex justify-between">
                        <span>Power: {fan.powerConsumption}W</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {roomDevices.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No devices in this room</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DevicesPanel;