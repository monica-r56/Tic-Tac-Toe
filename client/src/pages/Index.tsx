
import React, { useState, useEffect } from "react";
import { useToast } from "../hooks/use-toast";
import PlayerSetup from "../components/PlayerSetup";
import GameBoard from "../components/GameBoard";
import Scoreboard from "../components/Scoreboard";
import { useIntl } from "react-intl";
import { 
  PlayerData, 
  GameState, 
  initialGameState, 
  checkWinner, 
  checkDraw, 
  getRandomBubbleProps
} from "../utils/gameUtils";



const Index = () => {
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [timerReset, setTimerReset] = useState(false);
  const { toast } = useToast();
  const { formatMessage } = useIntl();

  // Effect to notify player changes
  useEffect(() => {
    if (gameState.gameStarted && gameState.winner === null && !gameState.isDraw) {
      toast({
  title: formatMessage({ id: 'gameboard.turn' }, { name: players[gameState.currentPlayer].name }),
  description: formatMessage({ id: 'gameboard.time_limit' }),
  duration: 3000,
});
    }
  }, [gameState.currentPlayer, gameState.gameStarted]);

  // Effect to announce game results
  useEffect(() => {
    if (gameState.winner !== null) {
      toast({
        title: formatMessage({ id: 'gameboard.wins' }, { name: players[gameState.winner].name, emoji: players[gameState.winner].emoji }),
        description: formatMessage({ id: 'index.congrats' }, { name: players[gameState.winner].name }),
        duration: 5000,
      });
    } else if (gameState.isDraw) {
      toast({
        title: formatMessage({ id: 'gameboard.draw' }),
        description: formatMessage({ id: 'gameboard.tiebreak' }),
        duration: 5000,
      });
    }
  }, [gameState.winner, gameState.isDraw]);

  const handleStartGame = (playerData: Array<{ name: string; emoji: string }>) => {
    const formattedPlayers = playerData.map(player => ({
      ...player,
      score: 0
    }));
    setPlayers(formattedPlayers);
    setGameState({
      ...initialGameState,
      gameStarted: true
    });
  };

  const handleCellClick = (index: number) => {
    if (gameState.board[index] || gameState.winner !== null || gameState.isDraw) return;

    const newBoard = [...gameState.board];
    newBoard[index] = players[gameState.currentPlayer].emoji;

    const winningCombination = checkWinner(newBoard);
    let winner = null;
    let isDraw = false;

    if (winningCombination) {
      winner = gameState.currentPlayer;
      
      // Update player score
      const updatedPlayers = [...players];
      updatedPlayers[gameState.currentPlayer].score += 1;
      setPlayers(updatedPlayers);
    } else if (checkDraw(newBoard)) {
      isDraw = true;
    }

    setGameState({
      board: newBoard,
      currentPlayer: gameState.currentPlayer === 0 ? 1 : 0,
      winner,
      isDraw,
      winningCombination,
      gameStarted: true
    });

    setTimerReset(true);
    setTimeout(() => setTimerReset(false), 50);
  };

  const handleTimerEnd = () => {
    // Change player turn when timer ends
    if (gameState.winner === null && !gameState.isDraw) {
      toast({
        title: formatMessage({ id: 'index.timeup' }, { name: players[gameState.currentPlayer].name }),
        description: formatMessage({ id: 'index.turnend' }, { name: players[gameState.currentPlayer].name }),
        duration: 3000,
      });

      setGameState(prevState => ({
        ...prevState,
        currentPlayer: prevState.currentPlayer === 0 ? 1 : 0
      }));

      setTimerReset(true);
      setTimeout(() => setTimerReset(false), 50);
    }
  };

  const handleResetGame = () => {
    setGameState({
      ...initialGameState,
      gameStarted: true
    });
    setTimerReset(true);
    setTimeout(() => setTimerReset(false), 50);
  };

  const handleNewGame = () => {
    setPlayers([]);
    setGameState(initialGameState);
  };

  // Generate decorative bubbles
  const createBubbles = () => {
    return Array.from({ length: 15 }).map((_, index) => {
      const { size, left, animationDuration, animationDelay, xOffset } = getRandomBubbleProps();
      
      return (
        <div 
          key={index}
          className="bubble"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            bottom: '-20px',
            animationDuration: `${animationDuration}s`,
            animationDelay: `${animationDelay}s`,
            '--x': xOffset,
          } as React.CSSProperties}
        ></div>
      );
    });
  };

  return (
    <div className="min-h-screen purple-gradient text-white p-4 md:p-8 relative overflow-hidden">
      <div className="bubbles-container">
        {createBubbles()}
      </div>
      
      {!gameState.gameStarted ? (
        <PlayerSetup onStartGame={handleStartGame} />
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          <div className="lg:col-span-2">
            <div className="glass-card p-6">
              <GameBoard 
                gameState={gameState}
                players={players}
                onCellClick={handleCellClick}
                onTimerEnd={handleTimerEnd}
                timerReset={timerReset}
              />
            </div>
          </div>
          <div>
            <Scoreboard 
              players={players}
              currentPlayer={gameState.currentPlayer}
              onReset={handleResetGame}
              onNewGame={handleNewGame}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
