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

interface BabyCareItem {
  id: number;
  name: string;
  image: string;
  category?: string;
}

const FALLBACK_BABYCARE: BabyCareItem[] = [
  {
    id: 3001,
    name: 'Diapers & Wipes',
    image: '/prefill-images/medicine bottle.svg',
    category: 'Diapers & Wipes',
  },
  {
    id: 3002,
    name: 'Baby Food',
    image: '/prefill-images/medicine bottle.svg',
    category: 'Baby Food',
  },
];

// Backend category ID for babycare = 2
const BABYCARE_CATEGORY_ID = 2;

const BabyCareComponent: React.FC<SurveyProps> = () => {
  const navigate = useNavigate();
  const {
    saveSurvey,
    updateCart,
    getProductsByCategory,
    sessionUuid,
    isLoading,
    error,
  } = useRefill();

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [babycares, setBabycares] = useState<BabyCareItem[]>([]);
  const [isLoadingBabycare, setIsLoadingBabycare] = useState<boolean>(true);
  const [isCheckingSession, setIsCheckingSession] = useState<boolean>(true);
  const [hasFetchedProducts, setHasFetchedProducts] = useState<boolean>(false);
  const [usingFallback, setUsingFallback] = useState(false);

  const categories = ['All', 'Diapers & Wipes', 'Baby Food'];

  /** ---- Check session on mount ---- */
  useEffect(() => {
    console.log('BabyCare Survey mounted. Current sessionUuid:', sessionUuid);

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

  /** ---- Fetch babycare products ---- */
  useEffect(() => {
    if (hasFetchedProducts || isCheckingSession || !sessionUuid) return;

    const fetchProducts = async () => {
      // Babycare has no subcategories on the backend — always fetch by its own category ID (2).
      // Do NOT read selected_subcategory_id here; that value belongs to medicine.
      const cacheKey = `babycares_${sessionUuid}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        console.log('[BabyCare] Using cached babycare products');
        setBabycares(JSON.parse(cached));
        setUsingFallback(false);
        setIsLoadingBabycare(false);
        setHasFetchedProducts(true);
        return;
      }

      try {
        setIsLoadingBabycare(true);
        console.log(
          `[BabyCare] Fetching products by category: ${BABYCARE_CATEGORY_ID}`,
        );

        const response = await getProductsByCategory(BABYCARE_CATEGORY_ID);
        console.log('[BabyCare] Products fetched:', response);

        const products: BabyCareItem[] = (response.products || []).map(
          (item: any) => ({
            id: typeof item.id === 'string' ? parseInt(item.id) : item.id,
            name: item.name,
            image: item.image || '/prefill-images/medicine bottle.svg',
            category: item.category || 'Diapers & Wipes',
          }),
        );

        if (products.length === 0) {
          console.warn(
            '[BabyCare] No products returned from API, using fallback',
          );
          setBabycares(FALLBACK_BABYCARE);
          setUsingFallback(true);
        } else {
          setBabycares(products);
          setUsingFallback(false);
          localStorage.setItem(cacheKey, JSON.stringify(products));
        }
      } catch (err) {
        console.error(
          '[BabyCare] Failed to fetch babycares, using fallback:',
          err,
        );
        setBabycares(FALLBACK_BABYCARE);
        setUsingFallback(true);
      } finally {
        setIsLoadingBabycare(false);
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
      console.error('[BabyCare] No sessionUuid available');
      return;
    }

    if (selectedItems.length === 0) {
      alert('Please select at least one item');
      return;
    }

    console.log('=== SAVING BABYCARE SURVEY ===');
    console.log('Session UUID:', sessionUuid);
    console.log('Selected items:', selectedItems);
    console.log('Using fallback products:', usingFallback);

    try {
      const selectedNames = selectedItems
        .map((id) => babycares.find((p) => p.id === id)?.name.toLowerCase())
        .filter(Boolean) as string[];

      console.log('Selected names:', selectedNames);

      // Save survey first
      await saveSurvey('baby_care', [
        {
          question_key: 'frequent_products',
          value: selectedNames,
        },
      ]);

      console.log('[BabyCare] Survey saved successfully');

      // Only update cart when we have real products from the API
      if (!usingFallback) {
        console.log('[BabyCare] Adding real products to cart...');

        // Add items to cart sequentially with error handling
        for (const id of selectedItems) {
          try {
            console.log(
              `[BabyCare] Adding product ${id} to cart with session ${sessionUuid}`,
            );

            const cartItem = {
              product_id: id,
              quantity: 1,
              purchase_type: 'buy_now' as const,
            };

            console.log('[BabyCare] Cart item payload:', cartItem);

            const result = await updateCart(sessionUuid, cartItem);

            console.log(
              `[BabyCare] Product ${id} added to cart successfully:`,
              result,
            );
          } catch (itemError) {
            console.error(
              `[BabyCare] Failed to add product ${id} to cart:`,
              itemError,
            );
          }
        }

        console.log('[BabyCare] All cart operations completed');

        // Verify cart was updated
        console.log(
          '[BabyCare] Waiting 500ms before navigation to ensure cart is updated...',
        );
        await new Promise((resolve) => setTimeout(resolve, 500));
      } else {
        console.warn(
          '[BabyCare] Skipping cart update — using fallback products that do not exist on backend.',
        );
      }

      navigate('/products/refill/survey/product-search');
    } catch (err) {
      console.error('[BabyCare] Failed to save survey or update cart:', err);
      console.error('[BabyCare] Error details:', err);

      const continueAnyway = window.confirm(
        'Failed to save your selection. Continue anyway?',
      );
      if (continueAnyway) navigate('/products/refill/survey/product-search');
    }
  };
  // Filter babycares by active category
  const filteredBabycares =
    activeCategory === 'All'
      ? babycares
      : babycares.filter((s) => s.category === activeCategory);

  /** ---- Loading states ---- */
  if (isCheckingSession || isLoadingBabycare) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {isCheckingSession
              ? 'Checking session...'
              : 'Loading babycare products...'}
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
      <ProgressBar currentStep={4} totalSteps={9} />
      {/* Back Button */}
      <button
        onClick={() => navigate('/products/refill/survey/skincare')}
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
            lineHeight: '1.5',
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
            MOTHER AND BABY
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

      {/* BabyCare Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {filteredBabycares.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">
              No baby care products found for the selected category.
            </p>
          </div>
        ) : (
          filteredBabycares.map((babycare) => {
            const isSelected = selectedItems.includes(babycare.id);
            return (
              <button
                key={babycare.id}
                onClick={() => toggleSelection(babycare.id)}
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
                      src={babycare.image}
                      alt={babycare.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p
                    className="text-base font-medium text-[#323232] text-center"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    {babycare.name}
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
          onClick={() => navigate('/products/refill/survey/product-search')}
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

export default BabyCareComponent;
