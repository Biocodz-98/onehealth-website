import { Check } from "lucide-react";
import { motion } from "framer-motion";

function WhatWeOffer() {
  return (
    <div
      className="p-6 sm:p-8 md:p-12 lg:p-20 lg:py-16"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mb-8 sm:mb-10 md:mb-12 px-4"
          style={{
            fontFamily: "Lexend, sans-serif",
            fontWeight: "700",
            lineHeight: "110%",
            color: "#000000",
          }}
        >
          What We Offer
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-6 md:mb-8">
          {/* Section 1: Semaglutide */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col justify-center p-6 sm:p-8 md:p-12 border-b md:border-r md:border-b"
            style={{
              borderColor: "#bfbfbf",
              borderStyle: "dashed",
            }}
          >
            <h2
              className="text-xl sm:text-2xl md:text-3xl mb-3 md:mb-4"
              style={{
                color: "#48533e",
                fontFamily: "Lexend, sans-serif",
                fontWeight: "700",
                lineHeight: "110%",
              }}
            >
              Semaglutide Programs
              <br />
              (GLP-1)
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Check
                  className="w-5 h-5 mt-0.5 shrink-0"
                  style={{ color: "#2d7a4f" }}
                />
                <p
                  className="text-sm sm:text-base"
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: "400",
                    lineHeight: "150%",
                    color: "#000000",
                  }}
                >
                  Acts on the same GLP-1 pathway used in Ozempic®/Wegovy®
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Check
                  className="w-5 h-5 mt-0.5 shrink-0"
                  style={{ color: "#2d7a4f" }}
                />
                <p
                  className="text-sm sm:text-base"
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: "400",
                    lineHeight: "150%",
                    color: "#000000",
                  }}
                >
                  Best for people needing steady appetite control and metabolic
                  support
                </p>
              </div>
            </div>
          </motion.div>

          {/* Section 2: Tirzepatide */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col justify-center p-6 sm:p-8 md:p-12 border-b"
            style={{
              borderColor: "#bfbfbf",
              borderStyle: "dashed",
            }}
          >
            <h2
              className="text-xl sm:text-2xl md:text-3xl mb-3 md:mb-4"
              style={{
                color: "#48533e",
                fontFamily: "Lexend, sans-serif",
                fontWeight: "700",
                lineHeight: "110%",
              }}
            >
              Tirzepatide Programs (GLP-1 + GIP)
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Check
                  className="w-5 h-5 mt-0.5 shrink-0"
                  style={{ color: "#2d7a4f" }}
                />
                <p
                  className="text-sm sm:text-base"
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: "400",
                    lineHeight: "150%",
                    color: "#000000",
                  }}
                >
                  Dual-action (GLP-1 + GIP) medicine class similar to
                  Mounjaro®/Zepbound® in how it works
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Check
                  className="w-5 h-5 mt-0.5 shrink-0"
                  style={{ color: "#2d7a4f" }}
                />
                <p
                  className="text-sm sm:text-base"
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: "400",
                    lineHeight: "150%",
                    color: "#000000",
                  }}
                >
                  May be considered where dual-pathway support is clinically
                  suitable
                </p>
              </div>
            </div>
          </motion.div>

          {/* Section 3: Lifestyle & Muscle-Health */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            className="flex flex-col justify-center p-6 sm:p-8 md:p-12 border-b md:border-r md:border-b-0"
            style={{
              borderColor: "#bfbfbf",
              borderStyle: "dashed",
            }}
          >
            <h2
              className="text-xl sm:text-2xl md:text-3xl mb-3 md:mb-4"
              style={{
                color: "#48533e",
                fontFamily: "Lexend, sans-serif",
                fontWeight: "700",
                lineHeight: "110%",
              }}
            >
              Lifestyle &amp; Muscle-Health
              <br />
              Companion
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Check
                  className="w-5 h-5 mt-0.5 shrink-0"
                  style={{ color: "#2d7a4f" }}
                />
                <p
                  className="text-sm sm:text-base"
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: "400",
                    lineHeight: "150%",
                    color: "#000000",
                  }}
                >
                  Protein targets, strength guidance, Lagos-friendly movement
                  ideas, and pharmacist check-ins to protect lean mass and
                  energy
                </p>
              </div>
            </div>
          </motion.div>

          {/* Section 4: Maintenance & Relapse */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
            className="flex flex-col justify-center p-6 sm:p-8 md:p-12"
          >
            <h2
              className="text-xl sm:text-2xl md:text-3xl mb-3 md:mb-4"
              style={{
                color: "#48533e",
                fontFamily: "Lexend, sans-serif",
                fontWeight: "700",
                lineHeight: "110%",
              }}
            >
              Maintenance &amp; Relapse
              <br />
              Prevention
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Check
                  className="w-5 h-5 mt-0.5 shrink-0"
                  style={{ color: "#2d7a4f" }}
                />
                <p
                  className="text-sm sm:text-base"
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: "400",
                    lineHeight: "150%",
                    color: "#000000",
                  }}
                >
                  Provider-led taper or maintenance dose when you reach goal;
                  practical strategies to keep results stable
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
          className="flex justify-center mt-6 md:mt-8 px-4"
        >
          <a
            href="https://tally.so/r/mKqLN8"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-sm sm:text-base hover:bg-[#358f3d] transition-colors"
            style={{
              backgroundColor: "#3da647",
              color: "#ffffff",
              fontFamily: "Manrope, sans-serif",
              padding: "14px 28px",
              borderRadius: "50px",
              border: "none",
              cursor: "pointer",
            }}
          >
            See Which Option Fits You
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export default WhatWeOffer;
