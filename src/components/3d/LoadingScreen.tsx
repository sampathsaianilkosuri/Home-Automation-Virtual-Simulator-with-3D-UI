import React from 'react';
import { Html, useProgress } from '@react-three/drei';

const LoadingScreen: React.FC = () => {
  const { progress } = useProgress();
  
  return (
    <Html center>
      <div className="flex flex-col items-center">
        <div className="w-64 h-2 bg-gray-800 rounded-full">
          <div 
            className="h-full bg-blue-500 rounded-full" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white mt-4 text-lg">
          Loading 3D Environment... {Math.round(progress)}%
        </p>
      </div>
    </Html>
  );
};

export default LoadingScreen;