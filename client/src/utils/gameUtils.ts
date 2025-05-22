
export type PlayerData = {
  name: string;
  emoji: string;
  score: number;
};

export type GameState = {
  board: Array<string | null>;
  currentPlayer: number;
  winner: number | null;
  isDraw: boolean;
  winningCombination: number[] | null;
  gameStarted: boolean;
};

export const emojis = ["🐱", "🦊", "🐻", "🐼", "🦁", "🐯", "🐨", "🐸", "🐵"];

export const initialGameState: GameState = {
  board: Array(9).fill(null),
  currentPlayer: 0,
  winner: null,
  isDraw: false,
  winningCombination: null,
  gameStarted: false,
};

export const winCombinations = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal top-left to bottom-right
  [2, 4, 6], // diagonal top-right to bottom-left
];

export const checkWinner = (board: Array<string | null>): number[] | null => {
  for (let i = 0; i < winCombinations.length; i++) {
    const [a, b, c] = winCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return winCombinations[i];
    }
  }
  return null;
};

export const checkDraw = (board: Array<string | null>): boolean => {
  return board.every((cell) => cell !== null);
};

export const getRandomBubbleProps = () => {
  return {
    size: Math.random() * 60 + 20,
    left: Math.random() * 100,
    animationDuration: Math.random() * 3 + 2,
    animationDelay: Math.random() * 2,
    xOffset: Math.random() * 100 - 50,
  };
};
