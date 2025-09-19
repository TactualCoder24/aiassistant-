import React from 'react';
import { Message, Sender } from '../types';
import HeartIcon from './icons/HeartIcon';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAI = message.sender === Sender.AI;

  const wrapperClasses = isAI ? 'flex justify-start' : 'flex justify-end';
  const bubbleClasses = isAI 
    ? 'bg-[#405c47]/80 border border-green-400/30 text-gray-200 rounded-xl' 
    : 'bg-[#223327]/80 border border-green-400/20 text-gray-100 rounded-xl';

  const formatText = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        return <li key={index} className="ml-5 list-disc">{line.substring(2)}</li>;
      }
      return <p key={index} className="break-words">{line}</p>;
    });
  };

  return (
    <div className={wrapperClasses}>
      <div className={`px-4 py-3 max-w-md md:max-w-2xl ${bubbleClasses}`}>
        <div className="prose prose-invert prose-sm max-w-none">
          {formatText(message.text)}
        </div>
        <div className="flex justify-end items-center mt-2 space-x-2">
            <span className="text-xs text-gray-400">{message.timestamp}</span>
            {isAI && <HeartIcon className="w-4 h-4 text-green-400/50" />}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
