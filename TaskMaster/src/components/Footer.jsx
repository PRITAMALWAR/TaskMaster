import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 mt-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4">About TaskMaster</h3>
            <p className="text-sm text-gray-200">
              TaskMaster is your ultimate task management solution. Organize, track, and collaborate on tasks effortlessly.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-200 hover:text-white transition">Home</Link></li>
              <li><Link to="/taskboard" className="text-sm text-gray-200 hover:text-white transition">Task Board</Link></li>
              <li><Link to="/taskform" className="text-sm text-gray-200 hover:text-white transition">New Task</Link></li>
              <li><Link to="/profile" className="text-sm text-gray-200 hover:text-white transition">Profile</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-sm text-gray-200">Email: support@taskmaster.com</p>
            <p className="text-sm text-gray-200">Phone: +1 (123) 456-7890</p>
            <div className="flex justify-center md:justify-end space-x-6 mt-4">
              <a href="#" className="text-gray-200 hover:text-white transition">
                <FaFacebookF className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-200 hover:text-white transition">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-200 hover:text-white transition">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-200 hover:text-white transition">
                <FaLinkedinIn className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-200">
            &copy; 2025 TaskMaster. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
