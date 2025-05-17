import React from 'react';
import { Search, UserCheck, UserX } from 'lucide-react';

type Student = {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  result?: {
    score: number;
    totalQuestions: number;
  };
};

type StudentListProps = {
  students: Student[];
  showResults?: boolean;
  onShowResult?: (studentId: string) => void;
};

const StudentList: React.FC<StudentListProps> = ({ 
  students, 
  showResults = false,
  onShowResult
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="flex items-center p-4 border-b">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar estudiantes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>
      
      {filteredStudents.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          No se encontraron estudiantes
        </div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Correo electrónico
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha de Ingreso
              </th>
              {showResults && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resultado
                </th>
              )}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acción
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium">{student.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{student.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{student.joinDate}</div>
                </td>
                {showResults && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.result ? (
                      <div className="text-sm">
                        <span className={`font-medium ${student.result.score === 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {student.result.score} / {student.result.totalQuestions}
                        </span>
                        <span className="ml-2 text-gray-500">
                          ({((student.result.score / student.result.totalQuestions) * 100).toFixed(0)}%)
                        </span>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">No intentado</div>
                    )}
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {showResults && onShowResult && (
                    <button
                      onClick={() => onShowResult(student.id)}
                      className="text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded-md"
                    >
                      Mostrar Resultado
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentList;
