// Cuida — Mock data

const PROFILES = [
  {
    id: 'maria',
    name: 'Maria',
    relation: 'Mãe',
    age: 72,
    color: 'rgb(252, 224, 213)',
    fg: 'rgb(122, 60, 38)',
    bloodType: 'O+',
    allergies: ['Penicilina', 'Dipirona'],
    plano: 'Unimed Ouro',
    conditions: ['Hipertensão', 'Diabetes tipo 2', 'Hipotireoidismo'],
    medsAlert: 2,
    medsToday: 5,
    medsTaken: 3,
    emergencia: 'Carla (filha) · (11) 98123-4567',
    nextMed: { name: 'Atenolol', time: '08:00', in: '2h' },
  },
  {
    id: 'joao',
    name: 'João',
    relation: 'Pai',
    age: 75,
    color: 'rgb(212, 232, 230)',
    fg: 'rgb(1, 55, 61)',
    bloodType: 'A+',
    allergies: [],
    plano: 'Bradesco Saúde',
    conditions: ['Cardiopatia', 'Artrite'],
    medsAlert: 1,
    medsToday: 2,
    medsTaken: 1,
    emergencia: 'Carla (filha) · (11) 98123-4567',
    nextMed: { name: 'Carvedilol', time: '08:00', in: '1h' },
  },
];

const MEDS_MARIA = [
  { id: 'm1', name: 'Losartana',    dose: '50mg',  schedule: '08:00',        time: 'Manhã · 08:00', taken: true,  color: 'rgb(254, 220, 195)', icon: '💊', stock: 14, max: 30, stockMax: 30, alert: false },
  { id: 'm2', name: 'Metformina',   dose: '850mg', schedule: '08:00, 20:00', time: 'Manhã · 08:00', taken: true,  color: 'rgb(212, 232, 230)', icon: '🔵', stock: 22, max: 60, stockMax: 60, alert: false },
  { id: 'm3', name: 'Levotiroxina', dose: '75mcg', schedule: '07:00 (jejum)',time: 'Manhã · 07:00', taken: true,  color: 'rgb(218, 235, 222)', icon: '🟢', stock: 8,  max: 30, stockMax: 30, alert: true  },
  { id: 'm4', name: 'Atenolol',     dose: '25mg',  schedule: '08:00',        time: 'Manhã · 08:00', taken: false, color: 'rgb(232, 220, 240)', icon: '🟣', stock: 4,  max: 30, stockMax: 30, alert: true  },
  { id: 'm5', name: 'AAS',          dose: '100mg', schedule: '12:00',        time: 'Tarde · 12:00', taken: false, color: 'rgb(253, 233, 200)', icon: '🟠', stock: 27, max: 30, stockMax: 30, alert: false },
];

const MEDS_JOAO = [
  { id: 'j1', name: 'Carvedilol',   dose: '25mg',  schedule: '08:00, 20:00', time: 'Manhã · 08:00', taken: false, color: 'rgb(212, 232, 230)', icon: '🔵', stock: 10, max: 60, stockMax: 60, alert: false },
  { id: 'j2', name: 'Furosemida',   dose: '40mg',  schedule: '08:00',        time: 'Manhã · 08:00', taken: true,  color: 'rgb(254, 220, 195)', icon: '💊', stock: 6,  max: 30, stockMax: 30, alert: true  },
];

const STOCK_ALL = [
  { ...MEDS_MARIA[0], person: 'Maria', owner: 'Maria', critical: false, days: 14 },
  { ...MEDS_MARIA[1], person: 'Maria', owner: 'Maria', critical: false, days: 11 },
  { ...MEDS_MARIA[2], person: 'Maria', owner: 'Maria', critical: true,  days: 8  },
  { ...MEDS_MARIA[3], person: 'Maria', owner: 'Maria', critical: true,  days: 4  },
  { ...MEDS_MARIA[4], person: 'Maria', owner: 'Maria', critical: false, days: 27 },
  { ...MEDS_JOAO[0],  person: 'João',  owner: 'João',  critical: false, days: 5  },
  { ...MEDS_JOAO[1],  person: 'João',  owner: 'João',  critical: true,  days: 6  },
];

const FAMILY = [
  { id: 'carla',  name: 'Carla',  role: 'Filha · cuidadora principal', color: 'rgb(218, 235, 222)', status: 'online',  perms: 'Acesso total'  },
  { id: 'rafael', name: 'Rafael', role: 'Filho',                        color: 'rgb(212, 232, 230)', status: 'offline', perms: 'Ver remédios'  },
  { id: 'sofia',  name: 'Sofia',  role: 'Filha',                        color: 'rgb(232, 220, 240)', status: 'offline', perms: 'Ver remédios'  },
];

const CUIDA_DATA = { PROFILES, MEDS_MARIA, MEDS_JOAO, STOCK_ALL, FAMILY };

export { CUIDA_DATA, PROFILES, MEDS_MARIA, MEDS_JOAO, STOCK_ALL, FAMILY };
