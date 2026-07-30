import {
  MapPinIcon,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Linkedin,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10">
      <div className="max-w-full px-4  ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4  text-center md:text-start">
              PropShare
            </h3>
            <p className="text-sm leading-relaxed">
              Your trusted partner in fractional real estate ownership. We make
              high-value property investment accessible to everyone.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4  text-center md:text-start">
              Company
            </h3>
            <ul className="space-y-2 flex flex-col items-center md:items-start">
              <li>
                <Link
                  to={"/terms"}
                  className="hover:text-white transition-colors duration-200"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  to={"/about-us"}
                  className="hover:text-white transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to={"/privacy-policy"}
                  className="hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4 text-center md:text-start">
              Contact Us
            </h3>
            <address className="not-italic space-y-3 text-sm flex flex-col items-center md:items-start">
              <p className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                <Phone size={18} />
                <a href="tel:(123) 456-7890">Call Us: (123) 456-7890</a>
              </p>
              <p className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                <Mail size={18} />
                <a href="mailto:info@PropShare.com">
                  Email Us: info@PropShare.com
                </a>
              </p>
            </address>
            <h3 className="text-xl font-semibold text-center md:text-start text-white mt-5 mb-4">
              Follow Us
            </h3>
            <div className="flex justify-center md:justify-start items-center gap-6">
              <div>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <Facebook size={24} />
                </a>
              </div>
              <div>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
              </div>
              <div>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <Twitter size={24} />
                </a>
              </div>
              <div>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 text-center font-bold text-xl text-gray-500">
          &copy; {new Date().getFullYear()} PropShare.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
