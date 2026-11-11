export type GameId = 'glove-trap' | 'traveling-cuff' | 'new-needle' | 'shortcut-30s' | 'waiting-room';

export interface CDCLink {
  title: string;
  url: string;
  label: string;
}

export interface BaseGameData {
  id: GameId;
  number: number;
  title: string;
  subtitle: string;
  tagline: string;
  scenario: string;
  huddleDiscussionPrompt: string;
  whyItMatters: string;
  cdcLinks: CDCLink[];
}

export interface GloveTrapData extends BaseGameData {
  id: 'glove-trap';
  type: 'order';
  cards: { id: string; text: string; icon: string }[];
  correctOrder: string[]; // array of card ids
}

export interface TravelingCuffData extends BaseGameData {
  id: 'traveling-cuff';
  type: 'pathway-checkpoints';
  steps: { id: string; label: string; location: string; icon: string }[];
  checkpoints: {
    id: string;
    label: string;
    description: string;
    isCorrect: boolean;
    betweenStepIds: [string, string];
  }[];
  requiredCount: number; // 2
}

export interface NewNeedleData extends BaseGameData {
  id: 'new-needle';
  type: 'multi-select';
  question: string;
  choices: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation?: string;
  }[];
  requiredCount: number; // 2
}

export interface Shortcut30sData extends BaseGameData {
  id: 'shortcut-30s';
  type: 'single-choice';
  productName: string;
  requiredWetTimeSeconds: number; // 120 (2 mins)
  evaporatedAtSeconds: number; // 30s
  question: string;
  choices: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
}

export interface WaitingRoomData extends BaseGameData {
  id: 'waiting-room';
  type: 'multi-select';
  question: string;
  choices: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  requiredCount: number; // 3
}

export type GameData =
  | GloveTrapData
  | TravelingCuffData
  | NewNeedleData
  | Shortcut30sData
  | WaitingRoomData;

export interface GameProgress {
  firstAttemptScores: Partial<Record<GameId, boolean>>; // null/undefined if never checked; true/false recorded on first check
  completed: Partial<Record<GameId, boolean>>; // true if ever solved correctly
  attemptsCount: Partial<Record<GameId, number>>;
}
