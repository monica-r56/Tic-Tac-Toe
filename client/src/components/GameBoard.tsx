
import React from 'react';
import { GameState } from '../utils/gameUtils';
import Timer from './Timer';
import {useIntl, FormattedMessage} from 'react-intl';

interface GameBoardProps {
  gameState: GameState;
  players: Array<{ name: string; emoji: string }>;
  onCellClick: (index: number) => void;
  onTimerEnd: () => void;
  timerReset: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({
  gameState,
  players,
  onCellClick,
  onTimerEnd,
  timerReset,
}) => {
  const { board, currentPlayer, winner, isDraw, winningCombination } = gameState;

  const getStatusMessage = () => {
    if (winner !== null) {
      return (
      <FormattedMessage
        id="gameboard.wins"
        values={{name: players[winner].name, emoji: players[winner].emoji,}}
      />
    );
    }
    if (isDraw) {
      return <FormattedMessage id="gameboard.draw"/>;
    }
    return (
      <FormattedMessage
        id="gameboard.turn"
        values={{name: players[currentPlayer].name, emoji: players[currentPlayer].emoji}}
      />
    );
  };

  const isCellHighlighted = (index: number) => {
    return winningCombination !== null && winningCombination.includes(index);
  };

  return (
    <div className="flex flex-col select-none items-center">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">{getStatusMessage()}</h2>
        {!winner && !isDraw && (
          <div className="flex justify-center">
            <Timer 
              isActive={gameState.gameStarted && winner === null && !isDraw} 
              onTimeout={onTimerEnd}
              reset={timerReset}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 w-full max-w-md mx-auto">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`game-cell aspect-square ${
              isCellHighlighted(index) ? 
                'bg-accent/40 border-accent animate-pulse-scale' : 
                ''
            }`}
            onClick={() => {
              if (!cell && winner === null && !isDraw) {
                onCellClick(index);
              }
            }}
          >
            {cell && <span className="animate-scale-in">{cell}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
