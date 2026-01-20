import { Routes, Route, useNavigate } from 'react-router-dom';
import { RefillProvider } from './Services/refillApi';

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
        onStartBuilding={() => navigate('/products/refill/preferences')}
      />
      <Footer />
    </div>
  );
}

// Preferences Page Component
function PreferencesPage() {
  return <PreferencesForm />;
}

// Survey Page Component
function SurveyPage() {
  return <Survey />;
}

// Skincare Survey Page Component
function SurveySkincarePage() {
  return <SurveyComponent />;
}

// Product Search Page Component
function ProductSearchPage() {
  return <ProductSearch />;
}

// Product Selection Page Component
function ProductSelectionPage() {
  return <MonthlyPurchase />;
}

// Pharmacy Cart Page Component
function PharmacyCartPage() {
  return <PharmacyCart />;
}

// Checkout Page Component
function CheckoutPageComponent() {
  return <CheckoutPage />;
}

// Payment Success Page Component
function PaymentSuccessPage() {
  return <PaymentSuccess />;
}

// Wellness Persona Page Component
function WellnessPersonaPage() {
  return <WellnessPersona />;
}

function RefillApp() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="preferences" element={<PreferencesPage />} />
      <Route path="survey" element={<SurveyPage />} />
      <Route path="survey/skincare" element={<SurveySkincarePage />} />
      <Route path="survey/product-search" element={<ProductSearchPage />} />
      <Route path="product-selection" element={<ProductSelectionPage />} />
      <Route path="pharmacy-cart" element={<PharmacyCartPage />} />
      <Route path="checkout" element={<CheckoutPageComponent />} />
      <Route path="payment-success" element={<PaymentSuccessPage />} />
      <Route path="persona" element={<WellnessPersonaPage />} />
    </Routes>
  );
}

function App() {
  return (
    <RefillProvider>
      <RefillApp />
    </RefillProvider>
  );
}

export default App;
