"use client"
import React, { useState } from 'react';
import { Search, Car, Wrench, Star, Phone, Mail, MapPin, ArrowRight, Filter, Heart, Eye } from 'lucide-react';

const CarMarketplace = () => {
  const [activeTab, setActiveTab] = useState('buy');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredCars = [
    {
      id: 1,
      name: "BMW 3 Series",
      year: 2022,
      price: 45000,
      mileage: 12000,
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=250&fit=crop",
      rating: 4.8,
      location: "New York",
      fuel: "Petrol"
    },
    {
      id: 2,
      name: "Mercedes C-Class",
      year: 2023,
      price: 52000,
      mileage: 8000,
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=250&fit=crop",
      rating: 4.9,
      location: "California",
      fuel: "Hybrid"
    },
    {
      id: 3,
      name: "Audi A4",
      year: 2021,
      price: 38000,
      mileage: 25000,
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop",
      rating: 4.7,
      location: "Texas",
      fuel: "Diesel"
    }
  ];

  const spareParts = [
    {
      id: 1,
      name: "Brake Pads Set",
      price: 89,
      category: "Brakes",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop",
      rating: 4.6,
      inStock: true
    },
    {
      id: 2,
      name: "Engine Oil Filter",
      price: 25,
      category: "Engine",
      image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=300&h=200&fit=crop",
      rating: 4.8,
      inStock: true
    },
    {
      id: 3,
      name: "Headlight Assembly",
      price: 150,
      category: "Lighting",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop",
      rating: 4.5,
      inStock: false
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Find Your Perfect Car
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Buy, sell, and find spare parts for your vehicle in one convenient marketplace
            </p>
            
            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-800 rounded-lg p-1">
                <button 
                  onClick={() => setActiveTab('buy')}
                  className={`px-6 py-3 rounded-lg transition-colors ${
                    activeTab === 'buy' 
                      ? 'bg-white text-black' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Buy Cars
                </button>
                <button 
                  onClick={() => setActiveTab('sell')}
                  className={`px-6 py-3 rounded-lg transition-colors ${
                    activeTab === 'sell' 
                      ? 'bg-white text-black' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Sell Cars
                </button>
                <button 
                  onClick={() => setActiveTab('parts')}
                  className={`px-6 py-3 rounded-lg transition-colors ${
                    activeTab === 'parts' 
                      ? 'bg-white text-black' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Spare Parts
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
                <input
                  type="text"
                  placeholder={
                    activeTab === 'buy' ? 'Search for cars...' :
                    activeTab === 'sell' ? 'Enter your car details...' :
                    'Search for spare parts...'
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="absolute right-2 top-2 bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-white">Featured Cars</h2>
            <button className="flex items-center text-gray-300 hover:text-white">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <div key={car.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                <div className="relative">
                  <img 
                    src={car.image} 
                    alt={car.name}
                    className="w-full h-48 object-cover"
                  />
                  <button className="absolute top-4 right-4 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-colors">
                    <Heart className="h-4 w-4 text-white" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-white">{car.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-300 ml-1">{car.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 mb-4">{car.year} • {car.mileage.toLocaleString()} miles • {car.fuel}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-white">${car.price.toLocaleString()}</span>
                    <div className="flex items-center text-gray-400">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{car.location}</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-white text-black py-2 rounded-lg hover:bg-gray-200 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spare Parts Section */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-white">Popular Spare Parts</h2>
            <button className="flex items-center text-gray-300 hover:text-white">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {spareParts.map((part) => (
              <div key={part.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                <div className="relative">
                  <img 
                    src={part.image} 
                    alt={part.name}
                    className="w-full h-40 object-cover"
                  />
                  {!part.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-semibold">Out of Stock</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-white">{part.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-300 ml-1">{part.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 mb-4">{part.category}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-white">${part.price}</span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      part.inStock 
                        ? 'bg-green-900 text-green-300' 
                        : 'bg-red-900 text-red-300'
                    }`}>
                      {part.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  <button 
                    className={`w-full mt-4 py-2 rounded-lg transition-colors ${
                      part.inStock 
                        ? 'bg-white text-black hover:bg-gray-200' 
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!part.inStock}
                  >
                    {part.inStock ? 'Add to Cart' : 'Notify When Available'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Why Choose AutoHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Quality Vehicles</h3>
              <p className="text-gray-400">Every car is thoroughly inspected and verified for quality and authenticity</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Wrench className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Genuine Parts</h3>
              <p className="text-gray-400">Original spare parts from trusted manufacturers with warranty</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Expert Support</h3>
              <p className="text-gray-400">24/7 customer support to help you find exactly what you need</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Car className="h-6 w-6 text-white" />
                <span className="text-xl font-bold text-white">AutoHub</span>
              </div>
              <p className="text-gray-400">Your trusted marketplace for buying, selling, and finding spare parts for vehicles.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Buy Cars</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sell Cars</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Spare Parts</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">SUVs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sedans</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Trucks</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Electric</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>info@autohub.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>123 Auto Street, Car City</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AutoHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CarMarketplace;