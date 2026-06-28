-- ═══════════════════════════════════════════════
-- CUIDA — Row Level Security
-- Execute APÓS 001_schema.sql
-- ═══════════════════════════════════════════════

alter table profiles            enable row level security;
alter table patients            enable row level security;
alter table family_members      enable row level security;
alter table medications         enable row level security;
alter table medication_schedules enable row level security;
alter table dose_logs           enable row level security;
alter table appointments        enable row level security;
alter table exams               enable row level security;
alter table exam_results        enable row level security;
alter table medical_history     enable row level security;
alter table notification_settings enable row level security;

-- Helper: check if user has access to patient
create or replace function user_has_patient_access(p_patient_id uuid)
returns boolean language sql security definer as $$
  select exists(
    select 1 from family_members
    where patient_id = p_patient_id
      and user_id = auth.uid()
      and invite_status = 'accepted'
  );
$$;

-- PROFILES
create policy "Own profile" on profiles
  for all using (id = auth.uid());

-- PATIENTS
create policy "Patient access via family" on patients
  for select using (user_has_patient_access(id));

create policy "Create patient" on patients
  for insert with check (created_by = auth.uid());

create policy "Edit patient if admin" on patients
  for update using (
    exists(select 1 from family_members
      where patient_id = patients.id
        and user_id = auth.uid()
        and (permissions->>'admin')::boolean = true)
  );

-- FAMILY MEMBERS
create policy "View family of accessible patients" on family_members
  for select using (user_has_patient_access(patient_id));

create policy "Manage family if admin" on family_members
  for all using (
    exists(select 1 from family_members fm
      where fm.patient_id = family_members.patient_id
        and fm.user_id = auth.uid()
        and (fm.permissions->>'admin')::boolean = true)
  );

-- MEDICATIONS
create policy "View meds of accessible patients" on medications
  for select using (user_has_patient_access(patient_id));

create policy "Manage meds if edit permission" on medications
  for all using (
    exists(select 1 from family_members
      where patient_id = medications.patient_id
        and user_id = auth.uid()
        and ((permissions->>'edit')::boolean = true or (permissions->>'admin')::boolean = true))
  );

-- MEDICATION SCHEDULES
create policy "View schedules" on medication_schedules
  for select using (
    exists(select 1 from medications m
      where m.id = medication_schedules.medication_id
        and user_has_patient_access(m.patient_id))
  );

-- DOSE LOGS
create policy "View dose logs" on dose_logs
  for select using (user_has_patient_access(patient_id));

create policy "Confirm doses" on dose_logs
  for update using (user_has_patient_access(patient_id));

-- APPOINTMENTS
create policy "View appointments" on appointments
  for select using (user_has_patient_access(patient_id));

create policy "Manage appointments" on appointments
  for all using (user_has_patient_access(patient_id));

-- EXAMS
create policy "View exams" on exams
  for select using (user_has_patient_access(patient_id));

create policy "Manage exams" on exams
  for all using (user_has_patient_access(patient_id));

-- EXAM RESULTS
create policy "View exam results" on exam_results
  for select using (
    exists(select 1 from exams e
      where e.id = exam_results.exam_id
        and user_has_patient_access(e.patient_id))
  );

-- MEDICAL HISTORY
create policy "View medical history" on medical_history
  for select using (user_has_patient_access(patient_id));

create policy "Manage medical history" on medical_history
  for all using (user_has_patient_access(patient_id));

-- NOTIFICATION SETTINGS
create policy "Own notification settings" on notification_settings
  for all using (user_id = auth.uid());
