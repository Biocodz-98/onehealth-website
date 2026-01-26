import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto mb-12 mt-4">
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div
              key={index}
              className={`h-2 flex-1 rounded-full transition-all duration-500 ease-out ${
                isCompleted || isCurrent ? 'bg-[#3da467]' : 'bg-gray-200'
              }`}
            />
          );
        })}
      </div>
      {/* <div
        className="mt-2 text-sm text-gray-600"
        style={{ fontFamily: 'Manrope, sans-serif' }}
      >
        Step {currentStep} of {totalSteps}
      </div> */}
    </div>
  );
};
