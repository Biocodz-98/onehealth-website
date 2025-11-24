import { Check } from "lucide-react";
import { motion } from "framer-motion";

export default function MethodWorks() {
  return (
    <div
      id="how-it-works"
      className="p-6 sm:p-8 md:p-12 lg:p-20 lg:py-16"
      style={{ backgroundColor: "#fafdf7" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mb-8 sm:mb-10 md:mb-12"
          style={{
            fontFamily: "Lexend, sans-serif",
            fontWeight: "700",
            lineHeight: "110%",
            color: "#000000",
          }}
        >
          How The Method Works
        </motion.h1>

        {/* Section 1: Doctor Consultation */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center justify-center p-6 md:p-8 md:border-r md:border-b border-gray-300"
          >
            <img
              src="/method-images/doctor consultation.svg"
              alt="Doctor consultation illustration"
              className="w-full max-w-xs sm:max-w-sm"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col justify-center px-4 md:px-0"
          >
            <h2
              className="text-xl sm:text-2xl md:text-3xl mb-3 md:mb-4"
              style={{
                color: "#2e7d35",
                fontFamily: "Lexend, sans-serif",
                fontWeight: "700",
                lineHeight: "110%",
              }}
            >
              DOCTOR CONSULTATION &<br />
              QUALIFICATION
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
                  Take the readiness quiz (60 seconds).
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
                  Book a private telehealth consult with a licensed Nigerian
                  doctor.
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
                  Your history and risks (e.g., pancreatitis, pregnancy,
                  gallbladder issues) are screened; a personalized starting dose
                  is set if appropriate.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Section 2: Medication & Delivery */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col justify-center order-2 md:order-1 px-4 md:px-0"
          >
            <h2
              className="text-xl sm:text-2xl md:text-3xl mb-3 md:mb-4"
              style={{
                color: "#2e7d35",
                fontFamily: "Lexend, sans-serif",
                fontWeight: "700",
                lineHeight: "110%",
              }}
            >
              VERIFIED MEDICATION &<br />
              DELIVERY
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
                  If prescribed, your semaglutide or tirzepatide is dispensed by
                  OneHealth's licensed pharmacy.
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
                  Cold-chain packaging keeps every dose potent, delivery is
                  discreet and on schedule.
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
                  Automated refills prevent gaps.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="flex items-center justify-center p-6 md:p-8 order-1 md:order-2 md:border-l md:border-b border-gray-300"
          >
            <img
              src="/method-images/verified medication.svg"
              alt="Delivery illustration"
              className="w-full max-w-xs sm:max-w-sm"
            />
          </motion.div>
        </div>

        {/* Section 3: Post-Medication Support */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center justify-center p-6 md:p-8 md:border-r border-gray-300"
          >
            <img
              src="/method-images/medication support.svg"
              alt="Post-medication support illustration"
              className="w-full max-w-xs sm:max-w-sm"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col justify-center px-4 md:px-0"
          >
            <h2
              className="text-xl sm:text-2xl md:text-3xl mb-3 md:mb-4"
              style={{
                color: "#2e7d35",
                fontFamily: "Lexend, sans-serif",
                fontWeight: "700",
                lineHeight: "110%",
              }}
            >
              POST-MEDICATION SUPPORT
              <br />& MAINTENANCE
            </h2>
            <div className="space-y-3 mb-6">
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
                  Scheduled pharmacist check-ins for side-effect coaching and
                  dose adjustments.
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
                  Muscle-health guidance (protein targets, Lagos-practical
                  strength plan) so you lose fat, not strength.
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
                  Maintenance phase once you hit the goal, to protect results.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <a
                href="https://tally.so/r/mKqLN8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-medium shadow-md hover:shadow-lg transition-shadow w-full sm:w-auto text-sm sm:text-base"
                style={{
                  backgroundColor: "#3da647",
                  padding: "14px 24px",
                  borderRadius: "50px",
                }}
              >
                Start the Readiness Check
              </a>
              <a
                href="https://tally.so/r/mKqLN8"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 font-medium hover:bg-gray-50 transition-colors w-full sm:w-auto text-sm sm:text-base"
                style={{
                  borderColor: "#3da647",
                  color: "#3da647",
                  padding: "14px 24px",
                  borderRadius: "50px",
                  fontWeight: "500",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                Book My Doctor Consultation
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
