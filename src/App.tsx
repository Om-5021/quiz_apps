import { useState, useEffect } from 'react';
import QuestionScreen from './components/QuestionScreen';
import FeedbackScreen from './components/FeedbackScreen';
import WelcomeScreen from './components/WelcomeScreen'; // New import
import { Question, Data } from './types';
import React from 'react';
const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[][]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false); // New state for welcome page

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/sample.json');
        if (!response.ok) throw new Error('Failed to load questions');
        const data: Data = await response.json();
        setQuestions(data.data.questions);
        setUserAnswers(data.data.questions.map(() => []));
      } catch (error) {
        setError('Failed to load questions. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isTimerRunning && timeLeft > 0 && currentQuestionIndex < questions.length) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && currentQuestionIndex < questions.length) {
      handleNext();
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isTimerRunning, timeLeft, currentQuestionIndex, questions.length]);

  const handleSelectOption = (option: string, blankIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = [...(newAnswers[currentQuestionIndex] || [])];
    newAnswers[currentQuestionIndex][blankIndex] = option;
    setUserAnswers(newAnswers);
  };

  const handleUnselect = (blankIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = [...(newAnswers[currentQuestionIndex] || [])];
    newAnswers[currentQuestionIndex][blankIndex] = '';
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(30);
      setIsTimerRunning(true);
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestionIndex + 1] = newAnswers[currentQuestionIndex + 1] || [];
      setUserAnswers(newAnswers);
    } else {
      setIsTimerRunning(false);
      setCurrentQuestionIndex(questions.length);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(questions.map(() => []));
    setTimeLeft(30);
    setIsTimerRunning(true);
    setIsQuizStarted(false); // Return to welcome page on restart
  };

  const handleStartQuiz = () => {
    setIsQuizStarted(true);
  };

  const isNextEnabled =
    userAnswers[currentQuestionIndex]?.length === 4 &&
    userAnswers[currentQuestionIndex].every(
      (answer) => typeof answer === 'string' && answer.trim() !== ''
    );

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
          <p className="text-xl font-semibold text-red-600 mb-4">{error}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="flex flex-col items-center">
          <div className="loader"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (!isQuizStarted) {
    return <WelcomeScreen onStartQuiz={handleStartQuiz} />;
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <FeedbackScreen
        questions={questions}
        userAnswers={userAnswers}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6">
      <QuestionScreen
        question={questions[currentQuestionIndex]}
        timeLeft={timeLeft}
        onSelectOption={handleSelectOption}
        onUnselect={handleUnselect}
        onNext={handleNext}
        isNextEnabled={isNextEnabled}
        userAnswers={userAnswers[currentQuestionIndex] || []}
        currentQuestionIndex={currentQuestionIndex}
      />
    </div>
  );
};

export default App;