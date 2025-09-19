import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-[#405c47]/80 border border-green-400/30 text-gray-200 rounded-xl px-4 py-3 flex items-center space-x-1.5">
        <span className="w-2 h-2 bg-green-300/60 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
        <span className="w-2 h-2 bg-green-300/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
        <span className="w-2 h-2 bg-green-300/60 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
      </div>
    </div>
  );
};

export default TypingIndicator;
