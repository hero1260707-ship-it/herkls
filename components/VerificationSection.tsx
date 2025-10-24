import React, { useState, useMemo } from 'react';
import RingIcon from './icons/RingIcon';
import KeyIcon from './icons/KeyIcon';
import HelmetIcon from './icons/HelmetIcon';
import HarpIcon from './icons/HarpIcon';

interface VerificationSectionProps {
  onAttempt: () => void;
  attempts: number;
}

const icons = [
    { component: <KeyIcon />, name: 'Key' },
    { component: <RingIcon />, name: 'Ring' },
    { component: <HarpIcon />, name: 'Harp' },
    { component: <HelmetIcon />, name: 'Helmet' },
];

const VerificationSection: React.FC<VerificationSectionProps> = ({ onAttempt, attempts }) => {
  const [isAttempting, setIsAttempting] = useState(false);

  // Shuffle icons once per render
  const shuffledIcons = useMemo(() => [...icons].sort(() => Math.random() - 0.5), []);

  const handleSelection = () => {
    if (isAttempting) return;

    setIsAttempting(true);
    onAttempt();

    setTimeout(() => {
        if (attempts < 1) { // 2 deneme tamamlanmadıysa, tekrar denemeye izin ver
             setIsAttempting(false);
        }
    }, 1500);
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-amber-200 mb-1">İnsan olduğunuzu doğrulayın</h2>
      <p className="text-slate-400 mb-6 text-sm">Anahtar nesnesini seçin.</p>

      <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
        {shuffledIcons.map((icon) => (
          <button
            key={icon.name}
            onClick={handleSelection}
            disabled={isAttempting}
            className="aspect-square p-4 sm:p-6 bg-slate-800/50 border border-slate-700 rounded-lg transition-all duration-300 hover:bg-slate-700 hover:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <div className="text-white w-full h-full transition-transform duration-300 group-hover:scale-110">
              {icon.component}
            </div>
          </button>
        ))}
      </div>
      <div className="h-8 mt-4">
        <p className={`text-xs text-red-400 transition-opacity duration-300 ${isAttempting ? 'opacity-100' : 'opacity-0'}`}>
            Hata! Tekrar deneyin...
        </p>
      </div>
    </div>
  );
};

export default VerificationSection;