import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

// Types
interface MonthlyPurchaseProps {
  onBack?: () => void;
  onRemindLater?: () => void;
  onBuyNow?: (selectedItems: string[], subscription?: string) => void;
}

interface ProductItem {
  id: string;
  name: string;
  price: string;
  image: string;
}

const MonthlyPurchase: React.FC<MonthlyPurchaseProps> = ({
  onBack,
  onRemindLater,
  onBuyNow,
}) => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([
    '1',
    '2',
    '3',
    '4',
  ]);
  const [selectedSubscription, setSelectedSubscription] = useState<string>('');

  const products: ProductItem[] = [
    {
      id: '1',
      name: 'Amlodipine',
      price: '₦25,000',
      image: '/prefill-images/medicine bottle.svg',
    },
    {
      id: '2',
      name: 'Amlodipine',
      price: '₦25,000',
      image: '/prefill-images/medicine bottle.svg',
    },
    {
      id: '3',
      name: 'Amlodipine',
      price: '₦25,000',
      image: '/prefill-images/medicine bottle.svg',
    },
    {
      id: '4',
      name: 'Amlodipine',
      price: '₦25,000',
      image: '/prefill-images/medicine bottle.svg',
    },
  ];

  const toggleProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBuyNow = () => {
    if (onBuyNow) {
      onBuyNow(selectedProducts, selectedSubscription);
    }
  };

  return (
    <div
      className="min-h-screen bg-white px-8 py-12 lg:px-20 lg:py-16"
      style={{ fontFamily: 'Manrope, sans-serif' }}
    >
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-12 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-base font-medium">Back</span>
      </button>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Section - Products */}
          <div className="lg:col-span-2">
            <h1
              className="text-3xl lg:text-4xl mb-2"
              style={{
                fontWeight: '400',
                lineHeight: '1.3',
                fontFamily: 'Lexend, sans-serif',
              }}
            >
              Here's what you typically <br /> buy in a month.
            </h1>
            <p
              className="text-sm text-[#000000] mb-8"
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontWeight: '500',
                lineHeight: '1.5',
                fontStyle: 'normal',
              }}
            >
              Buy now and save 10% on your first order
            </p>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {products.map((product) => {
                const isSelected = selectedProducts.includes(product.id);
                return (
                  <button
                    key={product.id}
                    onClick={() => toggleProduct(product.id)}
                    className={`relative p-4 rounded-2xl border-2 transition-all hover:shadow-md ${
                      isSelected
                        ? 'border-[#3da467] bg-[#ecf6ed]'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    {/* Checkbox */}
                    <div className="absolute top-3 right-3">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-[#3da467] border-[#3da467]'
                            : 'bg-white border-gray-300'
                        }`}
                      >
                        {isSelected && (
                          <svg
                            className="w-3 h-3 text-white"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M10 3L4.5 8.5L2 6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Product Image */}
                    <div className="flex flex-col items-center">
                      <img
                        src={product.image}
                        alt=""
                        className="w-32 h-32 object-contain mb-3"
                      />
                      <p
                        className="text-sm font-medium text-[#323232] mb-1"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        {product.name}
                      </p>
                      <p
                        className="text-base font-bold text-gray-900"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        {product.price}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={onRemindLater}
                className="px-6 py-3 border-2 border-[#3da467] text-[#3da467] rounded-full text-sm font-medium hover:bg-green-50 transition-colors"
                style={{ fontFamily: 'Manrope, sans-serif', cursor: 'pointer' }}
              >
                Remind Me Later
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-[#3da467] hover:bg-green-700 text-white px-8 py-3 rounded-full text-sm font-semibold transition-colors"
                style={{ fontFamily: 'Manrope, sans-serif', cursor: 'pointer' }}
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Right Section - Subscribe & Save */}
          <div className="lg:col-span-1">
            <div className="border-2 border-gray-200 rounded-3xl p-6 relative">
              <div className="flex justify-center mb-4">
                <img
                  src="/prefill-images/piggy image.svg"
                  alt="Piggy Bank"
                  className="w-24 h-24 object-contain"
                />
              </div>

              <h2
                className="text-[20px] font-medium mb-3"
                style={{ fontFamily: 'Lexend, sans-serif' }}
              >
                Subscribe & Save
              </h2>
              <p
                className="text-sm text-[#000000] mb-6"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: '400',
                  lineHeight: '1.5',
                  fontStyle: 'normal',
                }}
              >
                Subscribe to autorefill monthly and keep the current price even
                if prices increase.
              </p>

              {/* Subscription Options */}
              <div className="space-y-4 mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="subscription"
                    value="3months"
                    checked={selectedSubscription === '3months'}
                    onChange={(e) => setSelectedSubscription(e.target.value)}
                    className="w-5 h-5 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                  <span
                    className="text-sm text-[#323232]"
                    style={{
                      fontFamily: 'Work Sans, sans-serif',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      lineHeight: 1.5,
                    }}
                  >
                    3 months save 5% more
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="subscription"
                    value="6months"
                    checked={selectedSubscription === '6months'}
                    onChange={(e) => setSelectedSubscription(e.target.value)}
                    className="w-5 h-5 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                  <span
                    className="text-sm text-[#323232]"
                    style={{
                      fontFamily: 'Work Sans, sans-serif',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      lineHeight: 1.5,
                    }}
                  >
                    6 months save 10% more
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="subscription"
                    value="1year"
                    checked={selectedSubscription === '1year'}
                    onChange={(e) => setSelectedSubscription(e.target.value)}
                    className="w-5 h-5 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                  <span
                    className="text-sm text-[#323232]"
                    style={{
                      fontFamily: 'Work Sans, sans-serif',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      lineHeight: 1.5,
                    }}
                  >
                    1 year save 15% more
                  </span>
                </label>
              </div>

              {/* Subscribe Button */}
              <button
                className="w-32 px-6 py-3 border-2 border-[#3da467] text-[#3da467] rounded-full text-sm font-normal hover:bg-green-50 transition-colors"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  cursor: 'pointer',
                  lineHeight: 1.5,
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyPurchase;
