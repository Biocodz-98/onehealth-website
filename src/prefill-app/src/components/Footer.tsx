import React from 'react';

// Types
interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  badge?: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children, badge }) => {
  return (
    <a
      href={href}
      className="text-white hover:text-green-300 transition-colors text-sm mb-3 flex items-center gap-2"
      style={{ fontFamily: 'Manrope, sans-serif' }}
    >
      {children}
      {badge && (
        <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </a>
  );
};

const Footer: React.FC = () => {
  return (
    <footer
      className="bg-[#5d6b50] text-white py-12"
      style={{ fontFamily: 'Manrope, sans-serif' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Solutions Column */}
          <div>
            <h3 className="text-white font-semibold text-xs mb-4 uppercase tracking-wider opacity-60">
              Solutions
            </h3>
            <div className="flex flex-col">
              <FooterLink href="#">
                Medication fulfillment for Providers
              </FooterLink>
              <FooterLink href="#">OneHealth Pharmacy</FooterLink>
              <FooterLink href="#">Pharmacy Network Program</FooterLink>
              <FooterLink href="#">Pharma Logistics</FooterLink>
              <FooterLink href="#">Manage Chronic Conditions</FooterLink>
              <FooterLink href="#">Pharma Inventory Marketplace</FooterLink>
            </div>

            <h3 className="text-white font-semibold text-xs mb-4 mt-8 uppercase tracking-wider opacity-60">
              Popular
            </h3>
            <div className="flex flex-col">
              <FooterLink href="#">Longer Sex</FooterLink>
              <FooterLink href="#">Loose Weight</FooterLink>
              <FooterLink href="#">Smooth Skin</FooterLink>
              <FooterLink href="#">Avoid Pregnancy</FooterLink>
              <FooterLink href="#">Tackle Depression</FooterLink>
              <FooterLink href="#">Manage High Sugar</FooterLink>
              <FooterLink href="#">Manage High BP</FooterLink>
              <FooterLink href="#">Vitamins & Supplements</FooterLink>
              <FooterLink href="#">Pharmacy Essentials</FooterLink>
            </div>
          </div>

          {/* Platform Column */}
          <div>
            <h3 className="text-white font-semibold text-xs mb-4 uppercase tracking-wider opacity-60">
              Platform
            </h3>
            <div className="flex flex-col">
              <FooterLink href="#">Speak to a Doctor</FooterLink>
              <FooterLink href="#">Book Lab tests</FooterLink>
              <FooterLink href="#">Get Health Cover</FooterLink>
              <FooterLink href="#">Bella AI</FooterLink>
              <FooterLink href="#">Get Substitutes</FooterLink>
              <FooterLink href="#">Offers</FooterLink>
            </div>

            <h3 className="text-white font-semibold text-xs mb-4 mt-8 uppercase tracking-wider opacity-60">
              Resources
            </h3>
            <div className="flex flex-col">
              <FooterLink href="#">Wall of life | Our Blog</FooterLink>
              <FooterLink href="#" badge="coming soon">
                Member Benefits
              </FooterLink>
              <FooterLink href="#">About us</FooterLink>
              <FooterLink href="#">Contact us</FooterLink>
            </div>

            <h3 className="text-white font-semibold text-xs mb-4 mt-8 uppercase tracking-wider opacity-60">
              Socials
            </h3>
            <div className="flex gap-2">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#556854] hover:bg-[#3da467] rounded-full flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* X (Twitter) */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#556854] hover:bg-[#3da467] rounded-full flex items-center justify-center transition-all"
                aria-label="X"
              >
                <svg
                  className="w-3.5 h-3.5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#556854] hover:bg-[#3da467] rounded-full flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#556854] hover:bg-[#3da467] rounded-full flex items-center justify-center transition-all"
                aria-label="WhatsApp"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Others Column */}
          <div>
            <h3 className="text-white font-semibold text-xs mb-4 uppercase tracking-wider opacity-60">
              Others
            </h3>
            <div className="flex flex-col">
              <FooterLink href="#">Legitscript certification</FooterLink>
              <FooterLink href="#">GDPR</FooterLink>
              <FooterLink href="#">HIPAA</FooterLink>
              <FooterLink href="#">Our Delivery Promise</FooterLink>
              <FooterLink href="#">ACPN certification badges</FooterLink>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-1">
            <div className="bg-[#0d4934] w-full p-5 py-6 rounded-3xl flex flex-col gap-4">
              <h2 className="font-semibold text-2xl leading-7 text-white">
                Subscribe to our newsletter
              </h2>
              <div>
                <p className="text-white text-sm">
                  Feeling a bit lost sometimes?
                </p>
                <p className="text-white text-sm">
                  Get a weekly dose of actionable health advice, secrets, tips,
                  trends, and banter in your inbox.
                </p>
              </div>
              <div className="w-full">
                <a
                  href="https://ce552563.sibforms.com/serve/MUIFAFjl63jS91eiphs88WkQbuDxT_hbD_t15sOftlkAARAi00N8WwSKBt33BQAUHBm3UjckmxaSmkM6pt-M-x8XKw-DX2EXu9gLJ8V2GIQwHHhNbvuJFZhLZTiySQ_z-gOa7OBhkzGxXkhsc_Z__LovWwzl-zHF2P7M_vaUKL2IpRM9VqZywwHwJTa0RSlWRbgWKWVbaw01bmus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center bg-[#2c7a3a] text-[#ffffff] font-semibold py-3 px-5 rounded-3xl hover:bg-[#3d7a3a] transition-colors"
                >
                  Subscribe
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
