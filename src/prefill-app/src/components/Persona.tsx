import React from 'react';

// Types
interface MedicineItem {
  id: string;
  name: string;
  dosage: string;
  image: string;
}

interface WellnessPersonaProps {
  medicines?: MedicineItem[];
}

const WellnessPersona: React.FC<WellnessPersonaProps> = ({ medicines }) => {
  // Default medicines if none provided
  const defaultMedicines: MedicineItem[] = [
    {
      id: '1',
      name: 'Amlodipine',
      dosage: '10mg',
      image: '/prefill-images/medicine bottle.svg',
    },
    {
      id: '2',
      name: 'Amlodipine',
      dosage: '10mg',
      image: '/prefill-images/medicine bottle.svg',
    },
    {
      id: '3',
      name: 'Amlodipine',
      dosage: '10mg',
      image: '/prefill-images/medicine bottle.svg',
    },
    {
      id: '4',
      name: 'Amoxicillin',
      dosage: '10mg',
      image: '/prefill-images/amoxicillin capsules.svg',
    },
    {
      id: '5',
      name: 'Amoxicillin',
      dosage: '10mg',
      image: '/prefill-images/amoxicillin capsules.svg',
    },
  ];

  const displayMedicines = medicines || defaultMedicines;

  const handleShareWhatsApp = () => {
    const message = encodeURIComponent(
      `My 2026 Wellness Persona - I'm Consistent!\n\nTop medicines:\n${displayMedicines
        .map((med, idx) => `${idx + 1}. ${med.name} ${med.dosage}`)
        .join('\n')}`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center px-8 py-12"
      style={{ fontFamily: 'Lexend, sans-serif' }}
    >
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Section - Description */}
        <div className="space-y-6">
          <h1
            className="text-4xl lg:text-3xl font-normal text-[#000000] leading-tight"
            style={{
              fontFamily: 'Lexend, sans-serif',
              lineHeight: 1.2,
              fontWeight: 400,
            }}
          >
            Based on your choices, it looks like you are:
          </h1>
          <p
            className="text-base text-[#000000]  font-normal"
            style={{
              fontFamily: 'Manrope, sans-serif',
              lineHeight: 1.2,
              fontWeight: 400,
              fontStyle: 'normal',
            }}
          >
            Consistent
          </p>
        </div>

        {/* Right Section - Persona Card */}
        <div className="relative">
          {/* Card with gradient background */}
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

              {/* Medicine List */}
              <div className="space-y-4 mb-8">
                {displayMedicines.map((medicine, index) => (
                  <div
                    key={medicine.id}
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

                    {/* Medicine Image */}
                    <img
                      src={medicine.image}
                      alt={medicine.name}
                      className="w-10 h-10 object-contain"
                    />

                    {/* Medicine Info */}
                    <div className="flex-1">
                      <p
                        className="text-white font-medium text-base"
                        style={{
                          fontFamily: 'Familjen Grotesk, sans-serif',
                          fontWeight: 400,
                        }}
                      >
                        {medicine.name}
                      </p>
                      <p
                        className="text-white text-xs"
                        style={{
                          fontFamily: 'Familjen Grotesk, sans-serif',
                          fontWeight: 400,
                        }}
                      >
                        {medicine.dosage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Share Button */}
              <button
                onClick={handleShareWhatsApp}
                className="w-80 border-2 border-white text-white py-3 pointer rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-colors flex items-center justify-center gap-2"
                style={{ fontFamily: 'Manrope, sans-serif', cursor: 'pointer' }}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Share on Whatsapp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessPersona;
