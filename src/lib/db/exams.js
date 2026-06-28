import { supabase } from '../supabase.js';

export async function getExams(patientId) {
  const { data, error } = await supabase
    .from('exams')
    .select('*, exam_results(*)')
    .eq('patient_id', patientId)
    .order('scheduled_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createExam(exam) {
  const { data, error } = await supabase
    .from('exams')
    .insert(exam)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateExamStatus(id, status, performedAt) {
  const { error } = await supabase
    .from('exams')
    .update({ status, performed_at: performedAt })
    .eq('id', id);
  if (error) throw error;
}

export async function saveExamResults(examId, results) {
  // Remove existing results and insert new ones
  await supabase.from('exam_results').delete().eq('exam_id', examId);
  if (!results.length) return;
  const { error } = await supabase.from('exam_results').insert(
    results.map(r => ({ ...r, exam_id: examId }))
  );
  if (error) throw error;
}

export async function getMedicalHistory(patientId) {
  const { data, error } = await supabase
    .from('medical_history')
    .select('*')
    .eq('patient_id', patientId)
    .order('date', { ascending: false });
  if (error) throw error;
  return data;
}

export async function addMedicalHistory(entry) {
  const { data, error } = await supabase
    .from('medical_history')
    .insert(entry)
    .select()
    .single();
  if (error) throw error;
  return data;
}
