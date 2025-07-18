
"use client"
import React, { useState, useEffect } from 'react';
import { Search, Wrench, Star, MapPin, Heart, X, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Service = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    type: '',
    priceMin: '',
    priceMax: '',
    location: ''
  });
  const [sortOption, setSortOption] = useState('default');
  const servicesPerPage = 6;
  const pathname = usePathname();

  const services = [
    {
      id: 1,
      name: "Oil Change",
      type: "Maintenance",
      provider: "AutoCare",
      price: 40,
      rating: 4.7,
      location: "New York",
      duration: "30 mins",
      image: "https://images.pexels.com/photos/13065697/pexels-photo-13065697.jpeg?_gl=1*1dp7327*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTI4NjA2MTQkbzMxJGcxJHQxNzUyODYwNjI1JGo0OSRsMCRoMA.."
    },
    {
      id: 2,
      name: "Tire Rotation",
      type: "Tire Service",
      provider: "TirePro",
      price: 25,
      rating: 4.5,
      location: "California",
      duration: "20 mins",
      image: "https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?_gl=1*79gmbw*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTI4NjA2MTQkbzMxJGcxJHQxNzUyODYwNzI0JGozMCRsMCRoMA.."
    },
    {
      id: 3,
      name: "Brake Repair",
      type: "Brakes",
      provider: "BrakeMasters",
      price: 120,
      rating: 4.8,
      location: "Texas",
      duration: "1 hr",
      image: "https://images.pexels.com/photos/30470930/pexels-photo-30470930.jpeg?_gl=1*1r5q2n8*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTI4NjA2MTQkbzMxJGcxJHQxNzUyODYwNzkwJGo0MyRsMCRoMA.."
    },
    {
      id: 4,
      name: "Wheel Alignment",
      type: "Tire Service",
      provider: "AlignRight",
      price: 60,
      rating: 4.6,
      location: "Florida",
      duration: "45 mins",
      image: "https://images.pexels.com/photos/33030931/pexels-photo-33030931.jpeg?_gl=1*i6vtms*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTI4NjA2MTQkbzMxJGcxJHQxNzUyODYwOTQ1JGo1OSRsMCRoMA.."
    },
    {
      id: 5,
      name: "Battery Replacement",
      type: "Electrical",
      provider: "PowerFix",
      price: 100,
      rating: 4.9,
      location: "Chicago",
      duration: "30 mins",
      image: "https://images.pexels.com/photos/4489765/pexels-photo-4489765.jpeg?_gl=1*c1fwm4*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTI4NjA2MTQkbzMxJGcxJHQxNzUyODYxMDA3JGo1OSRsMCRoMA.."
    },
    {
      id: 6,
      name: "AC Repair",
      type: "Cooling",
      provider: "CoolTech",
      price: 150,
      rating: 4.4,
      location: "Seattle",
      duration: "1.5 hrs",
      image: "https://images.pexels.com/photos/1409999/pexels-photo-1409999.jpeg?_gl=1*9hhn63*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTI4NjA2MTQkbzMxJGcxJHQxNzUyODYxMTMxJGoxNCRsMCRoMA.."
    },
    {
      id: 7,
      name: "Transmission Service",
      type: "Transmission",
      provider: "GearShift",
      price: 200,
      rating: 4.7,
      location: "Miami",
      duration: "2 hrs",
      image: "https://images.unsplash.com/photo-1605552815524-ed2f786a0bd6?w=400&h=250&fit=crop"
    },
    {
      id: 8,
      name: "Suspension Repair",
      type: "Suspension",
      provider: "RideSmooth",
      price: 180,
      rating: 4.8,
      location: "Boston",
      duration: "1.5 hrs",
      image: "https://images.unsplash.com/photo-1593949447042-6b1d1e2c0e1e?w=400&h=250&fit=crop"
    },
    {
      id: 9,
      name: "Engine Diagnostic",
      type: "Diagnostics",
      provider: "AutoScan",
      price: 80,
      rating: 4.6,
      location: "Denver",
      duration: "45 mins",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=250&fit=crop"
    },
    {
      id: 10,
      name: "Timing Belt Replacement",
      type: "Engine",
      provider: "AutoCare",
      price: 250,
      rating: 4.9,
      location: "Phoenix",
      duration: "3 hrs",
      image: "https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?_gl=1*1yble5d*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTI4NjA2MTQkbzMxJGcxJHQxNzUyODYxMjU4JGoxMCRsMCRoMA.."
    },
    {
      id: 11,
      name: "Brake Fluid Flush",
      type: "Brakes",
      provider: "BrakeMasters",
      price: 70,
      rating: 4.5,
      location: "Atlanta",
      duration: "1 hr",
      image: "https://images.pexels.com/photos/9607353/pexels-photo-9607353.jpeg?_gl=1*n5bbun*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTI4NjA2MTQkbzMxJGcxJHQxNzUyODYxMzY3JGozMCRsMCRoMA.."
    },
    {
      id: 12,
      name: "Coolant System Service",
      type: "Cooling",
      provider: "CoolTech",
      price: 90,
      rating: 4.7,
      location: "Dallas",
      duration: "1 hr",
      image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=250&fit=crop"
    }
  ];

  // Real-time search and filtering
  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      let filtered = services.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.location.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (filters.type) filtered = filtered.filter(service => service.type.toLowerCase() === filters.type.toLowerCase());
      if (filters.priceMin) filtered = filtered.filter(service => service.price >= parseInt(filters.priceMin));
      if (filters.priceMax) filtered = filtered.filter(service => service.price <= parseInt(filters.priceMax));
      if (filters.location) filtered = filtered.filter(service => service.location.toLowerCase() === filters.location.toLowerCase());

      if (sortOption === 'price-asc') filtered.sort((a, b) => a.price - b.price);
      if (sortOption === 'price-desc') filtered.sort((a, b) => b.price - b.price);
      if (sortOption === 'rating-desc') filtered.sort((a, b) => b.rating - a.rating);

      setFilteredServices(filtered);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery, filters, sortOption]);

  // Initialize filtered list
  useEffect(() => {
    setFilteredServices(services);
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
  const toggleWishlist = (serviceId) => {
    setWishlist(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  // Handle modal close
  const closeModal = () => {
    setSelectedService(null);
  };

  // Handle contact provider
  const handleContactProvider = (service) => {
    console.log(`Contacting provider for ${service.name} by ${service.provider}`);
    alert(`Contacting ${service.provider} for ${service.name}. You'll be notified soon!`);
  };

  // Handle pagination
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);
  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * servicesPerPage,
    currentPage * servicesPerPage
  );

  // Filter options
  const types = [...new Set(services.map(service => service.type))];
  const locations = [...new Set(services.map(service => service.location))];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <style jsx global>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleHover {
          from { transform: scale(1); }
          to { transform: scale(1.05); }
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
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
          animation: scaleHover 0.3s ease;
        }
        .bg-hero {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(59, 130, 246, 0.3)), url('https://images.unsplash.com/photo-1517524008697-4bbe05c9b2a2?w=1920&h=1080&fit=crop');
          background-size: cover;
          background-position: center;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative bg-hero py-16 sm:py-24 md:py-32 animate-section" aria-labelledby="service-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 id="service-heading" className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Find Automotive Services
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Discover professional automotive services tailored to your needs
            </p>
            <div className="max-w-3xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Search services by name, provider, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 sm:py-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  aria-label="Search services"
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Filter by service type"
              >
                <option value="">All Types</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Min Price"
                value={filters.priceMin}
                onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Minimum price filter"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={filters.priceMax}
                onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Maximum price filter"
              />
              <select
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Filter by location"
              >
                <option value="">All Locations</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-center animate-section">
              <img
                src="https://images.pexels.com/photos/13065689/pexels-photo-13065689.jpeg?_gl=1*1cxxxoy*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTI4NjA2MTQkbzMxJGcxJHQxNzUyODYxNTc0JGozNCRsMCRoMA.."
                alt="Car being serviced"
                className="max-w-xs sm:max-w-sm md:max-w-md rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Quick View */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 modal-enter" role="dialog" aria-labelledby="modal-title">
          <div className="bg-gray-800 rounded-xl max-w-lg w-full mx-4 p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
            <img
              src={selectedService.image}
              alt={selectedService.name}
              className="w-full h-48 sm:h-64 object-cover rounded-lg mb-4"
            />
            <h2 id="modal-title" className="text-2xl font-bold text-white mb-4">{selectedService.name}</h2>
            <div className="space-y-2 text-gray-300">
              <p><strong>Type:</strong> {selectedService.type}</p>
              <p><strong>Provider:</strong> {selectedService.provider}</p>
              <p><strong>Price:</strong> ${selectedService.price.toLocaleString()}</p>
              <p><strong>Duration:</strong> {selectedService.duration}</p>
              <p><strong>Location:</strong> {selectedService.location}</p>
              <p><strong>Rating:</strong> {selectedService.rating} <Star className="inline h-4 w-4 text-yellow-400 fill-current" /></p>
            </div>
            <div className="mt-6 flex gap-4">
              <button
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={closeModal}
                aria-label="Close quick view"
              >
                Close
              </button>
              <Link
                href={`/services/${selectedService.id}`}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-center"
                aria-label={`View full details for ${selectedService.name}`}
              >
                View Full Details
              </Link>
              <button
                onClick={() => handleContactProvider(selectedService)}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                aria-label={`Contact provider for ${selectedService.name}`}
              >
                <MessageSquare className="inline h-4 w-4 mr-2" /> Contact Provider
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Services Section */}
      <section className="py-12 sm:py-16 bg-gray-900 animate-section" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12">
            <h2 id="services-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-0">
              Available Services
            </h2>
            <div className="flex items-center gap-4">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Sort services"
              >
                <option value="default">Sort By: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Rating: High to Low</option>
              </select>
            </div>
          </div>
          {isLoading ? (
            <div className="text-center text-gray-400">Loading...</div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center text-gray-400">No services found matching your criteria.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {paginatedServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover-lift transition-all duration-300"
                  role="article"
                >
                  <div className="relative">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-48 sm:h-56 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                      {service.type}
                    </div>
                    <button
                      onClick={() => toggleWishlist(service.id)}
                      className={`absolute top-4 right-4 p-2 rounded-full hover:bg-gray-900/75 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        wishlist.includes(service.id) ? 'bg-red-600/75' : 'bg-gray-900/50'
                      }`}
                      aria-label={wishlist.includes(service.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart className={`h-4 w-4 ${wishlist.includes(service.id) ? 'text-white fill-current' : 'text-white'}`} />
                    </button>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg sm:text-xl font-semibold text-white">{service.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" aria-hidden="true" />
                        <span className="text-sm text-gray-400 ml-1">{service.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 mb-2 text-sm sm:text-base">Provider: {service.provider}</p>
                    <p className="text-gray-400 mb-2 text-sm sm:text-base">Type: {service.type}</p>
                    <p className="text-gray-400 mb-4 text-sm sm:text-base">Duration: {service.duration}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl sm:text-2xl font-bold text-blue-400">${service.price.toLocaleString()}</span>
                      <div className="flex items-center text-gray-400 text-sm">
                        <MapPin className="h-4 w-4 mr-1" aria-hidden="true" />
                        <span>{service.location}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedService(service)}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        aria-label={`Quick view for ${service.name}`}
                      >
                        Quick View
                      </button>
                      <Link
                        href={`/services/${service.id}`}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-center"
                        aria-label={`View full details for ${service.name}`}
                      >
                        Full Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  aria-label={`Go to page ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

     
    </div>
  );
};

export default Service;
