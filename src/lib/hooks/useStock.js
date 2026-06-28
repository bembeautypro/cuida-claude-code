import { useState, useEffect, useCallback } from 'react';
import { getLowStock, adjustStock, getNotificationSettings, saveNotificationSettings } from '../db/stock.js';

export function useStock(patientId, thresholdDays = 7) {
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!patientId) { setLowStock([]); setLoading(false); return; }
    try {
      setLoading(true);
      const data = await getLowStock(patientId, thresholdDays);
      setLowStock(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [patientId, thresholdDays]);

  useEffect(() => { load(); }, [load]);

  async function adjust(medicationId, delta) {
    const newQty = await adjustStock(medicationId, delta);
    setLowStock(prev => {
      const updated = prev.map(m => m.id === medicationId ? { ...m, stock_qty: newQty } : m);
      return updated.filter(m => m.stock_qty / 1 <= thresholdDays);
    });
    return newQty;
  }

  return { lowStock, loading, reload: load, adjust };
}

export function useNotificationSettings(userId, patientId) {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!userId || !patientId) { setLoading(false); return; }
    try {
      setLoading(true);
      const data = await getNotificationSettings(userId, patientId);
      setSettings(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [userId, patientId]);

  useEffect(() => { load(); }, [load]);

  async function save(fields) {
    await saveNotificationSettings(userId, patientId, fields);
    setSettings(prev => ({ ...prev, ...fields }));
  }

  return { settings, loading, reload: load, save };
}
