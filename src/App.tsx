import React, { useState, useEffect } from 'react';
import { questions } from './questions';
import QuizQuestion from './components/QuizQuestion';
import QuizResult from './components/QuizResult';
import { Moon, Sun } from 'lucide-react';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleAnswerClick = (selectedOption: number, correctAnswer: boolean) => {
    if (!isAnswered) {
      setSelectedAnswer(selectedOption);
      setIsAnswered(true);
      if (correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowScore(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`} dir="rtl">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            اختبار المعرفة التاريخية
          </h1>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              isDarkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            } transition-colors duration-200`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>

        <div className="relative">
          {showScore ? (
            <QuizResult 
              score={score} 
              totalQuestions={questions.length} 
              onRestart={handleRestartQuiz}
              isDarkMode={isDarkMode}
            />
          ) : (
            <QuizQuestion
              question={questions[currentQuestion]}
              currentQuestionNumber={currentQuestion + 1}
              totalQuestions={questions.length}
              selectedAnswer={selectedAnswer}
              isAnswered={isAnswered}
              onAnswerClick={handleAnswerClick}
              onNextQuestion={handleNextQuestion}
              isDarkMode={isDarkMode}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;