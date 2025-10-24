import React, { useState, useEffect } from 'react';
import { generateHistoryText } from '../services/geminiService';

interface HistorySectionProps {
  onComplete: () => void;
}

const HistorySection: React.FC<HistorySectionProps> = ({ onComplete }) => {
  const [historyText, setHistoryText] = useState<string | React.ReactNode>('');
  const [isLoading, setIsLoading] = useState(true);
  const [showNameInput, setShowNameInput] = useState(false);
  const [name, setName] = useState(''); // State for the input field

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const text = await generateHistoryText();
        const formattedText = text.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
        ));
        setHistoryText(<div>{formattedText}</div>);
      } catch (error) {
        setHistoryText('Tarih bilgisi yüklenirken bir sorun oluştu.');
      } finally {
        setIsLoading(false);
        setTimeout(() => setShowNameInput(true), 500); // Input section appears after text
      }
    };

    const timer = setTimeout(fetchHistory, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) { // Only continue if a name is entered
      onComplete();
    }
  };


  return (
    <div className="transition-opacity duration-700 ease-in opacity-100">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-amber-200">Herkül Köprüsü</h1>
      {isLoading ? (
        <div className="space-y-4">
          <div className="h-4 bg-slate-700 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-slate-700 rounded w-5/6 animate-pulse"></div>
          <div className="h-4 bg-slate-700 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-slate-700 rounded w-3/4 animate-pulse"></div>
        </div>
      ) : (
        <>
          <div className="text-slate-300 text-base leading-relaxed text-justify">
            {historyText}
          </div>
          {showNameInput && (
            <div className="mt-8 text-center animate-fade-in border-t border-white/10 pt-6">
              <h3 className="text-lg text-amber-200 mb-4">Anı belgesini oluşturmak için adınızı girin.</h3>
              <form onSubmit={handleContinue} className="flex flex-col sm:flex-row justify-center items-center gap-4">
                 <input
                   type="text"
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   placeholder="Adınız..."
                   className="bg-slate-800 border border-slate-600 text-white placeholder-slate-500 text-center text-lg rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full sm:w-64 p-3 shadow-inner"
                   aria-label="Adınız"
                 />
                 <button
                  type="submit"
                  disabled={!name.trim()}
                  className="w-full sm:w-auto bg-amber-500 text-slate-900 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-amber-400 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-opacity-50 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Devam Et
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HistorySection;