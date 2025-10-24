import React, { useState } from 'react';
import HistorySection from './components/HistorySection';
import VerificationSection from './components/VerificationSection';
import ProposalSection from './components/ProposalSection';
import { SparklesCore } from './components/Sparkles';

type AppStep = 'history' | 'verification' | 'system_error' | 'proposal';

export default function App() {
  const [step, setStep] = useState<AppStep>('history');
  const [verificationAttempts, setVerificationAttempts] = useState(0);

  const handleHistoryComplete = () => {
    setStep('verification');
  };

  const handleVerificationAttempt = () => {
    const newAttempts = verificationAttempts + 1;
    setVerificationAttempts(newAttempts);
    if (newAttempts >= 2) { // 2 denemeden sonra hata ver
      setStep('system_error');
      setTimeout(() => {
        setStep('proposal');
      }, 4000); // 4 saniye sonra teklif ekranına geç
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
         <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={50}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 text-white">
        <div className="w-full max-w-2xl mx-auto bg-black bg-opacity-50 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-10 border border-white/10">
          
          {step === 'history' && <HistorySection onComplete={handleHistoryComplete} />}

          {step === 'verification' && (
             <div className="transition-opacity duration-1000 ease-in-out opacity-100">
                <VerificationSection onAttempt={handleVerificationAttempt} attempts={verificationAttempts} />
             </div>
          )}
           {step === 'system_error' && (
            <div className="flex flex-col items-center justify-center text-center transition-opacity duration-500 ease-in-out opacity-100">
              <div className="animate-pulse">
                 <svg className="w-16 h-16 text-red-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                 </svg>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-red-500 tracking-widest" style={{fontFamily: "'Courier New', Courier, monospace"}}>SİSTEM HATASI</h2>
              <p className="text-slate-400 mt-4">Doğrulama başarısız oldu...</p>
              <p className="text-amber-300 mt-2 animate-pulse">Bizim hikâyemiz tekrarlanan bir anı değil, her gün yeniden yazılan bir gelecek olsun.</p>
            </div>
          )}
          
          {step === 'proposal' && (
            <div className="transition-opacity duration-1000 ease-in-out opacity-100">
                <ProposalSection />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}