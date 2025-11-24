import { useState } from "react";
import { motion } from "framer-motion";

export default function WeightLossLanding() {
  const [imageLoaded, setImageLoaded] = useState({
    img1: false,
    img2: false,
  });

  return (
    <div
      className="p-6 sm:p-8 md:p-12 lg:p-20 lg:py-16"
      style={{
        background:
          "linear-gradient(270deg, rgba(207, 234, 209, 0.7) -5.28%, rgba(252, 244, 232, 0.7) 18.28%, rgba(254, 244, 233, 0.7) 42.1%, rgba(226, 242, 227, 0.7) 97.58%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6 md:space-y-8"
          >
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: "700",
                lineHeight: "110%",
                color: "#000000",
              }}
            >
              Clinically
              <br />
              Guided Weight
              <br />
              Loss That Lasts.
            </h1>

            <p
              className="text-base sm:text-lg md:text-xl max-w-lg leading-relaxed"
              style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: "400",
                lineHeight: "150%",
                color: "#323232",
              }}
            >
              The Method is a doctor-led GLP-1 program in Nigeria using
              semaglutide or tirzepatide when appropriate (the same medication
              classes used in Ozempic®/Wegovy®), paired with pharmacist
              follow-ups and muscle-health guidance.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <a
                href="https://tally.so/r/mKqLN8"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 transition-colors text-sm sm:text-base w-full sm:w-auto"
                style={{
                  padding: "14px 24px",
                  borderRadius: "50px",
                  border: "1px solid #3da647",
                  color: "#ffffff",
                  cursor: "pointer",
                }}
              >
                Start Your Medical Assessment
              </a>
              <a
                href="https://tally.so/r/mKqLN8"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white transition-colors hover:bg-green-50 text-sm sm:text-base w-full sm:w-auto"
                style={{
                  padding: "14px 24px",
                  borderRadius: "50px",
                  border: "1px solid #3da647",
                  color: "#3da647",
                  cursor: "pointer",
                }}
              >
                Check Eligibility (free)
              </a>
            </div>

            <div className="flex items-center gap-3 pt-2 md:pt-4">
              <img
                src="/method-images/hero image 04.svg"
                alt="Trusted Doctors"
                className="w-12 h-12 sm:w-14 sm:h-14"
              />
              <div className="text-xs sm:text-sm text-gray-700">
                <div className="font-semibold">Safe, Trusted & Doctor</div>
                <div>Guided Program</div>
              </div>
            </div>
          </motion.div>

          {/* Right Images Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-8 lg:mt-0">
            {/* Top Left - Woman measuring waist */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg"
            >
              <div className="rounded-3xl overflow-hidden shadow-lg relative bg-gray-200">
                {!imageLoaded.img1 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}

                <img
                  src="/method-images/hero image 01.svg"
                  alt="Woman measuring waist"
                  className={`w-full h-48 transition-opacity duration-300 ${
                    imageLoaded.img1 ? "opacity-100" : "opacity-0"
                  } sm:h-56 md:h-64 object-cover`}
                  onLoad={() =>
                    setImageLoaded((prev) => ({ ...prev, img1: true }))
                  }
                />
              </div>
            </motion.div>

            {/* Top Right - Elderly woman eating healthy - spans 2 rows */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg row-span-2"
            >
              <img
                src="/method-images/hero image 03.svg"
                alt="Woman with healthy meal"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Bottom Left - Measuring tape */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg"
            >
              <div className="rounded-3xl overflow-hidden shadow-lg relative bg-gray-200">
                {!imageLoaded.img2 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}

                <img
                  src="/method-images/hero image 02.svg"
                  alt="Measuring tape"
                  className={`w-full h-48 transition-opacity duration-300 ${
                    imageLoaded.img2 ? "opacity-100" : "opacity-0"
                  } sm:h-56 md:h-64 object-cover`}
                  onLoad={() =>
                    setImageLoaded((prev) => ({ ...prev, img2: true }))
                  }
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
