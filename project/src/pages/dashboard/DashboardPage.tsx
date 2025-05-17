import React, { useEffect, useState } from 'react';
import StatsCard from '../../components/dashboard/StatsCard';
import { supabase } from '../../lib/supabase';

type DashboardProps = {
  role: string;
};

type Stats = {
  courses: number;
  students: number;
  chapters: number;
  quizzes?: number;
  materials?: number;
  completedCourses?: number;
};

const DashboardPage: React.FC<DashboardProps> = ({ role }) => {
  const [stats, setStats] = useState<Stats>({
    courses: 0,
    students: 0,
    chapters: 0,
    quizzes: 0,
    materials: 0,
    completedCourses: 0,
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [role]);

  const fetchStats = async () => {
    setIsLoading(true);
    
    try {
      // In a real implementation, we would fetch stats from Supabase
      // For demo purposes, we'll use mock data
      setTimeout(() => {
        if (role === 'teacher') {
          setStats({
            courses: 4,
            students: 3,
            chapters: 1,
            quizzes: 3,
            materials: 2,
          });
        } else {
          setStats({
            courses: 2,
            students: 0,
            chapters: 8,
            completedCourses: 1,
            quizzes: 5,
          });
        }
        
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-32"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard 
            title="Total Courses" 
            value={`${stats.courses} course(s)`} 
            color="blue" 
          />
          
          {role === 'teacher' ? (
            <StatsCard 
              title="Total Students" 
              value={`${stats.students} student(s)`} 
              color="gray" 
            />
          ) : (
            <StatsCard 
              title="Completed Courses" 
              value={`${stats.completedCourses} course(s)`} 
              color="green" 
            />
          )}
          
          <StatsCard 
            title="Total Chapters" 
            value={`${stats.chapters} chapter(s)`} 
            color="green" 
          />
        </div>
      )}
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          {role === 'teacher' ? 'Recent Activity' : 'Your Learning Progress'}
        </h2>
        
        <div className="bg-white rounded-lg shadow p-6">
          {role === 'teacher' ? (
            <ul className="space-y-3">
              <li className="flex items-center text-sm text-gray-600">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                <span>A new student enrolled in <strong>PHP Course Laravel</strong></span>
                <span className="ml-auto text-gray-400">2 hours ago</span>
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                <span>You added a new chapter to <strong>Flask</strong></span>
                <span className="ml-auto text-gray-400">Yesterday</span>
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
                <span>Quiz <strong>Flask Quiz</strong> was attempted by 2 students</span>
                <span className="ml-auto text-gray-400">3 days ago</span>
              </li>
            </ul>
          ) : (
            <div>
              <div className="mb-4">
                <h3 className="text-md font-medium mb-2">PHP Course Laravel</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>Progress: 65%</span>
                  <span>7/12 lessons completed</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-medium mb-2">Python Course</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>Progress: 30%</span>
                  <span>3/10 lessons completed</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;