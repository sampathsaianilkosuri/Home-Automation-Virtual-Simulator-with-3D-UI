import React, { Suspense, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  useGLTF,
  Sky,
  Stats
} from '@react-three/drei';
import { RootState } from '../../store';
import House from './House';
import Devices from './Devices';
import RoomLabels from './RoomLabels';
import LoadingScreen from './LoadingScreen';
import { setCurrentRoom } from '../../store/actions';

// Preload all 3D models
useGLTF.preload('/models/house.glb');
useGLTF.preload('/models/devices.glb');

const HomeScene: React.FC = () => {
  const dispatch = useDispatch();
  const timeOfDay = useSelector((state: RootState) => state.environment.timeOfDay);
  const showRoomLabels = useSelector((state: RootState) => state.ui.showRoomLabels);
  const cameraMode = useSelector((state: RootState) => state.ui.cameraMode);
  
  // Calculate light intensity and color based on time of day
  const sunPosition = getSunPosition(timeOfDay);
  const lightIntensity = getLightIntensity(timeOfDay);
  const ambientLight = getAmbientLight(timeOfDay);
  
  // Camera settings
  const cameraRef = useRef();
  const cameraPosition = getCameraPositionForRoom(
    useSelector((state: RootState) => state.environment.currentRoom)
  );
  
  // Handle room click
  const handleRoomClick = (room: string) => {
    dispatch(setCurrentRoom(room as any));
  };
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Canvas shadows>
        <Stats />
        
        {/* Camera */}
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          position={cameraPosition}
          fov={60}
          near={0.1}
          far={1000}
        />
        
        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={cameraMode === 'orbit'}
          enableRotate={true}
          minDistance={1}
          maxDistance={20}
          target={[0, 1, 0]}
        />
        
        {/* Environment */}
        <Sky 
          sunPosition={sunPosition} 
          turbidity={10}
          rayleigh={0.5}
          mieCoefficient={0.005}
          mieDirectionalG={0.8}
        />
        
        {/* Lighting */}
        <ambientLight intensity={ambientLight.intensity} color={ambientLight.color} />
        <directionalLight 
          position={sunPosition} 
          intensity={lightIntensity}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        {/* Scene */}
        <Suspense fallback={<LoadingScreen />}>
          <Environment preset="apartment" />
          <House onRoomClick={handleRoomClick} />
          <Devices />
          {showRoomLabels && <RoomLabels />}
        </Suspense>
      </Canvas>
    </div>
  );
};

// Helper functions
function getSunPosition(timeOfDay: number): [number, number, number] {
  const angle = (timeOfDay - 12) * (Math.PI / 12);
  const height = Math.sin(angle) * 20;
  const distance = Math.cos(angle) * 20;
  return [distance, height, -distance];
}

function getLightIntensity(timeOfDay: number): number {
  // Brightest at noon (12), dark at night (0 and 24)
  if (timeOfDay < 6 || timeOfDay > 18) {
    return 0.1; // Night
  } else if (timeOfDay > 7 && timeOfDay < 17) {
    return 1.0; // Day
  } else {
    // Dawn or dusk
    return 0.5;
  }
}

function getAmbientLight(timeOfDay: number): { intensity: number; color: string } {
  if (timeOfDay < 6 || timeOfDay > 18) {
    return { intensity: 0.3, color: '#102040' }; // Night blue
  } else if (timeOfDay > 7 && timeOfDay < 17) {
    return { intensity: 0.7, color: '#ffffff' }; // Day white
  } else {
    // Dawn or dusk
    return { intensity: 0.5, color: '#ff9966' }; // Orange sunset
  }
}

function getCameraPositionForRoom(room: string): [number, number, number] {
  switch (room) {
    case 'living-room':
      return [5, 2, 5];
    case 'kitchen':
      return [2, 2, -5];
    case 'bedroom':
      return [-5, 2, 2];
    case 'bathroom':
      return [-2, 2, -3];
    default:
      return [0, 5, 10];
  }
}

export default HomeScene;