import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Download } from 'lucide-react';
import { supabase } from '../../lib/supabase';

type Material = {
  id: string;
  title: string;
  detail: string;
  remarks: string | null;
};

type StudyMaterialsPageProps = {
  role: string;
};

const StudyMaterialsPage: React.FC<StudyMaterialsPageProps> = ({ role }) => {
  const { id: courseId } = useParams<{ id: string }>();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      fetchMaterials();
    }
  }, [courseId]);

  const fetchMaterials = async () => {
    setIsLoading(true);
    
    try {
      // In a real implementation, we would fetch from Supabase
      // For demo purposes, we'll use mock data
      setTimeout(() => {
        const mockMaterials: Material[] = [
          {
            id: '1',
            title: 'Study Material 4',
            detail: 'add study material 4',
            remarks: 'Add study material 4',
          },
          {
            id: '2',
            title: 'Study Material 6',
            detail: 'study material 6',
            remarks: 'Study material 6',
          },
        ];
        
        setMaterials(mockMaterials);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching materials:', error);
      setIsLoading(false);
    }
  };

  const handleDownload = (materialId: string) => {
    // In a real implementation, we would:
    // 1. Generate a download URL from Supabase Storage
    // 2. Trigger the download
    console.log('Downloading material:', materialId);
  };

  if (!courseId) {
    return <div>Se requiere el ID del curso</div>;
  }

  const googleDriveMaterials = [
    {
      title: 'BLOQUE 1 TÉCNICO EN ADICCIONES',
      url: 'https://drive.google.com/file/d/1rGYFDiX4Hge84Cu22OCxyId6ccZVMpMH/view?usp=drive_link'
    },
    {
      title: 'BLOQUE 2 TÉCNICO EN ADICCIONES',
      url: 'https://drive.google.com/file/d/1hieSdmhc82AjY4UVRJE0sm5AK5jUrXr-/view?usp=drive_link'
    },
    {
      title: 'BLOQUE 3 TÉCNICO EN ADICCIONES',
      url: 'https://drive.google.com/file/d/1AmJL7UDRKmy7y4cPUmGwIa2C2R2GcCoO/view?usp=drive_link'
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Todos los Materiales de Estudio ({materials.length + googleDriveMaterials.length})
      </h1>
      
      {isLoading ? (
        <div className="animate-pulse">
          <div className="bg-gray-100 h-12 rounded-t-lg mb-2"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-50 h-16 mb-2 rounded-md"></div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {materials.length > 0 && (
            <table className="min-w-full divide-y divide-gray-200 mb-6">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Detalle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comentarios
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {materials.map((material) => (
                  <tr key={material.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {material.title}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{material.detail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{material.remarks || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDownload(material.id)}
                        className="text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1 rounded-md"
                      >
                        <Download className="w-4 h-4 inline-block mr-1" />
                        Descargar Materiales
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Materiales de Google Drive</h3>
            <ul className="space-y-2">
              {googleDriveMaterials.map((material, index) => (
                <li key={index}>
                  <a
                    href={material.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    <Download className="w-4 h-4 inline-block mr-2" />
                    {material.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {materials.length === 0 && googleDriveMaterials.length === 0 && (
             <div className="p-6 text-center">
               <p className="text-gray-500 mb-4">
                 No se han añadido materiales de estudio a este curso todavía.
               </p>
             </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudyMaterialsPage;
