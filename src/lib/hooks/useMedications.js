import { useState, useEffect, useCallback } from 'react';
import { getMedications, getTodayDoses, confirmDose, skipDose, getStreak } from '../db/medications.js';

export function useMedications(patientId) {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!patientId) { setMedications([]); setLoading(false); return; }
    try {
      setLoading(true);
      const data = await getMedications(patientId);
      setMedications(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => { load(); }, [load]);

  return { medications, loading, error, reload: load };
}

export function useTodayDoses(patientId) {
  const [doses, setDoses] = useState([]);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!patientId) { setDoses([]); setLoading(false); return; }
    try {
      setLoading(true);
      const [d, s] = await Promise.all([getTodayDoses(patientId), getStreak(patientId)]);
      setDoses(d);
      setStreak(s);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => { load(); }, [load]);

  async function confirm(doseId) {
    await confirmDose(doseId);
    setDoses(prev => prev.map(d => d.id === doseId ? { ...d, status: 'taken' } : d));
  }

  async function skip(doseId) {
    await skipDose(doseId);
    setDoses(prev => prev.map(d => d.id === doseId ? { ...d, status: 'skipped' } : d));
  }

  return { doses, streak, loading, reload: load, confirm, skip };
}
