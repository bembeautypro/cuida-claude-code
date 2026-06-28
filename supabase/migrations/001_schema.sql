-- ═══════════════════════════════════════════════
-- CUIDA — Schema inicial
-- Execute no SQL Editor do Supabase Dashboard
-- ═══════════════════════════════════════════════

-- 1. PROFILES (extends auth.users)
create table if not exists profiles (
  id         uuid references auth.users(id) on delete cascade primary key,
  full_name  text,
  email      text unique,
  avatar_url text,
  created_at timestamptz default now()
);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- 2. PATIENTS
create table if not exists patients (
  id               uuid default gen_random_uuid() primary key,
  name             text not null,
  birth_date       date,
  blood_type       text,
  allergies        text[] default '{}',
  conditions       text[] default '{}',
  emergency_contact text,
  emergency_phone  text,
  health_plan      text,
  avatar_color     text default 'rgb(212,232,230)',
  avatar_fg        text default 'rgb(1,55,61)',
  created_by       uuid references profiles(id),
  created_at       timestamptz default now()
);

-- 3. FAMILY MEMBERS (care team per patient)
create table if not exists family_members (
  id             uuid default gen_random_uuid() primary key,
  patient_id     uuid references patients(id) on delete cascade,
  user_id        uuid references profiles(id),
  invite_email   text,
  role           text default 'familiar',
  invite_status  text default 'pending',
  permissions    jsonb default '{"view":true,"edit":false,"admin":false}',
  invited_by     uuid references profiles(id),
  created_at     timestamptz default now(),
  unique(patient_id, user_id)
);

-- 4. MEDICATIONS
create table if not exists medications (
  id           uuid default gen_random_uuid() primary key,
  patient_id   uuid references patients(id) on delete cascade,
  name         text not null,
  dose         text,
  unit         text default 'mg',
  type         text default 'comprimido',
  instructions text,
  stock_qty    integer default 0,
  stock_max    integer default 30,
  photo_url    text,
  active       boolean default true,
  created_by   uuid references profiles(id),
  created_at   timestamptz default now()
);

-- 5. MEDICATION SCHEDULES
create table if not exists medication_schedules (
  id            uuid default gen_random_uuid() primary key,
  medication_id uuid references medications(id) on delete cascade,
  time          time not null,
  days          text[] default array['mon','tue','wed','thu','fri','sat','sun'],
  active        boolean default true
);

-- 6. DOSE LOGS
create table if not exists dose_logs (
  id            uuid default gen_random_uuid() primary key,
  schedule_id   uuid references medication_schedules(id),
  medication_id uuid references medications(id),
  patient_id    uuid references patients(id),
  scheduled_at  timestamptz not null,
  taken_at      timestamptz,
  status        text default 'pending',
  confirmed_by  uuid references profiles(id),
  notes         text,
  created_at    timestamptz default now()
);

-- 7. APPOINTMENTS (consultas)
create table if not exists appointments (
  id           uuid default gen_random_uuid() primary key,
  patient_id   uuid references patients(id) on delete cascade,
  specialty    text,
  doctor_name  text,
  location     text,
  address      text,
  scheduled_at timestamptz,
  duration_min integer default 30,
  status       text default 'scheduled',
  notes        text,
  prep_notes   text,
  companion_id uuid references profiles(id),
  created_by   uuid references profiles(id),
  created_at   timestamptz default now()
);

-- 8. EXAMS
create table if not exists exams (
  id                uuid default gen_random_uuid() primary key,
  patient_id        uuid references patients(id) on delete cascade,
  name              text not null,
  type              text,
  lab_name          text,
  scheduled_at      timestamptz,
  performed_at      timestamptz,
  status            text default 'pending',
  prep_instructions text,
  result_url        text,
  created_by        uuid references profiles(id),
  created_at        timestamptz default now()
);

-- 9. EXAM RESULTS
create table if not exists exam_results (
  id              uuid default gen_random_uuid() primary key,
  exam_id         uuid references exams(id) on delete cascade,
  parameter       text,
  value           text,
  reference_range text,
  status          text default 'normal'
);

-- 10. MEDICAL HISTORY
create table if not exists medical_history (
  id          uuid default gen_random_uuid() primary key,
  patient_id  uuid references patients(id) on delete cascade,
  type        text,
  title       text not null,
  description text,
  date        date,
  doctor      text,
  created_by  uuid references profiles(id),
  created_at  timestamptz default now()
);

-- 11. NOTIFICATION SETTINGS
create table if not exists notification_settings (
  id                   uuid default gen_random_uuid() primary key,
  user_id              uuid references profiles(id) on delete cascade,
  patient_id           uuid references patients(id) on delete cascade,
  dose_reminders       boolean default true,
  appointment_reminders boolean default true,
  stock_alerts         boolean default true,
  family_updates       boolean default true,
  whatsapp_enabled     boolean default false,
  whatsapp_number      text,
  push_enabled         boolean default false,
  push_token           text,
  unique(user_id, patient_id)
);

-- 12. STREAK FUNCTION
create or replace function get_dose_streak(p_patient_id uuid)
returns integer language plpgsql as $$
declare
  streak integer := 0;
  check_date date := current_date;
  day_ok boolean;
begin
  loop
    select exists(
      select 1 from dose_logs
      where patient_id = p_patient_id
        and status = 'taken'
        and scheduled_at::date = check_date
    ) into day_ok;

    exit when not day_ok;
    streak := streak + 1;
    check_date := check_date - 1;
    exit when streak > 365;
  end loop;
  return streak;
end;
$$;
