import { Question } from '../types';
import React from 'react';
interface QuestionScreenProps {
  question: Question;
  timeLeft: number;
  onSelectOption: (option: string, blankIndex: number) => void;
  onUnselect: (blankIndex: number) => void;
  onNext: () => void;
  isNextEnabled: boolean;
  userAnswers: string[];
  currentQuestionIndex: number;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  timeLeft,
  onSelectOption,
  onUnselect,
  onNext,
  isNextEnabled,
  userAnswers,
  currentQuestionIndex,
}) => {
  const blanks = question.question.split('_____________');

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <div className="text-base sm:text-lg font-semibold text-gray-900">
          Question {currentQuestionIndex + 1} of 10
        </div>
        <div className="text-base sm:text-lg font-semibold text-gray-900">
          Time Left: {timeLeft}s
        </div>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-2.5 mb-4">
        <div
          className="bg-blue-500 h-2.5 rounded-full transition-all duration-1000"
          style={{ width: `${(timeLeft / 30) * 100}%` }}
        ></div>
      </div>
      <div className="mb-4 text-gray-800 text-sm sm:text-base leading-relaxed">
        {blanks.map((part, index) => (
          <span key={index}>
            {part}
            {index < blanks.length - 1 && (
              <span
                className="inline-block bg-gray-200 px-2 py-1 mx-1 rounded cursor-pointer hover:bg-gray-400 transition-colors"
                onClick={() => onUnselect(index)}
              >
                {userAnswers[index] || '_____'}
              </span>
            )}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`bg-blue-500 text-white px-4 py-2 rounded-lg text-sm sm:text-base hover:bg-blue-600 transition-colors ${
              userAnswers.filter(Boolean).length >= 4 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => onSelectOption(option, userAnswers.filter(Boolean).length)}
            disabled={userAnswers.filter(Boolean).length >= 4}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="text-center">
        <button
          className={`px-4 py-2 rounded-lg text-sm sm:text-base font-medium text-white transition-colors ${
            isNextEnabled
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-gray-400 cursor-not-allowed opacity-60'
          }`}
          onClick={onNext}
          disabled={!isNextEnabled}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionScreen;