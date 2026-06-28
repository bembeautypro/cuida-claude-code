import { useState, useEffect, useCallback } from 'react';
import { getExams, getMedicalHistory } from '../db/exams.js';

export function useExams(patientId) {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!patientId) { setExams([]); setLoading(false); return; }
    try {
      setLoading(true);
      const data = await getExams(patientId);
      setExams(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => { load(); }, [load]);

  return { exams, loading, error, reload: load };
}

export function useMedicalHistory(patientId) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!patientId) { setHistory([]); setLoading(false); return; }
    try {
      setLoading(true);
      const data = await getMedicalHistory(patientId);
      setHistory(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => { load(); }, [load]);

  return { history, loading, reload: load };
}
