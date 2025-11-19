import { Route, Routes, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Insurers from "@/app/Insurers";
import Pharmacy from "@/app/Pharmacy";
import ImaniPage from "@/pages/ImaniPage";
import MethodPage from "@/pages/MethodPage";
import PharmacySearch from "@/app/Pharmacy/Search";
import Root from "@/app/Landing";
import Footer from "@/components/Footer/Footer";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter } from "react-router-dom";

function AppContent() {
  const location = useLocation();

  // Route to hide header
  const hideHeaderRoutes = ["/products/method", "/method"];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  // Route to hide footer
  const hideFooterRoutes = [
    "/products/imani",
    "/imani",
    "/products/method",
    "/method",
  ];

  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}
      <Routes>
        <Route key={"home"} path="/" element={<Root />} />
        <Route key={"pharmacy"} path="/pharmacies" element={<Pharmacy />} />
        <Route
          key={"pharmacy-search"}
          path="/pharmacies/search"
          element={<PharmacySearch />}
        />
        <Route key={"insurers"} path="/insurers" element={<Insurers />} />
        <Route key={"imani"} path="/products/imani" element={<ImaniPage />} />
        <Route
          key={"method"}
          path="/products/method"
          element={<MethodPage />}
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
        <BrowserRouter key={"mainrouter"}>
          <AppContent />
        </BrowserRouter>
      </AnimatePresence>
    </>
  );
}
