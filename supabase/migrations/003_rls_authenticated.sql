-- ═══════════════════════════════════════════════════════════
-- CUIDA — Fix RLS: restringir policies ao role authenticated
-- Execute no SQL Editor do Supabase Dashboard
-- ═══════════════════════════════════════════════════════════

-- ── Remove todas as policies existentes ──────────────────────
drop policy if exists "Own profile"                          on profiles;
drop policy if exists "Patient access via family"           on patients;
drop policy if exists "Create patient"                      on patients;
drop policy if exists "Edit patient if admin"               on patients;
drop policy if exists "View family of accessible patients"  on family_members;
drop policy if exists "Manage family if admin"              on family_members;
drop policy if exists "View meds of accessible patients"    on medications;
drop policy if exists "Manage meds if edit permission"      on medications;
drop policy if exists "View schedules"                      on medication_schedules;
drop policy if exists "View dose logs"                      on dose_logs;
drop policy if exists "Confirm doses"                       on dose_logs;
drop policy if exists "Manage dose logs"                    on dose_logs;
drop policy if exists "View appointments"                   on appointments;
drop policy if exists "Manage appointments"                 on appointments;
drop policy if exists "View exams"                          on exams;
drop policy if exists "Manage exams"                        on exams;
drop policy if exists "View exam results"                   on exam_results;
drop policy if exists "View medical history"                on medical_history;
drop policy if exists "Manage medical history"              on medical_history;
drop policy if exists "Own notification settings"           on notification_settings;

-- ── PROFILES ─────────────────────────────────────────────────
create policy "Own profile"
  on profiles for all
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

-- ── PATIENTS ─────────────────────────────────────────────────
create policy "Patient access via family"
  on patients for select
  to authenticated
  using (user_has_patient_access(id));

create policy "Create patient"
  on patients for insert
  to authenticated
  with check (created_by = auth.uid());

create policy "Edit patient if admin"
  on patients for update
  to authenticated
  using (
    exists(select 1 from family_members
      where patient_id = patients.id
        and user_id = auth.uid()
        and (permissions->>'admin')::boolean = true)
  );

-- ── FAMILY MEMBERS ───────────────────────────────────────────
create policy "View family of accessible patients"
  on family_members for select
  to authenticated
  using (user_has_patient_access(patient_id) or user_id = auth.uid());

create policy "Manage family if admin"
  on family_members for all
  to authenticated
  using (
    exists(select 1 from family_members fm
      where fm.patient_id = family_members.patient_id
        and fm.user_id = auth.uid()
        and (fm.permissions->>'admin')::boolean = true)
  );

-- Permitir que o criador do paciente se adicione como membro
create policy "Insert own family membership"
  on family_members for insert
  to authenticated
  with check (user_id = auth.uid() or invited_by = auth.uid());

-- ── MEDICATIONS ──────────────────────────────────────────────
create policy "View meds of accessible patients"
  on medications for select
  to authenticated
  using (user_has_patient_access(patient_id));

create policy "Manage meds if edit permission"
  on medications for all
  to authenticated
  using (
    exists(select 1 from family_members
      where patient_id = medications.patient_id
        and user_id = auth.uid()
        and ((permissions->>'edit')::boolean = true
          or (permissions->>'admin')::boolean = true))
  );

-- ── MEDICATION SCHEDULES ─────────────────────────────────────
create policy "View schedules"
  on medication_schedules for select
  to authenticated
  using (
    exists(select 1 from medications m
      where m.id = medication_schedules.medication_id
        and user_has_patient_access(m.patient_id))
  );

create policy "Manage schedules if edit permission"
  on medication_schedules for all
  to authenticated
  using (
    exists(select 1 from medications m
      join family_members fm on fm.patient_id = m.patient_id
      where m.id = medication_schedules.medication_id
        and fm.user_id = auth.uid()
        and ((fm.permissions->>'edit')::boolean = true
          or (fm.permissions->>'admin')::boolean = true))
  );

-- ── DOSE LOGS ────────────────────────────────────────────────
create policy "View dose logs"
  on dose_logs for select
  to authenticated
  using (user_has_patient_access(patient_id));

create policy "Manage dose logs"
  on dose_logs for all
  to authenticated
  using (user_has_patient_access(patient_id))
  with check (user_has_patient_access(patient_id));

-- ── APPOINTMENTS ─────────────────────────────────────────────
create policy "View appointments"
  on appointments for select
  to authenticated
  using (user_has_patient_access(patient_id));

create policy "Manage appointments"
  on appointments for all
  to authenticated
  using (user_has_patient_access(patient_id))
  with check (user_has_patient_access(patient_id));

-- ── EXAMS ────────────────────────────────────────────────────
create policy "View exams"
  on exams for select
  to authenticated
  using (user_has_patient_access(patient_id));

create policy "Manage exams"
  on exams for all
  to authenticated
  using (user_has_patient_access(patient_id))
  with check (user_has_patient_access(patient_id));

-- ── EXAM RESULTS ─────────────────────────────────────────────
create policy "View exam results"
  on exam_results for select
  to authenticated
  using (
    exists(select 1 from exams e
      where e.id = exam_results.exam_id
        and user_has_patient_access(e.patient_id))
  );

create policy "Manage exam results"
  on exam_results for all
  to authenticated
  using (
    exists(select 1 from exams e
      where e.id = exam_results.exam_id
        and user_has_patient_access(e.patient_id))
  );

-- ── MEDICAL HISTORY ──────────────────────────────────────────
create policy "View medical history"
  on medical_history for select
  to authenticated
  using (user_has_patient_access(patient_id));

create policy "Manage medical history"
  on medical_history for all
  to authenticated
  using (user_has_patient_access(patient_id))
  with check (user_has_patient_access(patient_id));

-- ── NOTIFICATION SETTINGS ────────────────────────────────────
create policy "Own notification settings"
  on notification_settings for all
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());
