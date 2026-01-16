import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import Header from './components/header/Header';
import HeroSection from './components/Hero';
import Footer from './components/Footer';
import PreferencesForm from './components/Entry';
import Survey from './components/Survey';
import SurveyComponent from './components/Surveys';
import ProductSearch from './components/ProductSearch';
import MonthlyPurchase from './components/ProductSelection';
import PharmacyCart from './components/Cart';
import CheckoutPage from './components/Checkout';
import PaymentSuccess from './components/Payment';
import WellnessPersona from './components/Persona';

// Home Page Component
function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <HeroSection
        onStartBuilding={() => navigate('/products/prefill/preferences')}
      />
      <Footer />
    </div>
  );
}

// Preferences Page Component
function PreferencesPage() {
  const navigate = useNavigate();

  return (
    <PreferencesForm
      onBack={() => navigate('/products/prefill')}
      onNext={(data) => {
        console.log('Form data:', data);
        navigate('/products/prefill/survey');
      }}
    />
  );
}

// Survey Page Component
function SurveyPage() {
  const navigate = useNavigate();

  return (
    <Survey
      onBack={() => navigate('/products/prefill/preferences')}
      onNext={(selectedItems) => {
        console.log('Selected items:', selectedItems);
        navigate('/products/prefill/survey/skincare');
      }}
    />
  );
}

function SurveySkincarePage() {
  const navigate = useNavigate();

  return (
    <SurveyComponent
      onBack={() => navigate('/products/prefill/survey')}
      onNext={(selectedItems) => {
        console.log('Selected items:', selectedItems);
        navigate('/products/prefill/survey/product-search');
      }}
    />
  );
}

function ProductSearchPage() {
  const navigate = useNavigate();

  return (
    <ProductSearch
      onBack={() => navigate('/products/prefill/survey/skincare')}
      onSkip={() => navigate('/products/prefill/product-selection')}
      onNext={(product) => {
        console.log('Product:', product);
        navigate('/products/prefill/product-selection');
      }}
    />
  );
}

function ProductSelectionPage() {
  const navigate = useNavigate();

  return (
    <MonthlyPurchase
      onBack={() => navigate('/products/prefill/survey/product-search')}
      onRemindLater={() => navigate('/products/prefill')}
      onBuyNow={(selectedItems, subscription) => {
        console.log('Selected items:', selectedItems);
        console.log('Subscription:', subscription);
        navigate('/products/prefill/pharmacy-cart');
      }}
    />
  );
}

function PharmacyCartPage() {
  const navigate = useNavigate();

  return (
    <PharmacyCart
      onBack={() => navigate('/products/prefill/product-selection')}
      onProceedToCheckout={(cartItems) => {
        navigate('/products/prefill/checkout', { state: { cartItems } });
      }}
    />
  );
}

function CheckoutPageComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];

  return (
    <CheckoutPage
      onBack={() => navigate('/products/prefill/pharmacy-cart')}
      cartItems={cartItems}
      onPayment={() => navigate('/products/prefill/payment-success')}
    />
  );
}

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <PaymentSuccess
      onBack={() => navigate('/products/prefill/checkout')}
      onSeePersona={() => navigate('/products/prefill/persona')}
      onTrackOrder={() => navigate('/')}
    />
  );
}

function PrefillApp() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="preferences" element={<PreferencesPage />} />{' '}
      <Route path="survey" element={<SurveyPage />} />{' '}
      <Route path="survey/skincare" element={<SurveySkincarePage />} />{' '}
      <Route path="survey/product-search" element={<ProductSearchPage />} />{' '}
      <Route path="product-selection" element={<ProductSelectionPage />} />{' '}
      <Route path="pharmacy-cart" element={<PharmacyCartPage />} />{' '}
      <Route path="checkout" element={<CheckoutPageComponent />} />{' '}
      <Route path="payment-success" element={<PaymentSuccessPage />} />{' '}
      <Route path="persona" element={<WellnessPersona />} />{' '}
    </Routes>
  );
}

export default PrefillApp;
