
"use client"
import React, { useState, useEffect } from 'react';
import { Search, Car, Wrench, Star, Phone, Mail, MapPin, ArrowRight, Heart, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const CarMarketplace = () => {
  const [activeTab, setActiveTab] = useState('buy');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);
  const [filteredParts, setFilteredParts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const pathname = usePathname();

  // Sync activeTab with pathname
  useEffect(() => {
    if (pathname === '/buy-cars') setActiveTab('buy');
    else if (pathname === '/sell-cars') setActiveTab('sell');
    else if (pathname === '/spare-parts') setActiveTab('parts');
  }, [pathname]);

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
      fuel: "Petrol",
      transmission: "Automatic",
      condition: "Certified Pre-Owned"
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
      fuel: "Hybrid",
      transmission: "Automatic",
      condition: "Like New"
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
      fuel: "Diesel",
      transmission: "Manual",
      condition: "Excellent"
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
      inStock: true,
      description: "High-performance ceramic brake pads for enhanced stopping power"
    },
    {
      id: 2,
      name: "Engine Oil Filter",
      price: 25,
      category: "Engine",
      image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=300&h=200&fit=crop",
      rating: 4.8,
      inStock: true,
      description: "Premium oil filter for optimal engine performance"
    },
    {
      id: 3,
      name: "Headlight Assembly",
      price: 150,
      category: "Lighting",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop",
      rating: 4.5,
      inStock: false,
      description: "LED headlight assembly for improved visibility"
    }
  ];

  // Real-time search filtering
  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      if (activeTab === 'buy') {
        const filtered = featuredCars.filter(car =>
          car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.fuel.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.transmission.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.condition.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCars(filtered);
      } else if (activeTab === 'parts') {
        const filtered = spareParts.filter(part =>
          part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          part.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          part.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredParts(filtered);
      }
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery, activeTab]);

  // Initialize filtered lists
  useEffect(() => {
    setFilteredCars(featuredCars);
    setFilteredParts(spareParts);
  }, []);

  // Handle scroll animations
  useEffect(() => {
    const sections = document.querySelectorAll('.animate-section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Toggle wishlist
  const toggleWishlist = (itemId) => {
    setWishlist(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Handle modal close
  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-section {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out;
        }
        .animate-in {
          animation: slideIn 0.6s ease-out forwards;
        }
        .modal-enter {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-12 sm:py-16 md:py-20 animate-section" aria-labelledby="hero-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 id="hero-heading" className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              Find Your Perfect Car
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-blue-200 mb-6 sm:mb-8 max-w-3xl mx-auto">
              Buy, sell, and find spare parts for your vehicle in one convenient marketplace
            </p>
            
            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-800 rounded-lg p-1 flex flex-wrap justify-center gap-2 sm:gap-4">
                <Link href="/buy-cars">
                  <button 
                    onClick={() => setActiveTab('buy')}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      activeTab === 'buy' || pathname === '/buy-cars'
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-300 hover:text-blue-400 hover:bg-gray-700/50'
                    }`}
                    aria-label="Buy cars tab"
                    aria-current={pathname === '/buy-cars' ? 'page' : undefined}
                  >
                    Buy Cars
                  </button>
                </Link>
                <Link href="/sell-cars">
                  <button 
                    onClick={() => setActiveTab('sell')}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      activeTab === 'sell' || pathname === '/sell-cars'
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-300 hover:text-blue-400 hover:bg-gray-700/50'
                    }`}
                    aria-label="Sell cars tab"
                    aria-current={pathname === '/sell-cars' ? 'page' : undefined}
                  >
                    Sell Cars
                  </button>
                </Link>
                <Link href="/spare-parts">
                  <button 
                    onClick={() => setActiveTab('parts')}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      activeTab === 'parts' || pathname === '/spare-parts'
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-300 hover:text-blue-400 hover:bg-gray-700/50'
                    }`}
                    aria-label="Spare parts tab"
                    aria-current={pathname === '/spare-parts' ? 'page' : undefined}
                  >
                    Spare Parts
                  </button>
                </Link>
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                <input
                  type="text"
                  placeholder={
                    activeTab === 'buy' ? 'Search for cars...' :
                    activeTab === 'sell' ? 'Enter your car details...' :
                    'Search for spare parts...'
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-28 py-3 sm:py-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  aria-label="Search input"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for View Details */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 modal-enter" role="dialog" aria-labelledby="modal-title">
          <div className="bg-white rounded-xl max-w-lg w-full mx-4 p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="w-full h-48 sm:h-64 object-cover rounded-lg mb-4"
            />
            <h2 id="modal-title" className="text-2xl font-bold text-gray-900 mb-4">{selectedItem.name}</h2>
            {selectedItem.mileage ? (
              <div className="space-y-2 text-gray-600">
                <p><strong>Price:</strong> ${selectedItem.price.toLocaleString()}</p>
                <p><strong>Year:</strong> {selectedItem.year}</p>
                <p><strong>Mileage:</strong> {selectedItem.mileage.toLocaleString()} miles</p>
                <p><strong>Fuel:</strong> {selectedItem.fuel}</p>
                <p><strong>Transmission:</strong> {selectedItem.transmission}</p>
                <p><strong>Condition:</strong> {selectedItem.condition}</p>
                <p><strong>Location:</strong> {selectedItem.location}</p>
                <p><strong>Rating:</strong> {selectedItem.rating} <Star className="inline h-4 w-4 text-yellow-400 fill-current" /></p>
              </div>
            ) : (
              <div className="space-y-2 text-gray-600">
                <p><strong>Price:</strong> ${selectedItem.price.toLocaleString()}</p>
                <p><strong>Category:</strong> {selectedItem.category}</p>
                <p><strong>Description:</strong> {selectedItem.description}</p>
                <p><strong>Rating:</strong> {selectedItem.rating} <Star className="inline h-4 w-4 text-yellow-400 fill-current" /></p>
                <p><strong>Stock:</strong> {selectedItem.inStock ? 'In Stock' : 'Out of Stock'}</p>
              </div>
            )}
            <div className="mt-6 flex gap-4">
              <button
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={closeModal}
                aria-label="Close details"
              >
                Close
              </button>
              <Link
                href={selectedItem.mileage ? `/cars/${selectedItem.id}` : `/parts/${selectedItem.id}`}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-center"
                aria-label="View full details"
              >
                View Full Details
              </Link>
              {selectedItem.mileage && (
                <button
                  className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  aria-label="Contact seller"
                >
                  Contact Seller
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Featured Cars Section */}
      {activeTab === 'buy' && (
        <section className="py-12 sm:py-16 bg-white animate-section" aria-labelledby="featured-cars-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12">
              <h2 id="featured-cars-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-0">Featured Cars</h2>
              <Link href="/buy-cars" className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" aria-label="View all cars">
                View All <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
            
            {isLoading ? (
              <div className="text-center text-gray-600">Loading...</div>
            ) : filteredCars.length === 0 ? (
              <div className="text-center text-gray-600">No cars found matching your search.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredCars.map((car) => (
                  <div
                    key={car.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift transition-all duration-300"
                    role="article"
                  >
                    <div className="relative">
                      {isLoading ? (
                        <div className="w-full h-48 sm:h-56 bg-gray-200 animate-pulse"></div>
                      ) : (
                        <img
                          src={car.image}
                          alt={car.name}
                          className="w-full h-48 sm:h-56 object-cover"
                          loading="lazy"
                          onLoad={() => setIsLoading(false)}
                        />
                      )}
                      <button
                        onClick={() => toggleWishlist(car.id)}
                        className={`absolute top-4 right-4 p-2 rounded-full hover:bg-gray-900/75 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          wishlist.includes(car.id) ? 'bg-red-600/75' : 'bg-gray-900/50'
                        }`}
                        aria-label={wishlist.includes(car.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                      >
                        <Heart className={`h-4 w-4 ${wishlist.includes(car.id) ? 'text-white fill-current' : 'text-white'}`} />
                      </button>
                    </div>
                    <div className="p-4 sm:p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{car.name}</h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" aria-hidden="true" />
                          <span className="text-sm text-gray-600 ml-1">{car.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2 text-sm sm:text-base">{car.year} • {car.mileage.toLocaleString()} miles • {car.fuel}</p>
                      <p className="text-gray-600 mb-4 text-sm sm:text-base">Transmission: {car.transmission} • {car.condition}</p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xl sm:text-2xl font-bold text-blue-600">${car.price.toLocaleString()}</span>
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin className="h-4 w-4 mr-1" aria-hidden="true" />
                          <span>{car.location}</span>
                        </div>
                      </div>
                      <Link
                        href={`/cars/${car.id}`}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-center"
                        aria-label={`View details for ${car.name}`}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Spare Parts Section */}
      {activeTab === 'parts' && (
        <section className="py-12 sm:py-16 bg-white animate-section" aria-labelledby="spare-parts-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12">
              <h2 id="spare-parts-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-0">Popular Spare Parts</h2>
              <Link href="/spare-parts" className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" aria-label="View all spare parts">
                View All <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
            
            {isLoading ? (
              <div className="text-center text-gray-600">Loading...</div>
            ) : filteredParts.length === 0 ? (
              <div className="text-center text-gray-600">No spare parts found matching your search.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredParts.map((part) => (
                  <div
                    key={part.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift transition-all duration-300"
                    role="article"
                  >
                    <div className="relative">
                      {isLoading ? (
                        <div className="w-full h-40 sm:h-48 bg-gray-200 animate-pulse"></div>
                      ) : (
                        <img
                          src={part.image}
                          alt={part.name}
                          className="w-full h-40 sm:h-48 object-cover"
                          loading="lazy"
                          onLoad={() => setIsLoading(false)}
                        />
                      )}
                      {!part.inStock && (
                        <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                          <span className="text-white font-semibold text-sm sm:text-base">Out of Stock</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 sm:p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{part.name}</h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" aria-hidden="true" />
                          <span className="text-sm text-gray-600 ml-1">{part.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2 text-sm sm:text-base">{part.category}</p>
                      <p className="text-gray-600 mb-4 text-sm sm:text-base">{part.description}</p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xl sm:text-2xl font-bold text-blue-600">${part.price.toLocaleString()}</span>
                        <span className={`text-sm px-2 py-1 rounded ${
                          part.inStock 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {part.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                      <Link
                        href={`/parts/${part.id}`}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-center"
                        aria-label={`View details for ${part.name}`}
                      >
                        View Details
                      </Link>
                      <button
                        className={`w-full mt-2 py-2 px-4 rounded-lg font-medium transition-colors duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          part.inStock 
                            ? 'bg-green-600 text-white hover:bg-green-700' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!part.inStock}
                        aria-label={part.inStock ? `Add ${part.name} to cart` : `Notify when ${part.name} is available`}
                      >
                        {part.inStock ? 'Add to Cart' : 'Notify When Available'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Sell Cars Section (Placeholder) */}
      {activeTab === 'sell' && (
        <section className="py-12 sm:py-16 bg-white animate-section" aria-labelledby="sell-cars-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 id="sell-cars-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Sell Your Car</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8">Get the best value for your vehicle with our professional appraisal service.</p>
              <Link
                href="/sell-cars"
                className="bg-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Start selling your car"
              >
                Start Selling
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      <section className="py-12 sm:py-16 bg-gray-50 animate-section" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="services-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12">Why Choose AutoHub?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center hover-lift transition-all duration-300" role="article">
              <div className="bg-blue-600 text-white w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-6 w-6 sm:h-8 sm:w-8" aria-hidden="true" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Quality Vehicles</h3>
              <p className="text-gray-600 text-sm sm:text-base">Every car is thoroughly inspected and verified for quality and authenticity</p>
            </div>
            <div className="text-center hover-lift transition-all duration-300" role="article">
              <div className="bg-blue-600 text-white w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="h-6 w-6 sm:h-8 sm:w-8" aria-hidden="true" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Genuine Parts</h3>
              <p className="text-gray-600 text-sm sm:text-base">Original spare parts from trusted manufacturers with warranty</p>
            </div>
            <div className="text-center hover-lift transition-all duration-300" role="article">
              <div className="bg-blue-600 text-white w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 sm:h-8 sm:w-8" aria-hidden="true" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Expert Support</h3>
              <p className="text-gray-600 text-sm sm:text-base">24/7 customer support to help you find exactly what you need</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-600 p-1.5 sm:p-2 rounded-lg">
                  <Car className="h-5 w-5 sm:h-6 sm:w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">AutoHub</h3>
              </div>
              <p className="text-blue-200 text-sm sm:text-base">Your trusted marketplace for buying, selling, and finding spare parts for vehicles.</p>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2 text-blue-200 text-sm sm:text-base" role="navigation">
                <li><Link href="/buy-cars" className="hover:text-white transition-colors duration-300" aria-current={pathname === '/buy-cars' ? 'page' : undefined}>Buy Cars</Link></li>
                <li><Link href="/sell-cars" className="hover:text-white transition-colors duration-300" aria-current={pathname === '/sell-cars' ? 'page' : undefined}>Sell Cars</Link></li>
                <li><Link href="/spare-parts" className="hover:text-white transition-colors duration-300" aria-current={pathname === '/spare-parts' ? 'page' : undefined}>Spare Parts</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors duration-300" aria-current={pathname === '/about' ? 'page' : undefined}>About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4 text-white">Categories</h4>
              <ul className="space-y-2 text-blue-200 text-sm sm:text-base" role="navigation">
                <li><Link href="/categories/suvs" className="hover:text-white transition-colors duration-300">SUVs</Link></li>
                <li><Link href="/categories/sedans" className="hover:text-white transition-colors duration-300">Sedans</Link></li>
                <li><Link href="/categories/trucks" className="hover:text-white transition-colors duration-300">Trucks</Link></li>
                <li><Link href="/categories/electric" className="hover:text-white transition-colors duration-300">Electric</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4 text-white">Contact</h4>
              <div className="space-y-2 text-blue-200 text-sm sm:text-base">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
                  <span>info@autohub.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" aria-hidden="true" />
                  <span>123 Auto Street, Car City</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-blue-200 text-sm">
            <p>© 2025 AutoHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CarMarketplace;
