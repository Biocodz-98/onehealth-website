import React, { useState, useEffect } from 'react';
import { useRefill } from '../Services/refillApi';
import { useNavigate } from 'react-router-dom';
import { Heart, Trash2, ChevronDown, ArrowLeft } from 'lucide-react';

//Types
interface CartItem {
  id: string;
  name: string;
  dosage: string;
  price: number;
  image: string;
  quantity: number;
  autoRefill: boolean;
  refillDays: number;
}

// interface RecommendedProducts {
//   id: string;
//   name: string;
//   image: string;
//   price: number;
//   originalPrice: number;
//   rating: number;
//   reviewCount: number;
//   soldCount: number;
//   size?: 'sm' | 'md';
// }

// // ITEM DATA
// const cartItemsData = [
//   {
//     id: '1',
//     name: 'Amlodipine Capsules',
//     dosage: '10mg | 10 capsules',
//     price: 25000,
//     image: '/prefill-images/medicine bottle.svg',
//     autoRefill: true,
//     refillDays: 30,
//   },
//   {
//     id: '2',
//     name: 'Amoxicillin Capsules',
//     dosage: '500mg | 10 capsules',
//     price: 7000,
//     image: '/prefill-images/amoxicillin capsules.svg',
//     autoRefill: false,
//     refillDays: 30,
//   },
//   {
//     id: '3',
//     name: 'Amoxicillin Capsules',
//     dosage: '500mg | 10 capsules',
//     price: 7000,
//     image: '/prefill-images/amoxicillin capsules.svg',
//     autoRefill: false,
//     refillDays: 30,
//   },
// ];

// const recommendedProducts: RecommendedProducts[] = [
//   {
//     id: 'r1',
//     name: 'medicube',
//     price: 52000,
//     originalPrice: 79000,
//     rating: 4.5,
//     reviewCount: 2435,
//     soldCount: 2144,
//     image: '/prefill-images/medicube.svg',
//   },
//   {
//     id: 'r2',
//     name: 'ANUA',
//     price: 12000,
//     originalPrice: 30000,
//     rating: 4.5,
//     reviewCount: 2435,
//     soldCount: 2144,
//     image: '/prefill-images/anua cream.svg',
//   },
//   {
//     id: 'r3',
//     name: 'CLEAN SKIN CLUB',
//     price: 48000,
//     originalPrice: 60000,
//     rating: 4.5,
//     reviewCount: 2435,
//     soldCount: 2144,
//     image: '/prefill-images/clean skin club.svg',
//   },
//   {
//     id: 'r4',
//     name: 'Mighty Patch',
//     price: 25000,
//     originalPrice: 52000,
//     rating: 4.5,
//     reviewCount: 2435,
//     soldCount: 2144,
//     image: '/prefill-images/mighty patch.svg',
//   },
// ];

// CART COMPONENTS

