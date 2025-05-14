export const getDocuments = () => {
  const docs = localStorage.getItem('walmart-documents');
  return docs ? JSON.parse(docs) : null;
};

export const saveDocuments = (documents) => {
  localStorage.setItem('walmart-documents', JSON.stringify(documents));
};

export const addDocument = (newDocument) => {
  const documents = getDocuments() || [];
  saveDocuments([newDocument, ...documents]);
};

export const updateDocument = (id, updatedDoc) => {
  const documents = getDocuments() || [];
  const updatedDocuments = documents.map(doc => 
    doc.id === id ? { ...doc, ...updatedDoc } : doc
  );
  saveDocuments(updatedDocuments);
};

export const deleteDocument = (id) => {
  const documents = getDocuments() || [];
  const filteredDocuments = documents.filter(doc => doc.id !== id);
  saveDocuments(filteredDocuments);
};
