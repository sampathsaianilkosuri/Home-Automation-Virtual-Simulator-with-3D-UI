import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { Mesh, BoxGeometry, MeshStandardMaterial, Group } from 'three';

interface HouseProps {
  onRoomClick: (room: string) => void;
}

const House: React.FC<HouseProps> = ({ onRoomClick }) => {
  const { scene, camera, mouse } = useThree();
  
  // Create a simple house model as fallback
  const model = useMemo(() => {
    const group = new Group();
    
    // Living Room
    const livingRoom = new Mesh(
      new BoxGeometry(4, 3, 4),
      new MeshStandardMaterial({ color: '#cccccc', transparent: true, opacity: 0.5 })
    );
    livingRoom.position.set(3, 1.5, 3);
    livingRoom.name = 'living-room';
    livingRoom.userData = { room: 'living-room', isInteractive: true };
    group.add(livingRoom);
    
    // Kitchen
    const kitchen = new Mesh(
      new BoxGeometry(3, 3, 3),
      new MeshStandardMaterial({ color: '#cccccc', transparent: true, opacity: 0.5 })
    );
    kitchen.position.set(2, 1.5, -3);
    kitchen.name = 'kitchen';
    kitchen.userData = { room: 'kitchen', isInteractive: true };
    group.add(kitchen);
    
    // Bedroom
    const bedroom = new Mesh(
      new BoxGeometry(3, 3, 3),
      new MeshStandardMaterial({ color: '#cccccc', transparent: true, opacity: 0.5 })
    );
    bedroom.position.set(-3, 1.5, 2);
    bedroom.name = 'bedroom';
    bedroom.userData = { room: 'bedroom', isInteractive: true };
    group.add(bedroom);
    
    // Bathroom
    const bathroom = new Mesh(
      new BoxGeometry(2, 3, 2),
      new MeshStandardMaterial({ color: '#cccccc', transparent: true, opacity: 0.5 })
    );
    bathroom.position.set(-2, 1.5, -2);
    bathroom.name = 'bathroom';
    bathroom.userData = { room: 'bathroom', isInteractive: true };
    group.add(bathroom);
    
    return group;
  }, []);
  
  // Handle click events
  const handleClick = (event: any) => {
    event.stopPropagation();
    
    if (event.object.userData.isInteractive && event.object.userData.room) {
      onRoomClick(event.object.userData.room);
    }
  };
  
  return (
    <primitive 
      object={model} 
      scale={[1, 1, 1]} 
      position={[0, 0, 0]} 
      onClick={handleClick}
    />
  );
};

export default House;