import React, { useState, useEffect } from 'react';
import { useRefill } from '../Services/refillApi';
import { ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
    id: 1,
    name: 'Diapers & Wipes',
    image: '/prefill-images/medicine bottle.svg',
    category: 'Diapers & Wipes',
  },
  {
    id: 2,
    name: 'Baby Food',
    image: '/prefill-images/medicine bottle.svg',
    category: 'Baby Food',
  },
  //   {
  //     id: 3,
  //     name: 'Moisturizer',
  //     image: '/prefill-images/medicine bottle.svg',
  //     category: 'Moisturizers',
  //   },
  //   {
  //     id: 4,
  //     name: 'Sunscreen',
  //     image: '/prefill-images/medicine bottle.svg',
  //     category: 'Sunscreens',
  //   },
  //   {
  //     id: 5,
  //     name: 'Body Wash',
  //     image: '/prefill-images/medicine bottle.svg',
  //     category: 'Body Wash',
  //   },
  //   {
  //     id: 6,
  //     name: 'Serum',
  //     image: '/prefill-images/medicine bottle.svg',
  //     category: 'Serums',
  //   },
];

const BabyCareComponent: React.FC<SurveyProps> = () => {
  const navigate = useNavigate();
  const {
    saveSurvey,
    updateCart,
    getBabyCareProducts,
    sessionUuid,
    isLoading,
    error,
  } = useRefill();

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [babycares, setBabycares] = useState<BabyCareItem[]>([]);
  const [isLoadingBabycare, setIsLoadingBabycare] = useState<boolean>(true);
  const [isCheckingSession, setIsCheckingSession] = useState<boolean>(true);

  const categories = [
    'All',
    'Diapers & Wipes',
    'Baby Food',
    // 'Moisturizers',
    // 'Facial Cleanser & Toners',
    // 'Sunscreens',
    // 'Serums',
    // 'Sanitary Pads & Tampons',
  ];

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

  /** ---- Fetch babycare products with caching ---- */
  useEffect(() => {
    const fetchProducts = async () => {
      if (!sessionUuid) return;

      const cacheKey = `babycares_${sessionUuid}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        setBabycares(JSON.parse(cached));
        setIsLoadingBabycare(false);
        return;
      }

      try {
        setIsLoadingBabycare(true);
        const response: any = await getBabyCareProducts();

        const products: BabyCareItem[] = (response || []).map((item: any) => ({
          id: Number(item.id),
          name: item.name,
          image: item.image,
          category: item.category || 'Diapers & Wipes',
        }));

        setBabycares(products);
        localStorage.setItem(cacheKey, JSON.stringify(products));
      } catch (err) {
        console.error('Failed to fetch babycares:', err);
        setBabycares(FALLBACK_BABYCARE);
      } finally {
        setIsLoadingBabycare(false);
      }
    };

    if (!isCheckingSession && sessionUuid) {
      fetchProducts();
    }
  }, [isCheckingSession, sessionUuid]); // ❗ removed getBabyCareProducts

  /** ---- Toggle selection ---- */
  const toggleSelection = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  /** ---- Handle next step ---- */
  // const handleNextOld = async () => {
  //   if (!sessionUuid) return;
  //
  //   if (selectedItems.length === 0) {
  //     alert('Please select at least one item');
  //     return;
  //   }
  //
  //   try {
  //     const selectedNames = selectedItems
  //       .map((id) => babycares.find((p) => p.id === id)?.name.toLowerCase())
  //       .filter(Boolean) as string[];
  //
  //     await saveSurvey('baby_care', [
  //       {
  //         question_key: 'frequent_products',
  //         value: selectedNames,
  //       },
  //     ]);
  //
  //     navigate('/products/refill/survey/product-search');
  //   } catch (err) {
  //     console.error('Failed to save survey:', err);
  //     const continueAnyway = window.confirm(
  //       'Failed to save survey data. Continue anyway?',
  //     );
  //     if (continueAnyway) navigate('/products/refill/survey/product-search');
  //   }
  // };

  const handleNext = async () => {
    if (!sessionUuid) return;

    if (selectedItems.length === 0) {
      alert('Please select at least one item');
      return;
    }

    try {
      // Save survey answers
      const selectedNames = selectedItems
        .map((id) => babycares.find((p) => p.id === id)?.name.toLowerCase())
        .filter(Boolean) as string[];

      await saveSurvey('baby_care', [
        {
          question_key: 'frequent_products',
          value: selectedNames,
        },
      ]);

      // Save selected products in cart (bulk save)
      await Promise.all(
        selectedItems.map((id) =>
          updateCart(sessionUuid, {
            product_id: id,
            quantity: 1,
            purchase_type: 'buy_now',
          }),
        ),
      );

      navigate('/products/refill/survey/product-search');
    } catch (err) {
      console.error('Failed to save survey or cart items:', err);
      const continueAnyway = window.confirm(
        'Failed to save your selection. Continue anyway?',
      );
      if (continueAnyway) navigate('/products/refill/survey/product-search');
    }
  };

  // Filter skincares by active category
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

      {/* Section Header with Next Button */}
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

      {/* Skincare Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {filteredBabycares.map((babycare) => {
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
        })}
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

      {/* Next Button */}
      <div className="max-w-6xl mx-auto mt-8 flex justify-end">
        <button
          onClick={handleNext}
          disabled={selectedItems.length === 0 || isLoading}
          className="bg-[#3da467] hover:bg-green-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
