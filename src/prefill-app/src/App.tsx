import { Routes, Route, useNavigate } from 'react-router-dom';
import RefillProvider from './Services/refillApi';

import Header from './components/header/Header';
import HeroSection from './components/Hero';
import Footer from './components/Footer';
import PreferencesForm from './components/Entry';
import Survey from './components/MedicineSurvey';
import SurveyComponent from './components/SkinCareSurvey';
import BabyCareComponent from './components/BabyCareSurvey';
import ProductSearch from './components/ProductSearch';
import MonthlyPurchase from './components/ProductSelection';
import RemindMeLaterPersona from './components/RemindLaterPersona.tsx';
import PharmacyCart from './components/Cart';
import CheckoutPage from './components/Checkout.tsx';
import PaymentSuccess from './components/Payment';
import PaymentFailed from './components/PaymentFail';
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

// Babycare Survey Page Component
function BabycareSurveyPage() {
  return <BabyCareComponent />;
}

// Product Search Page Component
function ProductSearchPage() {
  return <ProductSearch />;
}

// Product Selection Page Component
function ProductSelectionPage() {
  return <MonthlyPurchase />;
}

function RemindMeLaterPersonaPage() {
  return <RemindMeLaterPersona />;
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

// Payment Failed Page Component
function PaymentFailedPage() {
  return <PaymentFailed />;
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
      <Route path="survey/babycare" element={<BabycareSurveyPage />} />
      <Route path="survey/product-search" element={<ProductSearchPage />} />
      <Route path="product-selection" element={<ProductSelectionPage />} />
      <Route
        path="remind-me-later-persona"
        element={<RemindMeLaterPersonaPage />}
      />
      <Route path="pharmacy-cart" element={<PharmacyCartPage />} />
      <Route path="checkout" element={<CheckoutPageComponent />} />
      <Route path="payment-success" element={<PaymentSuccessPage />} />
      <Route path="payment-failed" element={<PaymentFailedPage />} />
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
