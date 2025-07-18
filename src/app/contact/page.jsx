"use client";
import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [formSuccess, setFormSuccess] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const controls = useAnimation();
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 300], [0, -100]);

  // Initialize particles
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  // Handle scroll animations
  useEffect(() => {
    const sections = document.querySelectorAll('.animate-section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            controls.start({ opacity: 1, y: 0, transition: { duration: 0.6 } });
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, [controls]);

  // Handle form submission
  const handleContactSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Valid email is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    if (formData.message.length > 500) errors.message = 'Message must be under 500 characters';

    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }

    console.log(`Contact Form: Name: ${formData.name}, Email: ${formData.email}, Message: ${formData.message}`);
    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 3000);
    setFormData({ name: '', email: '', message: '' });
    setFormErrors({});
  };

  // Form input change handler
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // FAQ toggle
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <style jsx global>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes successPulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(1); opacity: 0; }
        }
        .animate-section {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out;
        }
        .animate-in {
          animation: slideIn 0.6s ease-out forwards;
        }
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .pulse {
          animation: pulse 2s infinite ease-in-out;
        }
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        }
        .success-animation {
          animation: successPulse 1.5s ease-out;
        }
        .bg-hero {
          position: relative;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(75, 85, 99, 0.3)), url('https://images.unsplash.com/photo-1517524008697-4bbe05c9b2a2?w=1920&h=1080&fit=crop');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }
        .glassmorphism {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>

      {/* Hero Section with Parallax and Particles */}
      <section className="relative bg-hero py-16 sm:py-24 md:py-32 animate-section" aria-labelledby="contact-heading">
        <motion.div style={{ y: yParallax }} className="absolute inset-0">
          <Particles
            id="tsparticles-contact"
            init={particlesInit}
            options={{
              particles: {
                number: { value: 50, density: { enable: true, value_area: 800 } },
                color: { value: '#6b7280' }, // gray-500
                shape: { type: 'circle' },
                opacity: { value: 0.5 },
                size: { value: 3, random: true },
                move: { enable: true, speed: 2, direction: 'none', out_mode: 'out' },
              },
              interactivity: {
                events: { onhover: { enable: true, mode: 'repulse' } },
                modes: { repulse: { distance: 100, duration: 0.4 } },
              },
            }}
            className="absolute inset-0"
          />
        </motion.div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 id="contact-heading" className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
              Contact AutoHub
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Connect with our team for all your automotive needs
            </p>
            <a
              href="#contact-form"
              className="bg-gradient-to-r from-gray-600 to-gray-800 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:from-gray-700 hover:to-gray-900 transition-all duration-300 pulse focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              aria-label="Go to contact form"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-12 sm:py-16 bg-gray-900 animate-section" aria-labelledby="contact-info-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="contact-info-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Our Contact Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: Phone,
                title: 'Phone',
                detail: '+1 (555) 123-4567',
                ariaLabel: 'Contact us by phone',
              },
              {
                icon: Mail,
                title: 'Email',
                detail: 'sardarsaadisaadi@gmail.com',
                ariaLabel: 'Contact us by email',
              },
              {
                icon: MapPin,
                title: 'Address',
                detail: '123 Auto Street, Car City, CC 12345',
                ariaLabel: 'Our location',
              },
              {
                icon: Clock,
                title: 'Hours',
                detail: 'Mon-Fri: 9AM-6PM, Sat: 9AM-4PM',
                ariaLabel: 'Our business hours',
              },
            ].map((info, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="bg-gray-800 rounded-xl p-6 glassmorphism hover-lift text-center"
              >
                <info.icon className="h-8 w-8 text-gray-500 mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white mb-2">{info.title}</h3>
                <p className="text-gray-400 text-sm">{info.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-12 sm:py-16 bg-gray-900 animate-section" aria-labelledby="contact-form-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="contact-form-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Send Us a Message
          </h2>
          <div className="max-w-lg mx-auto bg-gray-800 rounded-xl p-6 sm:p-8 glassmorphism relative">
            {formSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-gray-600/50 rounded-xl success-animation"
              >
                <p className="text-white font-semibold">Message Sent!</p>
              </motion.div>
            )}
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleFormChange}
                  className={`w-full mt-1 px-4 py-2 bg-gray-700 border ${
                    formErrors.name ? 'border-red-500' : 'border-gray-600'
                  } rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-500`}
                  aria-label="Your name"
                  required
                />
                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className={`w-full mt-1 px-4 py-2 bg-gray-700 border ${
                    formErrors.email ? 'border-red-500' : 'border-gray-600'
                  } rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-500`}
                  aria-label="Your email"
                  required
                />
                {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  className={`w-full mt-1 px-4 py-2 bg-gray-700 border ${
                    formErrors.message ? 'border-red-500' : 'border-gray-600'
                  } rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-500`}
                  rows="4"
                  aria-label="Your message"
                  required
                ></textarea>
                <p className="text-gray-400 text-xs mt-1">{formData.message.length}/500</p>
                {formErrors.message && <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-gray-600 to-gray-800 text-white py-3 px-4 rounded-lg hover:from-gray-700 hover:to-gray-900 transition-all duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                aria-label="Submit contact form"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 bg-gray-900 animate-section" aria-labelledby="faq-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="faq-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                question: 'How do I contact AutoHub for support?',
                answer: 'You can reach us via phone at +1 (555) 123-4567, email at sardarsaadisaadi@gmail.com , or by filling out the contact form above.',
              },
              {
                question: 'What are your business hours?',
                answer: 'We are open Monday to Friday from 9 AM to 6 PM, and Saturday from 9 AM to 4 PM.',
              },
              {
                question: 'Can I visit your location in person?',
                answer: 'Yes, visit us at 123 Auto Street, Car City, CC 12345. Please check our hours before visiting.',
              },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="bg-gray-800 rounded-xl glassmorphism"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex justify-between items-center p-4 text-left text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                  aria-expanded={openFAQ === idx}
                  aria-controls={`faq-${idx}`}
                >
                  <span className="text-lg font-semibold">{faq.question}</span>
                  {openFAQ === idx ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {openFAQ === idx && (
                  <div id={`faq-${idx}`} className="p-4 text-gray-300 text-sm sm:text-base">
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;