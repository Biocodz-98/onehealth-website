import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProductItem {
  name: string;
  description: string;
  link: string;
  logo: string;
}

const PRODUCT_ITEMS: ProductItem[] = [
  {
    name: 'Imani',
    description:
      'Imani is the breast pump that gives you back your time, energy, and peace of mind',
    link: '/products/imani',
    logo: '/imani-onehealthng/images/OneHealthng--Imani-Logo.svg',
  },
  {
    name: 'Method',
    description:
      'The Method is a doctor-led GLP-1 program in Nigeria using semaglutide or tirzepatide when appropriate.',
    link: '/products/method',
    logo: '/method-images/Onehealthng-Logo.svg',
  },
  {
    name: 'Refill',
    description:
      'Refill is a personalized medicine delivery service that ensures you never run out of your essential medications.',
    link: '/products/refill',
    logo: '/prefill-images/onehealth logo.svg',
  },
];

interface ProductProps {
  className?: string;
}

export default function Product({ className }: ProductProps) {
  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  // Card animation
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      className={cn('w-full px-4 py-6', className)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
        {PRODUCT_ITEMS.map((item, index) => (
          <motion.div key={index} variants={cardVariants}>
            <Link
              to={item.link}
              className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-[#228821] hover:shadow-lg block h-full"
            >
              <div className="flex flex-col h-full">
                {/* Product Name with Logo */}
                <motion.div
                  className="flex items-center gap-3 mb-2"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                >
                  {/* Logo Image */}
                  <img
                    src={item.logo}
                    alt={`${item.name} logo`}
                    className="w-10 h-10 flex-shrink-0 object-contain"
                  />

                  {/* Product Name */}
                  <h3 className="text-xl font-semibold text-secondary group-hover:text-[#228821] transition-colors">
                    {item.name}
                  </h3>
                </motion.div>

                {/* Product Description */}
                <motion.p
                  className="text-sm text-gray-600 mb-4 flex-grow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                >
                  {item.description}
                </motion.p>

                {/* Arrow Icon */}
                <motion.div
                  className="flex items-center text-[#228821] text-sm font-medium"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                >
                  <span className="group-hover:mr-2 transition-all">
                    Learn more
                  </span>
                  <svg
                    className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
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
                </motion.div>
              </div>

              {/* Hover Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#228821]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
