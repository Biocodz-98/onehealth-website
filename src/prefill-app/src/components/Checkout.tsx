import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Home, Truck, ChevronDown } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

// Types
interface CartItem {
  id: string;
  name: string;
  dosage: string;
  image: string;
  price: number;
  quantity: number;
  purchase_type?: 'buy_now' | 'subscription';
  subscription_months?: number;
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
      subtitle: 'Make sure all details are correct',
    },
    { number: 3, title: 'Payment', subtitle: 'Complete your payment' },
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
                  className={`text-sm font-semibold ${currentStep >= step.number ? 'text-[#3da467]' : 'text-gray-400'}`}
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

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems: CartItem[] = location.state?.cartItems || [];
  const sessionUuid =
    location.state?.sessionUuid || localStorage.getItem('sessionUuid');
  const [showCoupons, setShowCoupons] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<string>('deliver');
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    street: '',
    city: '',
    state: '',
    postalCode: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddressChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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
    },
    // {
    //   id: 'pickup',
    //   name: 'Pick up from pharmacy',
    //   description: 'Come with proof of payment',
    //   price: 0,
    //   icon: Package,
    // },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const selectedOption = deliveryOptions.find(
    (opt) => opt.id === selectedDelivery,
  );
  const shippingCost = selectedOption?.price || 0;
  const total = subtotal + shippingCost;

  const handlePayment = async () => {
    if (cartItems.length === 0) return alert('Cart is empty');

    if (
      !shippingAddress.street ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.postalCode
    ) {
      return setError('Please fill in all shipping information');
    }

    setIsLoading(true);
    setError(null);

    try {
      if (!sessionUuid) throw new Error('Session not found');

      const payload = {
        delivery: {
          type: selectedDelivery,
          address: shippingAddress.street,
          city: shippingAddress.city,
          state: shippingAddress.state,
          postalCode: shippingAddress.postalCode,
        },
        cart_items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          purchase_type: item.purchase_type || 'buy_now',
          subscription_months: item.subscription_months || 0,
        })),
      };

      const BASE_URL = 'https://dev.onehealthng.com/api/v1/refill';
      const res = await fetch(`${BASE_URL}/sessions/${sessionUuid}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.status === 'initiated') {
        // Save checkout info locally before redirect
        localStorage.setItem('pending_checkout_id', data.checkout_id);
        localStorage.setItem('pending_session_uuid', sessionUuid);

        // Redirect to Paystack
        window.location.href = data.authorization_url;
      } else {
        setError(data.message || 'Payment initialization failed');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-8 py-12 lg:px-20 lg:py-16">
      <ProgressBar currentStep={7} totalSteps={9} />
      {/* Back Button */}
      <button
        onClick={() => navigate('/products/refill/pharmacy-cart')}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      <StepIndicator currentStep={2} />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
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
            </div>

            <div className="space-y-4">
              {/* Address Field */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-2"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={shippingAddress.street}
                  onChange={(e) =>
                    handleAddressChange('street', e.target.value)
                  }
                  placeholder="Enter your delivery address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                />
              </div>

              {/* City and State in one row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-2"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={shippingAddress.city}
                    onChange={(e) =>
                      handleAddressChange('city', e.target.value)
                    }
                    placeholder="Enter city"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700 mb-2"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    value={shippingAddress.state}
                    onChange={(e) =>
                      handleAddressChange('state', e.target.value)
                    }
                    placeholder="Enter state"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  />
                </div>
              </div>

              {/* Phone Number Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={shippingAddress.postalCode}
                  onChange={(e) =>
                    handleAddressChange('postalCode', e.target.value)
                  }
                  placeholder="+234 808 611 0548"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                />
              </div>
            </div>
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
                    className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${isSelected ? 'border-[#3da467] bg-[#ecf6ed]' : 'border-gray-200 hover:border-gray-300'}`}
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
                          className="font-bold text-base"
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
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Section - Summary */}
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
              {cartItems.map((item) => (
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
                      ₦{(item.price * item.quantity).toLocaleString()}
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

            {/* Totals */}
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
                  ₦{shippingCost.toLocaleString()}
                </span>
              </div>
              {/* <div className="flex justify-between text-base">
                <span
                  className="text-[#575757]"
                  style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 400 }}
                >
                  Discount
                </span>
                <span className="font-medium">₦{discount.toFixed(2)}</span>
              </div> */}
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span
                  className="text-[#2b2b2b]"
                  style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700 }}
                >
                  Total
                </span>
                <span className="font-bold text-lg">
                  ₦{total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={isLoading || cartItems.length === 0}
              className="w-full bg-[#3da467] hover:bg-green-700 text-white py-3 rounded-full font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700 }}
            >
              {isLoading ? 'Processing...' : `Pay ₦${total.toLocaleString()}`}
            </button>
            {/* <div className="bg-[#feefdd] p-3 rounded-3xl text-center border-[#feefdd] border">
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
