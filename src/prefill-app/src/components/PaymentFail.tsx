import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';

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

const PaymentFailed: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  const errorMessage =
    location.state?.message || 'Your payment could not be processed';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleRetry = () => {
    navigate('/products/refill/checkout');
  };

  const handleBackToCart = () => {
    navigate('/products/refill/pharmacy-cart');
  };

  return (
    <div
      className="min-h-screen bg-gray-50 px-8 py-12 lg:px-20 lg:py-16"
      style={{ fontFamily: 'Manrope, sans-serif' }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate('/products/refill/checkout')}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-base font-medium">Back</span>
      </button>

      {/* Step Indicator */}
      <StepIndicator currentStep={3} />

      {/* Failed Content */}
      <div className="max-w-2xl mx-auto">
        <div className="p-12 text-center">
          {/* Animated X Icon */}
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
                className={`absolute inset-0 bg-red-100 rounded-full ${
                  isVisible ? 'animate-ping' : ''
                }`}
                style={{
                  animationIterationCount: '1',
                  animationDuration: '1s',
                }}
              />
              {/* Static outer circle */}
              <div className="relative w-32 h-32 bg-red-50 rounded-full flex items-center justify-center border-4 border-red-100">
                <div
                  className={`w-16 h-16 bg-red-500 rounded-full flex items-center justify-center transition-all duration-500 delay-300 ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}
                >
                  <X className="w-10 h-10 text-white" strokeWidth={3} />
                </div>
              </div>
            </div>
          </div>

          {/* Failed Message */}
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
              Payment Failed
            </h1>
            <p className="text-base text-gray-600 mb-2 max-w-md mx-auto">
              {errorMessage}
            </p>
            <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto">
              Please try again or use a different payment method.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleRetry}
                className="w-full sm:w-auto bg-[#3da467] hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={handleBackToCart}
                className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors"
              >
                Back to Cart
              </button>
            </div>

            {/* Help Text
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">
                Need help with your payment?
              </p>
              <button className="text-[#3da467] text-sm font-semibold hover:underline">
                Contact Support
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
