import { Question } from '../types';
import React from 'react';
interface FeedbackScreenProps {
  questions: Question[];
  userAnswers: string[][];
  onRestart?: () => void;
}

const FeedbackScreen: React.FC<FeedbackScreenProps> = ({ questions, userAnswers, onRestart }) => {
  let score = 0;

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto my-6">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 text-gray-800">Quiz Results</h2>
      <div className="space-y-4">
        {questions.map((question, index) => {
          const userAnswer = userAnswers[index] || [];
          const isCorrect = JSON.stringify(userAnswer.sort()) === JSON.stringify(question.correctAnswer.sort());
          if (isCorrect) score++;

          return (
            <div
              key={question.questionId}
              className="p-3 sm:p-4 border rounded-lg bg-gray-50"
            >
              <p className="font-medium text-sm sm:text-base text-gray-900 mb-2">{question.question}</p>
              <p className="text-gray-700 text-sm">
                <span className="font-medium">Your Answer:</span>{' '}
                {userAnswer.length > 0 ? userAnswer.join(', ') : 'No answer provided'}
              </p>
              {!isCorrect && (
                <p className="text-gray-700 mt-1 text-sm">
                  <span className="font-medium">Correct Answer:</span>{' '}
                  {question.correctAnswer.join(', ')}
                </p>
              )}
              <p
                className={`mt-1 font-medium text-sm ${
                  isCorrect ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {isCorrect ? 'Correct' : 'Incorrect'}
              </p>
            </div>
          );
        })}
      </div>
      <div className="mt-6 text-center">
        <p className="text-lg sm:text-xl font-bold text-gray-800">
          Final Score: {score} out of 10
        </p>
        {onRestart && (
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm sm:text-base hover:bg-blue-600 transition-colors"
            onClick={onRestart}
          >
            Restart Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default FeedbackScreen;