import { Route, Routes, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Insurers from '@/app/Insurers';
import Pharmacy from '@/app/Pharmacy';
import ImaniPage from '@/pages/ImaniPage';
import MethodPage from '@/pages/MethodPage';
import PharmacySearch from '@/app/Pharmacy/Search';
import Root from '@/app/Landing';
import Footer from '@/components/Footer/Footer';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter } from 'react-router-dom';
import RefillPage from '@/pages/PrefillPage';

function AppContent() {
  const location = useLocation();

  // Route to hide header - updated to match any prefill path
  const hideHeaderRoutes = ['/products/method', '/method'];
  const shouldHideHeader =
    hideHeaderRoutes.includes(location.pathname) ||
    location.pathname.startsWith('/products/refill');

  // Route to hide footer - updated to match any prefill path
  const hideFooterRoutes = [
    '/products/imani',
    '/imani',
    '/products/method',
    '/method',
  ];

  const shouldHideFooter =
    hideFooterRoutes.includes(location.pathname) ||
    location.pathname.startsWith('/products/refill');

  return (
    <>
      {!shouldHideHeader && <Header />}
      <Routes>
        <Route key={'home'} path="/" element={<Root />} />
        <Route key={'pharmacy'} path="/pharmacies" element={<Pharmacy />} />
        <Route
          key={'pharmacy-search'}
          path="/pharmacies/search"
          element={<PharmacySearch />}
        />
        <Route key={'insurers'} path="/insurers" element={<Insurers />} />
        <Route key={'imani'} path="/products/imani" element={<ImaniPage />} />
        <Route
          key={'method'}
          path="/products/method"
          element={<MethodPage />}
        />
        <Route
          key={'refill'}
          path="/products/refill/*"
          element={<RefillPage />}
        />
      </Routes>
      {!shouldHideFooter && <Footer />}
    </>
  );
}

export default function OneRoutes() {
  return (
    <>
      <AnimatePresence>
        <BrowserRouter key={'mainrouter'}>
          <AppContent />
        </BrowserRouter>
      </AnimatePresence>
    </>
  );
}
