import React, { useState, useEffect } from 'react';
import { initialDocuments } from './mock/documents';
import { getDocuments, saveDocuments, addDocument, updateDocument, deleteDocument } from './utils/storage';
import AdminDocumentForm from './components/AdminDocumentForm';
import AdminDocumentList from './components/AdminDocumentList';
import UserDocumentList from './components/UserDocumentList';
import AuthSwitcher from './components/AuthSwitcher';
import { logToSharePoint } from './utils/sharepoint';

const App = () => {
  const [documents, setDocuments] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentDoc, setCurrentDoc] = useState(null);

  useEffect(() => {
    const savedDocs = getDocuments();
    setDocuments(savedDocs || initialDocuments);
    if (!savedDocs) {
      saveDocuments(initialDocuments);
    }
  }, []);

  const handleAddDocument = () => {
    setCurrentDoc(null);
    setShowForm(true);
  };

  const handleEditDocument = (doc) => {
    setCurrentDoc(doc);
    setShowForm(true);
  };

  const handleDeleteDocument = (id) => {
    deleteDocument(id);
    setDocuments(getDocuments());
  };

  const handleSubmit = (formData) => {
    if (currentDoc) {
      // Actualizar documento existente
      const updatedDoc = {
        ...currentDoc,
        title: formData.title,
        publishDate: formData.publishDate,
        expirationDate: formData.expirationDate,
        location: formData.location,
        ...(formData.file && {
          name: formData.file.name,
          type: formData.file.type,
          sharepointUrl: `https://sharepoint.com/${formData.location}/${formData.file.name}`
        })
      };
      updateDocument(currentDoc.id, updatedDoc);
    } else {
      // Crear nuevo documento
      const newDocument = {
        id: Date.now(),
        title: formData.title,
        name: formData.file.name,
        type: formData.file.type,
        publishDate: formData.publishDate,
        expirationDate: formData.expirationDate,
        location: formData.location,
        sharepointUrl: `https://sharepoint.com/${formData.location}/${formData.file.name}`
      };
      addDocument(newDocument);
    }
    setDocuments(getDocuments());
    setShowForm(false);
  };

  const toggleAuth = () => {
    setIsAdmin(!isAdmin);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Comunicados Corporativos Walmart</h1>
          <p className="text-gray-600">
            {isAdmin 
              ? 'Panel de administración de comunicados' 
              : 'Consulta los comunicados corporativos'}
          </p>
        </header>

        <AuthSwitcher isAdmin={isAdmin} toggleAuth={toggleAuth} />

        {isAdmin ? (
          <>
            {showForm ? (
              <AdminDocumentForm
                documentToEdit={currentDoc}
                onSubmit={handleSubmit}
                onCancel={() => setShowForm(false)}
              />
            ) : (
              <>
                <button
                  onClick={handleAddDocument}
                  className="mb-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
                >
                  + Nuevo Comunicado
                </button>
                <AdminDocumentList
                  documents={documents}
                  onEdit={handleEditDocument}
                  onDelete={handleDeleteDocument}
                />
              </>
            )}
          </>
        ) : (
          <UserDocumentList documents={documents} />
        )}
      </div>
    </div>
  );
};

export default App;

// DONE
