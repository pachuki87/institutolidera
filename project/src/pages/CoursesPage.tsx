import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CourseCard from '../components/courses/CourseCard'; // Import CourseCard

type CoursesPageProps = {
  currentRole: string;
  onRoleChange: (role: string) => void;
};

const CoursesPage: React.FC<CoursesPageProps> = ({ currentRole, onRoleChange }) => {
  // Mock data for courses
  const courses = [
    {
      id: '1',
      title: 'Formación en Terapeutas',
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Placeholder image
      enrollment: 150,
    },
    {
      id: '2',
      title: 'Máster en Adicciones',
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Placeholder image
      enrollment: 120,
    },
    {
      id: '3',
      title: 'Terapia Cognitivo-Conductual',
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Placeholder image
      enrollment: 32,
    },
    {
      id: '4',
      title: 'Intervención en Crisis',
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Placeholder image
      enrollment: 28,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentRole={currentRole} onRoleChange={onRoleChange} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Cursos Disponibles</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map(course => (
            <CourseCard 
              key={course.id}
              id={course.id}
              title={course.title}
              image={course.image}
              enrollment={course.enrollment}
              role={currentRole} // Pass currentRole to CourseCard
            />
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CoursesPage;
