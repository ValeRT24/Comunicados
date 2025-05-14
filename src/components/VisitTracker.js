import React, { useEffect } from 'react';

const VisitTracker = () => {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Simulación de envío a SharePoint
        console.log('Registrando visita en SharePoint...');
        // Aquí iría el código real para enviar a SharePoint
      } catch (error) {
        console.error('Error al registrar visita:', error);
      }
    };

    trackVisit();
  }, []);

  return null;
};

export default VisitTracker;