import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ChatMessage {
  role: 'user' | 'model';
  parts: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '' || isLoading) return;

    const command = inputMessage.trim().toLowerCase();

    const navigationCommands: Record<string, string> = {
      'go to investor page': '/investor/pitch',
      'go to entrepreneur page': '/entrepreneur/profile',
      'go to freelancer page': '/freelancer/profile',
      'go to landing page': '/',
    };

    if (navigationCommands[command]) {
      navigate(navigationCommands[command]);
      setInputMessage('');
      return;
    }

    const newUserMessage: ChatMessage = { role: 'user', parts: inputMessage };
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const history = messages.map(msg => ({
        role: msg.role,
        parts: msg.parts
      }));

      const response = await fetch('http://127.0.0.1:5000/python-api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: newUserMessage.parts,
          history
        })
      });

      const text = await response.text();

      if (!response.ok) {
        throw new Error(text || 'Chat request failed');
      }

      const data = JSON.parse(text);
      const botMessage: ChatMessage = {
        role: 'model',
        parts: data.response
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages(prev => [
        ...prev,
        { role: 'model', parts: 'Oops! Something went wrong. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { role: 'model', parts: "Hello! I'm your AI assistant. How can I help you today?" }
      ]);
    }
  }, [isOpen, messages.length]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-primary-accent hover:bg-secondary-accent text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
      >
        <MessageSquare size={24} />
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col z-50 border border-highlight-button">
          <div className="flex justify-between items-center p-3 border-b border-highlight-button bg-background rounded-t-lg">
            <h3 className="font-semibold text-text-primary">AI Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-text-secondary hover:text-primary-accent">
              <X size={20} />
            </button>
          </div>

          <div ref={chatWindowRef} className="flex-1 p-3 overflow-y-auto space-y-3">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div
            className={`max-w-[75%] px-3 py-2 rounded-lg ${
              msg.role === 'user'
                ? 'bg-primary-accent text-white'
                : 'bg-highlight-button text-text-primary'
            }`}
          >
            {msg.parts}
          </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
          <div className="max-w-[75%] px-3 py-2 rounded-lg bg-highlight-button text-text-primary">
            Thinking...
          </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-highlight-button bg-background rounded-b-lg flex items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-3 py-2 border border-highlight-button rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-accent text-text-primary"
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || inputMessage.trim() === ''}
              className="ml-2 bg-primary-accent hover:bg-secondary-accent text-white rounded-full p-2 disabled:opacity-50 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
