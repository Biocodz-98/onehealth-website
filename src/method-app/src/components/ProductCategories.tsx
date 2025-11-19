import { motion } from "framer-motion";

function ProductCategories() {
  return (
    <div
      className="p-6 sm:p-8 md:p-12 lg:p-20 lg:py-16"
      style={{ backgroundColor: "#fef4e9" }}
    >
      <div className="max-w-5xl mx-auto">
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
          Why We&apos;re Different
        </motion.h1>

        {/* Grid of difference cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Section 1: Pharmacist Support */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="flex items-center justify-center p-6 sm:p-8"
          >
            <img
              src="/method-images/pharmacist support.svg"
              alt="Pharmacist support"
              className="w-full max-w-xs sm:max-w-sm"
            />
          </motion.div>

          {/* Section 2: Local Supply */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="flex items-center justify-center p-6 sm:p-8"
          >
            <img
              src="/method-images/local supply.svg"
              alt="Local supply"
              className="w-full max-w-xs sm:max-w-sm"
            />
          </motion.div>

          {/* Section 3: Temperature Verified */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            className="flex items-center justify-center p-6 sm:p-8"
          >
            <img
              src="/method-images/temperature verified.svg"
              alt="Temperature verified"
              className="w-full max-w-xs sm:max-w-sm"
            />
          </motion.div>

          {/* Section 4: Discrete Private */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
            className="flex items-center justify-center p-6 sm:p-8"
          >
            <img
              src="/method-images/discrete private.svg"
              alt="Discrete private"
              className="w-full max-w-xs sm:max-w-sm"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ProductCategories;
