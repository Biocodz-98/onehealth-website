import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

// Types
interface PreferencesFormProps {
  onBack?: () => void;
  onNext?: (data: FormData) => void;
}

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  condition: string;
  ndprConsent: boolean;
  dataProfileConsent: boolean;
}

const PreferencesForm: React.FC<PreferencesFormProps> = ({
  onBack,
  onNext,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phoneNumber: '',
    condition: '',
    ndprConsent: false,
    dataProfileConsent: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleNext = () => {
    if (onNext) {
      onNext(formData);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Side - Form */}
        <div className="px-8 py-12 lg:px-20 lg:py-16 flex flex-col">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-16 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span
              className="text-base font-medium"
              style={{ fontFamily: 'Lato, sans-serif' }}
            >
              Back
            </span>
          </button>

          {/* Form Content */}
          <div className="flex-1 max-w-lg">
            <h1
              className="text-4xl lg:text-5xl mb-4"
              style={{
                fontWeight: '400',
                lineHeight: '1.5',
                fontStyle: 'normal',
                fontFamily: 'Lexend, sans-serif',
              }}
            >
              Tell us about yourself.
            </h1>
            <p
              className="text-base mb-10"
              style={{
                fontWeight: '400',
                lineHeight: '1.5',
                fontStyle: 'normal',
                fontFamily: 'Manrope, sans-serif',
                color: '#6B7280',
              }}
            >
              This will help us send you your preferences
            </p>

            {/* Name Field */}
            <div className="mb-8">
              <label
                className="block text-base font-medium text-gray-800 mb-3"
                style={{ fontFamily: 'Lato, sans-serif' }}
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ibrahim Idris"
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                style={{ fontFamily: 'Lato, sans-serif' }}
              />
            </div>

            {/* Email Field */}
            <div className="mb-8">
              <label
                className="block text-base font-medium text-gray-800 mb-3"
                style={{ fontFamily: 'Lato, sans-serif' }}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="olivia@onehealth.com"
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                style={{ fontFamily: 'Lato, sans-serif' }}
              />
            </div>

            {/* Phone Number Field */}
            <div className="mb-8">
              <label
                className="block text-base font-medium text-gray-800 mb-3"
                style={{ fontFamily: 'Lato, sans-serif' }}
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="08012345678"
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                style={{ fontFamily: 'Lato, sans-serif' }}
              />
            </div>

            {/* Condition Field */}
            <div className="mb-8">
              <label
                className="block text-base font-medium text-gray-800 mb-3"
                style={{ fontFamily: 'Lato, sans-serif' }}
              >
                What Condition are you managing
              </label>
              <input
                type="text"
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                placeholder="Diabetes"
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                style={{ fontFamily: 'Lato, sans-serif' }}
              />
              <p
                className="text-sm text-gray-500 mt-3"
                style={{ fontFamily: 'Lato, sans-serif' }}
              >
                This will help us tailor your care.
              </p>
            </div>

            {/* Checkboxes */}
            <div className="space-y-5 mb-10">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="ndprConsent"
                  checked={formData.ndprConsent}
                  onChange={handleInputChange}
                  className="mt-1 w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span
                  className="text-base text-gray-700 leading-relaxed"
                  style={{ fontFamily: 'Lato, sans-serif' }}
                >
                  I understand that my information is protected under NDPR and
                  will only be used for medical purposes.
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="dataProfileConsent"
                  checked={formData.dataProfileConsent}
                  onChange={handleInputChange}
                  className="mt-1 w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span
                  className="text-base text-gray-700 leading-relaxed"
                  style={{ fontFamily: 'Lato, sans-serif' }}
                >
                  I consent to having my data saved to a secured personal
                  profile that only I can access
                </span>
              </label>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="bg-[#3da467] hover:bg-green-700 text-white px-8 py-4 rounded-full text-base font-semibold transition-colors flex items-center gap-2"
              style={{ fontFamily: 'Manrope, sans-serif' }}
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
        </div>

        {/* Right Side - Image */}
        <div className="hidden lg:block bg-linear-to-br from-gray-100 to-gray-200 relative">
          <img
            src="/prefill-images/survey nurse.svg"
            alt="Welcome to Onehealth"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default PreferencesForm;
