import React from 'react';

const AdminDocumentList = ({ documents, onEdit, onDelete }) => {
  const getFileIcon = (type) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('sheet') || type.includes('excel')) return '📊';
    if (type.includes('image')) return '🖼️';
    return '📁';
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4 text-blue-800">Comunicados</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Archivo</th>
              <th className="py-3 px-4 text-left">Título</th>
              <th className="py-3 px-4 text-left">Ubicación</th>
              <th className="py-3 px-4 text-left">Publicación</th>
              <th className="py-3 px-4 text-left">Vigencia</th>
              <th className="py-3 px-4 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <span className="text-xl mr-2">{getFileIcon(doc.type)}</span>
                    <span>{doc.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4">{doc.title}</td>
                <td className="py-3 px-4">{doc.location}</td>
                <td className="py-3 px-4">{new Date(doc.publishDate).toLocaleDateString()}</td>
                <td className="py-3 px-4">{new Date(doc.expirationDate).toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(doc)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(doc.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDocumentList;