
"use client"
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const Footer = () => {
  const pathname = usePathname();

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const hoverVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <footer className="bg-gray-950 text-gray-400 py-8 sm:py-12" role="contentinfo">
      <style jsx global>{`
        .footer-link:hover {
          color: #ffffff;
          transform: translateX(5px);
        }
      `}</style>
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* AutoHub Description */}
          <motion.div variants={fadeIn}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gray-400 p-1.5 sm:p-2 rounded-lg">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-gray-950" aria-hidden="true" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">AutoHub</h3>
            </div>
            <p className="text-gray-400 text-sm sm:text-base">
              Your trusted marketplace for buying, selling, and finding automotive services and parts.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeIn}>
            <h4 className="text-base sm:text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm sm:text-base" role="navigation">
              {[
                { href: '/', label: 'Home' },
                { href: '/buy-cars', label: 'Buy Cars' },
                { href: '/sell-cars', label: 'Sell Cars' },
                { href: '/spare-parts', label: 'Spare Parts' },
                { href: '/service', label: 'Services' },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <motion.li key={link.href} variants={hoverVariants} whileHover="hover">
                  <Link
                    href={link.href}
                    className={`footer-link transition-all duration-300 ${
                      pathname === link.href ? 'text-white' : 'hover:text-white'
                    }`}
                    aria-current={pathname === link.href ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div variants={fadeIn}>
            <h4 className="text-base sm:text-lg font-semibold mb-4 text-white">Categories</h4>
            <ul className="space-y-2 text-gray-400 text-sm sm:text-base" role="navigation">
              {[
                { href: '/categories/suvs', label: 'SUVs' },
                { href: '/categories/sedans', label: 'Sedans' },
                { href: '/categories/trucks', label: 'Trucks' },
                { href: '/categories/electric', label: 'Electric' },
              ].map((category) => (
                <motion.li key={category.href} variants={hoverVariants} whileHover="hover">
                  <Link
                    href={category.href}
                    className="footer-link transition-all duration-300 hover:text-white"
                  >
                    {category.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Details */}
          <motion.div variants={fadeIn}>
            <h4 className="text-base sm:text-lg font-semibold mb-4 text-white">Contact</h4>
            <div className="space-y-2 text-gray-400 text-sm sm:text-base">
              <motion.div
                className="flex items-center"
                variants={hoverVariants}
                whileHover="hover"
              >
                <Phone className="h-4 w-4 mr-2 text-gray-400" aria-hidden="true" />
                <span>+1 (555) 123-4567</span>
              </motion.div>
              <motion.div
                className="flex items-center"
                variants={hoverVariants}
                whileHover="hover"
              >
                <Mail className="h-4 w-4 mr-2 text-gray-400" aria-hidden="true" />
                <span>info@autohub.com</span>
              </motion.div>
              <motion.div
                className="flex items-center"
                variants={hoverVariants}
                whileHover="hover"
              >
                <MapPin className="h-4 w-4 mr-2 text-gray-400" aria-hidden="true" />
                <span>123 Auto Street, Car City</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-sm"
          variants={fadeIn}
        >
          <p>© 2025 AutoHub. All rights reserved.SK-TECHNOLOGY-801</p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
