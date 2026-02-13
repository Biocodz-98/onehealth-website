import React, { useState } from 'react';
import {
  Search,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { useRefill } from '../Services/refillApi';

interface TrackingEvent {
  date?: string;
  status?: string;
  location?: string;
  description?: string;
}

interface OrderStatus {
  order_id?: string;
  batch_id?: string;
  status?: string;
  estimated_delivery?: string;
  current_location?: string;
  tracking_history?: TrackingEvent[];
}

const TrackOrder: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const { trackOrder, isLoading, error: apiError } = useRefill();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!orderNumber.trim()) {
      setLocalError('Please enter an order ID');
      return;
    }

    setLocalError(null);
    setOrderStatus(null);

    try {
      console.log('Tracking order:', orderNumber);
      const response = await trackOrder(orderNumber.trim());
      console.log('Tracking response:', response);

      setOrderStatus(response);
    } catch (err) {
      console.error('Failed to track order:', err);
      setLocalError(
        'Order not found. Please check your order ID and try again.',
      );
    }
  };

  const getStatusIcon = (status?: string) => {
    if (!status) {
      return <Clock className="w-5 h-5 text-gray-600" />;
    }

    const statusLower = status.toLowerCase();

    if (statusLower.includes('confirmed') || statusLower.includes('placed')) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    } else if (
      statusLower.includes('dispatch') ||
      statusLower.includes('packed') ||
      statusLower.includes('ready')
    ) {
      return <Package className="w-5 h-5 text-blue-600" />;
    } else if (
      statusLower.includes('transit') ||
      statusLower.includes('shipping')
    ) {
      return <Truck className="w-5 h-5 text-orange-600" />;
    } else if (
      statusLower.includes('delivery') ||
      statusLower.includes('arriving')
    ) {
      return <Truck className="w-5 h-5 text-purple-600" />;
    } else if (
      statusLower.includes('delivered') ||
      statusLower.includes('completed')
    ) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    } else if (
      statusLower.includes('cancel') ||
      statusLower.includes('failed')
    ) {
      return <AlertCircle className="w-5 h-5 text-red-600" />;
    } else {
      return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status?: string) => {
    if (!status) {
      return 'bg-gray-50 text-gray-700';
    }

    const statusLower = status.toLowerCase();

    if (
      statusLower.includes('delivered') ||
      statusLower.includes('completed')
    ) {
      return 'bg-green-50 text-green-700';
    } else if (
      statusLower.includes('transit') ||
      statusLower.includes('delivery')
    ) {
      return 'bg-orange-50 text-orange-700';
    } else if (
      statusLower.includes('cancel') ||
      statusLower.includes('failed')
    ) {
      return 'bg-red-50 text-red-700';
    } else {
      return 'bg-blue-50 text-blue-700';
    }
  };

  const displayError = localError || apiError;

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 md:px-8 py-8 sm:py-12 lg:px-20 lg:py-16">
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
            Enter your order ID to track your delivery
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
                    setLocalError(null);
                  }}
                  placeholder="Enter your order ID (e.g., BA-N5V0GVFF6S)"
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
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Tracking...
                  </span>
                ) : (
                  'Track Order'
                )}
              </button>
            </div>

            {displayError && (
              <div className="mt-3 flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <p style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {displayError}
                </p>
              </div>
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
                    Order ID
                  </p>
                  <h2
                    className="text-xl sm:text-2xl font-bold text-[#2b2b2b]"
                    style={{
                      fontFamily: 'Familjen Grotesk, sans-serif',
                    }}
                  >
                    {orderStatus.order_id || orderStatus.batch_id || 'N/A'}
                  </h2>
                </div>
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full self-start sm:self-auto ${getStatusColor(orderStatus.status)}`}
                >
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                  <span
                    className="text-sm font-medium"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    {orderStatus.status || 'Unknown Status'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {orderStatus.estimated_delivery && (
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
                        {orderStatus.estimated_delivery}
                      </p>
                    </div>
                  </div>
                )}

                {orderStatus.current_location && (
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
                        {orderStatus.current_location}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tracking Timeline */}
            {orderStatus.tracking_history &&
              orderStatus.tracking_history.length > 0 && (
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
                    {orderStatus.tracking_history.map((event, index) => (
                      <div key={index} className="flex gap-4">
                        {/* Timeline indicator */}
                        <div className="flex flex-col items-center">
                          <div className="flex-shrink-0">
                            {getStatusIcon(event.status)}
                          </div>
                          {index !==
                            orderStatus.tracking_history!.length - 1 && (
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
                              {event.status || 'Status Update'}
                            </h4>
                            {event.date && (
                              <span
                                className="text-xs sm:text-sm text-gray-500 flex-shrink-0"
                                style={{ fontFamily: 'Manrope, sans-serif' }}
                              >
                                {event.date}
                              </span>
                            )}
                          </div>
                          {event.description && (
                            <p
                              className="text-xs sm:text-sm text-gray-600 mb-1"
                              style={{ fontFamily: 'Manrope, sans-serif' }}
                            >
                              {event.description}
                            </p>
                          )}
                          {event.location && (
                            <p
                              className="text-xs text-gray-500"
                              style={{ fontFamily: 'Manrope, sans-serif' }}
                            >
                              📍 {event.location}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                Enter your order ID above to see real-time tracking information
                for your delivery.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
