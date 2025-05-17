/*
  # Initial Schema for Instituto Lidera Platform

  1. New Tables
    - `users` - Store user information with role differentiation
    - `courses` - Store course information
    - `chapters` - Store course chapters
    - `quizzes` - Store quiz information
    - `quiz_questions` - Store quiz questions with options
    - `quiz_attempts` - Track student quiz attempts and scores
    - `enrollments` - Track student enrollments in courses
    - `study_materials` - Store materials related to courses

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their data
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role text NOT NULL CHECK (role IN ('student', 'teacher')),
  mobile text,
  skills text,
  qualification text,
  created_at timestamptz DEFAULT now()
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text,
  technologies text,
  teacher_id uuid REFERENCES users(id) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Chapters table
CREATE TABLE IF NOT EXISTS chapters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  course_id uuid REFERENCES courses(id) NOT NULL,
  video_url text,
  remarks text,
  created_at timestamptz DEFAULT now()
);

-- Quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  course_id uuid REFERENCES courses(id) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Quiz questions table
CREATE TABLE IF NOT EXISTS quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid REFERENCES quizzes(id) NOT NULL,
  question text NOT NULL,
  options jsonb NOT NULL,
  correct_option integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Quiz attempts table
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES users(id) NOT NULL,
  quiz_id uuid REFERENCES quizzes(id) NOT NULL,
  score integer NOT NULL DEFAULT 0,
  total_questions integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES users(id) NOT NULL,
  course_id uuid REFERENCES courses(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(student_id, course_id)
);

-- Study materials table
CREATE TABLE IF NOT EXISTS study_materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  course_id uuid REFERENCES courses(id) NOT NULL,
  file_url text NOT NULL,
  remarks text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_materials ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can read/update their own data
CREATE POLICY "Users can read their own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Teachers can create courses
CREATE POLICY "Teachers can create courses"
  ON courses
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'teacher'
    )
  );

-- Teachers can update/delete their own courses
CREATE POLICY "Teachers can update their own courses"
  ON courses
  FOR UPDATE
  TO authenticated
  USING (
    teacher_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'teacher'
    )
  );

CREATE POLICY "Teachers can delete their own courses"
  ON courses
  FOR DELETE
  TO authenticated
  USING (
    teacher_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'teacher'
    )
  );

-- Everyone can read courses
CREATE POLICY "Anyone can read courses"
  ON courses
  FOR SELECT
  TO authenticated
  USING (true);

-- Chapters policies
CREATE POLICY "Teachers can manage chapters for their courses"
  ON chapters
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = chapters.course_id
      AND courses.teacher_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can read chapters"
  ON chapters
  FOR SELECT
  TO authenticated
  USING (true);

-- Quizzes policies
CREATE POLICY "Teachers can manage quizzes for their courses"
  ON quizzes
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = quizzes.course_id
      AND courses.teacher_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can read quizzes"
  ON quizzes
  FOR SELECT
  TO authenticated
  USING (true);

-- Quiz questions policies
CREATE POLICY "Teachers can manage quiz questions"
  ON quiz_questions
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM quizzes
      JOIN courses ON quizzes.course_id = courses.id
      WHERE quizzes.id = quiz_questions.quiz_id
      AND courses.teacher_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can read quiz questions"
  ON quiz_questions
  FOR SELECT
  TO authenticated
  USING (true);

-- Quiz attempts policies
CREATE POLICY "Students can create quiz attempts"
  ON quiz_attempts
  FOR INSERT
  TO authenticated
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can read their own quiz attempts"
  ON quiz_attempts
  FOR SELECT
  TO authenticated
  USING (
    student_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM quizzes
      JOIN courses ON quizzes.course_id = courses.id
      WHERE quizzes.id = quiz_attempts.quiz_id
      AND courses.teacher_id = auth.uid()
    )
  );

-- Enrollments policies
CREATE POLICY "Students can enroll in courses"
  ON enrollments
  FOR INSERT
  TO authenticated
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can read their own enrollments"
  ON enrollments
  FOR SELECT
  TO authenticated
  USING (
    student_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = enrollments.course_id
      AND courses.teacher_id = auth.uid()
    )
  );

-- Study materials policies
CREATE POLICY "Teachers can manage study materials for their courses"
  ON study_materials
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = study_materials.course_id
      AND courses.teacher_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can read study materials"
  ON study_materials
  FOR SELECT
  TO authenticated
  USING (true);
