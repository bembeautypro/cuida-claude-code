import { supabase } from '../supabase.js';

export async function getPatients(userId) {
  const { data, error } = await supabase
    .from('patients')
    .select('*, family_members!inner(user_id, role, permissions)')
    .eq('family_members.user_id', userId)
    .order('created_at');
  if (error) throw error;
  return data;
}

export async function createPatient(userId, patient) {
  const { data, error } = await supabase
    .from('patients')
    .insert({ ...patient, created_by: userId })
    .select()
    .single();
  if (error) throw error;

  // Add creator as main caregiver
  await supabase.from('family_members').insert({
    patient_id: data.id,
    user_id: userId,
    role: 'cuidador_principal',
    invite_status: 'accepted',
    permissions: { view: true, edit: true, admin: true },
  });

  return data;
}

export async function updatePatient(id, updates) {
  const { data, error } = await supabase
    .from('patients')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}
