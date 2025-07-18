"use client"
import React, { useState } from 'react';
import { Car, Menu, X, Phone, Mail, MapPin, Search, Star, Shield, Clock, Users, ArrowRight, CheckCircle, Award, Wrench } from 'lucide-react';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'buy-cars', label: 'Buy Cars', href: '/buy-cars' },
    { id: 'sell-cars', label: 'Sell Cars', href: '/sell-cars' },
    { id: 'spare-parts', label: 'Spare Parts', href: '/spare-parts' },
    { id: 'services', label: 'Services', href: '/services' },
    { id: 'about', label: 'About Us', href: '/about' },
    { id: 'contact', label: 'Contact', href: '/contact' }
  ];

  const handleNavClick = (id) => {
    setActiveLink(id);
    setIsMenuOpen(false);
  };

  const featuredCars = [
    { id: 1, name: 'Honda Civic 2022', price: '$24,999', mileage: '15,000 miles', image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop', type: 'Sedan', fuel: 'Hybrid' },
    { id: 2, name: 'Toyota Camry 2023', price: '$28,500', mileage: '8,000 miles', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop', type: 'Sedan', fuel: 'Gasoline' },
    { id: 3, name: 'BMW X5 2021', price: '$45,999', mileage: '22,000 miles', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop', type: 'SUV', fuel: 'Gasoline' },
    { id: 4, name: 'Tesla Model 3 2023', price: '$42,000', mileage: '12,000 miles', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop', type: 'Electric', fuel: 'Electric' }
  ];

  const services = [
    { icon: <Car className="h-8 w-8" />, title: 'Buy Quality Cars', description: 'Browse our extensive inventory of new and used vehicles from trusted brands' },
    { icon: <Shield className="h-8 w-8" />, title: 'Sell Your Car', description: 'Get the best value for your vehicle with our professional appraisal service' },
    { icon: <Wrench className="h-8 w-8" />, title: 'Spare Parts', description: 'Original and aftermarket parts for all major car brands at competitive prices' },
    { icon: <Award className="h-8 w-8" />, title: 'Quality Guarantee', description: 'All our vehicles come with comprehensive warranty and quality assurance' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    activeLink === item.id
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeLink === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left"></span>
                  )}
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200">
                Get Quote
              </button>
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
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    activeLink === item.id
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-gray-700">
                <button className="w-full bg-white text-black px-4 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200">
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-black via-gray-900 to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-6">Find Your Perfect Car</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover quality new and used vehicles, sell your car at the best price, or find genuine spare parts for all major brands
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-lg p-6 max-w-4xl mx-auto shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select className="p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-black">
                  <option>All Brands</option>
                  <option>Honda</option>
                  <option>Toyota</option>
                  <option>BMW</option>
                  <option>Mercedes</option>
                </select>
                <select className="p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-black">
                  <option>All Types</option>
                  <option>Sedan</option>
                  <option>SUV</option>
                  <option>Hatchback</option>
                  <option>Coupe</option>
                </select>
                <select className="p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-black">
                  <option>Price Range</option>
                  <option>Under $20,000</option>
                  <option>$20,000 - $40,000</option>
                  <option>$40,000 - $60,000</option>
                  <option>Above $60,000</option>
                </select>
                <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Everything you need for your automotive needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className="text-black mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Vehicles</h2>
            <p className="text-xl text-gray-600">Handpicked quality cars at unbeatable prices</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCars.map((car) => (
              <div key={car.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
                <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{car.name}</h3>
                  <p className="text-2xl font-bold text-black mb-2">{car.price}</p>
                  <p className="text-gray-600 mb-4">{car.mileage}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>{car.type}</span>
                    <span>{car.fuel}</span>
                  </div>
                  <button className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-2 mx-auto">
              <span>View All Cars</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-gray-400">Cars Sold</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-gray-400">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-gray-400">Car Brands</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose AutoDealer</h2>
            <p className="text-xl text-gray-600">Your trusted partner in automotive solutions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Assured</h3>
              <p className="text-gray-600">Every vehicle undergoes thorough inspection and comes with our quality guarantee</p>
            </div>
            <div className="text-center">
              <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trusted Service</h3>
              <p className="text-gray-600">Years of experience in the automotive industry with thousands of satisfied customers</p>
            </div>
            <div className="text-center">
              <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive pricing on all vehicles and spare parts with flexible financing options</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-black to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Find Your Perfect Car?</h2>
          <p className="text-xl text-gray-300 mb-8">Get started today with our expert team</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200">
              Browse Cars
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-colors duration-200">
              Sell Your Car
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-white p-2 rounded-lg">
                  <Car className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">AutoDealer</h3>
                  <p className="text-sm text-gray-400">Cars & Spare Parts</p>
                </div>
              </div>
              <p className="text-gray-400">Your trusted automotive partner for quality vehicles and genuine spare parts.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Buy Cars</a></li>
                <li><a href="#" className="hover:text-white">Sell Cars</a></li>
                <li><a href="#" className="hover:text-white">Spare Parts</a></li>
                <li><a href="#" className="hover:text-white">Services</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Car Financing</a></li>
                <li><a href="#" className="hover:text-white">Insurance</a></li>
                <li><a href="#" className="hover:text-white">Maintenance</a></li>
                <li><a href="#" className="hover:text-white">Warranty</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p>123 Auto Street, Car City</p>
                <p>+1 (555) 123-4567</p>
                <p>info@cardealer.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AutoDealer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;