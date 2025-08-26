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
    <footer className="bg-gray-800 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">PropShare</h3>
            <p className="text-sm leading-relaxed">
              Your trusted partner in fractional real estate ownership. We make
              high-value property investment accessible to everyone.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to={"/"}
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={"/terms"}
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Terms
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => console.log("About Us Clicked")}
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <Link
                  to={"/privacy-policy"}
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Contact Us
            </h3>
            <address className="not-italic space-y-3 text-sm">
              <p className="flex items-center gap-2 hover:text-blue-400 hover:underline transition-colors duration-200">
                <MapPinIcon size={18} />
                <a
                  href="https://www.google.com/maps/place/Maxim+Mall/@30.0292207,31.4955147,359m/data=!3m1!1e3!4m10!1m2!2m1!1s90+St+North,+Second+New+Cairo,+Cairo+Gov,+Egypt!3m6!1s0x14582260dce33277:0xcee8c262752427a3!8m2!3d30.0295773!4d31.496699!15sCi85MCBTdCBOb3J0aCwgU2Vjb25kIE5ldyBDYWlybywgQ2Fpcm8gR292LCBFZ3lwdFouIiw5MCBzdCBub3J0aCBzZWNvbmQgbmV3IGNhaXJvIGNhaXJvIGdvdiBlZ3lwdJIBD3Nob3BwaW5nX2NlbnRlcpoBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQyNW9abGd5T1dsWGFscDBXVEpvYmxSWVNtbE1WbXhxVWpKV2NtSldSUkFCqgGHARABKjAiLDkwIHN0IG5vcnRoIHNlY29uZCBuZXcgY2Fpcm8gY2Fpcm8gZ292IGVneXB0KAAyHxABIhvHGHGhFHlc2sVzylkIF4MwoYfmUciwBnOq21MyMBACIiw5MCBzdCBub3J0aCBzZWNvbmQgbmV3IGNhaXJvIGNhaXJvIGdvdiBlZ3lwdOABAPoBBAgAEDw!16s%2Fg%2F11c1rfndcj?entry=ttu&g_ep=EgoyMDI1MDgxOS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  90 St North, Second New Cairo, Cairo Gov, Egypt
                </a>
              </p>
              <p className="flex items-center gap-2 hover:text-blue-400 hover:underline transition-colors duration-200">
                <Phone size={18} />
                <a href="tel:(123) 456-7890">Call us: (123) 456-7890</a>
              </p>
              <p className="flex items-center gap-2 hover:text-blue-400 hover:underline transition-colors duration-200">
                <Mail size={18} />
                <a href="mailto:info@PropShare.com">
                  Email us: info@PropShare.com
                </a>
              </p>
            </address>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-lg font-bold text-gray-500">
          &copy; {new Date().getFullYear()} PropShare. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
