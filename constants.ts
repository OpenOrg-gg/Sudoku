
import { Difficulty, LevelData } from './types.ts';

export const TOTAL_LEVELS = 150;

export const LEVELS: LevelData[] = Array.from({ length: TOTAL_LEVELS }, (_, i) => {
  const id = i + 1;
  let difficulty: Difficulty = 'Easy';
  let clues = 45;

  if (id > 120) {
    difficulty = 'Expert';
    clues = 24;
  } else if (id > 70) {
    difficulty = 'Hard';
    clues = 30;
  } else if (id > 30) {
    difficulty = 'Medium';
    clues = 36;
  }

  return { id, difficulty, clues };
});
