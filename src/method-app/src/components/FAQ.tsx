import { useState } from "react";
import { motion } from "framer-motion";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Is this program safe?",
      answer:
        "Yes. Only licensed doctors prescribe after reviewing your health history. If you're not eligible, you don't pay.",
    },
    {
      question: "How do I know it's genuine?",
      answer:
        "All prescriptions and treatments come from verified medical professionals who comply with healthcare regulations.",
    },
    {
      question: "What happens if I get side effects?",
      answer:
        "You can contact your doctor immediately for a review, and your treatment will be adjusted accordingly.",
    },
    {
      question: "Do I have to take it forever?",
      answer:
        "No. The goal is to achieve sustainable weight management with ongoing lifestyle and dietary guidance.",
    },
    {
      question: "Is my information private?",
      answer:
        "Absolutely. We follow strict data protection policies, and your personal information is never shared.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq" className="p-6 sm:p-8 md:p-12 lg:p-20 lg:py-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center md:text-left px-2 md:px-0"
          >
            <h1
              className="mb-3 md:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
              style={{
                fontFamily: "Lexend, sans-serif",
                fontWeight: "700",
                lineHeight: "110%",
                color: "#000000",
                letterSpacing: "0.02em",
              }}
            >
              FREQUENTLY
              <br />
              ASKED{" "}
              <span
                style={{
                  color: "#3da647",
                }}
              >
                QUESTIONS
              </span>
            </h1>
            <p
              className="text-sm sm:text-base md:text-lg mb-6 md:mb-8"
              style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: "400",
                lineHeight: "150%",
                color: "#323232",
              }}
            >
              All you need to know about clinically guided weight loss that
              lasts.
            </p>
            <div className="flex justify-center md:justify-start">
              <button
                className="hover:bg-green-50 transition-colors font-medium w-full sm:w-auto text-sm sm:text-base"
                style={{
                  padding: "14px 24px",
                  borderRadius: "50px",
                  border: "1px solid #3da647",
                  color: "#3da647",
                  cursor: "pointer",
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: "500",
                  lineHeight: "150%",
                }}
              >
                Start Your Free Readiness Check
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="space-y-3 sm:space-y-4 px-2 md:px-0"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  delay: 0.3 + index * 0.1,
                }}
                className="border-b border-gray-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-4 sm:py-5 md:py-6 flex justify-between items-center text-left hover:text-green-600 transition-colors gap-4"
                >
                  <span
                    className="text-base sm:text-lg md:text-xl"
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontWeight: "700",
                      lineHeight: "120%",
                      color: openIndex === index ? "#3da647" : "#000000",
                    }}
                  >
                    {faq.question}
                  </span>
                  <span
                    className="text-2xl sm:text-3xl shrink-0 font-light"
                    style={{
                      color: openIndex === index ? "#3da647" : "#9ca3af",
                    }}
                  >
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
                {openIndex === index && faq.answer && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="pb-4 sm:pb-5 md:pb-6 pr-8 text-sm sm:text-base"
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontWeight: "400",
                      lineHeight: "150%",
                      color: "#323232",
                    }}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
