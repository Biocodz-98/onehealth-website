import React, { useState } from 'react';
import { useRefill } from '../Services/refillApi';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Types
interface ProductSearchProps {
  onBack?: () => void;
  onSkip?: () => void;
  onNext?: (product: string) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ onBack, onSkip }) => {
  const navigate = useNavigate();
  const {
    submitFeedback,
    sessionUuid,
    isLoading: globalLoading,
    error: globalError,
  } = useRefill();
  const [product, setProduct] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleNext = async () => {
    // If no product entered, just navigate to next page
    if (!product.trim()) {
      navigate('/products/refill/product-selection');
      return;
    }

    if (!sessionUuid) {
      setError('Session not found. Please start over.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Submit feedback
      await submitFeedback({
        type: 'missing_product',
        content: product.trim(),
      });

      // Show success message and clear input
      setSuccessMessage('Thank you! Your feedback has been submitted.');
      setProduct('');

      // Navigate after a short delay
      setTimeout(() => {
        navigate('/products/refill/product-selection');
      }, 1500);
    } catch (err: any) {
      console.error('Failed to submit feedback:', err);
      setError(err.message || 'Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    } else {
      navigate('/products/refill/product-selection');
    }
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/products/refill/survey/babycare');
    }
  };

  return (
    <div
      className="min-h-screen bg-white flex flex-col"
      style={{ fontFamily: 'Manrope, sans-serif' }}
    >
      {/* Back Button */}
      <div className="px-8 py-8 lg:px-20 lg:py-12">
        <button
          onClick={handleBackClick}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-base font-medium">Back</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-32">
        <div className="w-full max-w-md text-center">
          {/* Heading */}
          <h1
            className="text-3xl lg:text-4xl mb-12 max-w-lg mx-auto"
            style={{
              fontWeight: '400',
              lineHeight: '1.4',
              fontFamily: 'Lexend, sans-serif',
            }}
          >
            Didn't see some of the products you love? Type it here.
          </h1>

          {/* Error Message */}
          {(error || globalError) && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error || globalError}</p>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-600 text-sm">{successMessage}</p>
            </div>
          )}

          {/* Input Field */}
          <div className="mb-8">
            <input
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isSubmitting) {
                  handleNext();
                }
              }}
              placeholder="Type product name (e.g., magnesium glycinate, omega 3)"
              disabled={isSubmitting}
              className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base text-gray-700 placeholder:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            />
            {/* <p className="text-xs text-gray-500 mt-2 text-left">
              Tell us which products you couldn't find and we'll add them to our
              catalog.
            </p> */}
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleSkip}
              disabled={isSubmitting}
              className="px-8 py-3 border-2 border-[#3da467] text-[#3da467] rounded-full text-base font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Skip
            </button>
            <button
              onClick={handleNext}
              disabled={isSubmitting || globalLoading}
              className="bg-[#3da467] hover:bg-green-700 text-white px-8 py-3 rounded-full text-base font-semibold transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  {product.trim() ? 'Submit' : 'Next'}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
