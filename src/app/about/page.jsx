
"use client"
import React, { useEffect, useState, useRef } from 'react';
import { Wrench, MapPin, Users, Target, Star, Globe, Twitter, Linkedin, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Carousel } from 'react-responsive-carousel';
import Tilt from 'react-parallax-tilt';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import GlobeComponent from 'react-globe.gl';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const About = () => {
  const pathname = usePathname();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [formSuccess, setFormSuccess] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const controls = useAnimation();
  const globeRef = useRef();
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
            if (entry.target.classList.contains('timeline-item')) {
              controls.start((i) => ({
                opacity: 1,
                x: 0,
                transition: { delay: i * 0.2, duration: 0.6 },
              }));
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, [controls]);

  // Handle contact form submission
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

  // Flip card animation with framer-motion
  const FlipCard = ({ front, back, icon: Icon }) => {
    return (
      <motion.div
        className="relative h-48 w-full perspective-1000"
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="absolute w-full h-full bg-gray-800 rounded-xl p-6 glassmorphism hover-lift"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <Icon className="h-8 w-8 text-blue-400 mb-4" aria-hidden="true" />
          <h3 className="text-lg font-semibold text-white mb-2">{front.title}</h3>
          <p className="text-gray-400 text-sm">{front.description}</p>
        </motion.div>
        <motion.div
          className="absolute w-full h-full bg-gray-800 rounded-xl p-6 glassmorphism"
          style={{ backfaceVisibility: 'hidden', rotateY: 180 }}
        >
          <p className="text-gray-300 text-sm">{back.details}</p>
        </motion.div>
      </motion.div>
    );
  };

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
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes scaleHover {
          from { transform: scale(1); }
          to { transform: scale(1.05); }
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
          animation: scaleHover 0.3s ease;
        }
        .success-animation {
          animation: successPulse 1.5s ease-out;
        }
        .bg-hero {
          position: relative;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(59, 130, 246, 0.3)), url('https://images.unsplash.com/photo-1517524008697-4bbe05c9b2a2?w=1920&h=1080&fit=crop');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }
        .glassmorphism {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .gradient-border {
          position: relative;
          border: none;
        }
        .gradient-border::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, #3b82f6, #a855f7);
          border-radius: 12px;
          z-index: -1;
        }
        .timeline-item {
          opacity: 0;
          transform: translateX(-50px);
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>

      {/* Hero Section with Parallax and Particles */}
      <section className="relative bg-hero py-16 sm:py-24 md:py-32 animate-section" aria-labelledby="about-heading">
        <motion.div style={{ y: yParallax }} className="absolute inset-0">
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              particles: {
                number: { value: 50, density: { enable: true, value_area: 800 } },
                color: { value: '#3b82f6' },
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
            <h1 id="about-heading" className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Discover AutoHub
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Pioneering automotive excellence with innovation and community
            </p>
            <div className="max-w-lg mx-auto mb-8">
              <Carousel
                showThumbs={false}
                autoPlay
                infiniteLoop
                interval={3000}
                showStatus={false}
                className="rounded-lg shadow-lg"
              >
                {[
                  { src: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop", alt: "AutoHub Workshop", caption: "State-of-the-art facilities" },
                  { src: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&h=400&fit=crop", alt: "AutoHub Team", caption: "Our dedicated team" },
                  { src: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop", alt: "AutoHub Innovation", caption: "Innovative solutions" }
                ].map((img, idx) => (
                  <div key={idx}>
                    <img src={img.src} alt={img.alt} className="w-full h-48 sm:h-64 object-cover rounded-lg" loading="lazy" />
                    <p className="legend bg-gray-800/70 text-white">{img.caption}</p>
                  </div>
                ))}
              </Carousel>
            </div>
            <a
              href="#story"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 pulse focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Discover our story"
            >
              Discover Our Story
            </a>
          </div>
        </div>
      </section>

      {/* Company Story Section with Enhanced Timeline */}
     

      {/* Team Section with Interactive Globe */}
      <section className="py-12 sm:py-16 bg-gray-900 animate-section" aria-labelledby="team-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="team-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Our Global Team
          </h2>
          <div className="mb-12">
            <GlobeComponent
              ref={globeRef}
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
              pointsData={[
                { lat: 40.7128, lng: -74.0060, label: "Jane Doe, CEO", size: 0.5 },
                { lat: 37.7749, lng: -122.4194, label: "John Smith, CTO", size: 0.5 },
                { lat: 51.5074, lng: -0.1278, label: "Emily Brown, Lead Designer", size: 0.5 },
                { lat: 35.6762, lng: 139.6503, label: "Michael Lee, Head of Operations", size: 0.5 }
              ]}
              pointLabel="label"
              pointRadius="size"
              pointColor={() => '#3b82f6'}
              pointAltitude={0.1}
              width={800}
              height={400}
              backgroundColor="rgba(0,0,0,0)"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { name: "Jane Doe", role: "CEO", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", twitter: "#", linkedin: "#" },
              { name: "John Smith", role: "CTO", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop", twitter: "#", linkedin: "#" },
              { name: "Emily Brown", role: "Lead Designer", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop", twitter: "#", linkedin: "#" },
              { name: "Michael Lee", role: "Head of Operations", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop", twitter: "#", linkedin: "#" }
            ].map((member, idx) => (
              <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} key={idx}>
                <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden gradient-border fade-in-up" role="article">
                  <img src={member.image} alt={member.name} className="w-full h-48 sm:h-56 object-cover" loading="lazy" />
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-white">{member.name}</h3>
                    <p className="text-gray-400 mb-4 text-sm sm:text-base">{member.role}</p>
                    <div className="flex gap-4">
                      <a
                        href={member.twitter}
                        className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                        aria-label={`Follow ${member.name} on Twitter`}
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                      <a
                        href={member.linkedin}
                        className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                        aria-label={`Connect with ${member.name} on LinkedIn`}
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values Section with Flip Cards */}
      <section className="py-12 sm:py-16 bg-gray-900 animate-section" aria-labelledby="mission-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="mission-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Our Mission & Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Target,
                front: { title: "Innovation", description: "Pushing boundaries with cutting-edge solutions." },
                back: { details: "We leverage AI and modern tech to enhance your automotive experience." }
              },
              {
                icon: Users,
                front: { title: "Community", description: "Building a trusted network for enthusiasts." },
                back: { details: "Connecting car lovers globally through shared passion and trust." }
              },
              {
                icon: Star,
                front: { title: "Excellence", description: "Delivering top-quality services and products." },
                back: { details: "Committed to exceeding expectations in every interaction." }
              }
            ].map((value, idx) => (
              <FlipCard key={idx} front={value.front} back={value.back} icon={value.icon} />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section with Progress Bars */}
      <section className="py-12 sm:py-16 bg-gray-900 animate-section" aria-labelledby="stats-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="stats-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              { label: "Customers Served", value: 50000 },
              { label: "Services Booked", value: 120000 },
              { label: "Countries", value: 15 }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="bg-gray-800 rounded-xl p-6 glassmorphism hover-lift"
              >
                <p className="text-gray-400 text-sm sm:text-base mb-2">{stat.label}</p>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(stat.value / (stat.label === 'Countries' ? 20 : 150000)) * 100}%` }}
                    transition={{ duration: 1.5, delay: idx * 0.3 }}
                  />
                </div>
                <p className="text-blue-400 text-lg font-semibold mt-2">
                  {stat.value.toLocaleString()}
                </p>
              </motion.div>
            ))}
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
              { question: "What is AutoHub?", answer: "AutoHub is a global marketplace for buying, selling, and servicing cars, offering premium automotive solutions." },
              { question: "How do I book a service?", answer: "Visit our services page, select a service, and use the booking form to schedule with a provider." },
              { question: "Where is AutoHub available?", answer: "We operate in 15 countries, with plans for further expansion." }
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
                  className="w-full flex justify-between items-center p-4 text-left text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 bg-gray-900 animate-section" aria-labelledby="contact-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="contact-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Get in Touch
          </h2>
          <div className="max-w-lg mx-auto bg-gray-800 rounded-xl p-6 sm:p-8 glassmorphism relative">
            {formSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-green-600/50 rounded-xl success-animation"
              >
                <p className="text-white font-semibold">Message Sent!</p>
              </motion.div>
            )}
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleFormChange}
                  className={`w-full mt-1 px-4 py-2 bg-gray-700 border ${formErrors.name ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  aria-label="Your name"
                  required
                />
                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className={`w-full mt-1 px-4 py-2 bg-gray-700 border ${formErrors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  aria-label="Your email"
                  required
                />
                {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  className={`w-full mt-1 px-4 py-2 bg-gray-700 border ${formErrors.message ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  rows="4"
                  aria-label="Your message"
                  required
                ></textarea>
                <p className="text-gray-400 text-xs mt-1">{formData.message.length}/500</p>
                {formErrors.message && <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover-lift focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Submit contact form"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default About;
