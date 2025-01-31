import React, { useState } from 'react';
import { MessageSquare, X, Send, AlertCircle, Info } from 'lucide-react';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hello! This is a test version of your chatbot. Try sending a message!', isBot: true }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setMessages([...messages, { text: message, isBot: false }]);
    setMessage('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "This is a demo response. In the live version, this will be connected to the AI backend.",
        isBot: true
      }]);
    }, 1000);
  };

  const handleFeedback = () => {
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen p-4 gap-4">
      {/* Instructions Panel */}
      <div className="lg:flex-1 lg:max-w-md w-full mb-4 lg:mb-0">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-3">Test Your Chatbot</h2>
          <div className="bg-blue-50 p-3 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Quick Guide</h3>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li className="flex items-start gap-2">
                <span>1.</span>
                <span>Click the chat icon (bottom-right) to start</span>
              </li>
              <li className="flex items-start gap-2">
                <span>2.</span>
                <span>Send test messages to see responses</span>
              </li>
              <li className="flex items-start gap-2">
                <span>3.</span>
                <span>Try the feedback feature in the top bar</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Chatbot Widget */}
      <div className="fixed bottom-0 right-0 z-50 sm:bottom-4 sm:right-4">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all"
            aria-label="Open chat"
          >
            <MessageSquare className="h-6 w-6" />
          </button>
        )}

        {isOpen && (
          <div className="flex flex-col bg-white w-full h-[100vh] sm:h-auto sm:w-[350px] sm:max-w-[calc(100vw-2rem)] sm:rounded-lg shadow-xl">
            {/* Chat Header */}
            <div className="flex flex-col border-b flex-shrink-0">
              <div className="flex justify-between items-center p-4">
                <h3 className="font-semibold">Chat Support</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 p-2"
                  aria-label="Close chat"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="bg-blue-50 p-3 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-blue-800">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">Not working?</span>
                </div>
                <button 
                  onClick={handleFeedback}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Share feedback
                </button>
              </div>

              {showFeedback && (
                <div className="bg-green-50 p-3 text-green-800 text-sm">
                  Thank you for your feedback!
                </div>
              )}
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto" style={{ height: 'calc(100vh - 180px)', maxHeight: '400px' }}>
              <div className="bg-gray-50 p-3 rounded-lg text-gray-600 text-sm flex gap-2">
                <Info className="h-5 w-5 flex-shrink-0" />
                <p>Test version - Try sending a message!</p>
              </div>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg break-words ${
                      msg.isBot
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input - Fixed at bottom */}
            <div className="border-t bg-white w-full">
              <form onSubmit={handleSubmit} className="p-2 sm:p-4">
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-all flex-shrink-0"
                    aria-label="Send message"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatbotWidget;