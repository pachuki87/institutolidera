import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, Briefcase, Award } from 'lucide-react';
import { supabase } from '../../lib/supabase';

type RegisterFormProps = {
  role: string;
  onRegister: (user: any) => void;
};

const RegisterForm: React.FC<RegisterFormProps> = ({ role, onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    skills: '',
    qualification: '',
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // For demo purposes, we'll just simulate OTP being sent
      setOtpSent(true);
      setIsLoading(false);
      
      // In a real implementation, we would register with Supabase
      // const { data, error } = await supabase.auth.signUp({
      //   email: formData.email,
      //   password: formData.password,
      // });
      
      // if (error) throw error;
      
      // Then we would store additional user data in our users table
      // await supabase.from('users').insert({
      //   id: data.user.id,
      //   name: formData.name,
      //   email: formData.email,
      //   role,
      //   mobile: formData.mobile || null,
      //   skills: formData.skills || null,
      //   qualification: formData.qualification || null,
      // });
    } catch (err: any) {
      setError(err.message || 'Failed to register');
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = () => {
    setIsLoading(true);
    
    // For demo purposes, we'll just simulate a successful verification
    setTimeout(() => {
      const user = {
        id: '123',
        ...formData,
        role,
      };
      
      onRegister(user);
      navigate(`/${role}/dashboard`);
      
      setIsLoading(false);
    }, 800);
  };

  if (otpSent) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Verificar OTP</h2>
        <p className="text-gray-600 mb-6 text-center">
          Introduce el código de verificación enviado a tu móvil
        </p>
        
        <div className="mb-6">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Introduce OTP de 6 dígitos"
            className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
            maxLength={6}
          />
        </div>
        
        <button
          onClick={handleVerifyOtp}
          className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700 transition-colors"
          disabled={isLoading || otp.length !== 6}
        >
          {isLoading ? 'Verificando...' : 'Verificar'}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">
            {role === 'teacher' ? 'Registro para profesores' : 'Registro para estudiantes'}
          </h2>
          
          {error && (
            <div className="mb-4 bg-red-50 text-red-700 p-3 rounded-md text-sm">
              {error || 'Error al registrarse'}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <User className="absolute top-3 left-3 text-gray-400" size={18} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="Tu Nombre"
                required
              />
            </div>
            
            <div className="mb-4 relative">
              <Mail className="absolute top-3 left-3 text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="Tu Correo Electrónico"
                required
              />
            </div>
            
            <div className="mb-4 relative">
              <Lock className="absolute top-3 left-3 text-gray-400" size={18} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="Contraseña"
                required
              />
            </div>
            
            {role === 'teacher' && (
              <div className="mb-4 relative">
                <Award className="absolute top-3 left-3 text-gray-400" size={18} />
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                  placeholder="Titulación"
                />
              </div>
            )}
            
            <div className="mb-4 relative">
              <Phone className="absolute top-3 left-3 text-gray-400" size={18} />
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="Número de Móvil"
              />
            </div>
            
            {role === 'teacher' && (
              <div className="mb-6 relative">
                <Briefcase className="absolute top-3 left-3 text-gray-400" size={18} />
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                  placeholder="Habilidades"
                />
              </div>
            )}
            
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>
          
          <p className="mt-6 text-sm text-center text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link to={`/login/${role}`} className="text-blue-500 hover:underline">
              Iniciar sesión
            </Link>
          </p>
        </div>
        
        <div className="hidden md:block md:w-1/2 bg-blue-50 flex items-center justify-center">
          <img 
            src="https://images.pexels.com/photos/4144294/pexels-photo-4144294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Registration illustration" 
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
