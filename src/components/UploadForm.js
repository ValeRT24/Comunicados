import React, { useState } from 'react';

const UploadForm = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      onFileUpload(selectedFile);
      setSelectedFile(null);
      event.target.reset();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-blue-800">Subir nuevo comunicado</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Seleccionar archivo:</label>
          <input 
            type="file" 
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
            accept=".pdf,.xlsx,.xls,.png,.jpg,.jpeg"
            required
          />
        </div>
        <button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
        >
          Subir Comunicado
        </button>
      </form>
    </div>
  );
};

export default UploadForm;