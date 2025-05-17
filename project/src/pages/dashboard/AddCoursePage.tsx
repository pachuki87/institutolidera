import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import CourseForm from '../../components/courses/CourseForm';
import { supabase } from '../../lib/supabase';

const AddCoursePage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    
    try {
      // In a real implementation, we would:
      // 1. Upload the image to Supabase Storage if provided
      // 2. Create the course in the courses table
      
      // Mock the process for now
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success('Course created successfully!');
        navigate('/teacher/courses');
      }, 1000);
    } catch (error) {
      console.error('Error creating course:', error);
      setIsSubmitting(false);
      toast.error('Failed to create course');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add New Course</h1>
      
      <CourseForm
        teacherId="teacher-id" // In a real app, this would be the logged-in teacher's ID
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default AddCoursePage;