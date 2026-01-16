import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

// Types
interface DropdownProps {
  isOpen: boolean;
}

interface NavItemProps {
  label: string;
  hasDropdown: boolean;
  children?: React.ReactElement<DropdownProps>;
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
    <div className="relative flex items-center">
      <Search className="absolute left-4 w-4 h-4 text-gray-400 pointer-events-none" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
        placeholder="Search medicines, plans etc."
        className="w-72 pl-11 pr-4 py-2.5 text-sm border border-white rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
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
const NavItem: React.FC<NavItemProps> = ({ label, hasDropdown, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="flex items-center gap-1 text-sm text-gray-700 hover:text-green-600 font-medium transition-colors whitespace-nowrap"
        style={{ fontFamily: 'Manrope, sans-serif' }}
      >
        <span>{label}</span>
        {hasDropdown && <ChevronDown className="w-3.5 h-3.5" />}
      </button>
      {children && React.cloneElement(children, { isOpen })}
    </div>
  );
};

// Main Header Component
const Header: React.FC = () => {
  return (
    <header
      className="bg-[#fafafa]   shadow-sm"
      style={{ fontFamily: 'Manrope, sans-serif' }}
    >
      <div className="w-full px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Logo */}
          <Logo />

          {/* Search Bar */}
          <SearchBar />

          {/* Navigation */}
          <nav className="flex items-center gap-6">
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

          {/* CTA Button */}
          <a
            href="https://onehealthng.com/pharmacy"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#3da467] hover:bg-green-700 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap shrink-0"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            Enter Pharmacy
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
