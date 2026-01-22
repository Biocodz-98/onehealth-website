import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            const params = new URLSearchParams(window.location.search);
            const reference = params.get('reference');

            if (!reference) {
                navigate('/products/refill/payment-failed');
                return;
            }

            try {
                const res = await fetch(
                    `https://dev.onehealthng.com/api/v1/refill/payments/verify?reference=${reference}`
                );

                const data = await res.json();

                if (res.ok && data.status === 'success') {
                    navigate('/products/refill/payment-success', {
                        state: { checkout_id: data.checkout_id },
                    });
                } else {
                    navigate('/products/refill/payment-failed');
                }
            } catch {
                navigate('/products/refill/payment-failed');
            }
        };

        verify();
    }, []);

    return (
        <div className="h-screen flex items-center justify-center">
            <p className="text-lg font-medium">Verifying payment…</p>
        </div>
    );
};

export default PaymentCallback;
