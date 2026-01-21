import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { useRefill } from '../Services/refillApi';
import { useNavigate } from 'react-router-dom';

interface MedicineItem {
  id: string;
  name: string;
  image: string;
}

const Survey: React.FC = () => {
  const navigate = useNavigate();
  const { saveSurvey, getMedicineProducts, isLoading, error, sessionUuid } =
    useRefill();

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [medicines, setMedicines] = useState<MedicineItem[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  // Check for session on mount
  useEffect(() => {
    console.log('Survey mounted. Current sessionUuid:', sessionUuid);

    // Give a brief moment for context to update
    const timer = setTimeout(() => {
      console.log('After delay. SessionUuid:', sessionUuid);

      if (!sessionUuid) {
        alert('Please complete the preferences form first');
        navigate('/products/refill/preferences');
      } else {
        setIsCheckingSession(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [sessionUuid, navigate]);

  // Fetch medicine products from API
  useEffect(() => {
    const fetchProducts = async () => {
      if (!sessionUuid) return;

      try {
        setIsLoadingProducts(true);
        console.log('Fetching medicine products from API...');

        const response = await getMedicineProducts();
        console.log('Medicine products received:', response);

        if (response.products && response.products.length > 0) {
          setMedicines(response.products);
        } else {
          // Fallback to default data if API returns empty
          console.warn('No products returned from API, using fallback data');
          setMedicines([
            {
              id: '1',
              name: 'Amlodipine',
              image: '/prefill-images/medicine bottle.svg',
            },
            {
              id: '2',
              name: 'Lisinopril',
              image: '/prefill-images/medicine bottle.svg',
            },
            {
              id: '3',
              name: 'Metformin',
              image: '/prefill-images/medicine bottle.svg',
            },
            {
              id: '4',
              name: 'Atorvastatin',
              image: '/prefill-images/medicine bottle.svg',
            },
            {
              id: '5',
              name: 'Omeprazole',
              image: '/prefill-images/medicine bottle.svg',
            },
            {
              id: '6',
              name: 'Levothyroxine',
              image: '/prefill-images/medicine bottle.svg',
            },
          ]);
        }
      } catch (err) {
        console.error('Failed to fetch medicine products:', err);
        // Use fallback data on error
        setMedicines([
          {
            id: '1',
            name: 'Amlodipine',
            image: '/prefill-images/medicine bottle.svg',
          },
          {
            id: '2',
            name: 'Lisinopril',
            image: '/prefill-images/medicine bottle.svg',
          },
          {
            id: '3',
            name: 'Metformin',
            image: '/prefill-images/medicine bottle.svg',
          },
          {
            id: '4',
            name: 'Atorvastatin',
            image: '/prefill-images/medicine bottle.svg',
          },
          {
            id: '5',
            name: 'Omeprazole',
            image: '/prefill-images/medicine bottle.svg',
          },
          {
            id: '6',
            name: 'Levothyroxine',
            image: '/prefill-images/medicine bottle.svg',
          },
        ]);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    if (!isCheckingSession && sessionUuid) {
      fetchProducts();
    }
  }, [isCheckingSession, sessionUuid, getMedicineProducts]);

  // Show loading while checking session
  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Checking session...</p>
      </div>
    );
  }

  // Show loading while fetching products
  if (isLoadingProducts) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          {/* <p className="text-gray-600">Loading medicine products...</p> */}
        </div>
      </div>
    );
  }

  const categories = [
    'All',
    'Chronic',
    'OTC & Childcare',
    "Women's Health",
    'Sexual Health',
    'Vitamins and Supplement',
  ];

  const toggleSelection = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleNext = async () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one medicine');
      return;
    }

    try {
      // Get the names of selected medicines
      const selectedMedicineNames = selectedItems
        .map((id) => medicines.find((m) => m.id === id)?.name.toLowerCase())
        .filter(Boolean) as string[];

      // Save survey data to API
      await saveSurvey('medicines', [
        {
          question_key: 'frequent_products',
          value: selectedMedicineNames,
        },
      ]);

      // Navigate to next step
      navigate('/products/refill/survey/skincare');
    } catch (err) {
      console.error('Failed to save survey:', err);

      // Ask user if they want to continue anyway (backend not ready)
      const continueAnyway = window.confirm(
        'Failed to save survey data (backend endpoint not ready). Would you like to continue to the next step anyway?',
      );

      if (continueAnyway) {
        navigate('/products/refill/survey/skincare');
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-white px-8 py-12 lg:px-20 lg:py-16"
      style={{ fontFamily: 'Manrope, sans-serif' }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate('/products/refill/preferences')}
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
          Which of these do you use <br /> frequently?
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

      {/* API Error Display */}
      {error && (
        <div className="max-w-6xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Categories and Next Button */}
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
          <button
            onClick={handleNext}
            disabled={isLoading || selectedItems.length === 0}
            className="bg-[#3da467] hover:bg-green-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Medicine Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {medicines.map((medicine) => {
            const isSelected = selectedItems.includes(medicine.id);
            return (
              <button
                key={medicine.id}
                onClick={() => toggleSelection(medicine.id)}
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
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>

                {/* Medicine Image */}
                <div className="flex flex-col items-center">
                  <img
                    src={medicine.image}
                    alt={medicine.name}
                    className="w-32 h-32 object-contain mb-3"
                  />
                  <p
                    className="text-base font-medium text-[#323232]"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    {medicine.name}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
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
    </div>
  );
};

export default Survey;
