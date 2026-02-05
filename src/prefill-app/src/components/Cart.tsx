import React, { useState, useEffect } from 'react';
import { useRefill } from '../Services/refillApi';
import { useNavigate } from 'react-router-dom';
import { Heart, Trash2, ChevronDown, ArrowLeft } from 'lucide-react';

//Types
interface CartItem {
  id: string;
  cartItemId: number;
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
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 sm:w-32 sm:h-32 object-contain rounded-lg mx-auto sm:mx-0"
          onError={(e) => {
            e.currentTarget.src =
              'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect fill="%23FED7AA" width="80" height="80"/%3E%3C/svg%3E';
          }}
        />

        <div className="flex-1">
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1 min-w-0">
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

            <div className="flex gap-1 sm:gap-2 flex-shrink-0">
              <button
                onClick={() => onToggleFavorite(item.id)}
                className={`p-1.5 sm:p-2 rounded-full transition-colors ${
                  isFavorited
                    ? 'bg-red-50 hover:bg-red-100'
                    : 'hover:bg-gray-100'
                }`}
              >
                <Heart
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                    isFavorited ? 'text-red-500 fill-red-500' : 'text-gray-600'
                  }`}
                />
              </button>
              <button
                onClick={() => onRemove(item.id)}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full"
              >
                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 mt-3 sm:mt-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                className="w-7 h-7 sm:w-8 sm:h-8 border rounded-md flex items-center justify-center hover:bg-gray-50 text-sm sm:text-base"
              >
                -
              </button>
              <span className="w-6 sm:w-8 text-center text-sm sm:text-base">
                {item.quantity}
              </span>
              <button
                onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                className="w-7 h-7 sm:w-8 sm:h-8 border rounded-md flex items-center justify-center hover:bg-gray-50 text-sm sm:text-base"
              >
                +
              </button>
            </div>

            <div
              className="text-base sm:text-lg font-medium text-[#000000]"
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

          <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={item.autoRefill}
                onChange={(e) => onToggleAutoRefill(item.id, e.target.checked)}
                className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
              />
              <span
                className="text-xs sm:text-sm text-[#323232]"
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

            <div className="relative w-full sm:w-auto">
              <select
                value={item.refillDays}
                onChange={(e) =>
                  onRefillDaysChange(item.id, parseInt(e.target.value))
                }
                className="w-full sm:w-auto pl-3 pr-8 py-1.5 sm:py-1 text-xs sm:text-sm border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
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
  const {
    getCart,
    addToCart,
    clearCart,
    removeCartItem,
    sessionUuid,
    isLoading,
    error,
  } = useRefill();

  const [currentStep] = useState(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCoupons, setShowCoupons] = useState(false);
  const [isLoadingCart, setIsLoadingCart] = useState(true);
  const [favoritedItems, setFavoritedItems] = useState<Set<string>>(new Set());
  const [hasFetchedCart, setHasFetchedCart] = useState(false);

  //Fetch cart items on mount
  useEffect(() => {
    // Prevent multiple fetches
    if (hasFetchedCart) {
      console.log('Cart already fetched, skipping...');
      return;
    }

    const fetchCartItems = async () => {
      if (!sessionUuid) {
        alert('Please complete the preferences form first');
        navigate('/products/refill/preferences');
        return;
      }

      try {
        setIsLoadingCart(true);

        console.log('=== FETCHING CART IN PHARMACY CART ===');
        console.log('Session UUID:', sessionUuid);

        const cartData: any = await getCart();

        console.log('Cart data received:', cartData);

        // ✅ NEW: Get cached products from the MonthlyPurchase component
        const cachedProductsJson = localStorage.getItem(
          `cart_products_${sessionUuid}`,
        );
        console.log('Cached products JSON:', cachedProductsJson);

        let cachedProducts: any[] = [];

        if (cachedProductsJson) {
          cachedProducts = JSON.parse(cachedProductsJson);
          console.log('✅ Found cached products:', cachedProducts);
        } else {
          console.warn(
            '⚠️ No cached products found. Checking old cache format...',
          );

          // Fallback: Try old cache format (from surveys)
          const cachedMedicines = JSON.parse(
            localStorage.getItem(`medicines_${sessionUuid}`) || '[]',
          );
          const cachedSkincares = JSON.parse(
            localStorage.getItem(`skincares_${sessionUuid}`) || '[]',
          );
          const cachedBabycares = JSON.parse(
            localStorage.getItem(`babycares_${sessionUuid}`) || '[]',
          );

          cachedProducts = [
            ...cachedMedicines,
            ...cachedSkincares,
            ...cachedBabycares,
          ];

          console.log('Using old cache format:', cachedProducts);
        }

        const items: CartItem[] = cartData
          .filter((item: any) => {
            const quantity = item.quantity || 0;

            console.log(`Item ${item.product_id} has quantity: ${quantity}`);
            return quantity > 0;
          })
          .map((item: any, index: number) => {
            console.log(`\n=== Mapping cart item ${index + 1} ===`);
            console.log('Cart item:', item);

            const productId =
              item.product_id?.toString() || item.id?.toString();
            console.log('Product ID:', productId);

            // Find matching product from cache
            const cachedProduct = cachedProducts.find(
              (p) => p.id.toString() === productId,
            );

            console.log('Found cached product:', cachedProduct);

            return {
              id: productId || `unknown-${index}`,
              cartItemId: item.id,
              name:
                cachedProduct?.name ||
                item.product_name ||
                item.name ||
                'Unknown Product',
              dosage:
                cachedProduct?.dosage || item.dosage || '10mg | 10 capsules',
              price:
                cachedProduct?.price ||
                item.unit_price ||
                item.amount ||
                item.price ||
                0,
              image:
                cachedProduct?.image ||
                item.product_image ||
                item.image ||
                '/prefill-images/medicine bottle.svg',
              quantity: item.quantity || 1,
              autoRefill: item.purchase_type === 'subscription',
              refillDays: item.refill_days || 30,
            };
          });

        console.log('=== FINAL CART ITEMS ===');
        console.log('Total items:', items.length);
        console.log('Items:', items);

        setCartItems(items);
        setHasFetchedCart(true);
      } catch (err) {
        console.error('Failed to fetch cart:', err);
        setCartItems([]);
      } finally {
        setIsLoadingCart(false);
      }
    };

    fetchCartItems();
  }, [sessionUuid, navigate, hasFetchedCart]);

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

  const handleRemoveItem = async (productId: string) => {
    try {
      // Find the cart item to get its database ID for removal
      const cartItem = cartItems.find((item) => item.id === productId);

      if (!cartItem) {
        console.error('Cart item not found');
        return;
      }

      console.log(
        `Removing cart item ${cartItem.cartItemId} (product ${productId})`,
      );

      // Call API to remove item from cart using the cart item ID
      await removeCartItem(cartItem.cartItemId);

      // Update UI by removing from state
      setCartItems((items) => items.filter((item) => item.id !== productId));
    } catch (err) {
      console.error('Failed to remove item:', err);
      alert('Failed to remove item. Please try again.');
    }
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
          purchase_type: 'subscription',
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
        purchase_type: 'subscription',
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

  const handleEmptyCart = async () => {
    if (!sessionUuid) return;

    try {
      //Fetch the API to clear cart
      await clearCart();

      // Clear cart items in UI immediately
      setCartItems([]);

      // Clear cached products from localStorage
      localStorage.removeItem(`cart_products_${sessionUuid}`);
      localStorage.removeItem(`medicines_${sessionUuid}`);
      localStorage.removeItem(`skincares_${sessionUuid}`);
      localStorage.removeItem(`babycares_${sessionUuid}`);

      // Reset the fetch so cart can be reloaded
      setHasFetchedCart(false);
    } catch (err) {
      console.error('Failed to empty cart:', err);
      alert('Failed to empty cart. Please try again.');
    }
  };

  const handleProceedToCheckout = async () => {
    try {
      // Fetch fresh cart data before proceeding to checkout
      const freshCartData: any = await getCart();

      // Get cached products
      const cachedProductsJson = localStorage.getItem(
        `cart_products_${sessionUuid}`,
      );
      let cachedProducts: any[] = [];

      if (cachedProductsJson) {
        cachedProducts = JSON.parse(cachedProductsJson);
      } else {
        // Fallback to old cache format
        const cachedMedicines = JSON.parse(
          localStorage.getItem(`medicines_${sessionUuid}`) || '[]',
        );
        const cachedSkincares = JSON.parse(
          localStorage.getItem(`skincares_${sessionUuid}`) || '[]',
        );
        const cachedBabycares = JSON.parse(
          localStorage.getItem(`babycares_${sessionUuid}`) || '[]',
        );
        cachedProducts = [
          ...cachedMedicines,
          ...cachedSkincares,
          ...cachedBabycares,
        ];
      }

      // Map fresh cart data with updated quantities
      const freshCartItems: CartItem[] = freshCartData
        .filter((item: any) => (item.quantity || 0) > 0)
        .map((item: any, index: number) => {
          const productId = item.product_id?.toString() || item.id?.toString();
          const cachedProduct = cachedProducts.find(
            (p) => p.id.toString() === productId,
          );

          return {
            id: productId || `unknown-${index}`,
            cartItemId: item.id,
            name:
              cachedProduct?.name ||
              item.product_name ||
              item.name ||
              'Unknown Product',
            dosage:
              cachedProduct?.dosage || item.dosage || '10mg | 10 capsules',
            price: cachedProduct?.price || item.amount || item.price || 0,
            image:
              cachedProduct?.image ||
              item.product_image ||
              item.image ||
              '/prefill-images/medicine bottle.svg',
            quantity: item.quantity || 1,
            autoRefill: item.purchase_type === 'subscription',
            refillDays: item.refill_days || 30,
          };
        });

      // console.log('=== NAVIGATING TO CHECKOUT ===');
      // console.log('Fresh cart items for checkout:', freshCartItems);
      // console.log('Item details:');
      // freshCartItems.forEach((item) => {
      //   console.log(
      //     `${item.name}: price=${item.price}, qty=${item.quantity}, total=${item.price * item.quantity}`,
      //   );
      // });

      navigate('/products/refill/checkout', {
        state: { cartItems: freshCartItems, sessionUuid },
      });
    } catch (err) {
      console.error('Failed to fetch fresh cart data:', err);
      // Fallback to current cart items if fetch fails
      navigate('/products/refill/checkout', {
        state: { cartItems, sessionUuid },
      });
    }
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
      <div className="min-h-screen bg-white flex items-center justify-center px-8">
        <div className="text-center max-w-md">
          <div className="mb-8 flex justify-center">
            <svg
              className="w-48 h-48 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
              <line
                x1="9"
                y1="13"
                x2="15"
                y2="13"
                strokeLinecap="round"
                strokeWidth={1.5}
                className="text-gray-400"
              />
            </svg>
          </div>

          <h2
            className="text-3xl font-bold text-[#2b2b2b] mb-3"
            style={{
              fontFamily: 'Familjen Grotesk, sans-serif',
              fontWeight: 700,
              lineHeight: '110%',
            }}
          >
            Your cart is empty
          </h2>

          <p
            className="text-black mb-8 font-normal"
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '16px',
              lineHeight: '150%',
            }}
          >
            Your cart is currently empty. Browse the store and add items to get
            started.
          </p>

          <button
            onClick={() => navigate('/products/refill/survey')}
            className="bg-[#3da467] hover:bg-[#2e8a39] text-white px-8 py-3 rounded-full font-medium transition-colors inline-flex items-center gap-2"
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '16px',
              lineHeight: '150%',
              fontWeight: 500,
            }}
          >
            Start Shopping
            <svg
              className="w-5 h-5"
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
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12 lg:px-20 lg:py-16">
      {/* Back Button */}
      <button
        onClick={() => navigate('/products/refill/product-selection')}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 sm:mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        <span
          className="text-sm sm:text-base font-medium"
          style={{ fontFamily: 'Manrope, sans-serif' }}
        >
          Back
        </span>
      </button>

      {/* Error Display */}
      {error && (
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Step Indicator */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="overflow-x-auto pb-4">
          <ProgressSteps currentStep={currentStep} />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 sm:mb-6">
                <div>
                  <h2
                    className="text-xl sm:text-2xl font-bold text-[#2b2b2b]"
                    style={{
                      fontFamily: 'Familjen Grotesk, sans-serif',
                      fontWeight: 700,
                      lineHeight: '32px',
                    }}
                  >
                    Cart
                  </h2>
                  <p
                    className="text-sm sm:text-base text-gray-600 mt-1"
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
                  onClick={handleEmptyCart}
                  className="text-[#3da647] text-sm font-medium self-start sm:self-auto hover:text-[#2e8a39] transition-colors"
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
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:sticky lg:top-4">
              <button
                onClick={() => setShowCoupons(!showCoupons)}
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg mb-4 sm:mb-6 hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-green-600"
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
                    className="text-xs sm:text-sm font-medium text-[#323232] "
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
                className="text-base sm:text-lg font-bold mb-3 sm:mb-4"
                style={{
                  fontFamily: 'Familjen Grotesk, sans-serif',
                  fontWeight: 700,
                  lineHeight: '110%',
                }}
              >
                Summary
              </h3>

              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div
                  className="flex justify-between text-[#575757] text-sm sm:text-base"
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
                <div className="flex justify-between text-[#575757] text-sm sm:text-base">
                  <span>Shipping</span>
                  <span>₦{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#575757] text-sm sm:text-base">
                  <span>Discount</span>
                  <span>₦{discount.toFixed(2)}</span>
                </div>
                <div
                  className="border-t pt-2 sm:pt-3 flex justify-between text-base sm:text-lg font-bold"
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
                className="w-full bg-[#3da647] text-white py-2.5 sm:py-3 rounded-3xl font-medium hover:bg-[#2e8a39] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
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
