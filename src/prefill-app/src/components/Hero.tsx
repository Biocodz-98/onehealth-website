import React from 'react';

// Types
interface HeroSectionProps {
  className?: string;
  onStartBuilding?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  className = '',
  onStartBuilding,
}) => {
  return (
    <section
      className={`relative w-full bg-[#ffffff] overflow-hidden ${className}`}
      style={{ fontFamily: 'Lexend, sans-serif' }}
    >
      {/* Diagonal images */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left diagonal line */}
        <div className="absolute top-0 left-0 w-full h-full">
          <img
            src="/prefill-images/diagonal left.svg"
            alt=""
            className="absolute top-0  left-0 w-auto h-full object-contain opacity-30"
          />
        </div>
        {/* Right diagonal line */}
        <div className="absolute top-0 right-0 w-full h-full">
          <img
            src="/prefill-images/diagonal right.svg"
            alt=""
            className="absolute top-0 right-0 w-auto h-full object-contain opacity-30"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20 pb-40 lg:pb-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="relative z-10">
            <h1 className="text-5xl lg:text-6xl font-bold text-[#000000] mb-4 leading-tight">
              Build My
              <br />
              2026
              <br />
              Essentials
              <br />
              List
            </h1>
            <p
              className="text-lg text-[#000000] mb-8"
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 400,
                lineHeight: '150%',
                fontSize: '20px',
                fontStyle: 'normal',
              }}
            >
              Enter to save up to 50% on medicines and more
            </p>
            <button
              onClick={onStartBuilding}
              className="bg-[#3da467] hover:bg-green-700 text-white px-8 py-3.5 rounded-full text-lg font-normal transition-colors shadow-lg"
              style={{
                fontFamily: 'Manrope, sans-serif',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              Start Building
            </button>
          </div>

          {/* Right Content - Image with Play Button */}
          <div className="relative z-10">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/prefill-images/adeola-alli image.svg"
                alt="Woman in white top"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Image Strip */}
      <div className="absolute bottom-0 left-0 w-full h-32 lg:h-40">
        <img
          src="/prefill-images/icons-image.svg"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>
    </section>
  );
};

export default HeroSection;
