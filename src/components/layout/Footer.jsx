 {/* Footer Section */}
        <footer className="bg-gray-800 text-gray-300 py-10">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Section */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">PropShare</h3>
              <p className="text-sm">
                Your trusted partner in fractional real estate ownership. We make high-value property investment accessible to everyone.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" onClick={() => setCurrentPage('home')} className="hover:text-blue-400 transition-colors duration-200">Home</a>
                </li>
                <li>
                  <a href="#" onClick={() => console.log('About Us Clicked')} className="hover:text-blue-400 transition-colors duration-200">About Us</a>
                </li>
                <li>
                  <a href="#" onClick={() => console.log('FAQ Clicked')} className="hover:text-blue-400 transition-colors duration-200">FAQ</a>
                </li>
                <li>
                  <a href="#" onClick={() => console.log('Terms and Conditions Clicked')} className="hover:text-blue-400 transition-colors duration-200">Privacy Policy</a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
              <address className="not-italic space-y-2">
                <p className="flex items-center gap-2">
                  <MapPinIcon size={18} className="text-blue-400" />
                  123 Fractional Blvd, Suite 456, Realty City, RX 78901
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={18} className="text-blue-400" />
                  (123) 456-7890
                </p>
                <p className="flex items-center gap-2">
                  <Mail size={18} className="text-blue-400" />
                  info@PropShare.com
                </p>
              </address>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200" aria-label="Facebook">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200" aria-label="Twitter">
                  <Twitter size={24} />
                </a>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200" aria-label="LinkedIn">
                  <Linkedin size={24} />
                </a>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200" aria-label="Instagram">
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} PropShare. All rights reserved.
          </div>
        </footer>