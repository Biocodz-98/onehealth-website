import React, { useState } from 'react';
import { useRefill } from '../Services/refillApi';
import { ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Types
interface SurveyProps {
  onBack?: () => void;
  onNext?: (selectedItems: string[]) => void;
}

interface MedicineItem {
  id: string;
  name: string;
  image: string;
}

const SurveyComponent: React.FC<SurveyProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const { saveSurvey } = useRefill();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');

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

  //medicine items
  const medicines: MedicineItem[] = [
    {
      id: '1',
      name: 'Amlodipine',
      image: '/prefill-images/medicine bottle.svg',
    },
    {
      id: '2',
      name: 'Amlodipine',
      image: '/prefill-images/medicine bottle.svg',
    },
    {
      id: '3',
      name: 'Amlodipine',
      image: '/prefill-images/medicine bottle.svg',
    },
    {
      id: '4',
      name: 'Amlodipine',
      image: '/prefill-images/medicine bottle.svg',
    },
    {
      id: '5',
      name: 'Amlodipine',
      image: '/prefill-images/medicine bottle.svg',
    },
    {
      id: '6',
      name: 'Amlodipine',
      image: '/prefill-images/medicine bottle.svg',
    },
  ];

  const toggleSelection = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleNext = async () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one item');
      return;
    }

    try {
      const selectedNames = selectedItems
        .map((id) => medicines.find((p) => p.id === id)?.name.toLowerCase())
        .filter(Boolean) as string[];

      await saveSurvey('personal_care', [
        {
          question_key: 'frequent_products',
          value: selectedNames,
        },
      ]);

      navigate('/products/refill/survey/product-search');
    } catch (err) {
      console.error('Failed to save survey:', err);
    }
  };

  return (
    <div
      className="min-h-screen bg-white px-8 py-12 lg:px-20 lg:py-16"
      style={{ fontFamily: 'Manrope, sans-serif' }}
    >
      {/* Back Button */}
      <button
        onClick={onBack}
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
            PERSONAL CARE AND SKINCARE
          </h2>
          <button
            onClick={handleNext}
            className="bg-[#3da467] hover:bg-green-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-2"
            style={{
              fontFamily: 'Manrope, sans-serif',
            }}
          >
            Next
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
    </div>
  );
};

export default SurveyComponent;
