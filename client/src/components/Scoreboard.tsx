import React from 'react';
import { PlayerData } from '../utils/gameUtils';
import { ArrowPathIcon, HomeIcon } from '@heroicons/react/24/solid';
import { FormattedMessage } from 'react-intl';

interface ScoreboardProps {
  players: PlayerData[];
  currentPlayer: number;
  onReset: () => void;
  onNewGame: () => void;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ 
  players, 
  currentPlayer, 
  onReset, 
  onNewGame 
}) => {
  return (
    <div className="glass-card select-none p-6 flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-6 text-center">
        <FormattedMessage id="scoreboard.title" defaultMessage="Scoreboard" />
      </h2>
      
      <div className="space-y-6 flex-1">
        {players.map((player, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-lg transition-all duration-300 ${
              currentPlayer === index ? 'purple-gradient shadow-lg' : 'bg-white/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{player.emoji}</span>
                <span className="font-medium truncate">{player.name}</span>
              </div>
              <div className="text-xl font-bold">{player.score}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 space-y-3">
        <button
          onClick={onReset}
          className="w-full button-gradient flex items-center justify-center"
        >
          <ArrowPathIcon className="size-6 mr-2" /> 
          <FormattedMessage id="scoreboard.newRound" defaultMessage="New Round" />
        </button>
        <button
          onClick={onNewGame}
          className="w-full bg-white/20 hover:bg-white/30 text-foreground font-bold py-2 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
        >
          <HomeIcon className="size-6 mr-2" /> 
          <FormattedMessage id="scoreboard.newGame" defaultMessage="New Game" />
        </button>
      </div>
    </div>
  );
};

export default Scoreboard;
  