import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

type CourseFormProps = {
  courseId?: string;
  teacherId: string;
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
};

type Course = {
  id: string;
  title: string;
  description: string;
  technologies: string;
  image_url: string | null;
};

const CourseForm: React.FC<CourseFormProps> = ({ 
  courseId, 
  teacherId, 
  onSubmit, 
  isLoading 
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (courseId) {
      setIsEditing(true);
      fetchCourse();
    }
  }, [courseId]);

  const fetchCourse = async () => {
    if (!courseId) return;

    try {
      // In a real implementation, we'd fetch from Supabase
      // const { data, error } = await supabase
      //   .from('courses')
      //   .select('*')
      //   .eq('id', courseId)
      //   .single();
      
      // if (error) throw error;
      
      // Mock data for the example
      const data: Course = {
        id: courseId,
        title: 'PHP Course Laravel',
        description: 'Laravel course has been updated',
        technologies: 'laravel,php,mysql',
        image_url: null
      };
      
      setTitle(data.title);
      setDescription(data.description);
      setTechnologies(data.technologies);
      
      if (data.image_url) {
        setPreviewUrl(data.image_url);
      }
    } catch (err: any) {
      console.error('Error fetching course:', err);
      setError('Failed to load course data');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage(null);
      setPreviewUrl(null);
      return;
    }
    
    const file = e.target.files[0];
    setImage(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('technologies', technologies);
    formData.append('teacher_id', teacherId);
    
    if (image) {
      formData.append('image', image);
    }
    
    if (courseId) {
      formData.append('id', courseId);
    }
    
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">
        {isEditing ? 'Actualizar curso' : 'Añadir nuevo curso'}
      </h2>
      
      {error && (
        <div className="mb-4 bg-red-50 text-red-700 p-3 rounded-md text-sm">
          {error || 'Error al cargar datos del curso'}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="course-image" className="block text-sm font-medium text-gray-700 mb-1">
            Imagen del curso
          </label>
          <input
            type="file"
            id="course-image"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept="image/*"
          />
          {previewUrl && (
            <div className="mt-2">
              <img
                src={previewUrl}
                alt="Vista previa del curso"
                className="w-32 h-32 object-cover border rounded-md"
              />
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <label htmlFor="technologies" className="block text-sm font-medium text-gray-700 mb-1">
            Tecnologías
          </label>
          <input
            type="text"
            id="technologies"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., react,javascript,node"
          />
          <p className="mt-1 text-xs text-gray-500">
            Lista de tecnologías utilizadas en este curso, separadas por comas
          </p>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Guardando...' : isEditing ? 'Actualizar curso' : 'Añadir curso'}
        </button>
      </form>
    </div>
  );
};

export default CourseForm;
