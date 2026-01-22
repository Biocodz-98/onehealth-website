import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Home, Truck, Package } from 'lucide-react';

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
        { number: 2, title: 'Checkout', subtitle: 'Make sure all details are correct' },
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
                                <p className={`text-sm font-semibold ${currentStep >= step.number ? 'text-[#3da467]' : 'text-gray-400'}`}>
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
    const sessionUuid = location.state?.sessionUuid || localStorage.getItem('sessionUuid');

    const [selectedDelivery, setSelectedDelivery] = useState<string>('deliver');
    const [shippingAddress] = useState<ShippingAddress>({
        street: '78, Abule Street, Abikooku Local Government, Ogun State',
        city: 'Oredipe Olanrewaju',
        state: 'Lagos',
        postalCode: '+234 808 6110 548',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deliveryOptions = [
        { id: 'deliver', name: 'Deliver to me', description: 'Order confirmed after 5 pm → delivered before 2 pm tomorrow', price: 3000, icon: Home },
        { id: 'express', name: 'Express Delivery', description: 'Delivered between 2 - 3 hrs', price: 6000, icon: Truck },
        { id: 'pickup', name: 'Pick up from pharmacy', description: 'Come with proof of payment', price: 0, icon: Package },
    ];

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const selectedOption = deliveryOptions.find((opt) => opt.id === selectedDelivery);
    const shippingCost = selectedOption?.price || 0;
    const total = subtotal + shippingCost;

    const handlePayment = async () => {
        if (cartItems.length === 0) return alert('Cart is empty');

        setIsLoading(true);
        setError(null);

        try {
            // adjust as per your app
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

            const BASE_URL = 'https://dev.onehealthng.com/api/v1/refill'
            const res = await fetch(BASE_URL + `/sessions/${sessionUuid}/checkout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok && data.status === 'initiated') {
                // Redirect to Paystack payment page
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
            {/* Back Button */}
            <button onClick={() => navigate('/products/refill/pharmacy-cart')} className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-8 transition-colors">
                <ArrowLeft className="w-5 h-5" /> Back
            </button>

            {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">{error}</div>}

            <StepIndicator currentStep={2} />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Section */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Shipping */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">Shipping Information</h2>
                        </div>
                        <p className="text-sm text-[#575757]">
                            {shippingAddress.street}
                            <br />
                            {shippingAddress.city} | {shippingAddress.postalCode}
                        </p>
                    </div>

                    {/* Delivery Options */}
                    <div className="bg-white border shadow border-gray-200 rounded-2xl p-6">
                        <h2 className="text-xl font-bold mb-2">Delivery Options</h2>
                        <div className="space-y-4">
                            {deliveryOptions.map((option) => {
                                const Icon = option.icon;
                                const isSelected = selectedDelivery === option.id;
                                return (
                                    <label key={option.id} className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${isSelected ? 'border-[#3da467] bg-[#ecf6ed]' : 'border-gray-200 hover:border-gray-300'}`}>
                                        <input type="radio" name="delivery" value={option.id} checked={isSelected} onChange={(e) => setSelectedDelivery(e.target.value)} className="mt-1 w-5 h-5 text-green-600 border-gray-300 focus:ring-green-500" />
                                        <Icon className="w-6 h-6 text-gray-600 mt-0.5 shrink-0" />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="font-bold text-base">{option.name}</h3>
                                                <span className="font-bold text-sm">{option.price === 0 ? 'Free' : `₦${option.price.toLocaleString()}`}</span>
                                            </div>
                                            <p className="text-sm text-black">{option.description}</p>
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
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        <div className="space-y-4 mb-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-3">
                                    <img src={item.image} alt="" className="w-16 h-16 object-contain rounded-lg shrink-0" />
                                    <div className="flex-1">
                                        <h3 className="font-medium text-base">{item.name}</h3>
                                        <p className="text-xs text-[#000000]">{item.dosage}</p>
                                        <p className="text-xs text-[#323232]">Qty: {item.quantity}</p>
                                        <p className="font-medium text-base mt-1">₦{item.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Totals */}
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-base"><span>Subtotal</span><span>₦{subtotal.toLocaleString()}</span></div>
                            <div className="flex justify-between text-base"><span>Shipping</span><span>₦{shippingCost.toLocaleString()}</span></div>
                            <div className="border-t pt-3 flex justify-between font-bold text-lg"><span>Total</span><span>₦{total.toLocaleString()}</span></div>
                        </div>

                        {/* Pay Button */}
                        <button onClick={handlePayment} disabled={isLoading || cartItems.length === 0} className="w-full bg-[#3da467] hover:bg-green-700 text-white py-3 rounded-full font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            {isLoading ? 'Processing...' : `Pay ₦${total.toLocaleString()}`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
