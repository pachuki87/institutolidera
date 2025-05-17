import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Search as SearchIcon } from 'lucide-react';

type NavbarProps = {
  onRoleChange?: (role: string) => void;
  currentRole?: string;
};

const Navbar: React.FC<NavbarProps> = ({ onRoleChange, currentRole = 'student' }) => {
  const location = useLocation();
  const navigate = useNavigate(); // Get navigate function
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-yellow-500 to-green-500 bg-clip-text text-transparent">
              Instituto Lidera
            </span>
          </Link>
          
          <form onSubmit={handleSearchSubmit} className="ml-4 relative">
            <input
              type="text"
              placeholder="Buscar por título del curso"
              className="py-1 px-3 pr-10 rounded-md text-gray-800 text-sm w-48 sm:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="absolute right-0 top-0 h-full px-2 bg-yellow-500 rounded-r-md flex items-center justify-center"
            >
              <span className="text-gray-800">Buscar</span>
            </button>
          </form>
        </div>
        
        <nav className="flex items-center space-x-4">
          <Link 
            to="/" 
            className={`text-sm font-medium ${location.pathname === '/' ? 'text-yellow-400' : 'text-white hover:text-yellow-200'}`}
          >
            Inicio
          </Link>
          <Link 
            to="/courses" 
            className={`text-sm font-medium ${location.pathname.includes('/courses') ? 'text-yellow-400' : 'text-white hover:text-yellow-200'}`}
          >
            Cursos
          </Link>
          <Link 
            to="/about" 
            className={`text-sm font-medium ${location.pathname === '/about' ? 'text-yellow-400' : 'text-white hover:text-yellow-200'}`}
          >
            Acerca de nosotros
          </Link>
          <Link 
            to="/faqs" 
            className={`text-sm font-medium ${location.pathname === '/faqs' ? 'text-yellow-400' : 'text-white hover:text-yellow-200'}`}
          >
            Preguntas Frecuentes
          </Link>
          
          <div className="ml-4 flex space-x-2">
            <button
              className={`py-1 px-3 rounded-md text-sm font-medium transition-colors ${
                currentRole === 'student' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              }`}
              onClick={() => {
                onRoleChange && onRoleChange('student');
                navigate('/student/dashboard'); // Navigate to student dashboard
              }}
            >
              Estudiante
            </button>
            <button
              className={`py-1 px-3 rounded-md text-sm font-medium transition-colors ${
                currentRole === 'teacher' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              }`}
              onClick={() => {
                onRoleChange && onRoleChange('teacher');
                navigate('/teacher/dashboard'); // Navigate to teacher dashboard
              }}
            >
              Profesor
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
