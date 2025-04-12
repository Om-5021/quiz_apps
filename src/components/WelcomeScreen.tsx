import React from 'react';

interface WelcomeScreenProps {
  onStartQuiz: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartQuiz }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Welcome to the Quiz App</h1>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Test your knowledge with 10 fill-in-the-blank questions. Each question has 4 options, and you have 30 seconds to answer. Good luck!
        </p>
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg text-sm sm:text-base hover:bg-blue-600 transition-colors"
          onClick={onStartQuiz}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;