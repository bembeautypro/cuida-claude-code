import { supabase } from '../supabase.js';

export async function getFamilyMembers(patientId) {
  const { data, error } = await supabase
    .from('family_members')
    .select('*, profiles(full_name, email, avatar_url)')
    .eq('patient_id', patientId)
    .order('created_at');
  if (error) throw error;
  return data;
}

export async function inviteMember(patientId, email, role, invitedBy) {
  // Check if user exists
  const { data: existing } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', email)
    .single();

  const { data, error } = await supabase
    .from('family_members')
    .insert({
      patient_id: patientId,
      user_id: existing?.id ?? null,
      invite_email: email,
      role,
      invited_by: invitedBy,
      invite_status: 'pending',
      permissions: { view: true, edit: false, admin: false },
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateMemberPermissions(memberId, permissions) {
  const { error } = await supabase
    .from('family_members')
    .update({ permissions })
    .eq('id', memberId);
  if (error) throw error;
}

export async function removeMember(memberId) {
  const { error } = await supabase
    .from('family_members')
    .delete()
    .eq('id', memberId);
  if (error) throw error;
}

export async function acceptInvite(memberId) {
  const { error } = await supabase
    .from('family_members')
    .update({ invite_status: 'accepted' })
    .eq('id', memberId);
  if (error) throw error;
}
