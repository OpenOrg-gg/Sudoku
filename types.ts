
export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Expert';
export type View = 'landing' | 'auth' | 'game' | 'privacy' | 'terms' | 'support' | 'reviews';

export interface UserProfile {
  name: string;
  email: string;
  totalScore: number;
  completedLevelCount: number;
  credits: number;
  soundEnabled: boolean;
  musicEnabled: boolean;
}

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: number;
  isMe?: boolean;
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  levels: number;
  isCurrentUser?: boolean;
}

export interface SudokuState {
  board: (number | null)[][];
  initialBoard: (number | null)[][];
  solution: number[][];
  notes: Set<number>[][];
  selectedCell: [number, number] | null;
  mistakes: number;
  maxMistakes: number;
  isComplete: boolean;
  level: number;
  timer: number;
  timeLeft: number;
  isPaused: boolean;
  history: (number | null)[][][];
}

export interface LevelData {
  id: number;
  difficulty: Difficulty;
  clues: number;
}
