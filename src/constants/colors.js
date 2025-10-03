// Brizzle Level Colors
// These colors are used throughout the app for the 6 English learning levels

export const LEVEL_COLORS = {
  A1: '#ff595e',  // A1colour - Red
  A2: '#ff914c',  // A2colour - Orange  
  B1: '#1a82c4',  // B1colour - Blue
  B2: '#694c93',  // B2colour - Purple
  C1: '#8ac196',  // C1colour - Green
  C2: '#ffca39'   // C2colour - Yellow
}

// Level information
export const LEVELS = [
  {
    id: 'A1',
    name: 'Débutant',
    description: 'Apprenez les bases de l\'anglais',
    color: LEVEL_COLORS.A1
  },
  {
    id: 'A2',
    name: 'Élémentaire',
    description: 'Développez vos compétences de base',
    color: LEVEL_COLORS.A2
  },
  {
    id: 'B1',
    name: 'Intermédiaire',
    description: 'Communiquez avec confiance',
    color: LEVEL_COLORS.B1
  },
  {
    id: 'B2',
    name: 'Intermédiaire avancé',
    description: 'Maîtrisez l\'anglais courant',
    color: LEVEL_COLORS.B2
  },
  {
    id: 'C1',
    name: 'Avancé',
    description: 'Exprimez-vous avec précision',
    color: LEVEL_COLORS.C1
  },
  {
    id: 'C2',
    name: 'Maîtrise',
    description: 'Parlez comme un natif',
    color: LEVEL_COLORS.C2
  }
]

// Skill categories for each level
export const SKILLS = [
  {
    id: 'vocabulary',
    name: 'Vocabulaire',
    description: 'Développez votre connaissance des mots',
    icon: '📚'
  },
  {
    id: 'grammar',
    name: 'Grammaire',
    description: 'Maîtrisez la structure de la langue',
    icon: '📝'
  },
  {
    id: 'reading',
    name: 'Lecture',
    description: 'Améliorez vos compétences de compréhension',
    icon: '📖'
  },
  {
    id: 'writing',
    name: 'Écriture',
    description: 'Exprimez-vous clairement',
    icon: '✍️'
  },
  {
    id: 'listening',
    name: 'Écoute',
    description: 'Comprenez l\'anglais parlé',
    icon: '👂'
  },
  {
    id: 'speaking',
    name: 'Expression orale',
    description: 'Communiquez avec confiance',
    icon: '🗣️'
  }
]
