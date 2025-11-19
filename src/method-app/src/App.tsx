import Header from "./components/Header";
import WeightLossLanding from "./components/WeightLoss";
import WeightLossHero from "./components/QualifySection";
import MethodWorks from "./components/HowItWorks";
import ProductCategories from "./components/ProductCategories";
import WhatWeOffer from "./components/WhatWeOffer";
import ProgramBreakdown from "./components/ProgramBreakdown";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
function MethodApp() {
  return (
    <div>
      <Header />
      <WeightLossLanding />
      <WeightLossHero />
      <MethodWorks />
      <ProductCategories />
      <WhatWeOffer />
      <ProgramBreakdown />
      <FAQ />
      <Footer />
    </div>
  );
}

export default MethodApp;
