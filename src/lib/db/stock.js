import { supabase } from '../supabase.js';

export async function getLowStock(patientId, thresholdDays = 7) {
  const { data, error } = await supabase
    .from('medications')
    .select('*')
    .eq('patient_id', patientId)
    .not('stock_qty', 'is', null);
  if (error) throw error;

  return data.filter(med => {
    // Calculate days remaining based on daily doses
    const dailyDoses = 1; // simplified — ideally calc from schedules
    return med.stock_qty / dailyDoses <= thresholdDays;
  });
}

export async function adjustStock(medicationId, delta) {
  const { data: med } = await supabase
    .from('medications')
    .select('stock_qty')
    .eq('id', medicationId)
    .single();

  const newQty = Math.max(0, (med?.stock_qty ?? 0) + delta);
  const { error } = await supabase
    .from('medications')
    .update({ stock_qty: newQty })
    .eq('id', medicationId);
  if (error) throw error;
  return newQty;
}

export async function getNotificationSettings(userId, patientId) {
  const { data, error } = await supabase
    .from('notification_settings')
    .select('*')
    .eq('user_id', userId)
    .eq('patient_id', patientId)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function saveNotificationSettings(userId, patientId, settings) {
  const { error } = await supabase
    .from('notification_settings')
    .upsert({ user_id: userId, patient_id: patientId, ...settings });
  if (error) throw error;
}
