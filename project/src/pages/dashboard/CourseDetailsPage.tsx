import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, FileText, FileQuestion, Share2, ThumbsUp, User } from 'lucide-react';
import { supabase } from '../../lib/supabase';

type CourseDetailsProps = {
  role: string;
};

type Course = {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  teacher_name: string;
  created_at: string;
  technologies: string[];
  chapters_count: number;
  materials_count: number;
  students_count: number;
};

type Chapter = {
  id: string;
  title: string;
  description: string | null;
  video_url: string | null;
};

const CourseDetailsPage: React.FC<CourseDetailsProps> = ({ role }) => {
  const { id: courseId } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  const fetchCourseDetails = async () => {
    setIsLoading(true);
    
    try {
      // In a real implementation, we would fetch from Supabase
      // For demo purposes, we'll use mock data
      setTimeout(() => {
        const mockCourse: Course = {
          id: courseId || '1',
          title: 'PHP Course Laravel',
          description: 'Master PHP and Laravel framework to build powerful web applications. This course covers all the essentials of modern PHP development with Laravel.',
          image_url: null,
          teacher_name: 'John Smith',
          created_at: '2023-06-15',
          technologies: ['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
          chapters_count: 12,
          materials_count: 5,
          students_count: 24,
        };
        
        const mockChapters: Chapter[] = [
          {
            id: '1',
            title: 'Introduction to Laravel',
            description: 'Get started with Laravel framework basics',
            video_url: null,
          },
          {
            id: '2',
            title: 'Routes and Controllers',
            description: 'Learn how to define routes and create controllers',
            video_url: null,
          },
          {
            id: '3',
            title: 'Blade Templating',
            description: 'Master Blade templates for dynamic views',
            video_url: null,
          },
        ];
        
        setCourse(mockCourse);
        setChapters(mockChapters);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching course details:', error);
      setIsLoading(false);
    }
  };

  const getImageUrl = () => {
    if (course?.image_url) {
      return course.image_url;
    }
    
    // Default image based on course title
    if (course?.title.toLowerCase().includes('php')) {
      return 'https://www.php.net/images/logos/new-php-logo.svg';
    } else if (course?.title.toLowerCase().includes('python')) {
      return 'https://www.python.org/static/community_logos/python-logo-generic.svg';
    } else if (course?.title.toLowerCase().includes('flask')) {
      return 'https://flask.palletsprojects.com/en/2.0.x/_images/flask-logo.png';
    }
    
    return 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
  };

  if (!courseId) {
    return <div>Course ID is required</div>;
  }

  return (
    <div>
      {isLoading ? (
        <div className="animate-pulse space-y-4">
          <div className="bg-gray-100 h-64 rounded-lg"></div>
          <div className="bg-gray-100 h-12 rounded-lg"></div>
          <div className="bg-gray-100 h-48 rounded-lg"></div>
        </div>
      ) : course ? (
        <>
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="md:flex">
              <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-6">
                <img
                  src={getImageUrl()}
                  alt={course.title}
                  className="max-h-48 object-contain"
                />
              </div>
              <div className="md:w-2/3 p-6">
                <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <User className="w-4 h-4 mr-1" />
                  <span className="text-sm">Instructor: {course.teacher_name}</span>
                </div>
                
                <p className="text-gray-700 mb-4">{course.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{course.chapters_count}</div>
                    <div className="text-sm text-gray-500">Chapters</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{course.materials_count}</div>
                    <div className="text-sm text-gray-500">Materials</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{course.students_count}</div>
                    <div className="text-sm text-gray-500">Students</div>
                  </div>
                </div>
                
                {role === 'student' && (
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                    Enroll in Course
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === 'overview'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <BookOpen className="w-4 h-4 inline mr-1" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('chapters')}
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === 'chapters'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <FileText className="w-4 h-4 inline mr-1" />
                  Chapters
                </button>
                <button
                  onClick={() => setActiveTab('quizzes')}
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === 'quizzes'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <FileQuestion className="w-4 h-4 inline mr-1" />
                  Quizzes
                </button>
              </nav>
            </div>
            
            <div className="p-6">
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">About This Course</h2>
                  <p className="text-gray-700 mb-6">
                    {course.description}
                  </p>
                  
                  <h2 className="text-lg font-semibold mb-4">What You'll Learn</h2>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6">
                    <li>Build complete web applications with Laravel</li>
                    <li>Understand MVC architecture and how Laravel implements it</li>
                    <li>Work with databases using Eloquent ORM</li>
                    <li>Implement authentication and authorization</li>
                    <li>Create RESTful APIs</li>
                  </ul>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-gray-700 hover:text-blue-600">
                        <ThumbsUp className="w-5 h-5 mr-1" />
                        <span>Like</span>
                      </button>
                      <button className="flex items-center text-gray-700 hover:text-blue-600">
                        <Share2 className="w-5 h-5 mr-1" />
                        <span>Share</span>
                      </button>
                    </div>
                    
                    {role === 'teacher' && (
                      <Link
                        to={`/teacher/courses/edit/${courseId}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Edit Course
                      </Link>
                    )}
                  </div>
                </div>
              )}
              
              {activeTab === 'chapters' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Course Chapters</h2>
                    
                    {role === 'teacher' && (
                      <Link
                        to={`/teacher/courses/${courseId}/chapters/add`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                      >
                        Add Chapter
                      </Link>
                    )}
                  </div>
                  
                  {chapters.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">
                      No chapters available for this course yet.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {chapters.map((chapter, index) => (
                        <div key={chapter.id} className="border rounded-md p-4 hover:bg-gray-50">
                          <div className="flex items-center justify-between">
                            <h3 className="text-md font-medium">
                              <span className="text-blue-600 mr-2">{index + 1}.</span>
                              {chapter.title}
                            </h3>
                            
                            {role === 'teacher' && (
                              <div className="flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-800 text-sm">
                                  Edit
                                </button>
                                <button className="text-red-600 hover:text-red-800 text-sm">
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                          
                          {chapter.description && (
                            <p className="text-gray-600 text-sm mt-1">{chapter.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'quizzes' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Course Quizzes</h2>
                    
                    {role === 'teacher' && (
                      <Link
                        to={`/teacher/quizzes/add`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                      >
                        Add Quiz
                      </Link>
                    )}
                  </div>
                  
                  <p className="text-gray-500 text-center py-4">
                    No quizzes available for this course yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500">Course not found</p>
        </div>
      )}
    </div>
  );
};

export default CourseDetailsPage;