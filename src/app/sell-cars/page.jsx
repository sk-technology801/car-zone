
"use client"
import React, { useState, useEffect } from 'react';
import { Car, MapPin, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SellCars = () => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    fuel: '',
    transmission: '',
    condition: '',
    location: '',
    image: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const pathname = usePathname();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for the field when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formData.model.trim()) newErrors.model = 'Model is required';
    if (!formData.year || isNaN(formData.year) || formData.year < 1900 || formData.year > new Date().getFullYear() + 1) {
      newErrors.year = 'Enter a valid year';
    }
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = 'Enter a valid price';
    }
    if (!formData.mileage || isNaN(formData.mileage) || formData.mileage < 0) {
      newErrors.mileage = 'Enter a valid mileage';
    }
    if (!formData.fuel) newErrors.fuel = 'Fuel type is required';
    if (!formData.transmission) newErrors.transmission = 'Transmission is required';
    if (!formData.condition) newErrors.condition = 'Condition is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      // Reset form
      setFormData({
        brand: '',
        model: '',
        year: '',
        price: '',
        mileage: '',
        fuel: '',
        transmission: '',
        condition: '',
        location: '',
        image: ''
      });
    } else {
      setErrors(newErrors);
    }
  };

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

  // Close success modal
  const closeModal = () => {
    setIsSubmitted(false);
  };

  // Options for dropdowns
  const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
  const transmissions = ['Automatic', 'Manual'];
  const conditions = ['Like New', 'Excellent', 'Good', 'Certified Pre-Owned'];

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
      <section className="relative bg-hero py-16 sm:py-24 md:py-32 animate-section" aria-labelledby="sell-cars-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 id="sell-cars-heading" className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Sell Your Car
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              List your car for sale with ease and reach thousands of potential buyers
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 sm:py-16 bg-gray-900 animate-section" aria-labelledby="sell-form-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="sell-form-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Submit Your Car Details
          </h2>
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-300 mb-1">Brand *</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Car brand"
                  required
                />
                {errors.brand && <p className="text-red-400 text-sm mt-1">{errors.brand}</p>}
              </div>
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-300 mb-1">Model *</label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Car model"
                  required
                />
                {errors.model && <p className="text-red-400 text-sm mt-1">{errors.model}</p>}
              </div>
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-300 mb-1">Year *</label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Car year"
                  required
                />
                {errors.year && <p className="text-red-400 text-sm mt-1">{errors.year}</p>}
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">Price ($)*</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Car price"
                  required
                />
                {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price}</p>}
              </div>
              <div>
                <label htmlFor="mileage" className="block text-sm font-medium text-gray-300 mb-1">Mileage (miles) *</label>
                <input
                  type="number"
                  id="mileage"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Car mileage"
                  required
                />
                {errors.mileage && <p className="text-red-400 text-sm mt-1">{errors.mileage}</p>}
              </div>
              <div>
                <label htmlFor="fuel" className="block text-sm font-medium text-gray-300 mb-1">Fuel Type *</label>
                <select
                  id="fuel"
                  name="fuel"
                  value={formData.fuel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Fuel type"
                  required
                >
                  <option value="">Select Fuel Type</option>
                  {fuelTypes.map(fuel => (
                    <option key={fuel} value={fuel}>{fuel}</option>
                  ))}
                </select>
                {errors.fuel && <p className="text-red-400 text-sm mt-1">{errors.fuel}</p>}
              </div>
              <div>
                <label htmlFor="transmission" className="block text-sm font-medium text-gray-300 mb-1">Transmission *</label>
                <select
                  id="transmission"
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Transmission type"
                  required
                >
                  <option value="">Select Transmission</option>
                  {transmissions.map(trans => (
                    <option key={trans} value={trans}>{trans}</option>
                  ))}
                </select>
                {errors.transmission && <p className="text-red-400 text-sm mt-1">{errors.transmission}</p>}
              </div>
              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-300 mb-1">Condition *</label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Car condition"
                  required
                >
                  <option value="">Select Condition</option>
                  {conditions.map(cond => (
                    <option key={cond} value={cond}>{cond}</option>
                  ))}
                </select>
                {errors.condition && <p className="text-red-400 text-sm mt-1">{errors.condition}</p>}
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Car location"
                  required
                />
                {errors.location && <p className="text-red-400 text-sm mt-1">{errors.location}</p>}
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-1">Image URL (Optional)</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Car image URL"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Submit car details"
              >
                Submit Car for Sale
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {isSubmitted && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 modal-enter" role="dialog" aria-labelledby="modal-title">
          <div className="bg-gray-800 rounded-xl max-w-lg w-full mx-4 p-6 sm:p-8 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 id="modal-title" className="text-2xl font-bold text-white mb-4">Submission Successful</h2>
            <p className="text-gray-300 mb-6">Your car has been submitted for review. We’ll notify you once it’s listed!</p>
            <button
              onClick={closeModal}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Close success modal"
            >
              Close
            </button>
          </div>
        </div>
      )}

   
    </div>
  );
};

export default SellCars;
