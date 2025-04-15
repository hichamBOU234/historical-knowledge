import React from 'react';
import { Question } from '../questions';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizQuestionProps {
  question: Question;
  currentQuestionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  isAnswered: boolean;
  onAnswerClick: (index: number, isCorrect: boolean) => void;
  onNextQuestion: () => void;
  isDarkMode: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  currentQuestionNumber,
  totalQuestions,
  selectedAnswer,
  isAnswered,
  onAnswerClick,
  onNextQuestion,
  isDarkMode,
}) => {
  return (
    <div className={`rounded-xl shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-200`}>
      <div className="flex items-center justify-between mb-6">
        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          سؤال {currentQuestionNumber} من {totalQuestions}
        </div>
        <div className="h-2 flex-1 mx-4 rounded-full bg-gray-200 overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-300" 
            style={{ width: `${(currentQuestionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>
      
      <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {question.text}
      </h2>
      
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correctAnswer;
          const showCorrect = isAnswered && isCorrect;
          const showIncorrect = isAnswered && isSelected && !isCorrect;
          
          return (
            <button
              key={index}
              className={`w-full text-right p-4 rounded-lg border transition-all duration-200 ${
                isDarkMode 
                  ? `${isSelected ? 'border-blue-500 bg-blue-900/50' : 'border-gray-700 hover:border-blue-500 bg-gray-800'}`
                  : `${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-500 bg-white'}`
              } ${showCorrect ? `${isDarkMode ? 'bg-green-900/50 border-green-500' : 'bg-green-50 border-green-500'}` : ''} ${
                showIncorrect ? `${isDarkMode ? 'bg-red-900/50 border-red-500' : 'bg-red-50 border-red-500'}` : ''
              }`}
              onClick={() => onAnswerClick(index, isCorrect)}
              disabled={isAnswered}
            >
              <div className="flex items-center justify-between">
                <span className={isDarkMode ? 'text-gray-100' : 'text-gray-900'}>{option}</span>
                {showCorrect && <CheckCircle className="text-green-500 h-5 w-5" />}
                {showIncorrect && <XCircle className="text-red-500 h-5 w-5" />}
              </div>
            </button>
          );
        })}
      </div>
      
      {isAnswered && (
        <button
          className={`mt-6 w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${
            isDarkMode 
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
          onClick={onNextQuestion}
        >
          {currentQuestionNumber === totalQuestions ? 'عرض النتيجة' : 'السؤال التالي'}
        </button>
      )}
    </div>
  );
}

export default QuizQuestion;