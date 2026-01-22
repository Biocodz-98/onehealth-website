import React, { useState } from 'react';
import { useRefill } from '../Services/refillApi';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Home, Truck, Package, ChevronDown } from 'lucide-react';

// Types
interface CartItem {
  id: string;
  name: string;
  dosage: string;
  image: string;
  price: number;
  quantity: number;
}

interface RecommendedProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  soldCount: number;
}

interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

// Step indicator component
const StepIndicator: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  const steps = [
    { number: 1, title: 'Cart', subtitle: 'Confirm your order' },
    {
      number: 2,
      title: 'Checkout',
      subtitle: 'Make sure all your details are correct',
    },
    { number: 3, title: 'Payment', subtitle: 'Select payment method and pay' },
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between max-w-2xl">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className="flex items-center w-full">
                <div
                  className={`w-3 h-3 rounded-full ${
                    currentStep >= step.number ? 'bg-[#3da467]' : 'bg-gray-300'
                  }`}
                />
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 ${
                      currentStep > step.number ? 'bg-[#3da467]' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
              <div className="mt-2 text-center">
                <p
                  className={`text-sm font-semibold ${
                    currentStep >= step.number
                      ? 'text-[#3da467]'
                      : 'text-gray-400'
                  }`}
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  {step.title}
                </p>
                <p className="text-xs text-gray-500">{step.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Star rating component
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { checkout, isLoading, error } = useRefill();

  const cartItems = location.state?.cartItems || [];
  const [selectedDelivery, setSelectedDelivery] = useState<string>('deliver');
  const [showCoupons, setShowCoupons] = useState<boolean>(false);
  const [shippingAddress] = useState<ShippingAddress>({
    street: '78, Abule Street, Abikooku Local Government, Ogun State',
    city: 'Oredipe Olanrewaju',
    state: 'Lagos',
    postalCode: '+234 808 6110 548',
  });

  const handlePayment = async () => {
    try {
      const response = await checkout(
        {
          name: shippingAddress.city,
          phone: shippingAddress.postalCode,
          address: shippingAddress.street,
          lga: 'Eti-Osa',
          state: shippingAddress.state,
        },
        selectedDelivery === 'subscribe' ? 'subscribe' : 'one_time',
      );

      if (response.payment_status === 'success') {
        navigate('/products/refill/payment-success');
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (err) {
      console.error('Checkout failed:', err);
    }
  };

  const recommendedProducts: RecommendedProduct[] = [
    {
      id: 'r1',
      name: 'medicube',
      image: '/prefill-images/medicube.svg',
      price: 52000,
      originalPrice: 79000,
      rating: 5,
      soldCount: 2435,
    },
    {
      id: 'r2',
      name: 'ANUA',
      image: '/prefill-images/anua cream.svg',
      price: 12000,
      originalPrice: 79000,
      rating: 4,
      soldCount: 2435,
    },
    {
      id: 'r3',
      name: 'CLEAN SKIN CLUB',
      image: '/prefill-images/clean skin club.svg',
      price: 48000,
      originalPrice: 79000,
      rating: 4,
      soldCount: 2144,
    },
    {
      id: 'r4',
      name: 'Mighty Patch',
      image: '/prefill-images/mighty patch.svg',
      price: 25000,
      originalPrice: 79000,
      rating: 4,
      soldCount: 2144,
    },
  ];

  // Delivery options with prices
  const deliveryOptions = [
    {
      id: 'deliver',
      name: 'Deliver to me',
      description:
        'Order confirmed after 5 pm → delivered before 2 pm tomorrow',
      price: 3000,
      icon: Home,
    },
    {
      id: 'express',
      name: 'Express Delivery',
      description: 'Delivered between 2 - 3 hrs',
      price: 6000,
      icon: Truck,
      badge: 'Available locations',
    },
    {
      id: 'pickup',
      name: 'Pick up from pharmacy',
      description: 'Come with proof of payment',
      price: 0,
      icon: Package,
    },
  ];

  const handleAddToCart = (product: RecommendedProduct) => {
    console.log('Add to cart:', product);
  };

  // Calculate totals dynamically - Fixed TypeScript errors
  const subtotal = cartItems.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0,
  );
  const selectedOption = deliveryOptions.find(
    (opt) => opt.id === selectedDelivery,
  );
  const shippingCost = selectedOption?.price || 0;
  const discount = 0;
  const total = subtotal + shippingCost - discount;
  const freeShippingThreshold = 33400;
  const amountNeededForFreeShipping = Math.max(
    0,
    freeShippingThreshold - subtotal,
  );

  return (
    <div className="min-h-screen bg-white px-8 py-12 lg:px-20 lg:py-16">
      {/* Back Button */}
      <button
        onClick={() => navigate('/products/refill/pharmacy-cart')}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span
          className="text-base font-medium"
          style={{
            fontFamily: 'Manrope, sans-serif',
          }}
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
      <StepIndicator currentStep={2} />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section - Shipping & Delivery */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Information */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2
                className="text-xl font-bold"
                style={{
                  fontFamily: 'Familjen Grotesk, sans-serif',
                  fontWeight: 700,
                  lineHeight: '110%',
                }}
              >
                Shipping Information
              </h2>
              <button
                className="text-[#3da467] text-sm font-medium hover:underline"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Change
              </button>
            </div>
            <p
              className="text-sm text-[#575757] leading-relaxed"
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 400,
                lineHeight: '150%',
                fontStyle: 'normal',
              }}
            >
              {shippingAddress.street}
              <br />
              {shippingAddress.city} | {shippingAddress.postalCode}
            </p>
          </div>

          {/* Delivery Options */}
          <div className="bg-white border shadow border-gray-200 rounded-2xl p-6">
            <h2
              className="text-xl font-bold mb-2"
              style={{
                fontFamily: 'Familjen Grotesk, sans-serif',
                fontWeight: 700,
                lineHeight: '110%',
              }}
            >
              Delivery Options
            </h2>
            <p
              className="text-sm text-[#575757] mb-6"
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 400,
                lineHeight: '150%',
                fontStyle: 'normal',
              }}
            >
              Please select how you want your order delivered
            </p>

            <div className="space-y-4">
              {deliveryOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedDelivery === option.id;

                return (
                  <label
                    key={option.id}
                    className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#3da467] bg-[#ecf6ed]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value={option.id}
                      checked={isSelected}
                      onChange={(e) => setSelectedDelivery(e.target.value)}
                      className="mt-1 w-5 h-5 text-green-600 border-gray-300 focus:ring-green-500"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    />
                    <Icon className="w-6 h-6 text-gray-600 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3
                          className="font-bold text-base "
                          style={{
                            fontFamily: 'Manrope, sans-serif',
                            fontWeight: 700,
                            color: '#000000',
                          }}
                        >
                          {option.name}
                        </h3>
                        <span
                          className="font-bold text-sm"
                          style={{
                            fontFamily: 'Manrope, sans-serif',
                            color: '#000000',
                            fontWeight: 700,
                          }}
                        >
                          {option.price === 0
                            ? 'Free'
                            : `₦${option.price.toLocaleString()}`}
                        </span>
                      </div>
                      <p
                        className="text-sm text-black"
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          color: '#000000',
                          fontWeight: 400,
                        }}
                      >
                        {option.description}
                      </p>
                      {option.badge && isSelected && (
                        <button
                          className="mt-2 px-4 py-1 border border-[#3da467] text-[#3da467] rounded-full text-xs font-medium hover:bg-green-50 transition-colors"
                          style={{ fontFamily: 'Manrope, sans-serif' }}
                        >
                          {option.badge}
                        </button>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Recommended Products */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2
              className="text-xl font-bold mb-6"
              style={{
                fontFamily: 'Lexend, sans-serif',
                fontWeight: 500,
                lineHeight: '110%',
                color: '#121515',
              }}
            >
              You might also like.
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {recommendedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-xl p-4"
                >
                  <img
                    src={product.image}
                    alt=""
                    className="w-full h-32 object-contain mb-3"
                  />
                  <p
                    className="text-sm font-medium mb-1"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontWeight: 400,
                      color: '#575757',
                    }}
                  >
                    {product.name}
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-base font-bold"
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontWeight: 700,
                        color: '#19191d',
                      }}
                    >
                      ₦{product.price.toLocaleString()}
                    </span>
                    <span
                      className="text-xs text-[#19191d]  line-through"
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontWeight: 700,
                      }}
                    >
                      ₦{product.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={product.rating} />
                    <span
                      className="text-xs text-[#19191d]"
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontWeight: 700,
                      }}
                    >
                      {product.soldCount.toLocaleString()} sold
                    </span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-32 border-2 border-[#3da467] text-[#3da467] py-2 rounded-full text-sm font-semibold hover:bg-green-50 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-8">
            {/* What you get */}
            <div className="flex items-center justify-between mb-4">
              <h2
                className="text-xl font-bold"
                style={{
                  fontFamily: 'Familjen Grotesk, sans-serif',
                  fontWeight: 700,
                  lineHeight: '110%',
                }}
              >
                What you get
              </h2>
              <button
                onClick={() => navigate('/products/refill/pharmacy-cart')}
                className="text-[#3da467] text-sm font-medium hover:underline"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Edit items
              </button>
            </div>

            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item: CartItem) => (
                <div key={item.id} className="flex gap-3">
                  <img
                    src={item.image}
                    alt=""
                    className="w-16 h-16 object-contain rounded-lg shrink-0"
                  />
                  <div className="flex-1">
                    <h3
                      className="font-medium text-base"
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontWeight: 600,
                        color: '#000000',
                      }}
                    >
                      {item.name}
                    </h3>
                    <p
                      className="text-xs text-[#000000]"
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontWeight: 400,
                        fontStyle: 'normal',
                      }}
                    >
                      {item.dosage}
                    </p>
                    <p
                      className="text-xs text-[#323232]"
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontWeight: 400,
                        fontStyle: 'normal',
                      }}
                    >
                      Qty: {item.quantity}pack
                    </p>
                    <p
                      className="font-medium text-base mt-1"
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontWeight: 500,
                      }}
                    >
                      ₦{item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Section */}
            <button
              onClick={() => setShowCoupons(!showCoupons)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-6 hover:bg-gray-100 transition-colors"
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
                  className="text-sm font-medium"
                  style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 400 }}
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

            {/* Summary */}
            <h3
              className="text-xl text-[#2b2b2b] font-bold mb-4"
              style={{
                fontFamily: 'Familjen Grotesk, sans-serif',
                fontWeight: 700,
              }}
            >
              Summary
            </h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-base">
                <span
                  className="text-[#575757]"
                  style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 400 }}
                >
                  Subtotal
                </span>
                <span className="font-medium">
                  ₦{subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-base">
                <span
                  className="text-[#575757]"
                  style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 400 }}
                >
                  Shipping
                </span>
                <span className="font-medium">
                  ₦{shippingCost.toLocaleString()}.00
                </span>
              </div>
              <div className="flex justify-between text-base">
                <span
                  className="text-[#575757]"
                  style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 400 }}
                >
                  Discount
                </span>
                <span className="font-medium">₦{discount.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span
                  className="font-bold text-lg text-[#2b2b2b]"
                  style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700 }}
                >
                  Total
                </span>
                <span
                  className="font-bold text-lg text-[#2b2b2b]"
                  style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700 }}
                >
                  ₦{total.toLocaleString()}.00
                </span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={isLoading || cartItems.length === 0}
              className="w-full bg-[#3da467] hover:bg-green-700 text-white py-3 rounded-full font-semibold transition-colors mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700 }}
            >
              {isLoading
                ? 'Processing...'
                : `Pay ₦${total.toLocaleString()}.00`}
            </button>

            <div className="bg-[#feefdd] p-3 rounded-3xl text-center border-[#feefdd] border">
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
                <span className="font-bold">
                  ₦{amountNeededForFreeShipping.toLocaleString()}
                </span>{' '}
                for free shipping
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
