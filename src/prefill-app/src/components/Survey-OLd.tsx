import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { useRefill } from '../Services/refillApi';
import { useNavigate } from 'react-router-dom';

interface MedicineItem {
  id: string;
  name: string;
  image: string;
  category?: string;
}

const FALLBACK_MEDICINES: MedicineItem[] = [
  { id: '1', name: 'Amlodipine', image: '/prefill-images/medicine bottle.svg', category: 'Chronic' },
  { id: '2', name: 'Lisinopril', image: '/prefill-images/medicine bottle.svg', category: 'Chronic' },
  { id: '3', name: 'Metformin', image: '/prefill-images/medicine bottle.svg', category: 'Chronic' },
  { id: '4', name: 'Atorvastatin', image: '/prefill-images/medicine bottle.svg', category: 'Chronic' },
  { id: '5', name: 'Omeprazole', image: '/prefill-images/medicine bottle.svg', category: 'OTC & Childcare' },
  { id: '6', name: 'Levothyroxine', image: '/prefill-images/medicine bottle.svg', category: 'Chronic' },
];

const Survey: React.FC = () => {
  const navigate = useNavigate();
  const { saveSurvey, getMedicineProducts, sessionUuid, isLoading, error } = useRefill();

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [medicines, setMedicines] = useState<MedicineItem[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  // Categories
  const categories = ['All', 'Chronic', 'OTC & Childcare', "Women's Health", 'Sexual Health', 'Vitamins and Supplement'];

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

  /** ---- Fetch medicine products with caching ---- */
  useEffect(() => {
    const fetchProducts = async () => {
      if (!sessionUuid) return;

      const cacheKey = `medicines_${sessionUuid}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        setMedicines(JSON.parse(cached));
        setIsLoadingProducts(false);
        return;
      }

      try {
        setIsLoadingProducts(true);
        const response = await getMedicineProducts();
        const products = response.products || FALLBACK_MEDICINES;
        setMedicines(products);
        localStorage.setItem(cacheKey, JSON.stringify(products));
      } catch (err) {
        console.error('Failed to fetch medicines, using fallback:', err);
        setMedicines(FALLBACK_MEDICINES);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    if (!isCheckingSession && sessionUuid) {
      fetchProducts();
    }
  }, [isCheckingSession, sessionUuid, getMedicineProducts]);

  /** ---- Toggle selection ---- */
  const toggleSelection = (id: string) => {
    setSelectedItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  /** ---- Handle next step ---- */
  const handleNext = async () => {
    if (!sessionUuid) return;

    if (selectedItems.length === 0) {
      alert('Please select at least one medicine');
      return;
    }

    try {
      const selectedNames = selectedItems
          .map((id) => medicines.find((m) => m.id === id)?.name.toLowerCase())
          .filter(Boolean) as string[];

      await saveSurvey('medicines', [
        { question_key: 'frequent_products', value: selectedNames },
      ]);

      navigate('/products/refill/survey/skincare');
    } catch (err) {
      console.error('Failed to save survey:', err);
      const continueAnyway = window.confirm(
          'Failed to save survey data (backend endpoint not ready). Continue anyway?',
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
              {isCheckingSession ? 'Checking session...' : 'Loading medicine products...'}
            </p>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-white px-8 py-12 lg:px-20 lg:py-16">
        <button
            onClick={() => navigate('/products/refill/preferences')}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-12"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-base font-medium">Back</span>
        </button>

        <div className="max-w-6xl mx-auto mb-12">
          <h1 className="text-4xl lg:text-5xl mb-3">Which of these do you use frequently?</h1>
          <p className="text-base text-black">This will help us send you your preferences.</p>
        </div>

        {error && (
            <div className="max-w-6xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
        )}

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

        {/* Medicine Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredMedicines.map((medicine) => {
            const isSelected = selectedItems.includes(medicine.id);
            return (
                <button
                    key={medicine.id}
                    onClick={() => toggleSelection(medicine.id)}
                    className={`relative p-4 rounded-2xl border-2 transition-all hover:shadow-md ${
                        isSelected ? 'border-[#3da467] bg-[#ecf6ed]' : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                >
                  <div className="absolute top-3 right-3 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
                ${isSelected ? 'bg-[#3da467] border-[#3da467]' : 'bg-white border-gray-300'}
              ">
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </div>

                  <div className="flex flex-col items-center">
                    <img src={medicine.image} alt={medicine.name} className="w-32 h-32 object-contain mb-3" />
                    <p className="text-base font-medium text-[#323232]">{medicine.name}</p>
                  </div>
                </button>
            );
          })}
        </div>

        {/* Selection Counter */}
        {selectedItems.length > 0 && (
            <div className="max-w-6xl mx-auto mt-6">
              <p className="text-sm text-gray-600">
                {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
              </p>
            </div>
        )}

        {/* Next Button */}
        <div className="max-w-6xl mx-auto mt-8 flex justify-end">
          <button
              onClick={handleNext}
              disabled={selectedItems.length === 0 || isLoading}
              className="bg-[#3da467] hover:bg-green-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Next'}
            {!isLoading && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            )}
          </button>
        </div>
      </div>
  );
};

export default Survey;
