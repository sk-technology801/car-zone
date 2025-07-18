"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, Menu, X, Phone, Mail, MapPin } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // current route path

  const navItems = [
    { id: "home", label: "Home", href: "/" },
    { id: "buy-cars", label: "Buy Cars", href: "/buy-cars" },
    { id: "sell-cars", label: "Sell Cars", href: "/sell-cars" },
    { id: "spare-parts", label: "Spare Parts", href: "/spare-parts" },
    { id: "services", label: "Services", href: "/services" },
    { id: "about", label: "About Us", href: "/about" },
    { id: "contact", label: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-black text-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gray-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">info@cardealer.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-gray-300">123 Auto Street, Car City</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-lg">
              <Car className="h-8 w-8 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AutoDealer</h1>
              <p className="text-sm text-gray-400">Cars & Spare Parts</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white" />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/quote"
              className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gray-300 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-900 border-t border-gray-700">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-700">
              <Link
                href="/quote"
                className="block bg-white text-black px-4 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
