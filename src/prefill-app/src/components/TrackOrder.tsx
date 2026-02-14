import React, { useState } from 'react';
import {
  Search,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  ShoppingBag,
} from 'lucide-react';
import { useRefill } from '../Services/refillApi';

interface OrderItem {
  product_name: string;
  product_image: string;
  quantity: number;
  unit_price: number;
  order_price: number;
  dosage?: string;
  status: string;
}

interface OrderData {
  batch_id: string;
  status: string;
  created_at: string;
  items_total: string;
  grand_total: number;
  delivery_charge: number;
  payment_method: string;
  order_items: OrderItem[];
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  transaction_status?: string;
}

const TrackOrder: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const { trackOrder, isLoading, error: apiError } = useRefill();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!orderNumber.trim()) {
      setLocalError('Please enter an order ID');
      return;
    }

    setLocalError(null);
    setOrderData(null);

    try {
      console.log('Tracking order:', orderNumber);
      const response: any = await trackOrder(orderNumber.trim());
      console.log('Tracking response:', response);

      // Check if response has the order object
      if (!response || !response.order) {
        setLocalError(
          'Order not found. Please check your order ID and try again.',
        );
        return;
      }

      const orderInfo = response.order;

      // Check if order object is null
      if (orderInfo === null) {
        setLocalError(
          'Order not found. Please check your order ID or contact support.',
        );
        return;
      }

      //  Extract order data
      const extractedData: OrderData = {
        batch_id: orderInfo.batch_id || 'N/A',
        status: orderInfo.single_order?.status || 'pending',
        created_at: orderInfo.created_at || '',
        items_total: orderInfo.items_total || '0',
        grand_total: orderInfo.grand_total || 0,
        delivery_charge: orderInfo.delivery_charge || 0,
        payment_method: orderInfo.payment_method || 'N/A',
        order_items:
          orderInfo.order?.map((item: any) => ({
            product_name: item.product_name || 'Unknown Product',
            product_image: item.product_image || '',
            quantity: item.quantity || 1,
            unit_price: item.unit_price || 0,
            order_price: item.order_price || 0,
            dosage: item.dosage || '',
            status: item.status || 'pending',
          })) || [],
        customer_name: orderInfo.session?.customer?.name || '',
        customer_email: orderInfo.session?.customer?.email || '',
        customer_phone: orderInfo.session?.customer?.phone || '',
        transaction_status: orderInfo.transaction?.status || 'pending',
      };

      setOrderData(extractedData);
      setOrderNumber('');
    } catch (err) {
      console.error('Failed to track order:', err);

      if (err instanceof Error) {
        if (err.message.includes('404')) {
          setLocalError(
            'Order not found. Please check your order ID and try again.',
          );
        } else if (err.message.includes('500')) {
          setLocalError(
            'Server error. Please try again later or contact support.',
          );
        } else {
          setLocalError(
            'Unable to track order at this time. Please try again later.',
          );
        }
      } else {
        setLocalError('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleClearResults = () => {
    setOrderData(null);
    setLocalError(null);
    setOrderNumber('');
  };

  const getStatusIcon = (status?: string) => {
    if (!status) {
      return <Clock className="w-5 h-5 text-gray-600" />;
    }

    const statusLower = status.toLowerCase();

    if (statusLower.includes('approved') || statusLower.includes('paid')) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    } else if (statusLower.includes('pending')) {
      return <Clock className="w-5 h-5 text-orange-600" />;
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
      return <Package className="w-5 h-5 text-blue-600" />;
    }
  };

  const getStatusColor = (status?: string) => {
    if (!status) {
      return 'bg-gray-50 text-gray-700';
    }

    const statusLower = status.toLowerCase();

    if (statusLower.includes('approved') || statusLower.includes('paid')) {
      return 'bg-green-50 text-green-700';
    } else if (statusLower.includes('pending')) {
      return 'bg-orange-50 text-orange-700';
    } else if (
      statusLower.includes('delivered') ||
      statusLower.includes('completed')
    ) {
      return 'bg-green-50 text-green-700';
    } else if (
      statusLower.includes('cancel') ||
      statusLower.includes('failed')
    ) {
      return 'bg-red-50 text-red-700';
    } else {
      return 'bg-blue-50 text-blue-700';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
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
            Enter your batch ID to track your delivery
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
                  placeholder="Enter your batch ID (e.g., BA-9LMIV1SZJF)"
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
              <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {displayError}
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Order Status Results */}
        {orderData && (
          <div className="space-y-6">
            {/* Clear Results Button */}
            <div className="flex justify-end">
              <button
                onClick={handleClearResults}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                <XCircle className="w-4 h-4" />
                Clear Results
              </button>
            </div>

            {/* Order Summary Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <p
                    className="text-sm text-gray-600 mb-1"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    Batch ID
                  </p>
                  <h2
                    className="text-xl sm:text-2xl font-bold text-[#2b2b2b]"
                    style={{
                      fontFamily: 'Familjen Grotesk, sans-serif',
                    }}
                  >
                    {orderData.batch_id}
                  </h2>
                  <p
                    className="text-xs text-gray-500 mt-1"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    Placed: {formatDate(orderData.created_at)}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full ${getStatusColor(orderData.status)}`}
                  >
                    <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                    <span
                      className="text-sm font-medium capitalize"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {orderData.status}
                    </span>
                  </div>
                  {orderData.transaction_status && (
                    <div
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-center ${getStatusColor(orderData.transaction_status)}`}
                    >
                      {getStatusIcon(orderData.transaction_status)}
                      <span
                        className="text-xs font-medium capitalize"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        Payment: {orderData.transaction_status}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 pb-6 border-b">
                <div className="flex items-start gap-3">
                  <ShoppingBag className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p
                      className="text-xs sm:text-sm text-gray-600 mb-1"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      Order Total
                    </p>
                    <p
                      className="text-sm sm:text-base font-medium text-[#2b2b2b]"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      ₦{orderData.grand_total.toLocaleString()}
                    </p>
                    <p
                      className="text-xs text-gray-500"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      Items: ₦{parseInt(orderData.items_total).toLocaleString()}{' '}
                      + Delivery: ₦{orderData.delivery_charge.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p
                      className="text-xs sm:text-sm text-gray-600 mb-1"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      Payment Method
                    </p>
                    <p
                      className="text-sm sm:text-base font-medium text-[#2b2b2b] capitalize"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {orderData.payment_method}
                    </p>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              {orderData.customer_name && (
                <div className="mb-6 pb-6 border-b">
                  <h3
                    className="text-sm font-semibold text-gray-700 mb-3"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    Customer Information
                  </h3>
                  <div className="space-y-2">
                    <p
                      className="text-sm text-gray-600"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      <span className="font-medium text-gray-700">Name:</span>{' '}
                      {orderData.customer_name}
                    </p>
                    {orderData.customer_email && (
                      <p
                        className="text-sm text-gray-600"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        <span className="font-medium text-gray-700">
                          Email:
                        </span>{' '}
                        {orderData.customer_email}
                      </p>
                    )}
                    {orderData.customer_phone && (
                      <p
                        className="text-sm text-gray-600"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        <span className="font-medium text-gray-700">
                          Phone:
                        </span>{' '}
                        {orderData.customer_phone}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Order Items */}
              <div>
                <h3
                  className="text-base sm:text-lg font-semibold text-[#2b2b2b] mb-4"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  Order Items ({orderData.order_items.length})
                </h3>
                <div className="space-y-4">
                  {orderData.order_items.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <img
                        src={item.product_image}
                        alt={item.product_name}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg bg-white"
                        onError={(e) => {
                          e.currentTarget.src =
                            '/prefill-images/medicine bottle.svg';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4
                          className="font-medium text-sm sm:text-base text-[#2b2b2b] truncate"
                          style={{ fontFamily: 'Manrope, sans-serif' }}
                        >
                          {item.product_name}
                        </h4>
                        {item.dosage && (
                          <p
                            className="text-xs text-gray-500 mt-1"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
                          >
                            {item.dosage}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <p
                            className="text-xs sm:text-sm text-gray-600"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
                          >
                            Qty: {item.quantity} × ₦
                            {item.unit_price.toLocaleString()}
                          </p>
                          <p
                            className="text-sm sm:text-base font-semibold text-[#2b2b2b]"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
                          >
                            ₦{item.order_price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!orderData && !isLoading && !displayError && (
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
                Enter your batch ID above to see your order details and tracking
                information.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
