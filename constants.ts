
import { Difficulty, LevelData } from './types.ts';

export const TOTAL_LEVELS = 150;

export const TESTIMONIALS = [
  { name: "Sarah Jenkins", role: "Sudoku Enthusiast", text: `The best Sudoku app I've ever played. The ${TOTAL_LEVELS} levels are perfectly balanced and the UI is incredibly polished.`, rating: 5 },
  { name: "Mark Thompson", role: "Daily Player", text: "I love the credit system. It adds a strategic layer to the game that you don't find in other apps. Highly recommended!", rating: 5 },
  { name: "Elena Rodriguez", role: "Puzzle Master", text: "The sound effects and background music are so relaxing. It's my favorite way to decompress after work.", rating: 5 },
  { name: "David Kim", role: "Competitive Player", text: "Finally, a Sudoku app that challenges me. The 'Expert' levels are truly difficult and rewarding to solve.", rating: 4 },
  { name: "Jessica Low", role: "Casual Gamer", text: "Clean design, no intrusive ads, and the transition between levels is seamless. 10/10 experience.", rating: 5 }
];

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
