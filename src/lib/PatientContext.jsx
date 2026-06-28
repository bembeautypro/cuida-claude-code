import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext.jsx';
import { getPatients } from './db/patients.js';

const PatientContext = createContext(null);

export function PatientProvider({ children }) {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [currentPatientId, setCurrentPatientId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setPatients([]); setCurrentPatientId(null); setLoading(false); return; }
    getPatients()
      .then(data => {
        setPatients(data);
        setCurrentPatientId(prev => {
          if (prev && data.find(p => p.id === prev)) return prev;
          return data[0]?.id ?? null;
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const currentPatient = patients.find(p => p.id === currentPatientId) ?? null;

  return (
    <PatientContext.Provider value={{ patients, currentPatient, currentPatientId, setCurrentPatientId, loading }}>
      {children}
    </PatientContext.Provider>
  );
}

export function usePatient() {
  const ctx = useContext(PatientContext);
  if (!ctx) throw new Error('usePatient must be used within PatientProvider');
  return ctx;
}