// Progress Steps Component
const ProgressSteps = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    { number: 1, title: 'Cart', subtitle: 'Confirm your order' },
    {
      number: 2,
      title: 'Checkout',
      subtitle: 'Make sure all your details are correct.',
    },
    { number: 3, title: 'Payment', subtitle: 'Select payment method and pay' },
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between max-w-2xl">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-3 h-3 rounded-full mb-2 ${
                  step.number <= currentStep ? 'bg-[#3da647]' : 'bg-gray-300'
                }`}
              />
              <div
                className="text-center"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '14px',
                  lineHeight: '150%',
                  fontWeight: step.number <= currentStep ? 500 : 400,
                  fontStyle: 'normal',
                }}
              >
                <div
                  className={`text-sm font-medium ${
                    step.number <= currentStep
                      ? 'text-[#3da647]'
                      : 'text-gray-400'
                  }`}
                >
                  {step.title}
                </div>
                <div
                  className={`text-xs mt-1 max-w-30 ${
                    step.number <= currentStep
                      ? 'text-[#3da647]'
                      : 'text-gray-400'
                  }`}
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '14px',
                    lineHeight: '150%',
                    fontWeight: step.number <= currentStep ? 500 : 400,
                    fontStyle: 'normal',
                  }}
                >
                  {step.subtitle}
                </div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-2 ${
                  step.number < currentStep ? 'bg-green-500' : 'bg-gray-300'
                }`}
                style={{ marginTop: '-50px' }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// Star Rating Component
// const StarRating: React.FC<{ rating: number; size?: 'sm' | 'md' }> = ({
//   rating,
//   size = 'sm',
// }) => {
//   const stars = [];
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 !== 0;

//   const starSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';

//   for (let i = 0; i < 5; i++) {
//     if (i < fullStars) {
//       stars.push(
//         <svg
//           key={i}
//           className={`${starSize} fill-yellow-400`}
//           viewBox="0 0 20 20"
//         >
//           <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
//         </svg>,
//       );
//     } else if (i === fullStars && hasHalfStar) {
//       stars.push(
//         <svg
//           key={i}
//           className={`${starSize} fill-yellow-400`}
//           viewBox="0 0 20 20"
//         >
//           <defs>
//             <linearGradient id="half">
//               <stop offset="50%" stopColor="#FBBF24" />
//               <stop offset="50%" stopColor="#D1D5DB" />
//             </linearGradient>
//           </defs>
//           <path
//             fill="url(#half)"
//             d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
//           />
//         </svg>,
//       );
//     } else {
//       stars.push(
//         <svg
//           key={i}
//           className={`${starSize} fill-gray-300`}
//           viewBox="0 0 20 20"
//         >
//           <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
//         </svg>,
//       );
//     }
//   }

//   return <div className="flex gap-0.5">{stars}</div>;
// };

interface CartItemProps {
  item: CartItem;
  isFavorited: boolean;
  onToggleFavorite: (id: string) => void;
  onQuantityChange: (id: string, newQuantity: number) => void;
  onRemove: (id: string) => void;
  onToggleAutoRefill: (id: string, enabled: boolean) => void;
  onRefillDaysChange: (id: string, days: number) => void;
}

// Cart Item Component
const CartItem: React.FC<CartItemProps> = ({
  item,
  isFavorited,
  onToggleFavorite,
  onQuantityChange,
  onRemove,
  onToggleAutoRefill,
  onRefillDaysChange,
}) => {
  return (
    <div className="border-b border-gray-200 py-6">
      <div className="flex gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-32 h-32 object-contain rounded-lg "
          onError={(e) => {
            e.currentTarget.src =
              'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect fill="%23FED7AA" width="80" height="80"/%3E%3C/svg%3E';
          }}
        />

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3
                className="font-medium text-[#000000]"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: 1.5,
                }}
              >
                {item.name}
              </h3>
              <p
                className="text-sm text-[#8f8f8f] mt-1"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: 1.5,
                  fontStyle: 'normal',
                }}
              >
                {item.dosage}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onToggleFavorite(item.id)}
                className={`p-2 rounded-full transition-colors ${
                  isFavorited
                    ? 'bg-red-50 hover:bg-red-100'
                    : 'hover:bg-gray-100'
                }`}
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    isFavorited ? 'text-red-500 fill-red-500' : 'text-gray-600'
                  }`}
                />
              </button>
              <button
                onClick={() => onRemove(item.id)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Trash2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                className="w-8 h-8 border rounded-md flex items-center justify-center hover:bg-gray-50"
              >
                -
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                className="w-8 h-8 border rounded-md flex items-center justify-center hover:bg-gray-50"
              >
                +
              </button>
            </div>

            <div
              className="text-lg font-medium text-[#000000]"
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: 1.5,
              }}
            >
              ₦{(item.price * item.quantity).toLocaleString()}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={item.autoRefill}
                onChange={(e) => onToggleAutoRefill(item.id, e.target.checked)}
                className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
              />
              <span
                className="text-sm text-[#323232]"
                style={{
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '150%',
                }}
              >
                Set up automated refills
              </span>
            </label>

            <div className="relative">
              <select
                value={item.refillDays}
                onChange={(e) =>
                  onRefillDaysChange(item.id, parseInt(e.target.value))
                }
                className="pl-3 pr-8 py-1 text-sm border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                style={{
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '150%',
                }}
              >
                {[30, 60, 90].map((days) => (
                  <option key={days} value={days}>
                    {days} days
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Product Card Component
// interface ProductCardProps {
//   product: RecommendedProducts;
//   onAddToCart: (product: RecommendedProducts) => void;
// }

// const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
//   return (
//     <div className=" shadow rounded-lg p-4 hover:shadow-lg transition-shadow">
//       <img
//         src={product.image}
//         alt={product.name}
//         className="w-full h-32 object-contain mb-3"
//         onError={(e) => {
//           e.currentTarget.src =
//             'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23FBCFE8" width="200" height="200"/%3E%3C/svg%3E';
//         }}
//       />

//       <h3
//         className="font-medium text-[#575757] mb-2"
//         style={{
//           fontFamily: 'Manrope, sans-serif',
//           fontWeight: 400,
//           fontSize: '14px',
//           lineHeight: 1.5,
//         }}
//       >
//         {product.name}
//       </h3>

//       <div className="flex items-center gap-2 mb-3">
//         <span
//           className="text-base font-bold text-[#19191d]"
//           style={{
//             fontFamily: 'Manrope, sans-serif',
//             fontWeight: 700,
//             fontSize: '16px',
//             lineHeight: 1.5,
//           }}
//         >
//           ₦{product.price.toLocaleString()}
//         </span>
//         <span
//           className="text-sm text-[#323232] line-through"
//           style={{
//             fontFamily: 'Manrope, sans-serif',
//             fontWeight: 400,
//             fontSize: '12px',
//             lineHeight: 1.5,
//             fontStyle: 'normal',
//           }}
//         >
//           ₦{product.originalPrice.toLocaleString()}
//         </span>
//       </div>

//       <div className="flex items-center gap-2 mb-3">
//         <StarRating rating={product.rating} />
//         <span
//           className="text-xs text-[#323232]"
//           style={{
//             fontFamily: 'Manrope, sans-serif',
//             fontWeight: 400,
//             fontSize: '12px',
//             lineHeight: 1.5,
//             fontStyle: 'normal',
//           }}
//         >
//           {product.reviewCount.toLocaleString()}
//         </span>
//         <span
//           className="text-xs text-[#323232]"
//           style={{
//             fontFamily: 'Manrope, sans-serif',
//             fontWeight: 400,
//             fontSize: '12px',
//             lineHeight: 1.5,
//             fontStyle: 'normal',
//           }}
//         >
//           {product.soldCount.toLocaleString()} sold
//         </span>
//       </div>

//       <button
//         onClick={() => onAddToCart(product)}
//         className="w-32 py-2 border-2 border-[#3da647] text-[#3da647] rounded-3xl font-medium hover:bg-green-50 transition-colors"
//         style={{
//           fontFamily: 'Manrope, sans-serif',
//           fontSize: '14px',
//           lineHeight: 1.5,
//           cursor: 'pointer',
//         }}
//       >
//         Add to Cart
//       </button>
//     </div>
//   );
// };

// MAIN PHARMACY CART COMPONENT
const PharmacyCart: React.FC = () => {
  const navigate = useNavigate();
  const { getCart, addToCart, sessionUuid, isLoading, error } = useRefill();

  const [currentStep] = useState(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCoupons, setShowCoupons] = useState(false);
  const [isLoadingCart, setIsLoadingCart] = useState(true);
  const [favoritedItems, setFavoritedItems] = useState<Set<string>>(new Set());

  //Fetch cart items on mount

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!sessionUuid) {
        alert('Please complete the preferences form first');
        navigate('/products/refill/preferences');
        return;
      }

      try {
        setIsLoadingCart(true);
        const cartData: any = await getCart();

        // Get cached products from localStorage (saved during surveys)
        const cachedMedicines = JSON.parse(
          localStorage.getItem(`medicines_${sessionUuid}`) || '[]',
        );
        const cachedSkincares = JSON.parse(
          localStorage.getItem(`skincares_${sessionUuid}`) || '[]',
        );
        const cachedBabycares = JSON.parse(
          localStorage.getItem(`babycares_${sessionUuid}`) || '[]',
        );

        const allCachedProducts = [
          ...cachedMedicines,
          ...cachedSkincares,
          ...cachedBabycares,
        ];

        const items: CartItem[] = cartData.map((item: any) => {
          const productId = item.product_id?.toString();

          // Find matching product from cache
          const cachedProduct = allCachedProducts.find(
            (p) => p.id.toString() === productId,
          );

          return {
            id: productId || '',
            name: cachedProduct?.name || 'Unknown Product',
            dosage: cachedProduct?.dosage || '10mg | 10 capsules',
            price: item.amount || 0,
            image:
              cachedProduct?.image || '/prefill-images/medicine bottle.svg',
            quantity: item.quantity || 1,
            autoRefill: false,
            refillDays: item.refill_days || 30,
          };
        });

        setCartItems(items);
      } catch (err) {
        console.error('Failed to fetch cart:', err);
        setCartItems([]);
      } finally {
        setIsLoadingCart(false);
      }
    };

    fetchCartItems();
  }, [sessionUuid, navigate]);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 0;
  const discount = 0;
  const total = subtotal + shipping - discount;
  // const freeShippingThreshold = 33400;

  const handleQuantityChange = async (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      await addToCart({
        product_id: parseInt(id),
        quantity: newQuantity,
        purchase_type: 'buy_now',
      });

      setCartItems((items) =>
        items.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item,
        ),
      );
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
  };

  const handleToggleFavorite = (id: string) => {
    setFavoritedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const handleToggleAutoRefill = async (id: string, enabled: boolean) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, autoRefill: enabled } : item,
      ),
    );

    try {
      if (enabled) {
        await addToCart({
          product_id: parseInt(id),
          quantity: 1,
          purchase_type: 'subscribe',
          duration_months: 1,
        });
      } else {
        // If unchecking, switch back to buy_now
        await addToCart({
          product_id: parseInt(id),
          quantity: 1,
          purchase_type: 'buy_now',
        });
      }
    } catch (err) {
      console.error('Failed to toggle auto-refill:', err);

      // Revert UI change if API fails
      setCartItems((items) =>
        items.map((item) =>
          item.id === id ? { ...item, autoRefill: !enabled } : item,
        ),
      );
    }
  };

  const handleRefillDaysChange = async (id: string, days: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, refillDays: days } : item,
      ),
    );

    const months = Math.ceil(days / 30);

    try {
      await addToCart({
        product_id: parseInt(id),
        quantity: 1,
        purchase_type: 'subscribe',
        duration_months: months,
      });
    } catch (err) {
      console.error('Failed to update refill days:', err);
      // Optionally revert on error
    }
  };
  // const handleAddToCart = (product: RecommendedProducts) => {
  //   alert(`${product.name} added to cart!`);
  // };

  const handleProceedToCheckout = () => {
    navigate('/products/refill/checkout', {
      state: { cartItems, sessionUuid },
    });
  };

  // Loading State
  if (isLoadingCart) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          {/* <p className="text-gray-600">Loading your cart...</p> */}
        </div>
      </div>
    );
  }

  // Empty Cart State
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <button
            onClick={() => navigate('/products/refill/product-selection')}
            className="bg-[#3da467] text-white px-6 py-2 rounded-full"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-8 py-12 lg:px-20 lg:py-16">
      {/* Back Button */}
      <button
        onClick={() => navigate('/products/refill/product-selection')}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span
          className="text-base font-medium"
          style={{ fontFamily: 'Manrope, sans-serif' }}
        >
          Back
        </span>
      </button>

      {/* Error Display */}
      {error && (
        <div className="max-w-7xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Step Indicator */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProgressSteps currentStep={currentStep} />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2
                    className="text-2xl font-bold text-[#2b2b2b]"
                    style={{
                      fontFamily: 'Familjen Grotesk, sans-serif',
                      fontWeight: 700,
                      lineHeight: '32px',
                    }}
                  >
                    Cart
                  </h2>
                  <p
                    className="text-gray-600 mt-1"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      lineHeight: 1.5,
                      fontWeight: 500,
                    }}
                  >
                    You have {cartItems.length} items in your cart
                  </p>
                </div>
                <button
                  onClick={() => setCartItems([])}
                  className="text-[#3da647] text-sm font-medium"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    lineHeight: 1.5,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  Empty Cart
                </button>
              </div>

              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  isFavorited={favoritedItems.has(item.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                  onToggleAutoRefill={handleToggleAutoRefill}
                  onRefillDaysChange={handleRefillDaysChange}
                />
              ))}
            </div>

            {/* Recommended Products
            <div className="bg-white border border-gray-200 rounded-2xl p-6 mt-12">
              <h2
                className="text-xl text-[#121515] font-normal mb-6"
                style={{
                  fontFamily: 'Lexend, sans-serif',
                  fontWeight: 400,
                  lineHeight: '110%',
                }}
              >
                You might also like.
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {recommendedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div> */}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <button
                onClick={() => setShowCoupons(!showCoupons)}
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg mb-6 hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                    />
                  </svg>
                  <span
                    className="text-sm font-medium text-[#323232] "
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '150%',
                    }}
                  >
                    See available coupons
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showCoupons ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <h3
                className="text-lg font-bold mb-4"
                style={{
                  fontFamily: 'Familjen Grotesk, sans-serif',
                  fontWeight: 700,
                  lineHeight: '110%',
                }}
              >
                Summary
              </h3>

              <div className="space-y-3 mb-6">
                <div
                  className="flex justify-between text-[#575757]"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '150%',
                  }}
                >
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#575757]">
                  <span>Shipping</span>
                  <span>₦{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#575757]">
                  <span>Discount</span>
                  <span>₦{discount.toFixed(2)}</span>
                </div>
                <div
                  className="border-t pt-3 flex justify-between text-lg font-bold"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 700,
                    fontSize: '16px',
                    lineHeight: '150%',
                  }}
                >
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}.00</span>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                disabled={isLoading || cartItems.length === 0}
                className="w-full bg-[#3da647] text-white py-3 rounded-3xl font-medium hover:bg-[#2e8a39] transition-colors mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '150%',
                  cursor: 'pointer',
                }}
              >
                {isLoading ? 'Processing...' : 'Proceed to Checkout'}
              </button>

              {/* <div className="bg-[#feefdd] border border-[#feefdd] rounded-3xl p-3 text-center">
                <p
                  className="text-sm text-[#c57518]"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '150%',
                  }}
                >
                  Spend{' '}
                  <span
                    className="font-bold"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontWeight: 700,
                      fontSize: '14px',
                      lineHeight: '150%',
                    }}
                  >
                    ₦{freeShippingThreshold.toLocaleString()}
                  </span>{' '}
                  more for free shipping
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyCart;
