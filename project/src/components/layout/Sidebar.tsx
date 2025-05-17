import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileQuestion, 
  PlusCircle, 
  Users, 
  Settings, 
  KeyRound,
  LogOut
} from 'lucide-react';

type SidebarProps = {
  role: string;
};

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className="bg-white shadow-md w-64 h-screen">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-700">Panel de control</h2>
        <nav className="mt-6">
          <ul className="space-y-1">
            <li>
              <Link
                to={`/${role}/dashboard`}
                className={`flex items-center px-4 py-2 text-sm rounded-md ${
                  isActive(`/${role}/dashboard`)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <LayoutDashboard className="h-5 w-5 mr-3" />
                <span>Panel de control</span>
              </Link>
            </li>
            <li>
              <Link
                to={`/${role}/courses`}
                className={`flex items-center px-4 py-2 text-sm rounded-md ${
                  isActive(`/${role}/courses`) || location.pathname.includes(`/${role}/courses/`)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <BookOpen className="h-5 w-5 mr-3" />
                <span>Mis cursos</span>
              </Link>
            </li>
            <li>
              <Link
                to={`/${role}/quizzes`}
                className={`flex items-center px-4 py-2 text-sm rounded-md ${
                  isActive(`/${role}/quizzes`) || location.pathname.includes(`/${role}/quizzes/`)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FileQuestion className="h-5 w-5 mr-3" />
                <span>Examen</span>
              </Link>
            </li>
            {role === 'teacher' && (
              <>
                <li>
                  <Link
                    to={`/${role}/quizzes/add`}
                    className={`flex items-center px-4 py-2 text-sm rounded-md ${
                      isActive(`/${role}/quizzes/add`)
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <PlusCircle className="h-5 w-5 mr-3" />
                    <span>Añadir Examen</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/${role}/users`}
                    className={`flex items-center px-4 py-2 text-sm rounded-md ${
                      isActive(`/${role}/users`)
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Users className="h-5 w-5 mr-3" />
                    <span>Mis Usuarios</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/${role}/courses/add`}
                    className={`flex items-center px-4 py-2 text-sm rounded-md ${
                      isActive(`/${role}/courses/add`)
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <PlusCircle className="h-5 w-5 mr-3" />
                    <span>Añadir Curso</span>
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to={`/${role}/profile`}
                className={`flex items-center px-4 py-2 text-sm rounded-md ${
                  isActive(`/${role}/profile`)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Settings className="h-5 w-5 mr-3" />
                <span>Configuración de perfil</span>
              </Link>
            </li>
            <li>
              <Link
                to={`/${role}/change-password`}
                className={`flex items-center px-4 py-2 text-sm rounded-md ${
                  isActive(`/${role}/change-password`)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <KeyRound className="h-5 w-5 mr-3" />
                <span>Cambiar contraseña</span>
              </Link>
            </li>
            <li>
              <Link
                to="/logout"
                className="flex items-center px-4 py-2 text-sm rounded-md text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span>Cerrar sesión</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
