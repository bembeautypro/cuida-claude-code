import { supabase } from '../supabase.js';

export async function getPatients() {
  // RLS filters automatically to patients where auth.uid() is a family_member
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .order('created_at');
  if (error) throw error;
  return data;
}

export async function createPatient(patient) {
  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('patients')
    .insert({ ...patient, created_by: user.id })
    .select()
    .single();
  if (error) throw error;

  // Add creator as cuidador_principal with full admin permissions
  const { error: famError } = await supabase.from('family_members').insert({
    patient_id: data.id,
    user_id: user.id,
    role: 'cuidador_principal',
    invite_status: 'accepted',
    permissions: { view: true, edit: true, admin: true },
    invited_by: user.id,
  });
  if (famError) console.error('family_members insert failed:', famError.message);

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
