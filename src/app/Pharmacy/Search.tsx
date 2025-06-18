import { useState, useEffect } from "react";

import { 
    PharmacySearchHero,
    PharmacySearchSec2Img,
    AtomSvg,
    ComputerSvg,
    TrackOrderSvg,
    Sheets
} from "@/data/imageData";

const BASE_URL = import.meta.env.VITE_FULFILLMENT_URL;


interface StateType { id: number; name: string; }
interface LgaType { id: number; name: string; }
interface PharmacyType {
  id: string;
  pharmacy_name: string;
  address: string;
  state: string;
  lga: string;
  avatar?: string;
  average_rating?: number;
  rating_count?: number;
}

export default function PharmacySearch() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedLGA, setSelectedLGA] = useState("");
  const [states, setStates] = useState<StateType[]>([]);
  const [lgas, setLgas] = useState<LgaType[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingLgas, setLoadingLgas] = useState(false);
  const [errorStates, setErrorStates] = useState("");
  const [errorLgas, setErrorLgas] = useState("");
  const [pharmacies, setPharmacies] = useState<PharmacyType[]>([]);
  const [loadingPharmacies, setLoadingPharmacies] = useState(false);
  const [errorPharmacies, setErrorPharmacies] = useState("");

  // Fetch states on mount
  useEffect(() => {
    const fetchStates = async () => {
      setLoadingStates(true);
      setErrorStates("");
      try {
        const res = await fetch(`${BASE_URL}/states`);
        if (!res.ok) throw new Error("Failed to fetch states");
        const data = await res.json();
        setStates(data.data || data || []);
      } catch (err: any) {
        setErrorStates(err.message || "Error fetching states");
      } finally {
        setLoadingStates(false);
      }
    };
    fetchStates();
  }, []);


  useEffect(() => {
    if (!selectedState) {
      setLgas([]);
      setSelectedLGA("");
      return;
    }
    const fetchLgas = async () => {
      setLoadingLgas(true);
      setErrorLgas("");
      try {
        const res = await fetch(`${BASE_URL}/states/${encodeURIComponent(selectedState)}/lgas`);
        if (!res.ok) throw new Error("Failed to fetch LGAs");
        const data = await res.json();
        setLgas(data.data || data || []);
      } catch (err: any) {
        setErrorLgas(err.message || "Error fetching LGAs");
      } finally {
        setLoadingLgas(false);
      }
    };
    fetchLgas();
  }, [selectedState]);

  // Handle pharmacy search
  const handleSearch = async () => {
    setLoadingPharmacies(true);
    setErrorPharmacies("");
    setPharmacies([]);
    try {
      const params = new URLSearchParams({
        state: selectedState,
        lga: selectedLGA,
      });
      const res = await fetch(`${BASE_URL}/pharmacies/search?${params.toString()}`);
    
      if (!res.ok) throw new Error("Failed to fetch pharmacies");
      const data = await res.json();
      console.log(data.data)
      setPharmacies(data.data?.data || []);
    } catch (err: any) {
      setErrorPharmacies(err.message || "Error fetching pharmacies");
    } finally {
      setLoadingPharmacies(false);
    }
  };

  return (
    <div className="bg-[#FCFEF9] min-h-screen w-full">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-16 px-4 gap-4  mt-52 ">
        {/* Left: Text and Form */}
        <div className="flex-1 max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold text-black leading-tight mb-4">
            Find the nearest<br />pharmacy to you
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Search from our network of partner pharmacies across Nigeria.
          </p>
          <form className=" mb-4" onSubmit={e => { e.preventDefault(); handleSearch(); }}>
            <div className="flex flex-col md:flex-row gap-4">

                <div className="relative w-full md:w-60">
                  <select
                    className="w-full px-4 pr-10 py-3 rounded-lg border border-gray-200 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 "
                    value={selectedState}
                    onChange={e => setSelectedState(e.target.value)}
                    disabled={loadingStates}
                  >
                    <option value="">{loadingStates ? "Loading states..." : "Select your state"}</option>
                    {states.map(state => (
                      <option key={state.id} value={state.name}>{state.name}</option>
                    ))}
                  </select>

                </div>
                <select
                    className="w-full md:w-60 px-4 pr-20 py-3 rounded-lg border border-gray-200 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={selectedLGA}
                    onChange={e => setSelectedLGA(e.target.value)}
                    disabled={!selectedState || loadingLgas}
                    >
                    <option value="">{!selectedState ? "Select state first" : loadingLgas ? "Loading LGAs..." : "Select your LGA"}</option>
                    {lgas.map(lga => (
                        <option key={lga.id} value={lga.name}>{lga.name}</option>
                    ))}
                </select>
            </div>

            <div className="mt-5">
                <button
                    className="bg-[#7ED957] hover:bg-[#6cc94e] transition-colors text-black font-medium rounded-lg px-8 py-3 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 w-54"
                    type="submit"
                    disabled={loadingPharmacies || !selectedState || !selectedLGA}
                    >
                    {loadingPharmacies ? "Searching..." : "Search for pharmacies"}
                </button>
            </div>
          </form>
          {errorStates && <div className="text-red-500 text-sm mb-2">{errorStates}</div>}
          {errorLgas && <div className="text-red-500 text-sm mb-2">{errorLgas}</div>}
          {errorPharmacies && <div className="text-red-500 text-sm mb-2">{errorPharmacies}</div>}
        </div>
        {/* Right: Illustration */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={PharmacySearchHero}
            alt="Pharmacy illustration"
            className="max-w-md w-full h-auto hidden md:block"
            style={{ minWidth: 650 }}
            onError={e => (e.currentTarget.style.display = 'none')}
          />
        </div>
      </section>

      {/* Results Section */}
      {pharmacies.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-8 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pharmacies.map(pharmacy => (
              <div key={pharmacy.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between min-h-[110px]">
                <div>
                  <h3 className="font-bold text-lg mb-2 text-[#222]">{pharmacy.pharmacy_name}</h3>
                  <p className="text-gray-700 text-base">{pharmacy.address}</p>
                  <p><span>{pharmacy.lga},</span> <span>{pharmacy.state}</span></p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* WE ARE COMPLIANT Badge */}
      <div className="max-w-7xl mx-auto px-4 flex items-center ">
        <span className="bg-[#D6F5D6] text-[#10441E] font-semibold rounded-full px-6 py-2 text-sm tracking-widest" style={{letterSpacing: '0.08em'}}>
          WE ARE COMPLIANT
        </span>
        <div className="flex-1 border-t border-[#B6E2B6] h-0"></div>
      </div>

      {/* What to Expect Section */}
      <section className="bg-white py-16 px-6 text-center md:text-left md:px-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#10441E] mb-12">
            What to expect from OneHealth and our network of pharmacies
          </h2>
          <div className="flex flex-col md:flex-row md:items-start md:gap-10 ">
            {/* Left: Image */}
            <div className="flex-1 flex">
              <div className="bg-[#E6F7E6] rounded-3xl  max-w-xs md:max-w-sm mb-5">
                <img
                  src={PharmacySearchSec2Img}
                  alt="Healthcare professional"
                  className="rounded-2xl w-full h-auto object-cover min-w-[410px] md:min-w-[500px]"
                  onError={e => (e.currentTarget.style.display = 'none')}
                />
              </div>
            </div>
            {/* Right: Features */}
            <div className="flex-1 grid grid-cols-1 gap-8">
              <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-4">
                <span className="inline-block mb-2 md:mb-0 md:mt-1">
                  <img src={Sheets} alt="Sheets" className="w-16 h-16 md:w-24 md:h-24 mx-auto md:mx-0" />
                </span>
                <div>
                  <h3 className="font-bold text-lg text-[#10441E] mb-2">Specialty Care for Chronic & Complex Patients</h3>
                  <p className="text-gray-700 text-base">Specialty drug management and support including Free medication delivery for chronic and complex patients.</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-4">
                <span className="inline-block mb-2 md:mb-0 md:mt-1">
                  <img src={TrackOrderSvg} alt="Track Order" className="w-16 h-16 md:w-24 md:h-24 mx-auto md:mx-0" />
                </span>
                <div>
                  <h3 className="font-bold text-lg text-[#10441E] mb-2">Optimized Pharmacy Networks for Delivery or Pickup</h3>
                  <p className="text-gray-700 text-base">Safe and affordable access to medications from optimized pharmacy networks encompassing home delivery and pharmacy pickup</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-4">
                <span className="inline-block mb-2 md:mb-0 md:mt-1">
                  <img src={ComputerSvg} alt="Computer" className="w-16 h-16 md:w-24 md:h-24 mx-auto md:mx-0" />
                </span>
                <div>
                  <h3 className="font-bold text-lg text-[#10441E] mb-2">Technology & Infrastructure</h3>
                  <p className="text-gray-700 text-base">Advanced technology supporting logistics, supply chain management and real time tracking for efficient medication delivery.</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-4">
                <span className="inline-block mb-2 md:mb-0 md:mt-1">
                  <img src={AtomSvg} alt="Atom" className="w-16 h-16 md:w-24 md:h-24 mx-auto md:mx-0" />
                </span>

                <div>
                  <h3 className="font-bold text-lg text-[#10441E] mb-2">Regulatory Compliance & Data Security</h3>
                  <p className="text-gray-700 text-base">Fully compliant with Nigerian healthcare regulations including stringent data security measures to safeguard enrollee information.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 