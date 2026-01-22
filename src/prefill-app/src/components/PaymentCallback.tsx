import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentCallback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'failed'>(
    'verifying',
  );

  useEffect(() => {
    const verify = async () => {
      const params = new URLSearchParams(window.location.search);
      const reference = params.get('reference');

      // If no reference, payment failed
      if (!reference) {
        setStatus('failed');
        setTimeout(() => {
          navigate('/products/refill/payment-failed', {
            state: { message: 'Payment reference not found' },
          });
        }, 1500);
        return;
      }

      try {
        const res = await fetch(
          `https://dev.onehealthng.com/api/v1/refill/payments/verify?reference=${reference}`,
        );

        const data = await res.json();

        if (res.ok && data.status === 'success') {
          setStatus('success');
          setTimeout(() => {
            navigate('/products/refill/payment-success', {
              state: { checkout_id: data.checkout_id },
            });
          }, 1500);
        } else {
          setStatus('failed');
          setTimeout(() => {
            navigate('/products/refill/payment-failed', {
              state: {
                message: data.message || 'Payment verification failed',
              },
            });
          }, 1500);
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setStatus('failed');
        setTimeout(() => {
          navigate('/products/refill/payment-failed', {
            state: { message: 'Unable to verify payment. Please try again.' },
          });
        }, 1500);
      }
    };

    verify();
  }, [navigate]);

  return (
    <div
      className="h-screen flex items-center justify-center bg-gray-50"
      style={{ fontFamily: 'Manrope, sans-serif' }}
    >
      <div className="text-center">
        {/* Loading Spinner */}
        <div className="mb-6 flex justify-center">
          {status === 'verifying' && (
            <div className="w-16 h-16 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin"></div>
          )}
          {status === 'success' && (
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
          {status === 'failed' && (
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Status Messages */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {status === 'verifying' && 'Verifying Payment...'}
          {status === 'success' && 'Payment Verified!'}
          {status === 'failed' && 'Verification Failed'}
        </h2>
        <p className="text-sm text-gray-600">
          {status === 'verifying' &&
            'Please wait while we confirm your payment'}
          {status === 'success' && 'Redirecting to success page...'}
          {status === 'failed' && 'Redirecting...'}
        </p>
      </div>
    </div>
  );
};

export default PaymentCallback;
