import React, { useState, useEffect } from 'react';
import { generateProposalText } from '../services/geminiService';

const ProposalSection: React.FC = () => {
  // Fix: Correctly typed state to hold either a string or a React node.
  const [proposalText, setProposalText] = useState<string | React.ReactNode>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const text = await generateProposalText();
        const formattedText = text.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
        ));
        // Fix: Removed `as any` cast by using the correct state type.
        setProposalText(<div>{formattedText}</div>);
      } catch (error) {
        setProposalText("Benimle evlenir misin?");
      } finally {
        setIsLoading(false);
      }
    };
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const timer = setTimeout(fetchProposal, 500); // Short delay for transition
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-10 border-t border-amber-300/50 pt-8 text-center animate-fade-in">
      {isLoading ? (
        <div className="space-y-3">
          <div className="h-5 bg-slate-700 rounded w-4/5 mx-auto animate-pulse"></div>
          <div className="h-5 bg-slate-700 rounded w-full mx-auto animate-pulse"></div>
          <div className="h-5 bg-slate-700 rounded w-3/5 mx-auto animate-pulse"></div>
        </div>
      ) : (
        <div className="text-xl leading-relaxed text-white">
          {proposalText}
        </div>
      )}
    </div>
  );
};

export default ProposalSection;