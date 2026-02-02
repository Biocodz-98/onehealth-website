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
  const { getCart, updateCart, addToWishlist, sessionUuid, isLoading, error } =
    useRefill();

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedSubscription, setSelectedSubscription] = useState<string>('');
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [hasFetchedCart, setHasFetchedCart] = useState(false);

  // Fetch cart products on mount
  useEffect(() => {
    if (hasFetchedCart || !sessionUuid) return;

    const fetchCartProducts = async () => {
      try {
        setIsLoadingProducts(true);

        console.log('=== FETCHING CART ===');
        console.log('Session UUID:', sessionUuid);

        const cartData: any = await getCart();

        console.log('=== RAW CART API RESPONSE ===');
        console.log('Type:', typeof cartData);
        console.log('Is Array:', Array.isArray(cartData));
        console.log('Full response:', JSON.stringify(cartData, null, 2));

        let cartItems: any[] = [];

        // Try multiple ways to extract the items array
        if (Array.isArray(cartData)) {
          console.log('Cart data is a direct array');
          cartItems = cartData;
        } else if (cartData && typeof cartData === 'object') {
          console.log('Cart data is an object, checking properties...');

          // Check all possible nested locations
          const possibleKeys = [
            'items',
            'data',
            'cart',
            'products',
            'cartItems',
          ];

          for (const key of possibleKeys) {
            if (cartData[key] && Array.isArray(cartData[key])) {
              console.log(`Found items array at cartData.${key}`);
              cartItems = cartData[key];
              break;
            }
          }

          // If still nothing, log what keys exist
          if (cartItems.length === 0) {
            console.log('Available keys in cartData:', Object.keys(cartData));
            console.log('cartData values:', cartData);
          }
        }

        console.log('=== EXTRACTED CART ITEMS ===');
        console.log('Number of items:', cartItems.length);
        console.log('Items:', cartItems);

        if (cartItems.length === 0) {
          console.warn('⚠️ No items found in cart');
          console.log('This could mean:');
          console.log('1. Cart is actually empty (items were not added)');
          console.log('2. Response structure is different than expected');
          console.log('3. Session UUID mismatch');

          setProducts([]);
          setIsLoadingProducts(false);
          setHasFetchedCart(true);
          return;
        }

        // Map cart items to display products
        const productsList: ProductItem[] = cartItems.map(
          (item: any, index: number) => {
            console.log(`\n=== Processing Item ${index + 1} ===`);
            console.log('Raw item:', item);

            // Try multiple ways to get the product ID
            let productId = '';
            if (item.product_id) {
              productId = item.product_id.toString();
              console.log('Found product_id:', productId);
            } else if (item.id) {
              productId = item.id.toString();
              console.log('Found id:', productId);
            } else {
              console.warn('⚠️ No ID found for item:', item);
              productId = `unknown-${index}`;
            }

            // Try multiple ways to get the name
            const name = item.product_name || item.name || 'Unknown Product';
            console.log('Product name:', name);

            // Try multiple ways to get the price
            let price = 0;
            if (item.amount) {
              price = parseFloat(item.amount);
              console.log('Found amount:', price);
            } else if (item.price) {
              price = parseFloat(item.price);
              console.log('Found price:', price);
            } else {
              console.warn('⚠️ No price found for item:', item);
            }

            // Try multiple ways to get the image
            const image =
              item.product_image ||
              item.image ||
              '/prefill-images/medicine bottle.svg';
            console.log('Product image:', image);

            const mappedProduct = {
              id: productId,
              name: name,
              price: `₦${price.toLocaleString()}`,
              image: image,
            };

            console.log('Mapped product:', mappedProduct);
            return mappedProduct;
          },
        );

        console.log('\n=== FINAL PRODUCTS LIST ===');
        console.log('Total products:', productsList.length);
        console.log('Products:', productsList);

        // Cache products in localStorage for cart persistence
        const productsToCache = productsList.map((p) => ({
          id: p.id,
          name: p.name,
          image: p.image,
          price: parseFloat(p.price.replace(/[₦,]/g, '')),
        }));

        // Store in a format the cart can read
        localStorage.setItem(
          `cart_products_${sessionUuid}`,
          JSON.stringify(productsToCache),
        );

        console.log('✅ Products cached to localStorage:', productsToCache);

        setProducts(productsList);
        // Pre-select everything that came back from the cart
        setSelectedProducts(productsList.map((p) => p.id));

        console.log('✅ Cart loaded successfully');
      } catch (err) {
        console.error('=== ❌ ERROR FETCHING CART ===');
        console.error(
          'Error type:',
          err instanceof Error ? err.name : typeof err,
        );
        console.error(
          'Error message:',
          err instanceof Error ? err.message : err,
        );
        console.error('Full error:', err);

        alert('Failed to load your selected products. Please try again.');
      } finally {
        setIsLoadingProducts(false);
        setHasFetchedCart(true);
      }
    };

    fetchCartProducts();
  }, [sessionUuid, hasFetchedCart, getCart]);

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

    if (!sessionUuid) {
      alert('Session expired. Please start over.');
      return;
    }

    console.log('=== BUY NOW ===');
    console.log('Selected products:', selectedProducts);

    try {
      // Update items sequentially instead of Promise.all
      for (const productId of selectedProducts) {
        try {
          console.log(`Updating product ${productId} to buy_now`);

          await updateCart(sessionUuid, {
            product_id: parseInt(productId),
            quantity: 1,
            purchase_type: 'buy_now',
          });

          console.log(`Product ${productId} updated successfully`);
        } catch (itemError) {
          console.error(`Failed to update product ${productId}:`, itemError);
          // Continue with other items
        }
      }

      console.log('✅ All products updated, navigating to cart');
      navigate('/products/refill/pharmacy-cart');
    } catch (err) {
      console.error('Failed to update cart for buy now:', err);
      alert('Failed to add products to cart. Please try again.');
    }
  };

  const handleRemindLater = async () => {
    if (selectedProducts.length === 0) {
      alert('Please select at least one product');
      return;
    }

    console.log('=== REMIND ME LATER ===');
    console.log('Selected products:', selectedProducts);

    try {
      // Add to wishlist sequentially
      for (const productId of selectedProducts) {
        try {
          console.log(`Adding product ${productId} to wishlist`);
          await addToWishlist(parseInt(productId));
          console.log(`Product ${productId} added to wishlist`);
        } catch (itemError) {
          console.error(
            `Failed to add product ${productId} to wishlist:`,
            itemError,
          );
        }
      }

      alert("Products saved to wishlist! We'll remind you later.");

      const selectedProductDetails = products.filter((p) =>
        selectedProducts.includes(p.id),
      );

      console.log(
        'Navigating to remind-me-later-persona with:',
        selectedProductDetails,
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

    if (!sessionUuid) {
      alert('Session expired. Please start over.');
      return;
    }

    console.log('=== SUBSCRIBE & SAVE ===');
    console.log('Subscription plan:', selectedSubscription);
    console.log('Selected products:', selectedProducts);

    try {
      let durationMonths = 1;
      if (selectedSubscription === '3months') durationMonths = 3;
      else if (selectedSubscription === '6months') durationMonths = 6;
      else if (selectedSubscription === '1year') durationMonths = 12;

      console.log('Duration months:', durationMonths);

      // Update items sequentially instead of Promise.all
      for (const productId of selectedProducts) {
        try {
          console.log(`Updating product ${productId} to subscription`);

          await updateCart(sessionUuid, {
            product_id: parseInt(productId),
            quantity: 1,
            purchase_type: 'subscription',
            duration_months: durationMonths,
          });

          console.log(
            `Product ${productId} updated to subscription successfully`,
          );
        } catch (itemError) {
          console.error(`Failed to update product ${productId}:`, itemError);
        }
      }

      console.log(
        '✅ All products updated to subscription, navigating to cart',
      );
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
          <p className="text-gray-600 mt-4">Loading your products...</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4 text-lg">
            No products selected yet.
          </p>
          <p className="text-gray-500 text-sm mb-6">
            Please complete the survey to select your products.
          </p>
          <button
            onClick={() => navigate('/products/refill/survey')}
            className="bg-[#3da467] text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
          >
            Complete Survey
          </button>
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
