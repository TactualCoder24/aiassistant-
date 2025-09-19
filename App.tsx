import React, { useState, useEffect, useRef } from 'react';
import { Message, Sender } from './types';
import { sendMessageStream } from './services/geminiService';
import ChatInput from './components/ChatInput';
import ChatMessage from './components/ChatMessage';
import TypingIndicator from './components/TypingIndicator';
import BotIcon from './components/icons/BotIcon';
import LockIcon from './components/icons/LockIcon';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: 'initial-message',
        sender: Sender.AI,
        text: "Hello, I'm your AI Psychology Companion. I'm here to listen and offer a supportive space for you. How are you feeling today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, []);

  const handleSendMessage = async (input: string) => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: Sender.User,
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);
    setError(null);
    
    const aiMessageId = `ai-${Date.now()}`;
    const aiMessageTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Add a placeholder for the AI response
    setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: aiMessageId,
          sender: Sender.AI,
          text: '',
          timestamp: aiMessageTimestamp,
        },
    ]);

    try {
      const stream = await sendMessageStream(input);
      let fullResponse = '';
      for await (const chunk of stream) {
        const chunkText = chunk.text; 
        if (chunkText) {
          fullResponse += chunkText;
          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.id === aiMessageId ? { ...msg, text: fullResponse } : msg
            )
          );
        }
      }
    } catch (err) {
      console.error(err);
      const errorMessage = 'Sorry, I encountered an issue. Please try again later.';
      setError(errorMessage);
       setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.id === aiMessageId ? { ...msg, text: errorMessage } : msg
            )
          );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#1a2e22] text-gray-100 min-h-screen flex flex-col font-sans">
      <header className="bg-[#223327]/80 backdrop-blur-sm sticky top-0 z-10 p-4 border-b border-green-400/20 flex items-center justify-center">
        <BotIcon className="w-7 h-7 mr-3 text-green-300" />
        <h1 className="text-xl font-bold text-gray-200">AI Psychology Companion</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </main>
      
      <footer className="sticky bottom-0 bg-[#1a2e22] p-2 md:p-4">
        <div className="max-w-4xl mx-auto">
          {error && <p className="text-red-400 text-center text-sm mb-2">{error}</p>}
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          <div className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-2">
            <LockIcon className="w-3 h-3"/>
            <span>Your conversation is private and secure. This is not a substitute for professional help.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
