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
    name: 'A1 - Débutant',
    description: 'Niveau débutant - Apprenez les bases de l\'anglais',
    color: LEVEL_COLORS.A1
  },
  {
    id: 'A2',
    name: 'A2 - Élémentaire',
    description: 'Niveau élémentaire - Développez vos compétences de base',
    color: LEVEL_COLORS.A2
  },
  {
    id: 'B1',
    name: 'B1 - Intermédiaire',
    description: 'Niveau intermédiaire - Communiquez avec confiance',
    color: LEVEL_COLORS.B1
  },
  {
    id: 'B2',
    name: 'B2 - Intermédiaire avancé',
    description: 'Niveau intermédiaire avancé - Maîtrisez l\'anglais courant',
    color: LEVEL_COLORS.B2
  },
  {
    id: 'C1',
    name: 'C1 - Avancé',
    description: 'Niveau avancé - Exprimez-vous avec précision',
    color: LEVEL_COLORS.C1
  },
  {
    id: 'C2',
    name: 'C2 - Maîtrise',
    description: 'Niveau maîtrise - Parlez comme un natif',
    color: LEVEL_COLORS.C2
  }
]
