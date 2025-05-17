import React from 'react';
import { Facebook, Twitter, Github, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-4 mb-4">
          <a 
            href="#" 
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
            aria-label="Facebook"
          >
            <Facebook size={20} />
          </a>
          <a 
            href="#" 
            className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition-colors"
            aria-label="Twitter"
          >
            <Twitter size={20} />
          </a>
          <a 
            href="#" 
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
            aria-label="Google"
          >
            <Mail size={20} />
          </a>
          <a 
            href="#" 
            className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-900 transition-colors"
            aria-label="Github"
          >
            <Github size={20} />
          </a>
        </div>
        <div className="text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Instituto Lidera. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
