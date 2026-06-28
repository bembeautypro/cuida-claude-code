import { useState, useEffect, useCallback } from 'react';
import { getAppointments, getUpcomingAppointments, createAppointment, updateAppointment, deleteAppointment } from '../db/appointments.js';

export function useAppointments(patientId) {
  const [appointments, setAppointments] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!patientId) { setAppointments([]); setUpcoming([]); setLoading(false); return; }
    try {
      setLoading(true);
      const [all, up] = await Promise.all([getAppointments(patientId), getUpcomingAppointments(patientId)]);
      setAppointments(all);
      setUpcoming(up);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => { load(); }, [load]);

  async function add(fields) {
    const a = await createAppointment({ patient_id: patientId, ...fields });
    setAppointments(prev => [a, ...prev]);
    return a;
  }

  async function update(id, fields) {
    await updateAppointment(id, fields);
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, ...fields } : a));
  }

  async function remove(id) {
    await deleteAppointment(id);
    setAppointments(prev => prev.filter(a => a.id !== id));
  }

  return { appointments, upcoming, loading, error, reload: load, add, update, remove };
}
