import React from 'react';

const DocumentList = ({ documents, onDocumentClick }) => {
  const getFileIcon = (type) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('sheet') || type.includes('excel')) return '📊';
    if (type.includes('image')) return '🖼️';
    return '📁';
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-blue-800">Comunicados recientes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc, index) => (
          <div 
            key={index} 
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onDocumentClick(doc)}
          >
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">{getFileIcon(doc.type)}</span>
              <h3 className="font-medium text-gray-800">{doc.name}</h3>
            </div>
            <p className="text-sm text-gray-500">{new Date(doc.uploadDate).toLocaleDateString()}</p>
            <p className="text-xs text-gray-400 mt-2">{doc.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;