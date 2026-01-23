import React, { useEffect, useState } from 'react';
import { useRefill } from '../Services/refillApi';
import { useLocation, useNavigate } from 'react-router-dom';

// Types
interface ProductItem {
  id: string;
  name: string;
  price: string;
  image: string;
}

const RemindMeLaterPersona: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { submitConsent, isLoading } = useRefill();

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const loadProducts = () => {
      try {
        setLoadingProducts(true);

        // Get products from navigation state (passed from MonthlyPurchase)
        const passedProducts = location.state?.selectedProducts;
        console.log('RemindMeLaterPersona - location.state:', location.state);
        console.log('RemindMeLaterPersona - passedProducts:', passedProducts);

        if (passedProducts && passedProducts.length > 0) {
          console.log('Products loaded successfully:', passedProducts);
          setProducts(passedProducts);
        } else {
          console.warn('No products found in state');
          // Fallback: redirect back if no products
          alert('No products selected. Please select products first.');
          navigate('/products/refill/product-selection');
        }
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoadingProducts(false);
      }
    };

    loadProducts();
  }, [location.state, navigate]);

  const handleShareWhatsApp = async () => {
    try {
      // Submit consent before sharing
      await submitConsent(true);

      // Build share message
      const productCount = products.length;
      const message = encodeURIComponent(
        `I've saved ${productCount} products to remind me later on OneHealth! Check it out.`,
      );

      window.open(`https://wa.me/?text=${message}`, '_blank');
    } catch (err) {
      console.error('Failed to submit consent:', err);
      // Still allow sharing even if consent fails
      const productCount = products.length;
      const message = encodeURIComponent(
        `I've saved ${productCount} products to remind me later on OneHealth! Check it out.`,
      );
      window.open(`https://wa.me/?text=${message}`, '_blank');
    }
  };

  const handleShareInstagram = async () => {
    try {
      // Submit consent before sharing
      await submitConsent(true);

      const productCount = products.length;
      const message = `I've saved ${productCount} products to remind me later on OneHealth! Check it out.`;

      // Copy to clipboard
      await navigator.clipboard.writeText(message);

      // Show alert
      alert(
        'Message copied to clipboard! Paste it in your Instagram story or post.',
      );

      // Open Instagram
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        window.open('instagram://story-camera', '_blank');
      } else {
        window.open('https://www.instagram.com/', '_blank');
      }
    } catch (err) {
      console.error('Failed to share on Instagram:', err);
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        window.open('instagram://story-camera', '_blank');
      } else {
        window.open('https://www.instagram.com/', '_blank');
      }
    }
  };

  const handleGoToHome = () => {
    navigate('/products/refill');
  };

  // Loading state
  if (loadingProducts) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p
            className="text-gray-600"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            Loading your saved products...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div
        className="min-h-screen bg-white flex items-center justify-center px-8 py-12"
        style={{ fontFamily: 'Lexend, sans-serif' }}
      >
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Description */}
          <div className="space-y-6">
            <h1
              className="text-4xl lg:text-5xl font-normal text-[#000000] leading-tight"
              style={{
                fontFamily: 'Lexend, sans-serif',
                lineHeight: 1.2,
                fontWeight: 400,
              }}
            >
              Your products are saved!
            </h1>
            <p
              className="text-lg text-gray-700"
              style={{
                fontFamily: 'Manrope, sans-serif',
                lineHeight: 1.5,
                fontWeight: 400,
              }}
            >
              We'll remind you later about these {products.length} products you
              selected. You can continue shopping or share your selections with
              friends.
            </p>

            {/* Action Button */}
            <button
              onClick={handleGoToHome}
              className="bg-[#3da467] hover:bg-green-700 text-white px-8 py-3 rounded-full text-base font-semibold transition-colors"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Continue Shopping
            </button>
          </div>

          {/* Right Section - Persona Card */}
          <div className="relative">
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              style={{
                background:
                  'linear-gradient(to bottom, #000000 0%, #1a4d2e 100%)',
              }}
            >
              {/* OneHealth Logo */}
              <div className="absolute top-6 right-6 text-white">
                <img
                  src="/prefill-images/onehealth logo.svg"
                  alt="OneHealth"
                  className="h-6 w-auto"
                />
              </div>

              {/* Card Content */}
              <div className="p-8 pt-16">
                <h2
                  className="text-white text-2xl font-normal mb-8"
                  style={{
                    fontFamily: 'Familjen Grotesk, sans-serif',
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                    fontWeight: 400,
                  }}
                >
                  My Saved
                  <br />
                  Products
                  <br />
                  Reminder
                </h2>

                {/* Product List */}
                <div className="space-y-4 mb-8 max-h-96 overflow-y-auto hide-scrollbar">
                  {products.slice(0, 10).map((product, index) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 pb-4 border-b border-gray-700"
                    >
                      {/* Number */}
                      <span
                        className="text-[#3da467] font-bold text-lg w-8"
                        style={{
                          fontFamily: 'Familjen Grotesk, sans-serif',
                          fontWeight: 700,
                        }}
                      >
                        #{index + 1}
                      </span>

                      {/* Product Image */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-contain"
                      />

                      {/* Product Info */}
                      <div className="flex-1">
                        <p
                          className="text-white font-medium text-base"
                          style={{
                            fontFamily: 'Familjen Grotesk, sans-serif',
                            fontWeight: 400,
                          }}
                        >
                          {product.name}
                        </p>
                        <p
                          className="text-white text-xs"
                          style={{
                            fontFamily: 'Familjen Grotesk, sans-serif',
                            fontWeight: 400,
                          }}
                        >
                          {product.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Count indicator if more than 10 */}
                {products.length > 10 && (
                  <p
                    className="text-gray-400 text-sm mb-6 text-center"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    + {products.length - 10} more products saved
                  </p>
                )}

                {/* Share Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleShareWhatsApp}
                    disabled={isLoading}
                    className="w-full border-2 border-white text-white py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    {isLoading ? 'Sharing...' : 'Share on WhatsApp'}
                  </button>

                  <button
                    onClick={handleShareInstagram}
                    disabled={isLoading}
                    className="w-full border-2 border-white text-white py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    {isLoading ? 'Sharing...' : 'Share on Instagram'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RemindMeLaterPersona;
