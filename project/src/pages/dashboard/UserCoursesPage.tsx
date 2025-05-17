import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

type Course = {
  id: string;
  title: string;
  teacher_name: string;
};

type UserCoursesPageProps = {
  role: string;
};

const UserCoursesPage: React.FC<UserCoursesPageProps> = ({ role }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, [role]);

  const fetchCourses = async () => {
    setIsLoading(true);
    
    try {
      // In a real implementation, we would fetch courses from Supabase
      // For demo purposes, we'll use mock data
      setTimeout(() => {
        const mockCourses: Course[] = [
          {
            id: '1',
            title: 'PHP Course Laravel',
            teacher_name: 'abdelnasser',
          },
          {
            id: '2',
            title: 'PHP Course for Beginners',
            teacher_name: 'abdelnasser',
          },
          {
            id: '3',
            title: 'Flask',
            teacher_name: 'abdelnasser',
          },
          {
            id: '4',
            title: 'Python Course',
            teacher_name: 'abdelnasser',
          },
        ];
        
        setCourses(mockCourses);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>
      
      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      ) : courses.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500 mb-4">You don't have any courses yet.</p>
          <Link
            to="/courses"
            className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Create By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quiz
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message to teacher
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/${role}/courses/${course.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {course.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.teacher_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/${role}/courses/${course.id}/quiz`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition-colors"
                    >
                      Quiz List
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => {/* Handle chat */}}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserCoursesPage;