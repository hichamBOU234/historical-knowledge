import React from 'react';
import { Trophy } from 'lucide-react';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  isDarkMode: boolean;
}

const QuizResult: React.FC<QuizResultProps> = ({ score, totalQuestions, onRestart, isDarkMode }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  return (
    <div className={`rounded-xl shadow-lg p-8 text-center transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <Trophy className="mx-auto h-16 w-16 text-yellow-400 mb-4" />
      <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        النتيجة النهائية
      </h2>
      <div className={`text-4xl font-bold mb-4 ${
        isDarkMode ? 'text-blue-400' : 'text-blue-600'
      }`}>
        {score} / {totalQuestions}
      </div>
      <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        لقد حصلت على نسبة {percentage}٪
      </p>
      <div className="mb-8 w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
        <div 
          className="bg-blue-600 h-4 rounded-full transition-all duration-1000" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <button
        className={`py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${
          isDarkMode 
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
        onClick={onRestart}
      >
        إعادة الاختبار
      </button>
    </div>
  );
}

export default QuizResult;