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
  const { saveSurvey, isLoading, error } = useRefill();
  const [product, setProduct] = useState<string>('');

  const handleNext = async () => {
    if (!product.trim()) {
      navigate('/products/refill/product-selection');
      return;
    }

    try {
      await saveSurvey('custom_products', [
        {
          question_key: 'manually_added',
          value: [product.toLowerCase()],
        },
      ]);

      navigate('/products/refill/product-selection');
    } catch (err) {
      console.error('Failed to save custom product:', err);
    }
  };
  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };

  return (
    <div
      className="min-h-screen bg-white flex flex-col"
      style={{ fontFamily: 'Manrope, sans-serif', cursor: 'pointer' }}
    >
      {/* Back Button */}
      <div className="px-8 py-8 lg:px-20 lg:py-12">
        <button
          onClick={onBack}
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

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Input Field */}
          <div className="mb-8">
            <input
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="Type product"
              className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base text-gray-700 placeholder:text-gray-400"
              style={{ fontFamily: 'Manrope, sans-serif', cursor: 'pointer' }}
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleSkip}
              className="px-8 py-3 border-2 border-[#3da467] text-[#3da467] rounded-full text-base font-medium hover:bg-gray-50 transition-colors"
              style={{ fontFamily: 'Manrope, sans-serif', cursor: 'pointer' }}
            >
              Skip
            </button>
            <button
              onClick={handleNext}
              disabled={isLoading}
              className="bg-[#3da467] hover:bg-green-700 text-white px-8 py-3 rounded-full text-base font-semibold transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Next'}
              {!isLoading && (
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
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
