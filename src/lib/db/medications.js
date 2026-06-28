import { supabase } from '../supabase.js';

export async function getMedications(patientId) {
  const { data, error } = await supabase
    .from('medications')
    .select('*, medication_schedules(*)')
    .eq('patient_id', patientId)
    .order('name');
  if (error) throw error;
  return data;
}

export async function createMedication(med) {
  const { schedules, ...medData } = med;
  const { data, error } = await supabase
    .from('medications')
    .insert(medData)
    .select()
    .single();
  if (error) throw error;

  if (schedules?.length) {
    await supabase.from('medication_schedules').insert(
      schedules.map(s => ({ ...s, medication_id: data.id }))
    );
  }
  return data;
}

export async function updateStock(medicationId, qty) {
  const { error } = await supabase
    .from('medications')
    .update({ stock_qty: qty })
    .eq('id', medicationId);
  if (error) throw error;
}

// Dose logs
export async function getTodayDoses(patientId) {
  const today = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase
    .from('dose_logs')
    .select('*, medications(name, dose, unit)')
    .eq('patient_id', patientId)
    .gte('scheduled_at', `${today}T00:00:00`)
    .lte('scheduled_at', `${today}T23:59:59`)
    .order('scheduled_at');
  if (error) throw error;
  return data;
}

export async function confirmDose(logId) {
  const { data: { user } } = await supabase.auth.getUser();
  const { error } = await supabase
    .from('dose_logs')
    .update({ status: 'taken', taken_at: new Date().toISOString(), confirmed_by: user.id })
    .eq('id', logId);
  if (error) throw error;
}

export async function skipDose(logId) {
  const { error } = await supabase
    .from('dose_logs')
    .update({ status: 'skipped' })
    .eq('id', logId);
  if (error) throw error;
}

export async function getStreak(patientId) {
  const { data, error } = await supabase
    .rpc('get_dose_streak', { p_patient_id: patientId });
  if (error) return 0;
  return data;
}
