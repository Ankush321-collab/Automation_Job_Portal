import React, { useState, useEffect } from 'react';
import { 
  FaLinkedin, FaTwitter, FaFacebook, FaInstagram, 
  FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt, 
  FaArrowUp, FaRegPaperPlane 
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  const socialLinks = [
    { icon: <FaLinkedin />, color: 'bg-blue-600 hover:bg-blue-700', href: '#' },
    { icon: <FaTwitter />, color: 'bg-sky-500 hover:bg-sky-600', href: '#' },
    { icon: <FaFacebook />, color: 'bg-blue-800 hover:bg-blue-900', href: '#' },
    { icon: <FaInstagram />, color: 'bg-pink-600 hover:bg-pink-700', href: '#' },
    { icon: <FaGithub />, color: 'bg-gray-800 hover:bg-gray-900', href: '#' }
  ];

  const quickLinks = [
    { text: 'Find Jobs', href: '#' },
    { text: 'Post a Job', href: '#' },
    { text: 'Resume Builder', href: '#' },
    { text: 'Career Advice', href: '#' },
    { text: 'Salary Calculator', href: '#' }
  ];

  const employerLinks = [
    { text: 'Post a Job', href: '#' },
    { text: 'Search Candidates', href: '#' },
    { text: 'Pricing Plans', href: '#' },
    { text: 'Recruitment Tools', href: '#' },
    { text: 'Employer Resources', href: '#' }
  ];

  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
      className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white"
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Top Section with Company Info and Social Links */}
        <div className="py-16 border-b border-gray-700/30">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-8 lg:space-y-0">
            
            {/* Company Info */}
            <div className="flex items-center space-x-4">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
                className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-xl"
              >
                <span className="text-white font-bold text-2xl">JP</span>
              </motion.div>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  JobPortal
                </h3>
                <p className="text-gray-300 text-base mt-1">
                  Connecting talent with opportunity
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-12 h-12 ${link.color} rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl`}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Main Navigation Grid */}
        <div className="py-16 border-b border-gray-700/30">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Quick Links */}
            <div className="space-y-8">
              <div>
                <h4 className="text-xl font-bold text-white mb-6 border-b-2 border-blue-500 pb-3 inline-block">
                  Quick Links
                </h4>
              </div>
              <ul className="space-y-4">
                {quickLinks.map((link, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 8 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <a href={link.href} className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center space-x-3 group">
                      <span className="w-2 h-2 bg-blue-400 rounded-full transition-all duration-300 group-hover:w-4 group-hover:bg-blue-300"></span>
                      <span className="text-base font-medium">{link.text}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* For Employers */}
            <div className="space-y-8">
              <div>
                <h4 className="text-xl font-bold text-white mb-6 border-b-2 border-green-500 pb-3 inline-block">
                  For Employers
                </h4>
              </div>
              <ul className="space-y-4">
                {employerLinks.map((link, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 8 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <a href={link.href} className="text-gray-300 hover:text-green-400 transition-all duration-300 flex items-center space-x-3 group">
                      <span className="w-2 h-2 bg-green-400 rounded-full transition-all duration-300 group-hover:w-4 group-hover:bg-green-300"></span>
                      <span className="text-base font-medium">{link.text}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Newsletter Subscription */}
            <div className="space-y-8">
              <div>
                <h4 className="text-xl font-bold text-white mb-6 border-b-2 border-purple-500 pb-3 inline-block">
                  Stay Updated
                </h4>
              </div>
              <div className="space-y-6">
                <p className="text-gray-300 text-base leading-relaxed">
                  Get the latest job opportunities and career tips delivered to your inbox.
                </p>
                
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <AnimatePresence>
                    {isSubscribed && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-green-500/20 border border-green-500/30 text-green-400 p-4 rounded-xl text-sm"
                      >
                        Thanks for subscribing!
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex overflow-hidden rounded-xl shadow-lg"
                  >
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 px-5 py-4 bg-gray-800/50 border border-gray-600 focus:outline-none focus:border-purple-500 text-white placeholder-gray-400 text-base"
                      required
                    />
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="px-6 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 transition-all duration-300 flex items-center"
                    >
                      <FaRegPaperPlane className="text-white text-lg" />
                    </motion.button>
                  </motion.div>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h4 className="text-xl font-bold text-white mb-6 border-b-2 border-orange-500 pb-3 inline-block">
                  Contact Us
                </h4>
              </div>
              <div className="space-y-6">
                <motion.div 
                  whileHover={{ x: 6 }}
                  className="flex items-center space-x-4 text-gray-300 group"
                >
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 transition-all duration-300">
                    <FaEnvelope className="text-blue-400 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-white font-medium">support@jobportal.com</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ x: 6 }}
                  className="flex items-center space-x-4 text-gray-300 group"
                >
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:bg-green-500/30 transition-all duration-300">
                    <FaPhone className="text-green-400 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="text-white font-medium">+1 (555) 123-4567</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ x: 6 }}
                  className="flex items-center space-x-4 text-gray-300 group"
                >
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center group-hover:bg-orange-500/30 transition-all duration-300">
                    <FaMapMarkerAlt className="text-orange-400 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Address</p>
                    <p className="text-white font-medium">123 Job Street, Career City</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="flex items-center flex-wrap gap-6 text-sm text-gray-300">
              <span className="font-medium">&copy; {new Date().getFullYear()} JobPortal. All rights reserved.</span>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -2 }}
                  className="hover:text-blue-400 transition-colors duration-300 font-medium"
                >
                  {item}
                </motion.a>
              ))}
            </div>
            
            {/* Back to Top Button */}
            <AnimatePresence>
              {isVisible && (
                <motion.button 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  onClick={scrollToTop}
                  className="flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-sm font-medium">Back to Top</span>
                  <FaArrowUp className="text-sm" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;