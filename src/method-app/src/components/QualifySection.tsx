import { motion } from "framer-motion";

export default function WeightLossHero() {
  return (
    <div className="p-6 sm:p-8 md:p-12 lg:p-20 lg:py-16 bg-white">
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg order-2 md:order-1"
          >
            <img
              src="/method-images/happy lady image.svg"
              alt="Woman celebrating with scale"
              className="w-full h-64 sm:h-80 md:h-96 lg:h-full object-cover"
            />
          </motion.div>

          {/* Right side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="space-y-6 md:space-y-8 order-1 md:order-2"
          >
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: "700",
                lineHeight: "110%",
                color: "#000000",
              }}
            >
              See If It's Right for You Before You{" "}
              <span className="block">Spend a Naira.</span>
            </h1>

            <p
              className="text-sm sm:text-base md:text-lg leading-relaxed"
              style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: "400",
                lineHeight: "150%",
                color: "#323232",
              }}
            >
              Answer a few quick questions to see if GLP-1 care suits your body
              and history. If you qualify, your doctor creates a personal
              protocol and you choose whether to book a one-time consult or
              bundle your full plan. If not, you walk away informed. not billed.
            </p>

            <div className="pt-2">
              <a
                href="https://tally.so/r/mKqLN8"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#3da647] hover:bg-[#358f3d] text-white transition-colors shadow-lg hover:shadow-xl w-full sm:w-auto text-sm sm:text-base"
                style={{
                  borderRadius: "50px",
                  padding: "14px 28px",
                  cursor: "pointer",
                }}
              >
                See If I Qualify
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
