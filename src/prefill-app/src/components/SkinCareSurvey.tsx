import React, { useState, useEffect } from 'react';
import { useRefill } from '../Services/refillApi';
import { ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from './ProgressBar';

// Types
interface SurveyProps {
  onBack?: () => void;
  onNext?: (selectedItems: string[]) => void;
}

interface SkincareItem {
  id: number;
  name: string;
  image: string;
  category?: string;
}

const FALLBACK_SKINCARE: SkincareItem[] = [
  {
    id: 2001,
    name: 'Body Cream',
    image: '/prefill-images/medicine bottle.svg',
    category: 'Body Cream',
  },
  {
    id: 2002,
    name: 'Face Wash',
    image: '/prefill-images/medicine bottle.svg',
    category: 'Facial Cleanser & Toners',
  },
  {
    id: 2003,
    name: 'Moisturizer',
    image: '/prefill-images/medicine bottle.svg',
    category: 'Moisturizers',
  },
  {
    id: 2004,
    name: 'Sunscreen',
    image: '/prefill-images/medicine bottle.svg',
    category: 'Sunscreens',
  },
  {
    id: 2005,
    name: 'Body Wash',
    image: '/prefill-images/medicine bottle.svg',
    category: 'Body Wash',
  },
  {
    id: 2006,
    name: 'Serum',
    image: '/prefill-images/medicine bottle.svg',
    category: 'Serums',
  },
];

// Backend category ID for skincare = 3
const SKINCARE_CATEGORY_ID = 3;

const SurveyComponent: React.FC<SurveyProps> = () => {
  const navigate = useNavigate();
  const {
    saveSurvey,
    getProductsByCategory,
    updateCart,
    sessionUuid,
    isLoading,
    error,
  } = useRefill();

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [skincares, setSkincares] = useState<SkincareItem[]>([]);
  const [isLoadingSkincare, setIsLoadingSkincare] = useState<boolean>(true);
  const [isCheckingSession, setIsCheckingSession] = useState<boolean>(true);
  const [hasFetchedProducts, setHasFetchedProducts] = useState<boolean>(false);
  const [usingFallback, setUsingFallback] = useState(false);

  const categories = [
    'All',
    'Body Cream',
    'Body Wash',
    'Moisturizers',
    'Facial Cleanser & Toners',
    'Sunscreens',
    'Serums',
    'Sanitary Pads & Tampons',
  ];

  /** ---- Check session on mount ---- */
  useEffect(() => {
    console.log('Skincare Survey mounted. Current sessionUuid:', sessionUuid);

    const timer = setTimeout(() => {
      if (!sessionUuid) {
        alert('Please complete the preferences form first');
        navigate('/products/refill/preferences');
      } else {
        setIsCheckingSession(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [sessionUuid, navigate]);

  /** ---- Fetch skincare products ---- */
  useEffect(() => {
    if (hasFetchedProducts || isCheckingSession || !sessionUuid) return;

    const fetchProducts = async () => {
      // Skincare has no subcategories on the backend — always fetch by its own category ID (3).
      // Do NOT read selected_subcategory_id here; that value belongs to medicine.
      const cacheKey = `skincares_${sessionUuid}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        console.log('[Skincare] Using cached skincare products');
        setSkincares(JSON.parse(cached));
        setUsingFallback(false);
        setIsLoadingSkincare(false);
        setHasFetchedProducts(true);
        return;
      }

      try {
        setIsLoadingSkincare(true);
        console.log(
          `[Skincare] Fetching products by category: ${SKINCARE_CATEGORY_ID}`,
        );

        const response = await getProductsByCategory(SKINCARE_CATEGORY_ID);
        console.log('[Skincare] Products fetched:', response);

        const products: SkincareItem[] = (response.products || []).map(
          (item: any) => ({
            id: typeof item.id === 'string' ? parseInt(item.id) : item.id,
            name: item.name,
            image: item.image || '/prefill-images/medicine bottle.svg',
            category: item.category || 'Body Cream',
          }),
        );

        if (products.length === 0) {
          console.warn(
            '[Skincare] No products returned from API, using fallback',
          );
          setSkincares(FALLBACK_SKINCARE);
          setUsingFallback(true);
        } else {
          setSkincares(products);
          setUsingFallback(false);
          localStorage.setItem(cacheKey, JSON.stringify(products));
        }
      } catch (err) {
        console.error(
          '[Skincare] Failed to fetch skincares, using fallback:',
          err,
        );
        setSkincares(FALLBACK_SKINCARE);
        setUsingFallback(true);
      } finally {
        setIsLoadingSkincare(false);
        setHasFetchedProducts(true);
      }
    };

    fetchProducts();
  }, [isCheckingSession, sessionUuid, hasFetchedProducts]);

  /** ---- Toggle selection ---- */
  const toggleSelection = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  /** ---- Handle next step ---- */
  const handleNext = async () => {
    if (!sessionUuid) {
      console.error('[Skincare] No sessionUuid available');
      return;
    }

    if (selectedItems.length === 0) {
      alert('Please select at least one item');
      return;
    }

    console.log('=== SAVING SKINCARE SURVEY ===');
    console.log('Session UUID:', sessionUuid);
    console.log('Selected items:', selectedItems);
    console.log('Using fallback products:', usingFallback);

    try {
      const selectedNames = selectedItems
        .map((id) => skincares.find((p) => p.id === id)?.name.toLowerCase())
        .filter(Boolean) as string[];

      console.log('Selected names:', selectedNames);

      // Save survey first
      await saveSurvey('personal_care', [
        {
          question_key: 'frequent_products',
          value: selectedNames,
        },
      ]);

      console.log('[Skincare] Survey saved successfully');

      // Only update cart when we have real products from the API
      if (!usingFallback) {
        console.log('[Skincare] Adding real products to cart...');

        // Add items to cart sequentially with error handling
        for (const id of selectedItems) {
          try {
            console.log(
              `[Skincare] Adding product ${id} to cart with session ${sessionUuid}`,
            );

            const cartItem = {
              product_id: id,
              quantity: 1,
              purchase_type: 'buy_now' as const,
            };

            console.log('[Skincare] Cart item payload:', cartItem);

            const result = await updateCart(sessionUuid, cartItem);

            console.log(
              `[Skincare] Product ${id} added to cart successfully:`,
              result,
            );
          } catch (itemError) {
            console.error(
              `[Skincare] Failed to add product ${id} to cart:`,
              itemError,
            );
            // Continue with other items even if one fails
          }
        }

        console.log('[Skincare] All cart operations completed');

        // Verify cart was updated
        console.log(
          '[Skincare] Waiting 500ms before navigation to ensure cart is updated...',
        );
        await new Promise((resolve) => setTimeout(resolve, 500));
      } else {
        console.warn(
          '[Skincare] Skipping cart update — using fallback products that do not exist on backend.',
        );
      }

      navigate('/products/refill/survey/babycare');
    } catch (err) {
      console.error('[Skincare] Failed to save survey or update cart:', err);
      console.error('[Skincare] Error details:', err);

      const continueAnyway = window.confirm(
        'Failed to save survey data. Continue anyway?',
      );
      if (continueAnyway) navigate('/products/refill/survey/babycare');
    }
  };

  // Filter skincares by active category
  const filteredSkincares =
    activeCategory === 'All'
      ? skincares
      : skincares.filter((s) => s.category === activeCategory);

  /** ---- Loading states ---- */
  if (isCheckingSession || isLoadingSkincare) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {isCheckingSession
              ? 'Checking session...'
              : 'Loading skincare products...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white px-8 py-12 lg:px-20 lg:py-16"
      style={{ fontFamily: 'Manrope, sans-serif' }}
    >
      <ProgressBar currentStep={3} totalSteps={9} />
      {/* Back Button */}
      <button
        onClick={() => navigate('/products/refill/survey')}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-12 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-base font-medium">Back</span>
      </button>

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <h1
          className="text-4xl lg:text-5xl mb-3"
          style={{
            fontWeight: '400',
            lineHeight: '1.3',
            fontFamily: 'Lexend, sans-serif',
          }}
        >
          Which of these do you use frequently?
        </h1>
        <p
          className="text-base text-black"
          style={{
            fontWeight: '400',
            lineHeight: '1.5',
            fontStyle: 'normal',
            fontFamily: 'Manrope, sans-serif',
          }}
        >
          This will help us send you your preferences.
        </p>
      </div>

      {error && (
        <div className="max-w-6xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Section Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-lg font-bold uppercase tracking-wider"
            style={{
              fontFamily: 'Lexend, sans-serif',
              color: '#323232',
              lineHeight: '120%',
            }}
          >
            PERSONAL CARE AND SKINCARE
          </h2>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors border ${
                activeCategory === category
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-[#10071e] hover:bg-gray-100'
              }`}
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 500,
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Skincare Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {filteredSkincares.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">
              No skincare products found for the selected category.
            </p>
          </div>
        ) : (
          filteredSkincares.map((skincare) => {
            const isSelected = selectedItems.includes(skincare.id);
            return (
              <button
                key={skincare.id}
                onClick={() => toggleSelection(skincare.id)}
                className={`relative p-6 rounded-2xl border-2 transition-all hover:shadow-md ${
                  isSelected
                    ? 'border-[#3da467] bg-[#ecf6ed]'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                {/* Checkbox */}
                <div
                  className={`absolute top-4 right-4 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-[#3da467] border-[#3da467]'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {isSelected && <Check className="w-4 h-4 text-white" />}
                </div>

                {/* Image and Name */}
                <div className="flex flex-col items-center">
                  <div className="w-28 h-28 mb-4 flex items-center justify-center">
                    <img
                      src={skincare.image}
                      alt={skincare.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p
                    className="text-base font-medium text-[#323232] text-center"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    {skincare.name}
                  </p>
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Selection Counter */}
      {selectedItems.length > 0 && (
        <div className="max-w-6xl mx-auto mt-6">
          <p className="text-sm text-gray-600">
            {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''}{' '}
            selected
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="max-w-6xl mx-auto mt-8 flex justify-end gap-4">
        <button
          onClick={() => navigate('/products/refill/survey/babycare')}
          className="px-6 py-2.5 rounded-full text-base font-semibold border-2 border-[#3da467] text-[#3da467] hover:bg-green-50 transition-colors"
          style={{
            fontFamily: 'Manrope, sans-serif',
          }}
        >
          Skip
        </button>
        <button
          onClick={handleNext}
          disabled={selectedItems.length === 0 || isLoading}
          className="bg-[#3da467] hover:bg-green-700 text-white px-6 py-2.5 rounded-full text-base font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          style={{
            fontFamily: 'Manrope, sans-serif',
          }}
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
  );
};

export default SurveyComponent;
