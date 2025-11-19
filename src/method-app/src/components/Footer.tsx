import { Youtube, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="p-8 md:p-12 lg:p-20 lg:py-16"
      style={{
        backgroundColor: "#f5f5f5",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2
            className="mb-4"
            style={{
              fontFamily: "Lexend, sans-serif",
              fontSize: "30px",
              fontWeight: "700",
              lineHeight: "110%",
              color: "#000000",
            }}
          >
            OneHealthng <br />
            Compliance Notes
          </h2>
          <div
            className="grid md:grid-cols-3 gap-8 "
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "150%",
              fontStyle: "regular",
              color: "#323232",
            }}
          >
            <p
              style={{
                borderRight: "1px solid #bfbfbf",
                paddingRight: "16px",
              }}
            >
              We do not claim affiliation with or distribution of brand-name
              products such as Ozempic®, Wegovy®, Mounjaro®, Zepbound®.
            </p>
            <p
              style={{ borderRight: "1px solid #bfbfbf", paddingRight: "16px" }}
            >
              Where clinically appropriate, OneHealth physicians may prescribe
              semaglutide (GLP-1) or tirzepatide (GLP-1 + GIP), the same
              medication classes used by those brands.
            </p>
            <p>
              All prescriptions are at the provider's discretion after your
              medical assessment. Individual results vary.
            </p>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Product Column */}
          <div>
            <h3
              className=" mb-4"
              style={{
                fontFamily: "Monrope, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "150%",
                fontStyle: "medium",
                color: "#989898",
              }}
            >
              Product
            </h3>
            <ul
              className="space-y-2 "
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "150%",
                fontStyle: "regular",
                color: "#4b4b4b",
              }}
            >
              <li>
                <a href="#" className="hover:text-green-600">
                  Pharmacy Benefit Management
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Pharmacy Provider Network
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Online Pharmacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  OneWellness
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Pillmova
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  PillHinda
                </a>
              </li>
            </ul>
          </div>

          {/* Platform Column */}
          <div>
            <h3
              className=" mb-4"
              style={{
                fontFamily: "Monrope, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "150%",
                fontStyle: "medium",
                color: "#989898",
              }}
            >
              Platform
            </h3>
            <ul
              className="space-y-2 "
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "150%",
                fontStyle: "regular",
                color: "#4b4b4b",
              }}
            >
              <li>
                <a href="#" className="hover:text-green-600">
                  Speak to a Doctor
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Book lab tests
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Get Health Cover
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  His Health
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Her Health
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Sexual Health
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3
              className=" mb-4"
              style={{
                fontFamily: "Monrope, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "150%",
                fontStyle: "medium",
                color: "#989898",
              }}
            >
              Company
            </h3>
            <ul
              className="space-y-2 "
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "150%",
                fontStyle: "regular",
                color: "#4b4b4b",
              }}
            >
              <li>
                <a href="#" className="hover:text-green-600">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  News
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Media Kit
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3
              className=" mb-4"
              style={{
                fontFamily: "Monrope, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "150%",
                fontStyle: "medium",
                color: "#989898",
              }}
            >
              Resources
            </h3>
            <ul
              className="space-y-2 "
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "150%",
                fontStyle: "regular",
                color: "#4b4b4b",
              }}
            >
              <li>
                <a href="#" className="hover:text-green-600">
                  Wall of life | Our Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Newsletter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Events
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Member Benefits
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <h3
              className=" mb-4"
              style={{
                fontFamily: "Monrope, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "150%",
                fontStyle: "medium",
                color: "#989898",
              }}
            >
              Legal
            </h3>
            <ul
              className="space-y-2 "
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "150%",
                fontStyle: "regular",
                color: "#4b4b4b",
              }}
            >
              <li>
                <a href="#" className="hover:text-green-600">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600">
                  Privacy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Column */}
          <div>
            <h3
              className=" mb-4"
              style={{
                fontFamily: "Monrope, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "150%",
                fontStyle: "medium",
                color: "#989898",
              }}
            >
              Social
            </h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800"
              >
                <Youtube className="w-4 h-4 text-white" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800"
              >
                <Instagram className="w-4 h-4 text-white" />
              </a>

              <a
                href="#"
                className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800"
              >
                <Linkedin className="w-4 h-4 text-white" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800"
              >
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <img
            src="/method-images/Onehealthng-Logo.svg"
            alt="OneHealth Logo"
            className="h-8 mb-4 md:mb-0"
          />
          <p className="text-sm text-gray-600">© 2025 with OneHealth</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
