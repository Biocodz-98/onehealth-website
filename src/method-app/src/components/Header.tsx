import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white px-8 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to={"/"} className="pointer">
            <img
              src="/method-images/Onehealthng-Logo.svg"
              alt="OneHealth Logo"
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 list-none m-0 p-0">
            <a
              href="https://web.onehealthng.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="hover:text-green-600 cursor-pointer text-base font-normal list-none">
                Home
              </li>
            </a>
            <li className="hover:text-green-600 cursor-pointer text-base font-normal list-none">
              How It Works
            </li>
            <li className="hover:text-green-600 cursor-pointer text-base font-normal list-none">
              Product Categories
            </li>
            <li className="hover:text-green-600 cursor-pointer text-base font-normal list-none">
              FAQ
            </li>
          </ul>
        </nav>

        {/* Desktop Button */}
        <a
          href="https://tally.so/r/mKqLN8"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block bg-[#3da647] text-white hover:bg-green-700"
          style={{
            padding: "10px 16px",
            borderRadius: "50px",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "150%",
            fontFamily: "Manrope, sans-serif",
            cursor: "pointer",
          }}
        >
          Start Your Free Check
        </a>

        {/* Hamburger Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-green-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4">
          <nav>
            <ul className="flex flex-col space-y-4 list-none m-0 p-0">
              <li className="hover:text-green-600 cursor-pointer text-base font-normal list-none">
                Home
              </li>
              <li className="hover:text-green-600 cursor-pointer text-base font-normal list-none">
                How It Works
              </li>
              <li className="hover:text-green-600 cursor-pointer text-base font-normal list-none">
                Product Categories
              </li>
              <li className="hover:text-green-600 cursor-pointer text-base font-normal list-none">
                FAQ
              </li>
            </ul>
          </nav>

          <a
            href="https://tally.so/r/mKqLN8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full mt-4 text-center bg-[#3da647] text-white hover:bg-green-700"
            style={{
              padding: "10px 16px",
              borderRadius: "50px",
              fontSize: "14px",
              fontWeight: "500",
              lineHeight: "150%",
              fontFamily: "Manrope, sans-serif",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Start Your Free Check
          </a>
        </div>
      )}
    </header>
  );
}

export default Header;
