import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

// Types
interface PaymentSuccessProps {
  onBack?: () => void;
  onSeePersona?: () => void;
  onTrackOrder?: () => void;
}

// Step indicator component
const StepIndicator: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  const steps = [
    { number: 1, title: 'Cart', subtitle: 'Confirm your order' },
    {
      number: 2,
      title: 'Checkout',
      subtitle: 'Make sure all your details are correct',
    },
    { number: 3, title: 'Payment', subtitle: 'Select payment method and pay' },
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center w-full">
              <div className="flex items-center w-full">
                <div
                  className={`w-3 h-3 rounded-full ${
                    currentStep >= step.number ? 'bg-[#3da467]' : 'bg-gray-300'
                  }`}
                />
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 ${
                      currentStep > step.number ? 'bg-[#3da467]' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
              <div className="mt-2 text-center">
                <p
                  className={`text-sm font-semibold ${
                    currentStep >= step.number
                      ? 'text-[#3da467]'
                      : 'text-gray-400'
                  }`}
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  {step.title}
                </p>
                <p className="text-xs text-gray-500">{step.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({
  onBack,
  onSeePersona,
  onTrackOrder,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="min-h-screen bg-gray-50 px-8 py-12 lg:px-20 lg:py-16"
      style={{ fontFamily: 'Manrope, sans-serif' }}
    >
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-base font-medium">Back</span>
      </button>

      {/* Step Indicator */}
      <StepIndicator currentStep={3} />

      {/* Success Content */}
      <div className="max-w-2xl mx-auto">
        <div className=" p-12 text-center">
          {/* Animated Checkmark */}
          <div
            className={`mb-8 flex justify-center transition-all duration-700 ${
              isVisible
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-50 translate-y-4'
            }`}
          >
            <div className="relative">
              {/* Outer circle with pulse animation */}
              <div
                className={`absolute inset-0 bg-green-100 rounded-full ${
                  isVisible ? 'animate-ping' : ''
                }`}
                style={{
                  animationIterationCount: '1',
                  animationDuration: '1s',
                }}
              />
              {/* Static outer circle */}
              <div className="relative w-32 h-32 bg-green-50 rounded-full flex items-center justify-center border-4 border-green-100">
                {/* Inner circle */}

                <img
                  src="/prefill-images/payment check.svg"
                  alt="Success"
                  className={`w-16 h-16 transition-all duration-500 delay-300 ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div
            className={`transition-all duration-700 delay-500 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <h1
              className="text-3xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: 'Lexend, sans-serif' }}
            >
              Order Successful
            </h1>
            <p className="text-base text-gray-600 mb-8 max-w-md mx-auto">
              Your order has been placed. Please check "My Orders" to track the
              progress of your order.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onSeePersona}
                className="w-full sm:w-auto bg-[#3da467] hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
              >
                See Your Persona
              </button>
              <button
                onClick={onTrackOrder}
                className="w-full sm:w-auto border-2 border-[#3da467] text-[#3da467] px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors"
              >
                Track Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
