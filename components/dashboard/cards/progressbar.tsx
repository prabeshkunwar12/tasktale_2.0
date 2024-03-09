// components/ProgressBar.tsx
import React from 'react';

interface ProgressBarProps {
  steps: number;
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep }) => {
  const stepWidth = `${(currentStep / steps) * 100}%`;

  return (
    <div className="relative mt-2">
      <div className="flex mb-2 items-center justify-between">
        {Array.from({ length: steps }).map((_, index) => (
          <div
            key={index}
            className={`w-1/5 ${index < currentStep ? 'bg-green-500' : 'bg-gray-300'} rounded-full`}
          >
            {index < currentStep && <span className="text-white">✓</span>}
          </div>
        ))}
      </div>
      <div className="flex mb-2 items-center justify-between">
        <div className="flex-1 h-2">
          <div className={`w-full h-2 bg-gray-300 absolute rounded-full`} />
          <div className={`w-full h-2 bg-green-500 absolute rounded-full`} style={{ width: stepWidth }} />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
