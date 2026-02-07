import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';

interface OrderStatus {
  orderId: string;
  status: string;
  estimatedDelivery?: string;
  currentLocation?: string;
  trackingHistory?: Array<{
    date: string;
    status: string;
    location: string;
    description: string;
  }>;
}

const TrackOrder: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!orderNumber.trim()) {
      setError('Please enter an order number');
      return;
    }

    setIsLoading(true);
    setError(null);
    setOrderStatus(null);

    try {
      // TODO: Replace this with actual API call when endpoint is provided
      // const response = await fetch(`/api/track-order/${orderNumber}`);
      // const data = await response.json();
      // setOrderStatus(data);

      // Mock response for demonstration
      setTimeout(() => {
        setOrderStatus({
          orderId: orderNumber,
          status: 'In Transit',
          estimatedDelivery: 'Feb 10, 2026',
          currentLocation: 'Lagos Distribution Center',
          trackingHistory: [
            {
              date: '2026-02-06 14:30',
              status: 'Out for Delivery',
              location: 'Lagos Distribution Center',
              description: 'Package is out for delivery',
            },
            {
              date: '2026-02-06 09:15',
              status: 'In Transit',
              location: 'Lagos Sorting Facility',
              description: 'Package arrived at sorting facility',
            },
            {
              date: '2026-02-05 18:45',
              status: 'Dispatched',
              location: 'Ibadan Warehouse',
              description: 'Package dispatched from warehouse',
            },
            {
              date: '2026-02-05 10:00',
              status: 'Order Confirmed',
              location: 'OneHealth Pharmacy',
              description: 'Order has been confirmed and is being prepared',
            },
          ],
        });
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setError('Failed to track order. Please try again.');
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'order confirmed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'dispatched':
        return <Package className="w-5 h-5 text-blue-600" />;
      case 'in transit':
        return <Truck className="w-5 h-5 text-orange-600" />;
      case 'out for delivery':
        return <Truck className="w-5 h-5 text-purple-600" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 md:px-8 py-8 sm:py-12 lg:px-20 lg:py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-4 rounded-full">
              <Package className="w-12 h-12 text-[#3da467]" />
            </div>
          </div>
          <h1
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2b2b2b] mb-3"
            style={{
              fontFamily: 'Familjen Grotesk, sans-serif',
              lineHeight: '110%',
            }}
          >
            Track Your Order
          </h1>
          <p
            className="text-sm sm:text-base text-gray-600"
            style={{
              fontFamily: 'Manrope, sans-serif',
              lineHeight: '150%',
            }}
          >
            Enter your order number to track your delivery
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 mb-6">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => {
                    setOrderNumber(e.target.value);
                    setError(null);
                  }}
                  placeholder="Enter your order number (e.g., ORD-123456)"
                  className="w-full px-4 py-3 sm:py-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3da467] focus:border-transparent text-sm sm:text-base"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                  }}
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#3da467] hover:bg-[#2e8a39] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base whitespace-nowrap"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  lineHeight: '150%',
                }}
              >
                {isLoading ? 'Tracking...' : 'Track Order'}
              </button>
            </div>

            {error && (
              <p
                className="mt-3 text-sm text-red-600"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                {error}
              </p>
            )}
          </form>
        </div>

        {/* Order Status Results */}
        {orderStatus && (
          <div className="space-y-6">
            {/* Status Summary Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <p
                    className="text-sm text-gray-600 mb-1"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    Order Number
                  </p>
                  <h2
                    className="text-xl sm:text-2xl font-bold text-[#2b2b2b]"
                    style={{
                      fontFamily: 'Familjen Grotesk, sans-serif',
                    }}
                  >
                    {orderStatus.orderId}
                  </h2>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full self-start sm:self-auto">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span
                    className="text-sm font-medium text-green-700"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    {orderStatus.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {orderStatus.estimatedDelivery && (
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p
                        className="text-xs sm:text-sm text-gray-600 mb-1"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        Estimated Delivery
                      </p>
                      <p
                        className="text-sm sm:text-base font-medium text-[#2b2b2b]"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        {orderStatus.estimatedDelivery}
                      </p>
                    </div>
                  </div>
                )}

                {orderStatus.currentLocation && (
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p
                        className="text-xs sm:text-sm text-gray-600 mb-1"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        Current Location
                      </p>
                      <p
                        className="text-sm sm:text-base font-medium text-[#2b2b2b]"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        {orderStatus.currentLocation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tracking Timeline */}
            {orderStatus.trackingHistory && (
              <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
                <h3
                  className="text-lg sm:text-xl font-bold text-[#2b2b2b] mb-6"
                  style={{
                    fontFamily: 'Familjen Grotesk, sans-serif',
                  }}
                >
                  Tracking History
                </h3>

                <div className="space-y-4 sm:space-y-6">
                  {orderStatus.trackingHistory.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      {/* Timeline indicator */}
                      <div className="flex flex-col items-center">
                        <div className="flex-shrink-0">
                          {getStatusIcon(event.status)}
                        </div>
                        {index !== orderStatus.trackingHistory!.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                        )}
                      </div>

                      {/* Event details */}
                      <div className="flex-1 pb-6">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 mb-2">
                          <h4
                            className="font-semibold text-[#2b2b2b] text-sm sm:text-base"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
                          >
                            {event.status}
                          </h4>
                          <span
                            className="text-xs sm:text-sm text-gray-500 flex-shrink-0"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
                          >
                            {event.date}
                          </span>
                        </div>
                        <p
                          className="text-xs sm:text-sm text-gray-600 mb-1"
                          style={{ fontFamily: 'Manrope, sans-serif' }}
                        >
                          {event.description}
                        </p>
                        <p
                          className="text-xs text-gray-500"
                          style={{ fontFamily: 'Manrope, sans-serif' }}
                        >
                          📍 {event.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Help Section */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
              <h4
                className="font-semibold text-[#2b2b2b] mb-2 text-sm sm:text-base"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Need Help?
              </h4>
              <p
                className="text-xs sm:text-sm text-gray-600 mb-3"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                If you have any questions about your order, please contact our
                customer support team.
              </p>
              <button
                className="text-xs sm:text-sm font-medium text-[#3da467] hover:text-[#2e8a39] transition-colors"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Contact Support →
              </button>
            </div>
          </div>
        )}

        {/* Empty State - When no order is being tracked */}
        {!orderStatus && !isLoading && (
          <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
              </div>
              <h3
                className="text-lg sm:text-xl font-semibold text-[#2b2b2b] mb-2"
                style={{ fontFamily: 'Familjen Grotesk, sans-serif' }}
              >
                Track Your Package
              </h3>
              <p
                className="text-sm sm:text-base text-gray-600"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Enter your order number above to see real-time tracking
                information for your delivery.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
