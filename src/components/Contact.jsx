import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };




  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email',
      value: 'kavyasrigutti89@gmail.com',
      href: 'kavyasrigutti89@gmail.com'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: 'Phone',
      value: '+91 7569080843',
      href: 'tel:+7569080843'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: 'Location',
      value: 'Hyderabad, India',
      href: null
    }
  ];






  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Get In <span className="text-blue-400">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your project and create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white mb-8">Let's Connect</h3>
            
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-center space-x-4 group">
                <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400 group-hover:bg-blue-500/30 transition-colors duration-200">
                  {info.icon}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{info.label}</p>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-white font-medium hover:text-blue-400 transition-colors duration-200"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-white font-medium">{info.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Additional Info */}
            <div className="mt-12 p-6 bg-slate-700/50 backdrop-blur-sm rounded-lg border border-slate-600/50">
              <h4 className="text-white font-semibold mb-4">Available for</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Frontend Development Projects</li>
                <li>• React/JavaScript Development</li>
                <li>• 3D Web Experiences</li>
                <li>• UI/UX Consultations</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-8 border border-slate-600/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2">
                  Your Name 
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.name 
                      ? 'border-red-500 focus:ring-red-500/50' 
                      : 'border-slate-600 focus:border-blue-400 focus:ring-blue-500/50'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-2 text-red-400 text-sm flex items-center">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  Email Address 
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500/50' 
                      : 'border-slate-600 focus:border-blue-400 focus:ring-blue-500/50'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-2 text-red-400 text-sm flex items-center">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">
                  Your Message 
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${
                    errors.message 
                      ? 'border-red-500 focus:ring-red-500/50' 
                      : 'border-slate-600 focus:border-blue-400 focus:ring-blue-500/50'
                  }`}
                  placeholder="Tell me about your project or how I can help you..."
                />
                {errors.message && (
                  <p className="mt-2 text-red-400 text-sm flex items-center">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Message...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="flex items-center justify-center text-green-400 bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <CheckCircle size={20} className="mr-2" />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center justify-center text-red-400 bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                  <AlertCircle size={20} className="mr-2" />
                  <span>Failed to send message. Please try again later.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;