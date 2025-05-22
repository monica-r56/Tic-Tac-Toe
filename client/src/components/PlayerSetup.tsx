import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import EmojiSelector from './EmojiSelector';
import { emojis } from '../utils/gameUtils';
import { PlayIcon } from '@heroicons/react/24/solid';
import { useIntl, FormattedMessage } from 'react-intl';

interface PlayerSetupProps {
  onStartGame: (players: Array<{ name: string; emoji: string; email: string }>) => void;
}

const PlayerSetup: React.FC<PlayerSetupProps> = ({ onStartGame }) => {
  const { formatMessage } = useIntl();

  const [player1, setPlayer1] = useState({ name: '', emoji: emojis[0], email: '' });
  const [player2, setPlayer2] = useState({ name: '', emoji: emojis[1], email: '' });
  const [errors, setErrors] = useState({ player1: '', player2: '', player1Email: '', player2Email: '' });

  const validateEmail = (email: string) => {
    // Simple email regex for validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateAndStartGame = () => {
    const newErrors = {
      player1: '',
      player2: '',
      player1Email: '',
      player2Email: '',
    };

    if (!player1.name.trim()) {
      newErrors.player1 = formatMessage({ id: 'error.player1NameRequired' });
    }

    if (!player2.name.trim()) {
      newErrors.player2 = formatMessage({ id: 'error.player2NameRequired' });
    }

    if (player1.name.trim() && player2.name.trim() && player1.name === player2.name) {
      newErrors.player2 = formatMessage({ id: 'error.playerNamesDifferent' });
    }

    if (player1.emoji === player2.emoji) {
      newErrors.player2 = formatMessage({ id: 'error.differentEmojis' });
    }

    if (!player1.email.trim()) {
      newErrors.player1Email = formatMessage({ id: 'error.player1EmailRequired' });
    } else if (!validateEmail(player1.email)) {
      newErrors.player1Email = formatMessage({ id: 'error.invalidEmail' });
    }

    if (!player2.email.trim()) {
      newErrors.player2Email = formatMessage({ id: 'error.player2EmailRequired' });
    } else if (!validateEmail(player2.email)) {
      newErrors.player2Email = formatMessage({ id: 'error.invalidEmail' });
    }

    setErrors(newErrors);

    if (!newErrors.player1 && !newErrors.player2 && !newErrors.player1Email && !newErrors.player2Email) {
      onStartGame([player1, player2]);
    }
  };

  const createBubbles = () => {
    return Array.from({ length: 15 }).map((_, index) => {
      const size = Math.random() * 100 + 20;
      const left = Math.random() * 100;
      const delay = Math.random() * 5;
      const xOffset = Math.random() * 100 - 50;

      return (
        <div
          key={index}
          className="bubble"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            bottom: '-20px',
            animationDelay: `${delay}s`,
            '--x': xOffset,
          } as React.CSSProperties}
        ></div>
      );
    });
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="bubbles-container">{createBubbles()}</div>

      <div className="glass-card p-8 my-8">
        <h1 className="text-3xl md:text-4xl text-shadow-lg/30 text-shadow-black select-none font-bold font-mono text-center mb-8">
          <FormattedMessage id="title.ticTacToe" />
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Player 1 */}
          <div className="space-y-6 glass-card p-6">
            <h2 className="text-xl font-serif select-none text-purple-900 font-bold">
              <FormattedMessage id="label.player1" />
            </h2>

            {/* Name input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium select-none">
                <FormattedMessage id="label.name" />
              </label>
              <Input
                placeholder={formatMessage({ id: 'placeholder.enterName' })}
                value={player1.name}
                onChange={(e) => setPlayer1({ ...player1, name: e.target.value })}
                className="bg-white/10 font-medium text-wrap select-none text-purple-700 caret-pink-600"
              />
              {errors.player1 && <p className="text-red-500 text-sm">{formatMessage({ id: 'error.player1NameRequired' })}</p>}
            </div>

            {/* Email input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium select-none">
                <FormattedMessage id="label.email" />
              </label>
              <Input
                type="email"
                placeholder={formatMessage({ id: 'placeholder.enterEmail' })}
                value={player1.email}
                onChange={(e) => setPlayer1({ ...player1, email: e.target.value })}
                className="bg-white/10 font-medium text-wrap select-none text-purple-700 caret-pink-600"
              />
              {errors.player1Email && <p className="text-red-500 text-sm">{formatMessage({ id: 'error.player1EmailRequired' })}</p>}
            </div>

            {/* Emoji selector */}
            <div className="space-y-2">
              <label className="block text-sm select-none font-medium">
                <FormattedMessage id="label.chooseEmoji" />
              </label>
              <EmojiSelector
                selectedEmoji={player1.emoji}
                onSelectEmoji={(emoji) => setPlayer1({ ...player1, emoji })}
              />
            </div>
          </div>

          {/* Player 2 */}
          <div className="space-y-6 glass-card p-6">
            <h2 className="text-xl font-serif select-none text-purple-900 font-bold">
              <FormattedMessage id="label.player2" />
            </h2>

            {/* Name input */}
            <div className="space-y-2">
              <label className="block select-none text-sm font-medium">
                <FormattedMessage id="label.name" />
              </label>
              <Input
                placeholder={formatMessage({ id: 'placeholder.enterName' })}
                value={player2.name}
                onChange={(e) => setPlayer2({ ...player2, name: e.target.value })}
                className="bg-white/10 font-medium text-wrap select-none text-purple-700 caret-pink-600"
              />
              {errors.player2 && <p className="text-red-500 text-sm">{formatMessage({ id: 'error.player2NameRequired' })}</p>}
            </div>

            {/* Email input */}
            <div className="space-y-2">
              <label className="block text-sm select-none font-medium">
                <FormattedMessage id="label.email" />
              </label>
              <Input
                type="email"
                placeholder={formatMessage({ id: 'placeholder.enterEmail' })}
                value={player2.email}
                onChange={(e) => setPlayer2({ ...player2, email: e.target.value })}
                className="bg-white/10 font-medium text-wrap select-none text-purple-700 caret-pink-600"
              />
              {errors.player2Email && <p className="text-red-500 text-sm">{formatMessage({ id: 'error.player2EmailRequired' })}</p>}
            </div>

            {/* Emoji selector */}
            <div className="space-y-2">
              <label className="block text-sm select-none font-medium">
                <FormattedMessage id="label.chooseEmoji" />
              </label>
              <EmojiSelector
                selectedEmoji={player2.emoji}
                onSelectEmoji={(emoji) => setPlayer2({ ...player2, emoji })}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            onClick={validateAndStartGame}
            className="button-gradient select-none text-shadow-lg/30 group"
          >
            <FormattedMessage id="button.startGame" />
            <PlayIcon className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlayerSetup;
