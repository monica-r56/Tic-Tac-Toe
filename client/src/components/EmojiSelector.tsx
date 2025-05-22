
import React from 'react';
import { emojis } from '../utils/gameUtils';

interface EmojiSelectorProps {
  selectedEmoji: string;
  onSelectEmoji: (emoji: string) => void;
}

const EmojiSelector: React.FC<EmojiSelectorProps> = ({
  selectedEmoji,
  onSelectEmoji,
}) => {
  return (
    <div className="flex flex-wrap skew-x-20 tranform-3d gap-3 justify-center mt-4">
      {emojis.map((emoji) => (
        <button
          key={emoji}
          className={`text-3xl select-none p-2 transition-all duration-300 transform rounded-full 
            ${selectedEmoji === emoji 
              ? 'bg-accent text-white scale-110 shadow-lg border-2 border-white/50' 
              : 'bg-white/20 hover:bg-white/40 hover:scale-105'
            }`}
          onClick={() => onSelectEmoji(emoji)}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default EmojiSelector;
