import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

type QuizFormProps = {
  courseId?: string;
  onSubmit: (data: QuizFormData) => void;
  isLoading: boolean;
};

export type QuizFormData = {
  title: string;
  courseId?: string;
  questions: {
    question: string;
    options: string[];
    correctOption: number;
  }[];
};

const QuizForm: React.FC<QuizFormProps> = ({ courseId, onSubmit, isLoading }) => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    {
      question: '',
      options: ['', '', '', ''],
      correctOption: 0
    }
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        options: ['', '', '', ''],
        correctOption: 0
      }
    ]);
  };

  const handleRemoveQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const handleQuestionChange = (index: number, field: string, value: string) => {
    const updatedQuestions = [...questions];
    (updatedQuestions[index] as any)[field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectOptionChange = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctOption = optionIndex;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      courseId,
      questions
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Añadir Nuevo Examen</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Título del Examen
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
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Preguntas</h3>
            <button
              type="button"
              onClick={handleAddQuestion}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <PlusCircle className="w-5 h-5 mr-1" />
              Añadir Pregunta
            </button>
          </div>
          
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="border border-gray-200 rounded-md p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Pregunta {questionIndex + 1}</h4>
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(questionIndex)}
                  className="text-red-500 hover:text-red-700"
                  disabled={questions.length === 1}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mb-4">
                <label htmlFor={`question-${questionIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Texto de la Pregunta
                </label>
                <input
                  type="text"
                  id={`question-${questionIndex}`}
                  value={question.question}
                  onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-3">
                <p className="block text-sm font-medium text-gray-700 mb-2">Opciones</p>
                
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center mb-2">
                    <input
                      type="radio"
                      id={`correct-${questionIndex}-${optionIndex}`}
                      name={`correct-${questionIndex}`}
                      checked={question.correctOption === optionIndex}
                      onChange={() => handleCorrectOptionChange(questionIndex, optionIndex)}
                      className="mr-2"
                      required
                    />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`Opción ${optionIndex + 1}`}
                      required
                    />
                  </div>
                ))}
                
                <p className="text-sm text-gray-500 mt-1">
                  Selecciona el botón de radio junto a la respuesta correcta
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Creando...' : 'Crear Examen'}
        </button>
      </form>
    </div>
  );
};

export default QuizForm;
