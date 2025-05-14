import React, { useState, useEffect } from 'react';
import { logToSharePoint } from '../utils/sharepoint';

const UserDocumentList = ({ documents }) => {
  const [viewedDocument, setViewedDocument] = useState(null);

  useEffect(() => {
    logToSharePoint('page-view', 'v_50');
  }, []);

  const getFileIcon = (type) => {
    if (type.includes('pdf')) return '📄 PDF';
    if (type.includes('sheet') || type.includes('excel')) return '📊 Excel';
    if (type.includes('image')) return '🖼️ Imagen';
    return '📁 Archivo';
  };

  const handleDocumentAction = (doc, actionType) => {
    logToSharePoint(actionType, {
      title: doc.title,
      user: 'current-user',
      date: new Date().toISOString()
    });

    if (actionType === 'download' && (doc.type.includes('sheet') || doc.type.includes('excel'))) {
      const link = document.createElement('a');
      link.href = doc.sharepointUrl;
      link.download = doc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      setViewedDocument(doc);
    }
  };

  const closeDocumentViewer = () => {
    setViewedDocument(null);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-MX', options);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Comunicados Corporativos</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Documento</th>
              <th className="py-3 px-4 text-left">Tipo</th>
              <th className="py-3 px-4 text-left">Publicación</th>
              <th className="py-3 px-4 text-left">Vigencia</th>
              <th className="py-3 px-4 text-left">Ubicación</th>
              <th className="py-3 px-4 text-left">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-800">{doc.title}</div>
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {getFileIcon(doc.type)}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">
                  {formatDate(doc.publishDate)}
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">
                  {formatDate(doc.expirationDate)}
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">
                  {doc.location}
                </td>
                <td className="py-3 px-4">
                  {doc.type.includes('sheet') || doc.type.includes('excel') ? (
                    <button
                      onClick={() => handleDocumentAction(doc, 'download')}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Descargar
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDocumentAction(doc, 'view')}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Ver
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-xl font-bold">{viewedDocument.title}</h3>
              <button 
                onClick={closeDocumentViewer}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              {viewedDocument.type.includes('pdf') ? (
                <iframe 
                  src={viewedDocument.sharepointUrl} 
                  className="w-full h-[70vh]"
                  title={viewedDocument.title}
                />
              ) : viewedDocument.type.includes('image') ? (
                <img 
                  src={viewedDocument.sharepointUrl} 
                  alt={viewedDocument.title}
                  className="max-w-full max-h-[70vh] mx-auto"
                />
              ) : (
                <div className="text-center py-10">
                  <p className="text-lg">Este tipo de archivo no se puede visualizar directamente</p>
                  <button
                    onClick={() => handleDocumentAction(viewedDocument, 'download')}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                  >
                    Descargar Archivo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDocumentList;

// DONE