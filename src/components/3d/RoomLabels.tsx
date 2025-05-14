import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Html } from '@react-three/drei';
import { RootState } from '../../store';
import { setCurrentRoom } from '../../store/actions';

type RoomPosition = {
  position: [number, number, number];
  name: string;
  id: string;
};

const RoomLabels: React.FC = () => {
  const dispatch = useDispatch();
  const currentRoom = useSelector((state: RootState) => state.environment.currentRoom);
  
  const roomPositions: RoomPosition[] = [
    { position: [3, 1, 3], name: 'Living Room', id: 'living-room' },
    { position: [2, 1, -3], name: 'Kitchen', id: 'kitchen' },
    { position: [-3, 1, 1], name: 'Bedroom', id: 'bedroom' },
    { position: [-1, 1, -2], name: 'Bathroom', id: 'bathroom' },
  ];
  
  const handleRoomClick = (roomId: string) => {
    dispatch(setCurrentRoom(roomId as any));
  };
  
  return (
    <>
      {roomPositions.map((room) => (
        <Html
          key={room.id}
          position={room.position}
          center
          distanceFactor={15}
        >
          <div 
            className={`px-3 py-1 rounded-lg text-white text-sm cursor-pointer transition-all
              ${currentRoom === room.id 
                ? 'bg-blue-600' 
                : 'bg-gray-800 bg-opacity-70 hover:bg-gray-700'
              }`}
            onClick={() => handleRoomClick(room.id)}
          >
            {room.name}
          </div>
        </Html>
      ))}
    </>
  );
};

export default RoomLabels;