import React, { useState } from 'react';
import { Search, ChevronDown, Menu, X } from 'lucide-react';

// Types
interface DropdownProps {
  isOpen: boolean;
}

interface NavItemProps {
  label: string;
  hasDropdown: boolean;
  children?: React.ReactElement<DropdownProps>;
  isMobile?: boolean;
}

// Products Dropdown Component
const ProductsDropdown: React.FC<DropdownProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
      <a
        href="#"
        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
        style={{ fontFamily: 'Manrope, sans-serif' }}
      >
        Medications
      </a>
      <a
        href="#"
        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
        style={{ fontFamily: 'Manrope, sans-serif' }}
      >
        Medical Devices
      </a>
      <a
        href="#"
        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
        style={{ fontFamily: 'Manrope, sans-serif' }}
      >
        Health Supplements
      </a>
      <a
        href="#"
        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
        style={{ fontFamily: 'Manrope, sans-serif' }}
      >
        Personal Care
      </a>
    </div>
  );
};

// Services Dropdown Component
const ServicesDropdown: React.FC<DropdownProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
      <a
        href="#"
        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
        style={{ fontFamily: 'Manrope, sans-serif' }}
      >
        Telemedicine
      </a>
      <a
        href="#"
        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
        style={{ fontFamily: 'Manrope, sans-serif' }}
      >
        Home Delivery
      </a>
      <a
        href="#"
        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
        style={{ fontFamily: 'Manrope, sans-serif' }}
      >
        Lab Tests
      </a>
      <a
        href="#"
        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
        style={{ fontFamily: 'Manrope, sans-serif' }}
      >
        Health Checkups
      </a>
    </div>
  );
};

// Resources Dropdown Component
const ResourcesDropdown: React.FC<DropdownProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
      <a
        href="#"
        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
        style={{ fontFamily: 'Manrope, sans-serif' }}
      >
        Health Articles
      </a>
      <a
        href="#"
        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
        style={{ fontFamily: 'Manrope, sans-serif' }}
      >
        FAQs
      </a>
      <a
        href="#"
        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
        style={{ fontFamily: 'Manrope, sans-serif' }}
      >
        Health Tips
      </a>
      <a
        href="#"
        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
        style={{ fontFamily: 'Manrope, sans-serif' }}
      >
        Download App
      </a>
    </div>
  );
};

// Search Component
const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="relative flex items-center w-full lg:w-auto">
      <Search className="absolute left-4 w-4 h-4 text-gray-400 pointer-events-none" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
        placeholder="Search medicines, plans etc."
        className="w-full lg:w-72 pl-11 pr-4 py-2.5 text-sm border border-white rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
        style={{ fontFamily: 'Manrope, sans-serif' }}
      />
    </div>
  );
};

// Logo Component
const Logo: React.FC = () => {
  return (
    <a href="/" className="flex items-center shrink-0">
      <img
        src="/prefill-images/onehealth logo.svg"
        alt="OneHealth Logo"
        className="h-7 w-auto"
      />
    </a>
  );
};

// Nav Item Component
const NavItem: React.FC<NavItemProps> = ({
  label,
  hasDropdown,
  children,
  isMobile = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => !isMobile && setIsOpen(true)}
      onMouseLeave={() => !isMobile && setIsOpen(false)}
    >
      <button
        className={`flex items-center gap-1 text-sm font-medium transition-colors whitespace-nowrap ${
          isMobile
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:text-green-600'
        }`}
        style={{ fontFamily: 'Manrope, sans-serif' }}
        disabled={isMobile}
      >
        <span>{label}</span>
        {hasDropdown && <ChevronDown className="w-3.5 h-3.5" />}
      </button>
      {children && !isMobile && React.cloneElement(children, { isOpen })}
    </div>
  );
};

// Main Header Component
const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <header
      className="bg-[#fafafa] shadow-sm"
      style={{ fontFamily: 'Manrope, sans-serif' }}
    >
      <div className="w-full px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Logo />

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex">
            <SearchBar />
          </div>

          {/* Desktop Navigation - */}
          <nav className="hidden lg:flex items-center gap-6">
            <NavItem label="Products" hasDropdown>
              <ProductsDropdown isOpen={false} />
            </NavItem>

            <NavItem label="Services" hasDropdown>
              <ServicesDropdown isOpen={false} />
            </NavItem>

            <NavItem label="Resources" hasDropdown>
              <ResourcesDropdown isOpen={false} />
            </NavItem>

            <NavItem label="Pharmacies" hasDropdown={false} />

            <NavItem label="Insurers" hasDropdown={false} />

            <NavItem label="Investors" hasDropdown={false} />

            <NavItem label="About" hasDropdown={false} />
          </nav>

          {/* Desktop CTA Button */}
          <a
            href="https://onehealthng.com/pharmacy"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:block bg-[#3da467] hover:bg-green-700 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap shrink-0"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            Enter Pharmacy
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-green-600 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4 space-y-4">
            {/* Mobile Search Bar */}
            <div className="pt-2">
              <SearchBar />
            </div>

            {/* Mobile Navigation Items  */}
            <nav className="flex flex-col gap-3 pt-2">
              <NavItem label="Products" hasDropdown isMobile />
              <NavItem label="Services" hasDropdown isMobile />
              <NavItem label="Resources" hasDropdown isMobile />
              <NavItem label="Pharmacies" hasDropdown={false} isMobile />
              <NavItem label="Insurers" hasDropdown={false} isMobile />
              <NavItem label="Investors" hasDropdown={false} isMobile />
              <NavItem label="About" hasDropdown={false} isMobile />
            </nav>

            {/* Mobile CTA Button  */}
            <a
              href="https://onehealthng.com/pharmacy"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-[#3da467] hover:bg-green-700 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors"
              style={{ fontFamily: 'Manrope, sans-serif' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Enter Pharmacy
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
