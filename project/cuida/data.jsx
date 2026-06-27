// Cuida — Mock data (profiles + medications)

const PROFILES = [
  {
    id: 'maria',
    name: 'Maria',
    relation: 'Mãe',
    age: 72,
    color: 'rgb(254, 220, 195)',  // warm peach
    fg: 'rgb(122, 60, 38)',
    initials: 'M',
    bloodType: 'A+',
    allergies: ['Penicilina', 'Frutos do mar'],
    plano: 'Bradesco Saúde · 047.812.099-3',
    emergencia: 'Carla (filha) · +55 11 98123-4567',
    medsToday: 4, medsTaken: 2, medsAlert: 1,
    nextMed: { name: 'Losartana 50mg', time: '18:00', in: 'em 2h' },
  },
  {
    id: 'joao',
    name: 'João',
    relation: 'Pai',
    age: 75,
    color: 'rgb(212, 232, 230)',
    fg: 'rgb(1, 55, 61)',
    initials: 'J',
    bloodType: 'O+',
    allergies: ['Dipirona'],
    plano: 'SUS · 705.842.119.0048',
    emergencia: 'Carla (filha) · +55 11 98123-4567',
    medsToday: 6, medsTaken: 6, medsAlert: 0,
    nextMed: { name: 'Tudo em dia', time: '—', in: 'amanhã 7h' },
  },
  {
    id: 'eu',
    name: 'Eu',
    relation: 'Você',
    age: 42,
    color: 'rgb(218, 235, 222)',
    fg: 'rgb(35, 100, 68)',
    initials: 'C',
    bloodType: 'A+',
    allergies: ['Nenhuma'],
    plano: 'Amil · 998.112.084-1',
    emergencia: 'Rafael (cônjuge) · +55 11 97765-4321',
    medsToday: 1, medsTaken: 0, medsAlert: 0,
    nextMed: { name: 'Vitamina D', time: '20:00', in: 'em 4h' },
  },
];

const MEDS_MARIA = [
  { id: 'm1', name: 'Losartana',     dose: '50mg',  time: 'Manhã · 07:00', icon: '💊', color: 'rgb(254, 220, 195)', stock: 18, stockMax: 30, taken: true,  alert: false, schedule: '1x ao dia' },
  { id: 'm2', name: 'AAS',           dose: '100mg', time: 'Manhã · 07:00', icon: '🟠', color: 'rgb(252, 224, 213)', stock: 4, stockMax: 30, taken: true,  alert: true,  schedule: '1x ao dia' },
  { id: 'm3', name: 'Atenolol',      dose: '25mg',  time: 'Tarde · 13:00', icon: '🔵', color: 'rgb(212, 232, 230)', stock: 22, stockMax: 30, taken: false, alert: false, schedule: '2x ao dia' },
  { id: 'm4', name: 'Sinvastatina',  dose: '20mg',  time: 'Noite · 22:00', icon: '🟣', color: 'rgb(232, 220, 240)', stock: 11, stockMax: 30, taken: false, alert: false, schedule: '1x ao dia' },
];

const MEDS_JOAO = [
  { id: 'j1', name: 'Metformina',    dose: '500mg', time: 'Manhã · 07:00', icon: '⚪', color: 'rgb(232, 232, 232)', stock: 24, stockMax: 60, taken: true, schedule: '2x ao dia' },
  { id: 'j2', name: 'Glifage',       dose: '850mg', time: 'Tarde · 13:00', icon: '🟢', color: 'rgb(220, 235, 215)', stock: 36, stockMax: 60, taken: true, schedule: '1x ao dia' },
  { id: 'j3', name: 'Captopril',     dose: '25mg',  time: 'Noite · 22:00', icon: '🔴', color: 'rgb(252, 220, 215)', stock: 50, stockMax: 60, taken: true, schedule: '1x ao dia' },
];

const STOCK_ALL = [
  { id: 'm2', name: 'AAS 100mg',         owner: 'Maria', stock: 4,  max: 30, days: 4,  critical: true },
  { id: 's5', name: 'Vitamina D 2000UI', owner: 'Eu',    stock: 6,  max: 30, days: 6,  critical: true },
  { id: 'm4', name: 'Sinvastatina 20mg', owner: 'Maria', stock: 11, max: 30, days: 11 },
  { id: 'm1', name: 'Losartana 50mg',    owner: 'Maria', stock: 18, max: 30, days: 18 },
  { id: 'j1', name: 'Metformina 500mg',  owner: 'João',  stock: 24, max: 60, days: 12 },
  { id: 'm3', name: 'Atenolol 25mg',     owner: 'Maria', stock: 22, max: 30, days: 22 },
  { id: 'j2', name: 'Glifage 850mg',     owner: 'João',  stock: 36, max: 60, days: 36 },
  { id: 'j3', name: 'Captopril 25mg',    owner: 'João',  stock: 50, max: 60, days: 50 },
];

const FAMILY = [
  { name: 'Carla Almeida',    role: 'Você', email: 'carla@email.com', perms: 'Editar tudo', initials: 'CA', color: 'rgb(218, 235, 222)' },
  { name: 'Rafael Almeida',   role: 'Cônjuge', email: 'rafael@email.com', perms: 'Editar', initials: 'RA', color: 'rgb(212, 232, 230)' },
  { name: 'Pedro Almeida',    role: 'Irmão',   email: 'pedro@email.com', perms: 'Visualizar', initials: 'PA', color: 'rgb(254, 220, 195)' },
  { name: 'Sofia Almeida',    role: 'Filha',   email: 'sofia@email.com', perms: 'Visualizar', initials: 'SA', color: 'rgb(252, 224, 213)' },
];

Object.assign(window, {
  CUIDA_DATA: { PROFILES, MEDS_MARIA, MEDS_JOAO, STOCK_ALL, FAMILY },
});
