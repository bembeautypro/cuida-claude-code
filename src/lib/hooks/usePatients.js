import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../AuthContext.jsx';
import { getPatients, createPatient } from '../db/patients.js';

export function usePatients() {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!user) { setPatients([]); setLoading(false); return; }
    try {
      setLoading(true);
      const data = await getPatients();
      setPatients(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { load(); }, [load]);

  async function addPatient(fields) {
    const p = await createPatient(fields);
    setPatients(prev => [...prev, p]);
    return p;
  }

  return { patients, loading, error, reload: load, addPatient };
}
