import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { BookOpen, Users, Award, BookMarked } from 'lucide-react';

type HomePageProps = {
  currentRole: string;
  onRoleChange: (role: string) => void;
};

const HomePage: React.FC<HomePageProps> = ({ currentRole, onRoleChange }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentRole={currentRole} onRoleChange={onRoleChange} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Aprende Sin Límites
                </h1>
                <p className="text-xl mb-8 text-blue-100">
                  Descubre cursos impartidos por instructores expertos. Únete a millones de estudiantes que ya están aprendiendo en Instituto Lidera.
                </p>
                <div className="flex space-x-4">
                  <Link
                    to={`/login/${currentRole}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors"
                  >
                    Empezar
                  </Link>
                  <Link
                    to="/courses"
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-3 rounded-lg transition-colors"
                  >
                    Explorar Cursos
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <img
                  src="https://images.pexels.com/photos/5905885/pexels-photo-5905885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Estudiantes aprendiendo"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Por qué elegir Instituto Lidera</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-transform hover:scale-105">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="text-blue-600 w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Cursos Diversos</h3>
                <p className="text-gray-600">
                  Elige entre una amplia gama de cursos de programación, diseño, negocios y más.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-transform hover:scale-105">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-green-600 w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Instructores Expertos</h3>
                <p className="text-gray-600">
                  Aprende de profesionales de la industria con experiencia y conocimientos del mundo real.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-transform hover:scale-105">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookMarked className="text-yellow-600 w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Aprendizaje Interactivo</h3>
                <p className="text-gray-600">
                  Participa en exámenes, tareas y proyectos prácticos para reforzar tu aprendizaje.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-transform hover:scale-105">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-purple-600 w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Comunidad</h3>
                <p className="text-gray-600">
                  Conecta con otros estudiantes para compartir ideas y colaborar en proyectos.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">¿Listo para empezar a aprender?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Únete a miles de estudiantes que ya están aprendiendo en nuestra plataforma. Regístrate hoy y da el primer paso hacia tus objetivos.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/register/student"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Registrarse como Estudiante
              </Link>
              <Link
                to="/register/teacher"
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 rounded-lg transition-colors"
              >
                Convertirse en Instructor
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
