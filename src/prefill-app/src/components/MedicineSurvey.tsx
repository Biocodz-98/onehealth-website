import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { useRefill } from '../Services/refillApi';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from './ProgressBar';

interface MedicineItem {
  id: number;
  name: string;
  image: string;
  dosage?: string;
  auto_refill?: boolean;
  refill_days?: number | null;
  category?: string;
}

const FALLBACK_MEDICINES: MedicineItem[] = [
  {
    id: 1001,
    name: 'Amlodipine',
    image: '/prefill-images/medicine bottle.svg',
    category: 'Chronic',
  },
  {
    id: 1002,
    name: 'Lisinopril',
    image: '/prefill-images/medicine bottle.svg',
    category: 'Chronic',
  },
  {
    id: 1003,
    name: 'Metformin',
    image: '/prefill-images/medicine bottle.svg',
    category: 'Chronic',
  },
  {
    id: 1004,
    name: 'Atorvastatin',
    image: '/prefill-images/medicine bottle.svg',
    category: 'Chronic',
  },
  {
    id: 1005,
    name: 'Omeprazole',
    image: '/prefill-images/medicine bottle.svg',
    category: 'OTC & Childcare',
  },
  {
    id: 1006,
    name: 'Levothyroxine',
    image: '/prefill-images/medicine bottle.svg',
    category: 'Chronic',
  },
];

// Backend category ID for medicine = 1
const MEDICINE_CATEGORY_ID = 1;

