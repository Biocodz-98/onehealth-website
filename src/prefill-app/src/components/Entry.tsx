import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRefill } from '../Services/refillApi';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from './ProgressBar';

// Types
interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  condition: string;
  conditionId: number | null;
  categoryId: number | null;
  ndprConsent: boolean;
  dataProfileConsent: boolean;
}

interface Subcategory {
  id: number;
  category_id: number;
  name: string;
  code: string;
}

interface Category {
  id: number;
  name: string;
  code: string;
  subcategories: Subcategory[];
}

interface ConditionOption {
  id: number;
  categoryId: number;
  name: string;
  code: string;
  displayName: string;
}

const MEDICINE_CATEGORY_ID = 1;

const PreferencesForm: React.FC = () => {
  const navigate = useNavigate();
  const { startSession, getConditions, isLoading, error } = useRefill();

  const [conditionOptions, setConditionOptions] = useState<ConditionOption[]>(
    [],
  );
  const [isLoadingConditions, setIsLoadingConditions] = useState(true);
  const [hasFetchedConditions, setHasFetchedConditions] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phoneNumber: '',
    condition: '',
    conditionId: null,
    categoryId: null,
    ndprConsent: false,
    dataProfileConsent: false,
  });

  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  // Fetch conditions on component mount
  useEffect(() => {
    if (hasFetchedConditions) return;

    const fetchConditions = async () => {
      try {
        setIsLoadingConditions(true);
        const response = await getConditions();

        console.log(
          '[Conditions] Raw API response (full):',
          JSON.stringify(response, null, 2),
        );

        const formatConditionName = (code: string): string => {
          return code
            .split(/[\s_]+/)
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
            )
            .join(' ');
        };

        const categories: Category[] = Array.isArray(response)
          ? response
          : Array.isArray((response as any).data)
            ? (response as any).data
            : [];

        console.log(
          '[Conditions] Normalised categories count:',
          categories.length,
        );
        categories.forEach((cat) => {
          console.log(
            `[Conditions]   category "${cat.name}" (id=${cat.id}) → ${cat.subcategories?.length ?? 0} subcategories`,
          );
        });

        const medicineCategory = categories.find(
          (cat) => cat.id === MEDICINE_CATEGORY_ID,
        );

        const options: ConditionOption[] = [];

        if (medicineCategory?.subcategories?.length) {
          medicineCategory.subcategories.forEach((subcategory) => {
            options.push({
              id: subcategory.id,
              categoryId: medicineCategory.id,
              name: subcategory.name,
              code: subcategory.code,
              displayName: formatConditionName(subcategory.code),
            });
          });
        }

        if (options.length > 0) {
          options.push({
            id: 999,
            categoryId: MEDICINE_CATEGORY_ID,
            name: 'others',
            code: 'others',
            displayName: 'Others',
          });
        }

        console.log(
          '[Conditions] Final dropdown options:',
          options.map((o) => o.displayName),
        );
        setConditionOptions(options);
        setHasFetchedConditions(true);
      } catch (err) {
        console.error('[Conditions] Failed to fetch conditions:', err);

        setConditionOptions([
          {
            id: 1,
            categoryId: MEDICINE_CATEGORY_ID,
            name: 'chronic',
            code: 'hypertension',
            displayName: 'Hypertension',
          },
          {
            id: 2,
            categoryId: MEDICINE_CATEGORY_ID,
            name: 'chronic',
            code: 'diabetes',
            displayName: 'Diabetes',
          },
          {
            id: 3,
            categoryId: MEDICINE_CATEGORY_ID,
            name: 'chronic',
            code: 'weight loss',
            displayName: 'Weight Loss',
          },
          {
            id: 4,
            categoryId: MEDICINE_CATEGORY_ID,
            name: 'chronic',
            code: 'asthma',
            displayName: 'Asthma',
          },
          {
            id: 999,
            categoryId: MEDICINE_CATEGORY_ID,
            name: 'others',
            code: 'others',
            displayName: 'Others',
          },
        ]);
        setHasFetchedConditions(true);
      } finally {
        setIsLoadingConditions(false);
      }
    };

    fetchConditions();
  }, [hasFetchedConditions, getConditions]);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name === 'condition') {
      const selectedCondition = conditionOptions.find((c) => c.code === value);
      setFormData((prev) => ({
        ...prev,
        condition: value,
        conditionId: selectedCondition?.id || null,
        categoryId: selectedCondition?.categoryId || null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }

    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^0[789][01]\d{8}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Phone number must be a valid Nigerian number';
    }

    if (!formData.condition.trim()) {
      errors.condition = 'Please specify your condition';
    }

    if (!formData.ndprConsent) {
      errors.ndprConsent = 'You must accept NDPR terms';
    }

    if (!formData.dataProfileConsent) {
      errors.dataProfileConsent = 'You must consent to data storage';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      console.log('Starting session with data:', {
        name: formData.name,
        email: formData.email,
        phone: formData.phoneNumber,
        medicine_type: formData.condition.toLowerCase(),
        subcategory_id: formData.conditionId,
        category_id: formData.categoryId,
      });

      // Store subcategory and category IDs for the medicine survey step.

      if (formData.conditionId) {
        localStorage.setItem(
          'selected_subcategory_id',
          formData.conditionId.toString(),
        );
      }
      if (formData.categoryId) {
        localStorage.setItem(
          'selected_category_id',
          formData.categoryId.toString(),
        );
      }

      await startSession({
        name: formData.name,
        email: formData.email,
        phone: formData.phoneNumber,
        medicine_type: formData.condition.toLowerCase(),
      });

      console.log('Session created successfully!');

      setTimeout(() => {
        navigate('/products/refill/survey');
      }, 100);
    } catch (err) {
      console.error('Failed to start session:', err);
      alert('Failed to create session. Please check the form and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Side - Form */}
        <div className="px-8 py-12 lg:px-20 lg:py-16 flex flex-col">
          <ProgressBar currentStep={1} totalSteps={9} />
          {/* Back Button */}
          <button
            onClick={() => navigate('/products/refill')}
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

            {/* API Error Display */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

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
                className={`w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base ${
                  validationErrors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                style={{ fontFamily: 'Lato, sans-serif' }}
              />
              {validationErrors.name && (
                <p className="text-red-500 text-sm mt-2">
                  {validationErrors.name}
                </p>
              )}
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
                className={`w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base ${
                  validationErrors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                style={{ fontFamily: 'Lato, sans-serif' }}
              />
              {validationErrors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {validationErrors.email}
                </p>
              )}
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
                className={`w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base ${
                  validationErrors.phoneNumber
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
                style={{ fontFamily: 'Lato, sans-serif' }}
              />
              {validationErrors.phoneNumber && (
                <p className="text-red-500 text-sm mt-2">
                  {validationErrors.phoneNumber}
                </p>
              )}
            </div>

            {/* Condition Field */}
            <div className="mb-8">
              <label
                className="block text-base font-medium text-gray-800 mb-3"
                style={{ fontFamily: 'Lato, sans-serif' }}
              >
                What Condition are you managing
              </label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                disabled={isLoadingConditions}
                className={`w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base ${
                  validationErrors.condition
                    ? 'border-red-500'
                    : 'border-gray-300'
                } ${isLoadingConditions ? 'opacity-50 cursor-wait' : ''}`}
                style={{ fontFamily: 'Lato, sans-serif' }}
              >
                <option value="">
                  {isLoadingConditions
                    ? 'Loading conditions...'
                    : 'Select a condition'}
                </option>
                {conditionOptions.map((condition) => (
                  <option key={condition.id} value={condition.code}>
                    {condition.displayName}
                  </option>
                ))}
              </select>
              {validationErrors.condition && (
                <p className="text-red-500 text-sm mt-2">
                  {validationErrors.condition}
                </p>
              )}
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
                  className={`mt-1 w-5 h-5 text-green-600 rounded focus:ring-green-500 ${
                    validationErrors.ndprConsent
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                />
                <span
                  className="text-base text-gray-700 leading-relaxed"
                  style={{ fontFamily: 'Lato, sans-serif' }}
                >
                  I understand that my information is protected under NDPR and
                  will only be used for medical purposes.
                </span>
              </label>
              {validationErrors.ndprConsent && (
                <p className="text-red-500 text-sm">
                  {validationErrors.ndprConsent}
                </p>
              )}

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="dataProfileConsent"
                  checked={formData.dataProfileConsent}
                  onChange={handleInputChange}
                  className={`mt-1 w-5 h-5 text-green-600 rounded focus:ring-green-500 ${
                    validationErrors.dataProfileConsent
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                />
                <span
                  className="text-base text-gray-700 leading-relaxed"
                  style={{ fontFamily: 'Lato, sans-serif' }}
                >
                  I consent to having my data saved to a secured personal
                  profile that only I can access
                </span>
              </label>
              {validationErrors.dataProfileConsent && (
                <p className="text-red-500 text-sm">
                  {validationErrors.dataProfileConsent}
                </p>
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={isLoading || isLoadingConditions}
              className="bg-[#3da467] hover:bg-green-700 text-white px-8 py-4 rounded-full text-base font-semibold transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              {isLoading ? 'Processing...' : 'Next'}
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
