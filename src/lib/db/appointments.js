import { supabase } from '../supabase.js';

export async function getAppointments(patientId) {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('patient_id', patientId)
    .order('scheduled_at');
  if (error) throw error;
  return data;
}

export async function getUpcomingAppointments(patientId, limit = 3) {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('patient_id', patientId)
    .gte('scheduled_at', new Date().toISOString())
    .order('scheduled_at')
    .limit(limit);
  if (error) throw error;
  return data;
}

export async function createAppointment(appt) {
  const { data, error } = await supabase
    .from('appointments')
    .insert(appt)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateAppointment(id, updates) {
  const { data, error } = await supabase
    .from('appointments')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteAppointment(id) {
  const { error } = await supabase.from('appointments').delete().eq('id', id);
  if (error) throw error;
}
