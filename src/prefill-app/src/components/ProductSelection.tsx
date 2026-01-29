import React, { useState, useEffect } from 'react';
import { useRefill } from '../Services/refillApi';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

// Types
interface ProductItem {
  id: string;
  name: string;
  price: string;
  image: string;
}

const MonthlyPurchase: React.FC = () => {
  const navigate = useNavigate();
  const { getCart, addToCart, addToWishlist, sessionUuid, isLoading, error } =
    useRefill();

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedSubscription, setSelectedSubscription] = useState<string>('');
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  // Fetch cart products on mount
  useEffect(() => {
    const fetchCartProducts = async () => {
      if (!sessionUuid) return;

      try {
        setIsLoadingProducts(true);
        const cartData: any = await getCart();

        console.log('Cart Data from API:', cartData);

        // Get cached products from localStorage (saved during surveys)
        const cachedMedicines = JSON.parse(
          localStorage.getItem(`medicines_${sessionUuid}`) || '[]',
        );
        const cachedSkincares = JSON.parse(
          localStorage.getItem(`skincares_${sessionUuid}`) || '[]',
        );
        const cachedBabycares = JSON.parse(
          localStorage.getItem(`babycares_${sessionUuid}`) || '[]',
        );

        // Combine all cached products
        const allCachedProducts = [
          ...cachedMedicines,
          ...cachedSkincares,
          ...cachedBabycares,
        ];

        const productsList: ProductItem[] = cartData.map((item: any) => {
          const productId = item.product_id?.toString();

          // Find matching product from cache
          const cachedProduct = allCachedProducts.find(
            (p) => p.id.toString() === productId,
          );

          return {
            id: productId || '',
            name: cachedProduct?.name || 'Unknown Product',
            price: `₦${((cachedProduct as any)?.price || item.amount || 0).toLocaleString()}`,
            image:
              cachedProduct?.image || '/prefill-images/medicine bottle.svg',
          };
        });

        console.log('Parsed Products List:', productsList);

        setProducts(productsList);
        setSelectedProducts(productsList.map((p) => p.id));
      } catch (err) {
        console.error('Failed to fetch cart:', err);
        alert('Failed to load your selected products. Please try again.');
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchCartProducts();
  }, [sessionUuid, navigate]);

  const toggleProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleBuyNow = async () => {
    if (selectedProducts.length === 0) {
      alert('Please select at least one product');
      return;
    }

    try {
      for (const productId of selectedProducts) {
        await addToCart({
          product_id: parseInt(productId),
          quantity: 1,
          purchase_type: 'buy_now',
        });
      }

      navigate('/products/refill/pharmacy-cart');
    } catch (err) {
      console.error('Failed to add to cart:', err);
      alert('Failed to add products to cart. Please try again.');
    }
  };

  const handleRemindLater = async () => {
    if (selectedProducts.length === 0) {
      alert('Please select at least one product');
      return;
    }

    try {
      // Add each selected product to wishlist
      for (const productId of selectedProducts) {
        await addToWishlist(parseInt(productId));
      }

      alert("Products saved to wishlist! We'll remind you later.");

      const selectedProductDetails = products.filter((p) =>
        selectedProducts.includes(p.id),
      );
      navigate('/products/refill/remind-me-later-persona', {
        state: { selectedProducts: selectedProductDetails },
      });
    } catch (err) {
      console.error('Failed to add to wishlist:', err);
    }
  };

  const handleSubscribe = async () => {
    if (!selectedSubscription) {
      alert('Please select a subscription plan');
      return;
    }

    if (selectedProducts.length === 0) {
      alert('Please select at least one product');
      return;
    }

    try {
      let durationMonths: number = 1;
      if (selectedSubscription === '3months') durationMonths = 3;
      else if (selectedSubscription === '6months') durationMonths = 6;
      else if (selectedSubscription === '1year') durationMonths = 12;

      // Add products as subscription
      for (const productId of selectedProducts) {
        await addToCart({
          product_id: parseInt(productId),
          quantity: 1,
          purchase_type: 'subscription',
          duration_months: durationMonths,
        });
      }

      navigate('/products/refill/pharmacy-cart');
    } catch (err) {
      console.error('Failed to subscribe:', err);
      alert('Failed to add subscription. Please try again.');
    }
  };

  // Loading state
  if (isLoadingProducts) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          {/* <p className="text-gray-600">Loading your selected products...</p> */}
        </div>
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No products selected yet.</p>
          <button
            onClick={() => navigate('/products/refill/survey')}
            className="bg-[#3da467] text-white px-6 py-2 rounded-full"
          >
            Complete Survey
          </button>
          <ProgressBar currentStep={6} totalSteps={9} />
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white px-8 py-12 lg:px-20 lg:py-16"
      style={{ fontFamily: 'Manrope, sans-serif' }}
    >
      <ProgressBar currentStep={6} totalSteps={9} />
      {/* Back Button */}
      <button
        onClick={() => navigate('/products/refill/survey/product-search')}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-12 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-base font-medium">Back</span>
      </button>

      {/* Error Display */}
      {error && (
        <div className="max-w-7xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

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
                        alt={product.name}
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

            {/* Selection Counter */}
            {selectedProducts.length > 0 && (
              <p className="text-sm text-gray-600 mb-4">
                {selectedProducts.length} product
                {selectedProducts.length !== 1 ? 's' : ''} selected
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleRemindLater}
                disabled={isLoading || selectedProducts.length === 0}
                className="px-6 py-3 border-2 border-[#3da467] text-[#3da467] rounded-full text-sm font-medium hover:bg-green-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                {isLoading ? 'Saving...' : 'Remind Me Later'}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={isLoading || selectedProducts.length === 0}
                className="bg-[#3da467] hover:bg-green-700 text-white px-8 py-3 rounded-full text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                {isLoading ? 'Processing...' : 'Buy Now'}
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
                onClick={handleSubscribe}
                disabled={
                  isLoading ||
                  !selectedSubscription ||
                  selectedProducts.length === 0
                }
                className="w-full px-6 py-3 border-2 border-[#3da467] text-[#3da467] rounded-full text-sm font-medium hover:bg-green-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  lineHeight: 1.5,
                }}
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyPurchase;
