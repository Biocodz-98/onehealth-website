import React, { useEffect, useState } from 'react';
import { useRefill } from '../Services/refillApi';
import { ProgressBar } from './ProgressBar';

// Types
interface PersonaItem {
  id: string;
  name: string;
  dosage?: string;
  price?: number;
  image: string;
}

const WellnessPersona: React.FC = () => {
  const {
    getPersonaData,
    submitConsent,
    getCart,
    sessionUuid,
    isLoading,
    error,
  } = useRefill();

  const [personaType, setPersonaType] = useState<string>('');
  const [items, setItems] = useState<PersonaItem[]>([]);
  const [loadingPersona, setLoadingPersona] = useState(true);
  const [hasFetchedPersona, setHasFetchedPersona] = useState(false);

  useEffect(() => {
    if (hasFetchedPersona) {
      console.log('Persona already loaded, skipping...');
      return;
    }

    const loadPersona = async () => {
      try {
        setLoadingPersona(true);

        console.log('=== LOADING PERSONA ===');
        console.log('Session UUID:', sessionUuid);

        // Get persona name
        const personaData = (await getPersonaData()) as any;
        console.log('Persona data received:', personaData);

        const personaName =
          personaData?.persona_name || personaData?.persona || '';
        setPersonaType(personaName);
        console.log('Persona type:', personaName);

        //fetch from cart API to get the latest products
        if (sessionUuid) {
          const cartData = (await getCart()) as any;
          console.log('Cart data received:', cartData);

          // Handle different cart data structures
          let cartItems: any[] = [];

          if (Array.isArray(cartData)) {
            cartItems = cartData;
          } else if (cartData?.items && Array.isArray(cartData.items)) {
            cartItems = cartData.items;
          } else if (cartData?.data && Array.isArray(cartData.data)) {
            cartItems = cartData.data;
          }

          console.log('Cart items extracted:', cartItems);

          // Get cached products for enrichment
          const cachedProductsJson = localStorage.getItem(
            `cart_products_${sessionUuid}`,
          );
          let cachedProducts: any[] = [];

          if (cachedProductsJson) {
            cachedProducts = JSON.parse(cachedProductsJson);
            console.log(
              'Found cached products for enrichment:',
              cachedProducts,
            );
          } else {
            // Try old cache format as fallback
            const cachedMedicines = JSON.parse(
              localStorage.getItem(`medicines_${sessionUuid}`) || '[]',
            );
            const cachedSkincares = JSON.parse(
              localStorage.getItem(`skincares_${sessionUuid}`) || '[]',
            );
            const cachedBabycares = JSON.parse(
              localStorage.getItem(`babycares_${sessionUuid}`) || '[]',
            );

            cachedProducts = [
              ...cachedMedicines,
              ...cachedSkincares,
              ...cachedBabycares,
            ];
            console.log(
              'Using old cache format for enrichment:',
              cachedProducts,
            );
          }

          // Map cart items to PersonaItem format, enriching with cached data
          const mappedItems: PersonaItem[] = cartItems
            .filter((item: any) => {
              const quantity = item.quantity || 0;
              return quantity > 0;
            })
            .map((item: any, index: number) => {
              const productId =
                item.product_id?.toString() ||
                item.id?.toString() ||
                `item-${index}`;

              // Find matching product from cache for additional data
              const cachedProduct = cachedProducts.find(
                (p) => p.id.toString() === productId,
              );

              return {
                id: productId,
                name:
                  cachedProduct?.name ||
                  item.product_name ||
                  item.name ||
                  'Unknown Product',
                dosage: cachedProduct?.dosage || item.dosage || '',
                price: cachedProduct?.price || item.amount || item.price || 0,
                image:
                  cachedProduct?.image ||
                  item.product_image ||
                  item.image ||
                  '/prefill-images/medicine bottle.svg',
              };
            });

          console.log('Mapped items for persona:', mappedItems);
          setItems(mappedItems);
        }

        setHasFetchedPersona(true);
      } catch (err) {
        console.error('Failed to load persona:', err);

        setPersonaType('');
        setItems([]);
        setHasFetchedPersona(true);
      } finally {
        setLoadingPersona(false);
      }
    };

    loadPersona();
  }, [hasFetchedPersona, sessionUuid, getPersonaData, getCart]);

  const handleShareWhatsApp = async () => {
    try {
      await submitConsent(true);
      const message = encodeURIComponent(
        `My 2026 wellness vibe is ${personaType}, visit https://onehealthng.com/products/refill to check yours.`,
      );
      window.open(`https://wa.me/?text=${message}`, '_blank');
    } catch (err) {
      console.error('Failed to submit consent:', err);
      const message = encodeURIComponent(
        `My 2026 wellness vibe is ${personaType}, visit https://onehealthng.com/products/refill to check yours.`,
      );
      window.open(`https://wa.me/?text=${message}`, '_blank');
    }
  };

  const handleShareTwitter = async () => {
    try {
      await submitConsent(true);
      const tweetText = encodeURIComponent(
        `My 2026 wellness vibe is ${personaType}, visit https://onehealthng.com/products/refill to check yours.`,
      );
      window.open(
        `https://twitter.com/intent/tweet?text=${tweetText}`,
        '_blank',
      );
    } catch (err) {
      console.error('Failed to submit consent:', err);
      // Still allow sharing even if consent fails
      const tweetText = encodeURIComponent(
        `My 2026 wellness vibe is ${personaType}, visit https://onehealthng.com/products/refill to check yours.`,
      );
      window.open(
        `https://twitter.com/intent/tweet?text=${tweetText}`,
        '_blank',
      );
    }
  };

  const handleContinueShopping = () => {
    window.location.href = '/';
  };

  // Loading state
  if (loadingPersona) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p
            className="text-gray-600"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            Loading your persona...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-8">
        <div className="text-center max-w-md">
          <div className="mb-6 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2
            className="text-2xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: 'Lexend, sans-serif' }}
          >
            Failed to Load Persona
          </h2>
          <p
            className="text-gray-600 mb-6"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#3da467] hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white px-8 py-12 lg:px-20 lg:py-16"
      style={{ fontFamily: 'Lexend, sans-serif' }}
    >
      {/* Progress Bar at the top */}
      <ProgressBar currentStep={9} totalSteps={9} />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
              Based on your choices, it looks like you are:
            </h1>
            <p
              className="text-5xl lg:text-6xl text-[#3da467] font-bold"
              style={{
                fontFamily: 'Lexend, sans-serif',
                lineHeight: 1.2,
                fontWeight: 700,
              }}
            >
              {personaType}
            </p>

            {/* Continue Shopping Button */}
            <button
              onClick={handleContinueShopping}
              className="bg-[#3da467] hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
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
                  My 2026
                  <br />
                  Wellness
                  <br />
                  Persona
                </h2>

                {/* Item List */}
                {items.length > 0 ? (
                  <div className="space-y-4 mb-8">
                    {items.slice(0, 5).map((item, index) => (
                      <div
                        key={item.id}
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

                        {/* Item Image */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 object-contain"
                          onError={(e) => {
                            e.currentTarget.src =
                              '/prefill-images/medicine bottle.svg';
                          }}
                        />

                        {/* Item Info */}
                        <div className="flex-1">
                          <p
                            className="text-white font-medium text-base"
                            style={{
                              fontFamily: 'Familjen Grotesk, sans-serif',
                              fontWeight: 400,
                            }}
                          >
                            {item.name}
                          </p>
                          {item.price && item.price > 0 && (
                            <p
                              className="text-[#3da467] text-sm font-semibold"
                              style={{
                                fontFamily: 'Familjen Grotesk, sans-serif',
                                fontWeight: 600,
                              }}
                            >
                              ₦{item.price.toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mb-8 py-8 text-center">
                    <p className="text-gray-400 text-sm">
                      No products to display
                    </p>
                  </div>
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
                    onClick={handleShareTwitter}
                    disabled={isLoading}
                    className="w-full border-2 border-white text-white py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    {isLoading ? 'Sharing...' : 'Share on X'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessPersona;
