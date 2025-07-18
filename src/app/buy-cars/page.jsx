
"use client"
import React, { useState, useEffect } from 'react';
import { Search, Car, Star, MapPin, Heart, X, Filter } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BuyCars = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    brand: '',
    priceMin: '',
    priceMax: '',
    fuel: '',
    transmission: '',
    condition: '',
    mileageMax: ''
  });
  const [sortOption, setSortOption] = useState('default');
  const [compareList, setCompareList] = useState([]);
  const carsPerPage = 6;
  const pathname = usePathname();

  const cars = [
    {
      id: 1,
      name: "BMW 3 Series",
      brand: "BMW",
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
      brand: "Mercedes",
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
      brand: "Audi",
      year: 2021,
      price: 38000,
      mileage: 25000,
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop",
      rating: 4.7,
      location: "Texas",
      fuel: "Diesel",
      transmission: "Manual",
      condition: "Excellent"
    },
    {
      id: 4,
      name: "Tesla Model 3",
      brand: "Tesla",
      year: 2023,
      price: 48000,
      mileage: 15000,
      image: "https://images.unsplash.com/photo-1560363199-09a6e38e88d6?w=400&h=250&fit=crop",
      rating: 4.9,
      location: "Florida",
      fuel: "Electric",
      transmission: "Automatic",
      condition: "Like New"
    },
    {
      id: 5,
      name: "Toyota Camry",
      brand: "Toyota",
      year: 2022,
      price: 32000,
      mileage: 20000,
      image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=250&fit=crop",
      rating: 4.6,
      location: "Chicago",
      fuel: "Petrol",
      transmission: "Automatic",
      condition: "Excellent"
    },
    {
      id: 6,
      name: "Honda Accord",
      brand: "Honda",
      year: 2021,
      price: 30000,
      mileage: 28000,
      image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=400&h=250&fit=crop",
      rating: 4.5,
      location: "Seattle",
      fuel: "Hybrid",
      transmission: "Automatic",
      condition: "Good"
    }
  ];

  // Real-time search and filtering
  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      let filtered = cars.filter(car =>
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.fuel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.transmission.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.condition.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (filters.brand) filtered = filtered.filter(car => car.brand.toLowerCase() === filters.brand.toLowerCase());
      if (filters.priceMin) filtered = filtered.filter(car => car.price >= parseInt(filters.priceMin));
      if (filters.priceMax) filtered = filtered.filter(car => car.price <= parseInt(filters.priceMax));
      if (filters.fuel) filtered = filtered.filter(car => car.fuel.toLowerCase() === filters.fuel.toLowerCase());
      if (filters.transmission) filtered = filtered.filter(car => car.transmission.toLowerCase() === filters.transmission.toLowerCase());
      if (filters.condition) filtered = filtered.filter(car => car.condition.toLowerCase() === filters.condition.toLowerCase());
      if (filters.mileageMax) filtered = filtered.filter(car => car.mileage <= parseInt(filters.mileageMax));

      if (sortOption === 'price-asc') filtered.sort((a, b) => a.price - b.price);
      if (sortOption === 'price-desc') filtered.sort((a, b) => b.price - a.price);
      if (sortOption === 'year-desc') filtered.sort((a, b) => b.year - a.year);
      if (sortOption === 'mileage-asc') filtered.sort((a, b) => a.mileage - b.mileage);
      if (sortOption === 'rating-desc') filtered.sort((a, b) => b.rating - a.rating);

      setFilteredCars(filtered);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery, filters, sortOption]);

  // Initialize filtered list
  useEffect(() => {
    setFilteredCars(cars);
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
  const toggleWishlist = (carId) => {
    setWishlist(prev =>
      prev.includes(carId)
        ? prev.filter(id => id !== carId)
        : [...prev, carId]
    );
  };

  // Toggle compare
  const toggleCompare = (carId) => {
    setCompareList(prev =>
      prev.includes(carId)
        ? prev.filter(id => id !== carId)
        : prev.length < 3 ? [...prev, carId] : prev
    );
  };

  // Handle modal close
  const closeModal = () => {
    setSelectedCar(null);
  };

  // Handle pagination
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * carsPerPage,
    currentPage * carsPerPage
  );

  // Filter options
  const brands = [...new Set(cars.map(car => car.brand))];
  const fuelTypes = [...new Set(cars.map(car => car.fuel))];
  const transmissions = [...new Set(cars.map(car => car.transmission))];
  const conditions = [...new Set(cars.map(car => car.condition))];

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
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        }
        .bg-hero {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(59, 130, 246, 0.3)), url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop');
          background-size: cover;
          background-position: center;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative bg-hero py-16 sm:py-24 md:py-32 animate-section" aria-labelledby="buy-cars-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 id="buy-cars-heading" className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Discover Your Dream Car
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Browse our premium selection of vehicles with advanced filters and real-time search
            </p>
            <div className="max-w-3xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Search cars by brand, model, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 sm:py-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  aria-label="Search cars"
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <select
                value={filters.brand}
                onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Filter by brand"
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Min Price"
                value={filters.priceMin}
                onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Minimum price filter"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={filters.priceMax}
                onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Maximum price filter"
              />
              <select
                value={filters.fuel}
                onChange={(e) => setFilters({ ...filters, fuel: e.target.value })}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Filter by fuel type"
              >
                <option value="">All Fuel Types</option>
                {fuelTypes.map(fuel => (
                  <option key={fuel} value={fuel}>{fuel}</option>
                ))}
              </select>
              <select
                value={filters.transmission}
                onChange={(e) => setFilters({ ...filters, transmission: e.target.value })}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Filter by transmission"
              >
                <option value="">All Transmissions</option>
                {transmissions.map(trans => (
                  <option key={trans} value={trans}>{trans}</option>
                ))}
              </select>
              <select
                value={filters.condition}
                onChange={(e) => setFilters({ ...filters, condition: e.target.value })}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Filter by condition"
              >
                <option value="">All Conditions</option>
                {conditions.map(cond => (
                  <option key={cond} value={cond}>{cond}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Max Mileage"
                value={filters.mileageMax}
                onChange={(e) => setFilters({ ...filters, mileageMax: e.target.value })}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Maximum mileage filter"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Quick View */}
      {selectedCar && (
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
              src={selectedCar.image}
              alt={selectedCar.name}
              className="w-full h-48 sm:h-64 object-cover rounded-lg mb-4"
            />
            <h2 id="modal-title" className="text-2xl font-bold text-white mb-4">{selectedCar.name}</h2>
            <div className="space-y-2 text-gray-300">
              <p><strong>Price:</strong> ${selectedCar.price.toLocaleString()}</p>
              <p><strong>Brand:</strong> {selectedCar.brand}</p>
              <p><strong>Year:</strong> {selectedCar.year}</p>
              <p><strong>Mileage:</strong> {selectedCar.mileage.toLocaleString()} miles</p>
              <p><strong>Fuel:</strong> {selectedCar.fuel}</p>
              <p><strong>Transmission:</strong> {selectedCar.transmission}</p>
              <p><strong>Condition:</strong> {selectedCar.condition}</p>
              <p><strong>Location:</strong> {selectedCar.location}</p>
              <p><strong>Rating:</strong> {selectedCar.rating} <Star className="inline h-4 w-4 text-yellow-400 fill-current" /></p>
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
                href={`/cars/${selectedCar.id}`}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-center"
                aria-label={`View full details for ${selectedCar.name}`}
              >
                View Full Details
              </Link>
              <button
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                aria-label="Contact seller"
              >
                Contact Seller
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cars Section */}
      <section className="py-12 sm:py-16 bg-gray-900 animate-section" aria-labelledby="cars-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12">
            <h2 id="cars-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-0">
              Available Cars
            </h2>
            <div className="flex items-center gap-4">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Sort cars"
              >
                <option value="default">Sort By: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="year-desc">Year: Newest First</option>
                <option value="mileage-asc">Mileage: Low to High</option>
                <option value="rating-desc">Rating: High to Low</option>
              </select>
              <button
                onClick={() => compareList.length >= 2 && alert('Compare feature coming soon!')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  compareList.length >= 2
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
                disabled={compareList.length < 2}
                aria-label="Compare selected cars"
              >
                Compare ({compareList.length}/3)
              </button>
            </div>
          </div>
          {isLoading ? (
            <div className="text-center text-gray-400">Loading...</div>
          ) : filteredCars.length === 0 ? (
            <div className="text-center text-gray-400">No cars found matching your criteria.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {paginatedCars.map((car) => (
                <div
                  key={car.id}
                  className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover-lift transition-all duration-300"
                  role="article"
                >
                  <div className="relative">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-48 sm:h-56 object-cover"
                      loading="lazy"
                    />
                    <button
                      onClick={() => toggleWishlist(car.id)}
                      className={`absolute top-4 right-4 p-2 rounded-full hover:bg-gray-900/75 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        wishlist.includes(car.id) ? 'bg-red-600/75' : 'bg-gray-900/50'
                      }`}
                      aria-label={wishlist.includes(car.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart className={`h-4 w-4 ${wishlist.includes(car.id) ? 'text-white fill-current' : 'text-white'}`} />
                    </button>
                    <button
                      onClick={() => toggleCompare(car.id)}
                      className={`absolute top-4 right-14 p-2 rounded-full hover:bg-gray-900/75 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        compareList.includes(car.id) ? 'bg-blue-600/75' : 'bg-gray-900/50'
                      }`}
                      aria-label={compareList.includes(car.id) ? 'Remove from compare' : 'Add to compare'}
                      disabled={compareList.length >= 3 && !compareList.includes(car.id)}
                    >
                      <Filter className="h-4 w-4 text-white" />
                    </button>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg sm:text-xl font-semibold text-white">{car.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" aria-hidden="true" />
                        <span className="text-sm text-gray-400 ml-1">{car.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 mb-2 text-sm sm:text-base">{car.brand} • {car.year} • {car.fuel}</p>
                    <p className="text-gray-400 mb-2 text-sm sm:text-base">Transmission: {car.transmission} • {car.condition}</p>
                    <p className="text-gray-400 mb-4 text-sm sm:text-base">Mileage: {car.mileage.toLocaleString()} miles</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl sm:text-2xl font-bold text-blue-400">${car.price.toLocaleString()}</span>
                      <div className="flex items-center text-gray-400 text-sm">
                        <MapPin className="h-4 w-4 mr-1" aria-hidden="true" />
                        <span>{car.location}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedCar(car)}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        aria-label={`Quick view for ${car.name}`}
                      >
                        Quick View
                      </button>
                      <Link
                        href={`/cars/${car.id}`}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-center"
                        aria-label={`View full details for ${car.name}`}
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

export default BuyCars;
