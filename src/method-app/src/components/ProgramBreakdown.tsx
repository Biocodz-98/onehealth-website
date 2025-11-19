import { motion } from "framer-motion";

function ProgramBreakdown() {
  return (
    <div
      className="p-6 sm:p-8 md:p-12 lg:p-20 lg:py-16"
      style={{
        backgroundColor: "#1e1e1e",
      }}
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
            color: "#ffffff",
          }}
        >
          Program Breakdown
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="flex items-center justify-center p-4 sm:p-6 md:p-8"
        >
          <img
            src="/method-images/program breakdown.svg"
            alt="Program Breakdown"
            className="w-full h-auto max-w-full object-contain"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="flex justify-center mt-6 md:mt-8 px-4"
        >
          <button
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
            Confirm Eligibility Now
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default ProgramBreakdown;
