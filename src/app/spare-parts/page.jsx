
"use client"
import React, { useState, useEffect } from 'react';
import { Search, Package, Star, MapPin, Heart, X, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SpareParts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredParts, setFilteredParts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    priceMin: '',
    priceMax: '',
    condition: '',
    compatibility: ''
  });
  const [sortOption, setSortOption] = useState('default');
  const partsPerPage = 6;
  const pathname = usePathname();

  const parts = [
    {
      id: 1,
      name: "Brake Pads",
      category: "Brakes",
      brand: "Bosch",
      partNumber: "BP1234",
      price: 50,
      rating: 4.8,
      condition: "New",
      location: "New York",
      compatibility: ["BMW 3 Series", "Audi A4"],
      warranty: "2 years",
      listedDate: "2025-07-10",
      image: "https://images.unsplash.com/photo-1622209233601-c02e01a4e9d0?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      name: "Oil Filter",
      category: "Filters",
      brand: "Mann",
      partNumber: "OF5678",
      price: 15,
      rating: 4.5,
      condition: "New",
      location: "California",
      compatibility: ["Toyota Camry", "Honda Accord"],
      warranty: "1 year",
      listedDate: "2025-07-12",
      image: "https://images.unsplash.com/photo-1581091012184-6e2b298e7b2f?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      name: "Spark Plugs",
      category: "Engine",
      brand: "NGK",
      partNumber: "SP9012",
      price: 25,
      rating: 4.7,
      condition: "New",
      location: "Texas",
      compatibility: ["Mercedes C-Class", "Tesla Model 3"],
      warranty: "18 months",
      listedDate: "2025-07-08",
      image: "https://images.unsplash.com/photo-1605552815524-ed2f786a0bd6?w=400&h=250&fit=crop"
    },
    {
      id: 4,
      name: "Air Filter",
      category: "Filters",
      brand: "K&N",
      partNumber: "AF3456",
      price: 30,
      rating: 4.9,
      condition: "New",
      location: "Florida",
      compatibility: ["BMW 3 Series", "Toyota Camry"],
      warranty: "1 year",
      listedDate: "2025-07-15",
      image: "https://images.unsplash.com/photo-1593949447042-6b1d1e2c0e1e?w=400&h=250&fit=crop"
    },
    {
      id: 5,
      name: "Alternator",
      category: "Electrical",
      brand: "Denso",
      partNumber: "AL7890",
      price: 150,
      rating: 4.6,
      condition: "Refurbished",
      location: "Chicago",
      compatibility: ["Honda Accord", "Audi A4"],
      warranty: "6 months",
      listedDate: "2025-07-05",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=250&fit=crop"
    },
    {
      id: 6,
      name: "Radiator",
      category: "Cooling",
      brand: "Valeo",
      partNumber: "RD2345",
      price: 120,
      rating: 4.4,
      condition: "New",
      location: "Seattle",
      compatibility: ["Tesla Model 3", "Mercedes C-Class"],
      warranty: "2 years",
      listedDate: "2025-07-14",
      image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=250&fit=crop"
    },
    {
      id: 7,
      name: "Shock Absorber",
      category: "Suspension",
      brand: "Monroe",
      partNumber: "SA4567",
      price: 80,
      rating: 4.7,
      condition: "New",
      location: "Miami",
      compatibility: ["BMW 3 Series", "Audi A4"],
      warranty: "2 years",
      listedDate: "2025-07-11",
      image: "https://images.unsplash.com/photo-1605552815524-ed2f786a0bd6?w=400&h=250&fit=crop"
    },
    {
      id: 8,
      name: "Clutch Kit",
      category: "Transmission",
      brand: "Sachs",
      partNumber: "CK8901",
      price: 200,
      rating: 4.8,
      condition: "New",
      location: "Boston",
      compatibility: ["Toyota Camry", "Honda Accord"],
      warranty: "1 year",
      listedDate: "2025-07-09",
      image: "https://images.unsplash.com/photo-1593949447042-6b1d1e2c0e1e?w=400&h=250&fit=crop"
    },
    {
      id: 9,
      name: "Battery",
      category: "Electrical",
      brand: "Optima",
      partNumber: "BT3456",
      price: 180,
      rating: 4.9,
      condition: "New",
      location: "Denver",
      compatibility: ["Tesla Model 3", "Mercedes C-Class"],
      warranty: "3 years",
      listedDate: "2025-07-13",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=250&fit=crop"
    },
    {
      id: 10,
      name: "Timing Belt",
      category: "Engine",
      brand: "Gates",
      partNumber: "TB1234",
      price: 60,
      rating: 4.6,
      condition: "New",
      location: "Phoenix",
      compatibility: ["Honda Accord", "Toyota Camry"],
      warranty: "1 year",
      listedDate: "2025-07-07",
      image: "https://images.unsplash.com/photo-1622209233601-c02e01a4e9d0?w=400&h=250&fit=crop"
    },
    {
      id: 11,
      name: "Water Pump",
      category: "Cooling",
      brand: "Aisin",
      partNumber: "WP5678",
      price: 90,
      rating: 4.5,
      condition: "New",
      location: "Atlanta",
      compatibility: ["BMW 3 Series", "Audi A4"],
      warranty: "18 months",
      listedDate: "2025-07-06",
      image: "https://images.unsplash.com/photo-1581091012184-6e2b298e7b2f?w=400&h=250&fit=crop"
    },
    {
      id: 12,
      name: "Control Arm",
      category: "Suspension",
      brand: "Moog",
      partNumber: "CA9012",
      price: 110,
      rating: 4.7,
      condition: "New",
      location: "Dallas",
      compatibility: ["Mercedes C-Class", "Tesla Model 3"],
      warranty: "2 years",
      listedDate: "2025-07-16",
      image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=250&fit=crop"
    }
  ];

  // Real-time search and filtering
  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      let filtered = parts.filter(part =>
        part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.compatibility.some(car => car.toLowerCase().includes(searchQuery.toLowerCase()))
      );

      if (filters.category) filtered = filtered.filter(part => part.category.toLowerCase() === filters.category.toLowerCase());
      if (filters.brand) filtered = filtered.filter(part => part.brand.toLowerCase() === filters.brand.toLowerCase());
      if (filters.priceMin) filtered = filtered.filter(part => part.price >= parseInt(filters.priceMin));
      if (filters.priceMax) filtered = filtered.filter(part => part.price <= parseInt(filters.priceMax));
      if (filters.condition) filtered = filtered.filter(part => part.condition.toLowerCase() === filters.condition.toLowerCase());
      if (filters.compatibility) filtered = filtered.filter(part => part.compatibility.includes(filters.compatibility));

      if (sortOption === 'price-asc') filtered.sort((a, b) => a.price - b.price);
      if (sortOption === 'price-desc') filtered.sort((a, b) => b.price - a.price);
      if (sortOption === 'rating-desc') filtered.sort((a, b) => b.rating - a.rating);
      if (sortOption === 'newest-first') filtered.sort((a, b) => new Date(b.listedDate) - new Date(a.listedDate));

      setFilteredParts(filtered);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery, filters, sortOption]);

  // Initialize filtered list
  useEffect(() => {
    setFilteredParts(parts);
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
  const toggleWishlist = (partId) => {
    setWishlist(prev =>
      prev.includes(partId)
        ? prev.filter(id => id !== partId)
        : [...prev, partId]
    );
  };

  // Handle modal close
  const closeModal = () => {
    setSelectedPart(null);
  };

  // Handle contact seller
  const handleContactSeller = (part) => {
    console.log(`Contacting seller for ${part.name} (Part No: ${part.partNumber})`);
    alert(`Contacting seller for ${part.name}. You'll be notified soon!`);
  };

  // Handle pagination
  const totalPages = Math.ceil(filteredParts.length / partsPerPage);
  const paginatedParts = filteredParts.slice(
    (currentPage - 1) * partsPerPage,
    currentPage * partsPerPage
  );

  // Filter options
  const categories = [...new Set(parts.map(part => part.category))];
  const brands = [...new Set(parts.map(part => part.brand))];
  const conditions = [...new Set(parts.map(part => part.condition))];
  const compatibilities = [...new Set(parts.flatMap(part => part.compatibility))];

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
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(59, 130, 246, 0.3)), url('https://images.unsplash.com/photo-1517508735682-3e76716b6c83?w=1920&h=1080&fit=crop');
          background-size: cover;
          background-position: center;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative bg-hero py-16 sm:py-24 md:py-32 animate-section" aria-labelledby="spare-parts-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 id="spare-parts-heading" className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Find Spare Parts
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Discover high-quality spare parts for your vehicle with advanced search and compatibility filters
            </p>
            <div className="max-w-3xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Search parts by name, brand, category, or part number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 sm:py-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  aria-label="Search spare parts"
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Filter by category"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={filters.brand}
                onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                value={filters.condition}
                onChange={(e) => setFilters({ ...filters, condition: e.target.value })}
                className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Filter by condition"
              >
                <option value="">All Conditions</option>
                {conditions.map(cond => (
                  <option key={cond} value={cond}>{cond}</option>
                ))}
              </select>
              <select
                value={filters.compatibility}
                onChange={(e) => setFilters({ ...filters, compatibility: e.target.value })}
                className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Filter by compatibility"
              >
                <option value="">All Models</option>
                {compatibilities.map(car => (
                  <option key={car} value={car}>{car}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-center animate-section">
              <img
                src="https://images.unsplash.com/photo-1622209233601-c02e01a4e9d0?w=600&h=400&fit=crop"
                alt="Car brake disc"
                className="max-w-xs sm:max-w-sm md:max-w-md rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Quick View */}
      {selectedPart && (
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
              src={selectedPart.image}
              alt={selectedPart.name}
              className="w-full h-48 sm:h-64 object-cover rounded-lg mb-4"
            />
            <h2 id="modal-title" className="text-2xl font-bold text-white mb-4">{selectedPart.name}</h2>
            <div className="space-y-2 text-gray-300">
              <p><strong>Part Number:</strong> {selectedPart.partNumber}</p>
              <p><strong>Category:</strong> {selectedPart.category}</p>
              <p><strong>Brand:</strong> {selectedPart.brand}</p>
              <p><strong>Price:</strong> ${selectedPart.price.toLocaleString()}</p>
              <p><strong>Condition:</strong> {selectedPart.condition}</p>
              <p><strong>Warranty:</strong> {selectedPart.warranty}</p>
              <p><strong>Compatibility:</strong> {selectedPart.compatibility.join(", ")}</p>
              <p><strong>Location:</strong> {selectedPart.location}</p>
              <p><strong>Rating:</strong> {selectedPart.rating} <Star className="inline h-4 w-4 text-yellow-400 fill-current" /></p>
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
                href={`/parts/${selectedPart.id}`}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-center"
                aria-label={`View full details for ${selectedPart.name}`}
              >
                View Full Details
              </Link>
              <button
                onClick={() => handleContactSeller(selectedPart)}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                aria-label={`Contact seller for ${selectedPart.name}`}
              >
                <MessageSquare className="inline h-4 w-4 mr-2" /> Contact Seller
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Parts Section */}
      <section className="py-12 sm:py-16 bg-gray-900 animate-section" aria-labelledby="parts-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12">
            <h2 id="parts-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-0">
              Available Spare Parts
            </h2>
            <div className="flex items-center gap-4">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Sort parts"
              >
                <option value="default">Sort By: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Rating: High to Low</option>
                <option value="newest-first">Newest First</option>
              </select>
            </div>
          </div>
          {isLoading ? (
            <div className="text-center text-gray-400">Loading...</div>
          ) : filteredParts.length === 0 ? (
            <div className="text-center text-gray-400">No parts found matching your criteria.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {paginatedParts.map((part) => (
                <div
                  key={part.id}
                  className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover-lift transition-all duration-300"
                  role="article"
                >
                  <div className="relative">
                    <img
                      src={part.image}
                      alt={part.name}
                      className="w-full h-48 sm:h-56 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                      {part.category}
                    </div>
                    <button
                      onClick={() => toggleWishlist(part.id)}
                      className={`absolute top-4 right-4 p-2 rounded-full hover:bg-gray-900/75 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        wishlist.includes(part.id) ? 'bg-red-600/75' : 'bg-gray-900/50'
                      }`}
                      aria-label={wishlist.includes(part.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart className={`h-4 w-4 ${wishlist.includes(part.id) ? 'text-white fill-current' : 'text-white'}`} />
                    </button>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg sm:text-xl font-semibold text-white">{part.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" aria-hidden="true" />
                        <span className="text-sm text-gray-400 ml-1">{part.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 mb-2 text-sm sm:text-base">Part No: {part.partNumber}</p>
                    <p className="text-gray-400 mb-2 text-sm sm:text-base">{part.brand} • {part.condition}</p>
                    <p className="text-gray-400 mb-2 text-sm sm:text-base">Warranty: {part.warranty}</p>
                    <p className="text-gray-400 mb-4 text-sm sm:text-base">Fits: {part.compatibility.join(", ")}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl sm:text-2xl font-bold text-blue-400">${part.price.toLocaleString()}</span>
                      <div className="flex items-center text-gray-400 text-sm">
                        <MapPin className="h-4 w-4 mr-1" aria-hidden="true" />
                        <span>{part.location}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedPart(part)}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        aria-label={`Quick view for ${part.name}`}
                      >
                        Quick View
                      </button>
                      <Link
                        href={`/parts/${part.id}`}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-center"
                        aria-label={`View full details for ${part.name}`}
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

export default SpareParts;
