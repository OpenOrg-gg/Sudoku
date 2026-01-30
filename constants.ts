
import { Difficulty, LevelData } from './types.ts';

export const TOTAL_LEVELS = 150;

const baseReviews = [
  { name: "Sarah Jenkins", role: "Sudoku Enthusiast", text: "The best Sudoku app I've ever played. The levels are perfectly balanced and the UI is incredibly polished.", rating: 5 },
  { name: "Mark Thompson", role: "Daily Player", text: "I love the credit system. It adds a strategic layer to the game that you don't find in other apps. Highly recommended!", rating: 5 },
  { name: "Elena Rodriguez", role: "Puzzle Master", text: "The sound effects and background music are so relaxing. It's my favorite way to decompress after work.", rating: 5 },
  { name: "David Kim", role: "Competitive Player", text: "Finally, a Sudoku app that challenges me. The 'Expert' levels are truly difficult and rewarding to solve.", rating: 4 },
  { name: "Jessica Low", role: "Casual Gamer", text: "Clean design, no intrusive ads, and the transition between levels is seamless. 10/10 experience.", rating: 5 }
];

const names = ["James", "Maria", "Robert", "Ana", "John", "Lucia", "Michael", "Sofia", "William", "Beatriz", "David", "Guilherme", "Richard", "Emanuel", "Joseph", "Ricardo", "Thomas", "Tiago", "Charles", "Patricia"];
const roles = ["Sudoku Master", "Brain Trainer", "Puzzle Solver", "Math Teacher", "Student", "Grandmaster", "Casual Player", "Mobile Gamer"];
const templates = [
  "This app is a game changer for my morning commute. {} is exactly what I needed.",
  "I've tried many Sudoku apps, but {} stands out with its beautiful interface.",
  "The levels are {} and the difficulty progression is spot on.",
  "I highly recommend {} to anyone looking for a sharp mental workout.",
  "The best part is definitely the {}. It makes it so much more engaging.",
  "Simple, elegant, and challenging. {} is the gold standard for Sudoku.",
  "I use this every day to keep my brain active. Perfect for {}."
];
const keywords = ["the credit system", "the minimalist design", "sudokuza.live", "challenging puzzles", "the music", "the trophy system", "all ages"];

export const TESTIMONIALS = [
  ...baseReviews,
  ...Array.from({ length: 95 }, (_, i) => ({
    name: `${names[i % names.length]} ${String.fromCharCode(65 + (i % 26))}.`,
    role: roles[i % roles.length],
    text: templates[i % templates.length].replace("{}", keywords[i % keywords.length]),
    rating: (i % 2 === 0) ? 5 : 4
  }))
];

export const CREDIT_PACKS = [
  { id: 'starter', pack: "STARTER PACK", qty: 100, price: 2.99, amount: "$2.99", bonus: "5 Free Hints" },
  { id: 'pro', pack: "PRO PACK", qty: 500, price: 9.99, amount: "$9.99", bonus: "Time Advantage", active: true },
  { id: 'master', pack: "MASTER PACK", qty: 1200, price: 19.99, amount: "$19.99", bonus: "Unlimited Support" },
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
