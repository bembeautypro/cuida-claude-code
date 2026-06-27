// Cuida landing — translations
// All copy in PT (default) + EN

const I18N = {
  pt: {
    nav: {
      product: 'Produto',
      how: 'Como funciona',
      who: 'Para quem é',
      faq: 'Perguntas',
      cta: 'Entrar na lista',
    },

    hero: {
      eyebrow: 'Lista de espera · pré-lançamento BR',
      title_1: 'A saúde da sua família,',
      title_2: 'organizada',
      title_3: 'de verdade.',
      sub: 'Cuida reúne remédios, consultas, exames, prontuários e cartão de emergência num único app. Pra quem cuida — e pra quem é cuidado.',
      counter_prefix: '+',
      counter_suffix: 'pessoas já na lista',
      hero_caption: 'Em breve · iPhone e Android',
    },

    form: {
      placeholder_name: 'Seu primeiro nome',
      placeholder_email: 'Seu melhor e-mail',
      who_label: 'Quem você cuida (ou quer cuidar)?',
      who_opts: ['Meus pais', 'Meu cônjuge', 'Meu filho', 'Eu mesmo', 'Outra pessoa'],
      submit: 'Entrar na lista de espera',
      privacy: 'A gente nunca compartilha seu e-mail. Só te avisamos quando abrir.',
      success_title: 'Você está na lista. Obrigada.',
      success_sub: 'Quando o Cuida abrir, você é uma das primeiras a saber.',
      success_share: 'Conhece alguém que precisa? Compartilhe ↓',
    },

    demo: {
      eyebrow: 'O app completo',
      title: 'Mais do que lembretes.\nSaúde de verdade.',
      sub: 'Do remédio das 8h ao laudo da biópsia. Tudo organizado, acessível e compartilhável com a família.',
      captions: [
        { h: 'Dashboard do dia', p: 'Timeline visual das doses de manhã, tarde e noite. Confirma com um toque. A família toda vê em tempo real.' },
        { h: 'Consultas com preparo', p: 'Próximas consultas, histórico de atendimentos e checklist de preparo antes de cada exame ou procedimento.' },
        { h: 'Detalhe do remédio', p: 'Foto da caixa, bula resumida, histórico de doses, interacões e alerta de estoque. Tudo em uma tela.' },
        { h: 'Exames e laudos', p: 'Resultados organizados com status (normal, alterado, crítico). Orientações de preparo antes de fazer o exame.' },
        { h: 'Prontuário digital', p: 'Resumo de saúde, histórico de consultas, vacinas e alergias num prontuário compartilhável com qualquer médico.' },
        { h: 'Histórico médico', p: 'Linha do tempo completa de diagnósticos, cirurgias, internações e eventos médicos importantes. Nada se perde.' },
      ],
    },

    how: {
      eyebrow: 'Como funciona',
      title: 'Três passos. Quinze minutos.',
      steps: [
        { n: '1', h: 'Crie o perfil de quem você cuida', p: 'Nome, idade, alergias e plano. Pode ser mais de uma pessoa.' },
        { n: '2', h: 'Cadastre remédios com a câmera', p: 'Aponte pra caixa. A gente reconhece nome, dose e horário.' },
        { n: '3', h: 'Convide a família', p: 'Divida o cuidado pelo WhatsApp. Todo mundo na mesma página.' },
      ],
    },

    who: {
      eyebrow: 'Para quem é',
      title: 'Se você é a pessoa que lembra de tudo,\nCuida é pra você.',
      cards: [
        { tag: 'Filha cuidadora', h: 'Pais idosos morando longe', p: 'Você é quem checa se a mãe tomou o remédio, quem agenda consulta, quem corre na farmácia. Cuida te tira do papel de central de chamadas.' },
        { tag: 'Cônjuge', h: 'Parceiro com condição crônica', p: 'Diabetes, hipertensão, depressão. Você cuida sem deixar virar identidade — Cuida ajuda a manter a leveza.' },
        { tag: 'Pais', h: 'Filho com saúde delicada', p: 'TDAH, asma, alergia, pediatria intensa. Você precisa lembrar de muita coisa antes do desjejum. A gente lembra junto.' },
      ],
    },

    features: {
      eyebrow: 'Funcionalidades',
      title: 'Pensado em cada detalhe.',
      items: [
        { h: 'Lembretes que funcionam', p: 'Push e WhatsApp no horário certo. Sem stress se você esquecer.' },
        { h: 'Alerta de estoque', p: 'Avisamos antes do remédio acabar. Lista pronta pra comprar.' },
        { h: 'Cartão de emergência', p: 'QR code, link público e tela de bloqueio. Salva vidas.' },
        { h: 'Família compartilhada', p: 'Convide irmãos, cônjuge, filhos. Todo mundo vê e ajuda.' },
        { h: 'Feed de atividade', p: 'Quem fez o quê, quando. Sem perder o fio.' },
        { h: 'Privacidade primeiro', p: 'Dados criptografados. Você decide quem vê o quê.' },
      ],
    },

    sos: {
      eyebrow: 'Momento que importa',
      title: 'Em uma emergência,\nseu celular vira o cartão dela.',
      p: 'Alergias, tipo sanguíneo, remédios em uso e contato de emergência ficam visíveis na tela de bloqueio — sem desbloquear. Você pode entregar o celular pro socorrista e ele já sabe o essencial.',
      bullets: ['Funciona offline', 'QR code escaneável', 'Link compartilhável por WhatsApp', 'PDF imprimível pra geladeira'],
      cta: 'Quero esse cartão pra família',
    },

    faq: {
      eyebrow: 'Perguntas',
      title: 'Tudo o que perguntam pra gente.',
      items: [
        { q: 'Quanto vai custar?', a: 'Estamos definindo. Quem entrar na lista de espera ganha desconto vitalício e prioridade no acesso. O plano básico vai começar gratuito.' },
        { q: 'Quando abre?', a: 'Estamos finalizando o app. Previsão de abrir o beta fechado em poucas semanas, e em seguida o lançamento público. Lista de espera tem prioridade.' },
        { q: 'Funciona no Android?', a: 'Sim. iOS e Android, lançamento simultâneo. Também terá versão web para gerenciar pelo computador.' },
        { q: 'Meus dados ficam seguros?', a: 'Sim. Criptografia em repouso e em trânsito, autenticação em duas etapas opcional, conformidade com a LGPD. Você decide quem vê o quê.' },
        { q: 'A família precisa ter conta também?', a: 'Não obrigatoriamente. O acesso pode ser por link público (só visualização) ou via convite (com edição). Você define o nível de permissão.' },
        { q: 'Posso cancelar a qualquer momento?', a: 'Pode, sem multa ou pegadinha. E pode exportar todos os seus dados em qualquer momento.' },
      ],
    },

    final: {
      eyebrow: 'Lista de espera',
      title: 'Cuida vai abrir em breve.\nEntre antes de todo mundo.',
      sub: 'Quem entra na lista de espera tem prioridade, ganha desconto vitalício no plano pago, e ajuda a gente a construir o produto certo.',
    },

    footer: {
      tagline: 'Organize a saúde de quem você cuida. Sem ruído.',
      links: {
        product: ['Funcionalidades', 'Para quem é', 'FAQ', 'Lista de espera'],
        company: ['Sobre', 'Manifesto', 'Imprensa', 'Trabalhe conosco'],
        legal: ['Termos', 'Privacidade', 'LGPD', 'Contato'],
      },
      cnpj: 'Cuida Tecnologia em Saúde Ltda · CNPJ 00.000.000/0001-00',
      copyright: '© 2026 Cuida. Feito com cuidado em São Paulo.',
    },
  },

  en: {
    nav: {
      product: 'Product',
      how: 'How it works',
      who: 'Who it\'s for',
      faq: 'FAQ',
      cta: 'Join waitlist',
    },
    hero: {
      eyebrow: 'Waitlist · BR pre-launch',
      title_1: 'Your family\'s health,',
      title_2: 'actually',
      title_3: 'organized.',
      sub: 'Cuida brings meds, appointments, lab results, records and emergency cards into one app. For caregivers — and those being cared for.',
      counter_prefix: '+',
      counter_suffix: 'people on the waitlist',
      hero_caption: 'Coming soon · iPhone and Android',
    },
    form: {
      placeholder_name: 'Your first name',
      placeholder_email: 'Your email',
      who_label: 'Who do you care for?',
      who_opts: ['My parents', 'My partner', 'My child', 'Myself', 'Someone else'],
      submit: 'Join the waitlist',
      privacy: 'We never share your email. Only a heads-up when we launch.',
      success_title: 'You\'re on the list. Thank you.',
      success_sub: 'You\'ll be one of the first to know when Cuida opens.',
      success_share: 'Know someone who needs this? Share below ↓',
    },
    demo: {
      eyebrow: 'The full app',
      title: 'More than reminders.\nReal healthcare.',
      sub: 'From the 8am pill to the biopsy result. Organized, accessible and shareable with your whole family.',
      captions: [
        { h: 'Daily dashboard', p: 'Visual timeline of morning, afternoon and night doses. Confirm with a tap. The whole family sees in real time.' },
        { h: 'Appointments & prep', p: 'Upcoming visits, past appointment history and a prep checklist before each exam or procedure.' },
        { h: 'Medication detail', p: 'Box photo, summarized leaflet, dose history, interactions and stock alert. All in one screen.' },
        { h: 'Lab results & prep', p: 'Results organized by status (normal, altered, critical). Preparation instructions before each test.' },
        { h: 'Digital health record', p: 'Health summary, visit history, vaccines and allergies in a shareable record for any doctor.' },
        { h: 'Medical history', p: 'Full timeline of diagnoses, surgeries, hospitalizations and key medical events. Nothing gets lost.' },
      ],
    },
    how: {
      eyebrow: 'How it works',
      title: 'Three steps. Fifteen minutes.',
      steps: [
        { n: '1', h: 'Create a profile for who you care for', p: 'Name, age, allergies, health plan. As many people as you need.' },
        { n: '2', h: 'Add meds with your camera', p: 'Point at the box. We read the name, dose and schedule.' },
        { n: '3', h: 'Invite your family', p: 'Share the load via WhatsApp. Everyone on the same page.' },
      ],
    },
    who: {
      eyebrow: 'Who it\'s for',
      title: 'If you\'re the one who remembers everything,\nCuida is for you.',
      cards: [
        { tag: 'Adult daughter', h: 'Aging parents far away', p: 'You\'re the one checking if mom took her meds, the one scheduling appointments, the one running to the pharmacy. Cuida lifts the dispatcher role off you.' },
        { tag: 'Spouse', h: 'Partner with a chronic condition', p: 'Diabetes, hypertension, depression. You care without letting it become identity — Cuida helps keep things light.' },
        { tag: 'Parents', h: 'Child with delicate health', p: 'ADHD, asthma, allergies, intense pediatric care. You have to remember a lot before breakfast. We remember with you.' },
      ],
    },
    features: {
      eyebrow: 'Features',
      title: 'Designed for every detail.',
      items: [
        { h: 'Reminders that work', p: 'Push and WhatsApp at the right time. No guilt if you forget.' },
        { h: 'Stock alerts', p: 'We warn you before meds run out. Ready-to-buy list.' },
        { h: 'Emergency card', p: 'QR code, public link and lock screen. Saves lives.' },
        { h: 'Shared family', p: 'Invite siblings, partner, kids. Everyone sees and helps.' },
        { h: 'Activity feed', p: 'Who did what, when. Never lose the thread.' },
        { h: 'Privacy first', p: 'Encrypted data. You decide who sees what.' },
      ],
    },
    sos: {
      eyebrow: 'The moment that matters',
      title: 'In an emergency,\nyour phone becomes their card.',
      p: 'Allergies, blood type, current meds and emergency contact visible on the lock screen — no unlock needed. Hand the phone to the first responder and they already know the essentials.',
      bullets: ['Works offline', 'Scannable QR code', 'Shareable via WhatsApp', 'Printable PDF for the fridge'],
      cta: 'I want this card for my family',
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Everything people ask us.',
      items: [
        { q: 'How much will it cost?', a: 'Still defining. Whoever joins the waitlist gets a lifetime discount and priority access. The basic plan will start free.' },
        { q: 'When does it open?', a: 'We\'re finishing the app. Closed beta in a few weeks, public launch shortly after. Waitlist gets priority.' },
        { q: 'Does it work on Android?', a: 'Yes. iOS and Android, simultaneous launch. Web version too for desktop management.' },
        { q: 'Is my data safe?', a: 'Yes. Encryption at rest and in transit, optional 2FA, LGPD/GDPR compliant. You decide who sees what.' },
        { q: 'Does my family need an account too?', a: 'Not necessarily. Access can be via public link (view-only) or invite (edit). You set the permission level.' },
        { q: 'Can I cancel anytime?', a: 'Yes, no penalty or fine print. And you can export all your data anytime.' },
      ],
    },
    final: {
      eyebrow: 'Waitlist',
      title: 'Cuida opens soon.\nGet in before everyone else.',
      sub: 'Waitlist members get priority, a lifetime discount on the paid plan, and help us build the right product.',
    },
    footer: {
      tagline: 'Organize the health of those you care for. Without the noise.',
      links: {
        product: ['Features', 'Who it\'s for', 'FAQ', 'Waitlist'],
        company: ['About', 'Manifesto', 'Press', 'Careers'],
        legal: ['Terms', 'Privacy', 'GDPR', 'Contact'],
      },
      cnpj: 'Cuida Tecnologia em Saúde Ltda · CNPJ 00.000.000/0001-00',
      copyright: '© 2026 Cuida. Made with care in São Paulo.',
    },
  },
};

window.CUIDA_I18N = I18N;
