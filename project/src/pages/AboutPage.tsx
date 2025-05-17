import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

type AboutPageProps = {
  currentRole: string;
  onRoleChange: (role: string) => void;
};

const AboutPage: React.FC<AboutPageProps> = ({ currentRole, onRoleChange }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentRole={currentRole} onRoleChange={onRoleChange} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Acerca de nosotros</h1>
          <p className="text-gray-700">
            Esta es una página de "Acerca de nosotros" de ejemplo.
            Aquí irá el contenido sobre la plataforma, su misión y su equipo.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