const Survey: React.FC = () => {
  const navigate = useNavigate();
  const {
    saveSurvey,
    getProductsByCategory,
    getProductsBySubCategory,
    updateCart,
    sessionUuid,
    isLoading,
    error,
  } = useRefill();

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [medicines, setMedicines] = useState<MedicineItem[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [hasFetchedProducts, setHasFetchedProducts] = useState(false);
  // Track whether we are showing real API products or fallbacks
  const [usingFallback, setUsingFallback] = useState(false);

  const categories = [
    'All',
    'Chronic',
    'OTC & Childcare',
    "Women's Health",
    'Sexual Health',
    'Vitamins and Supplement',
  ];

  /** ---- Check session on mount ---- */
  useEffect(() => {
    console.log('Survey mounted. Current sessionUuid:', sessionUuid);

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

  /** ---- Fetch medicine products ---- */
  useEffect(() => {
    if (hasFetchedProducts || isCheckingSession || !sessionUuid) return;

    const fetchProducts = async () => {
      // subcategoryId from preferences is ONLY valid for medicine (category_id === 1 on backend).
      // Read the stored category_id to confirm before using subcategoryId.
      const subcategoryId = localStorage.getItem('selected_subcategory_id');
      const storedCategoryId = localStorage.getItem('selected_category_id');

      // Only use subcategoryId if the preference was set under the medicine category (id=1)
      const subcategoryBelongsToMedicine =
        storedCategoryId && Number(storedCategoryId) === MEDICINE_CATEGORY_ID;

      const cacheKey = `medicines_${sessionUuid}_${
        subcategoryBelongsToMedicine && subcategoryId ? subcategoryId : 'all'
      }`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        console.log('Using cached medicine products');
        setMedicines(JSON.parse(cached));
        setUsingFallback(false);
        setIsLoadingProducts(false);
        setHasFetchedProducts(true);
        return;
      }

      try {
        setIsLoadingProducts(true);
        let response: any;

        if (subcategoryBelongsToMedicine && subcategoryId) {
          // Try fetching by subcategory first
          try {
            console.log(
              `[Medicine] Fetching products by subcategory: ${subcategoryId}`,
            );
            response = await getProductsBySubCategory(Number(subcategoryId));
          } catch (subCatError) {
            console.warn(
              '[Medicine] Subcategory fetch failed, falling back to category:',
              subCatError,
            );
            response = await getProductsByCategory(MEDICINE_CATEGORY_ID);
          }
        } else {
          // Either no subcategory was selected, or it belongs to another category.
          // Always use this component's own category ID.
          console.log(
            `[Medicine] Fetching products by category: ${MEDICINE_CATEGORY_ID}`,
          );
          response = await getProductsByCategory(MEDICINE_CATEGORY_ID);
        }

        console.log('[Medicine] Products fetched:', response);

        const products: MedicineItem[] = (response.products || []).map(
          (item: any) => ({
            id: typeof item.id === 'string' ? parseInt(item.id) : item.id,
            name: item.name,
            image: item.image || '/prefill-images/medicine bottle.svg',
            dosage: item.dosage,
            auto_refill: item.auto_refill,
            refill_days: item.refill_days,
            category: item.category || 'Chronic',
          }),
        );

        if (products.length === 0) {
          console.warn(
            '[Medicine] No products returned from API, using fallback',
          );
          setMedicines(FALLBACK_MEDICINES);
          setUsingFallback(true);
        } else {
          setMedicines(products);
          setUsingFallback(false);
          localStorage.setItem(cacheKey, JSON.stringify(products));
        }
      } catch (err) {
        console.error(
          '[Medicine] Failed to fetch medicines, using fallback:',
          err,
        );
        setMedicines(FALLBACK_MEDICINES);
        setUsingFallback(true);
      } finally {
        setIsLoadingProducts(false);
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
      console.error('[Medicine] No sessionUuid available');
      return;
    }

    if (selectedItems.length === 0) {
      alert('Please select at least one medicine');
      return;
    }

    console.log('=== SAVING MEDICINE SURVEY ===');
    console.log('Session UUID:', sessionUuid);
    console.log('Selected items:', selectedItems);
    console.log('Using fallback products:', usingFallback);

    try {
      const selectedNames = selectedItems
        .map((id) => medicines.find((m) => m.id === id)?.name.toLowerCase())
        .filter(Boolean) as string[];

      console.log('Selected names:', selectedNames);

      // Save survey first
      await saveSurvey('medicines', [
        { question_key: 'frequent_products', value: selectedNames },
      ]);

      console.log('[Medicine] Survey saved successfully');

      // Only update cart when we have real products from the API
      if (!usingFallback) {
        console.log('[Medicine] Adding real products to cart...');

        // Add items to cart sequentially with error handling
        for (const id of selectedItems) {
          try {
            console.log(
              `[Medicine] Adding product ${id} to cart with session ${sessionUuid}`,
            );

            const cartItem = {
              product_id: id,
              quantity: 1,
              purchase_type: 'buy_now' as const,
            };

            console.log('[Medicine] Cart item payload:', cartItem);

            const result = await updateCart(sessionUuid, cartItem);

            console.log(
              `[Medicine] Product ${id} added to cart successfully:`,
              result,
            );
          } catch (itemError) {
            console.error(
              `[Medicine] Failed to add product ${id} to cart:`,
              itemError,
            );
            // Continue with other items even if one fails
          }
        }

        console.log('[Medicine] All cart operations completed');

        // Verify cart was updated
        console.log(
          '[Medicine] Waiting 500ms before navigation to ensure cart is updated...',
        );
        await new Promise((resolve) => setTimeout(resolve, 500));
      } else {
        console.warn(
          '[Medicine] Skipping cart update — using fallback products that do not exist on backend.',
        );
      }

      navigate('/products/refill/survey/skincare');
    } catch (err) {
      console.error('[Medicine] Failed to save survey or update cart:', err);
      console.error('[Medicine] Error details:', err);

      const continueAnyway = window.confirm(
        'Failed to save survey data. Continue anyway?',
      );
      if (continueAnyway) navigate('/products/refill/survey/skincare');
    }
  };

  // Filter medicines by active category
  const filteredMedicines =
    activeCategory === 'All'
      ? medicines
      : medicines.filter((m) => m.category === activeCategory);

  /** ---- Loading states ---- */
  if (isCheckingSession || isLoadingProducts) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {isCheckingSession
              ? 'Checking session...'
              : 'Loading medicine products...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-8 py-12 lg:px-20 lg:py-16">
      <ProgressBar currentStep={2} totalSteps={9} />
      <button
        onClick={() => navigate('/products/refill/preferences')}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-12"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-base font-medium">Back</span>
      </button>

      <div className="max-w-6xl mx-auto mb-12">
        <h1 className="text-4xl lg:text-5xl mb-3">
          Which of these do you use frequently?
        </h1>
        <p className="text-base text-black">
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
            MEDICINES
          </h2>
        </div>
        {/* Categories */}
        <div className="max-w-6xl mx-auto mb-6 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors ${
                activeCategory === cat
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-[#10071e] hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Medicine Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {filteredMedicines.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">
              No medicines found for the selected category.
            </p>
          </div>
        ) : (
          filteredMedicines.map((medicine) => {
            const isSelected = selectedItems.includes(medicine.id);
            return (
              <button
                key={medicine.id}
                onClick={() => toggleSelection(medicine.id)}
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
                      src={medicine.image}
                      alt={medicine.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-base font-medium text-[#323232] text-center">
                    {medicine.name}
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
          onClick={() => navigate('/products/refill/survey/skincare')}
          className="px-6 py-2.5 rounded-full text-base font-semibold border-2 border-[#3da467] text-[#3da467] hover:bg-green-50 transition-colors"
        >
          Skip
        </button>
        <button
          onClick={handleNext}
          disabled={selectedItems.length === 0 || isLoading}
          className="bg-[#3da467] hover:bg-green-700 text-white px-6 py-2.5 rounded-full text-base font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default Survey;
