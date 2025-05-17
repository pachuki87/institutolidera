/*
  # Add Chat and Ratings Features

  1. New Tables
    - `chats` - Store chat messages between students and teachers
    - `course_ratings` - Store course ratings and reviews
    - `course_views` - Track course view counts
    - `favorite_courses` - Store student's favorite courses

  2. Security
    - Enable RLS on all new tables
    - Add policies for authenticated users
*/

-- Chat messages table
CREATE TABLE IF NOT EXISTS chats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES users(id) NOT NULL,
  receiver_id uuid REFERENCES users(id) NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Course ratings table
CREATE TABLE IF NOT EXISTS course_ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) NOT NULL,
  student_id uuid REFERENCES users(id) NOT NULL,
  rating integer NOT NULL CHECK (rating >= 0 AND rating <= 5),
  review text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(course_id, student_id)
);

-- Course views table
CREATE TABLE IF NOT EXISTS course_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) NOT NULL,
  viewer_id uuid REFERENCES users(id),
  viewed_at timestamptz DEFAULT now()
);

-- Favorite courses table
CREATE TABLE IF NOT EXISTS favorite_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) NOT NULL,
  student_id uuid REFERENCES users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(course_id, student_id)
);

-- Enable Row Level Security
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorite_courses ENABLE ROW LEVEL SECURITY;

-- Chat policies
CREATE POLICY "Users can read their own chats"
  ON chats
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = sender_id OR
    auth.uid() = receiver_id
  );

CREATE POLICY "Users can send messages"
  ON chats
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sender_id);

-- Course ratings policies
CREATE POLICY "Anyone can read course ratings"
  ON course_ratings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Students can rate courses they're enrolled in"
  ON course_ratings
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM enrollments
      WHERE student_id = auth.uid()
      AND course_id = course_ratings.course_id
    )
  );

-- Course views policies
CREATE POLICY "Anyone can view courses"
  ON course_views
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read course views"
  ON course_views
  FOR SELECT
  TO authenticated
  USING (true);

-- Favorite courses policies
CREATE POLICY "Students can manage their favorite courses"
  ON favorite_courses
  FOR ALL
  TO authenticated
  USING (student_id = auth.uid());

-- Add new columns to existing tables
ALTER TABLE courses ADD COLUMN IF NOT EXISTS duration interval;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS video_url text;
ALTER TABLE chapters ADD COLUMN IF NOT EXISTS video_url text;