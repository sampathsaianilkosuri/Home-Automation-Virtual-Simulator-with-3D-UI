import React, { useMemo } from 'react';
import { Mesh, SphereGeometry, MeshStandardMaterial, Group } from 'three';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export function Devices() {
  const devices = useSelector((state: RootState) => state.devices.devices);
  
  // Create simple device representations
  const model = useMemo(() => {
    const group = new Group();
    
    devices.forEach((device) => {
      const deviceMesh = new Mesh(
        new SphereGeometry(0.2, 16, 16),
        new MeshStandardMaterial({ 
          color: device.type === 'light' ? '#ffff00' : '#0088ff',
          emissive: device.state ? (device.type === 'light' ? '#ffff00' : '#0088ff') : '#000000',
          emissiveIntensity: device.state ? 0.5 : 0
        })
      );
      
      // Position devices based on their room
      switch (device.room) {
        case 'living-room':
          deviceMesh.position.set(3, 2.5, 3);
          break;
        case 'kitchen':
          deviceMesh.position.set(2, 2.5, -3);
          break;
        case 'bedroom':
          deviceMesh.position.set(-3, 2.5, 2);
          break;
        case 'bathroom':
          deviceMesh.position.set(-2, 2.5, -2);
          break;
      }
      
      deviceMesh.name = device.id;
      group.add(deviceMesh);
    });
    
    return group;
  }, [devices]);
  
  return <primitive object={model} />;
}

export default Devices;