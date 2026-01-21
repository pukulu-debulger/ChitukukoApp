import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Heart } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Weather', id: 'weather' },
    { name: 'Crops', id: 'crops' },
    { name: 'Markets', id: 'markets' },
    { name: 'Diseases', id: 'diseases' }
  ];

  const resources = [
    'Farming Guide',
    'Best Practices',
    'Seasonal Calendar',
    'FAQ',
    'Contact Extension Officer'
  ];

  const regions = [
    'Northern Region',
    'Central Region',
    'Southern Region'
  ];

  return (
    <footer className="bg-gradient-to-br from-primary-900 to-primary-800 text-white mt-16">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-amber-500 p-2 rounded-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Chitukuko</h3>
                <p className="text-xs text-primary-200">Agricultural Platform</p>
              </div>
            </div>
            <p className="text-primary-100 text-sm mb-4 leading-relaxed">
              Empowering Malawian farmers with accessible, real-time agricultural information to improve crop yields and livelihoods.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-primary-700 hover:bg-primary-600 p-2 rounded-lg transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-primary-700 hover:bg-primary-600 p-2 rounded-lg transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-primary-700 hover:bg-primary-600 p-2 rounded-lg transition-all">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <a 
                    href={`#${link.id}`}
                    className="text-primary-100 hover:text-white hover:translate-x-1 inline-block transition-all text-sm"
                  >
                    → {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a 
                    href="#"
                    className="text-primary-100 hover:text-white hover:translate-x-1 inline-block transition-all text-sm"
                  >
                    → {resource}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Regions */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-300 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-primary-100">Lilongwe, Malawi</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary-300 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-primary-100">+265 123 456 789</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary-300 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-primary-100">info@chitukuko.mw</p>
                </div>
              </div>
            </div>

            <div>
              <h5 className="text-sm font-semibold mb-2 text-primary-200">Coverage Areas</h5>
              <ul className="space-y-1">
                {regions.map((region, index) => (
                  <li key={index} className="text-xs text-primary-100">
                    • {region}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-primary-200 text-center md:text-left">
              <p>© {currentYear} ChitukukoApp. All rights reserved.</p>
              <p className="text-xs mt-1">Building a better future for Malawian farmers</p>
            </div>
            
            <div className="flex items-center space-x-1 text-sm text-primary-200">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 fill-current" />
              <span>for Malawian farmers</span>
              <span className="ml-2">🇲🇼</span>
            </div>
          </div>

          {/* Additional Links */}
          <div className="mt-4 pt-4 border-t border-primary-700 flex flex-wrap justify-center gap-4 text-xs text-primary-300">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition">Disclaimer</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition">Help Center</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;