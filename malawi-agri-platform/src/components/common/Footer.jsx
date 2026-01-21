import { Leaf, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-amber-500 p-2 rounded-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Chitukuko</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering Malawian farmers with technology and knowledge for better harvests.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-gray-700 hover:bg-primary-600 p-2 rounded-lg transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-700 hover:bg-primary-600 p-2 rounded-lg transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-700 hover:bg-primary-600 p-2 rounded-lg transition-all">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-all">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-all">Weather</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-all">Crop Calendar</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-all">Market Prices</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-all">Disease Detection</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-5 h-5" />
                <span>+265 (0) 123 456 789</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-5 h-5" />
                <span>info@chitukuko.mw</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-5 h-5" />
                <span>Lilongwe, Malawi</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-4">Get farming tips and alerts</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="bg-primary-600 hover:bg-primary-700 px-6 py-2 rounded-r-lg transition-all">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 Chitukuko Agricultural Platform. All rights reserved.</p>
          <p className="mt-2 text-sm">Made with ❤️ for Malawian farmers</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;