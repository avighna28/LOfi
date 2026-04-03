import React from 'react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-black/10 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-xl bg-white/60 backdrop-blur-3xl border border-white/40 p-10 sm:p-14 rounded-[3.5rem] shadow-2xl animate-fade-rise">
        
        {/* Header Decor */}
        <div className="mb-8 flex justify-center">
          <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white text-xl font-serif">
            A
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-6">
          <h2 
            className="text-4xl text-black"
            style={{ fontFamily: '"Instrument Serif", serif' }}
          >
            A Note from the Creator
          </h2>
          
          <div className="w-12 h-px bg-black/10 mx-auto my-6" />
          
          <p className="text-lg sm:text-xl text-black/80 font-medium leading-[1.6] tracking-tight">
            "I built this because I know how hard it is to focus in 2026. 
            Every notification is a distraction. GT is my gift to the 
            makers and students who want to build something eternal, 
            one focus block at a time."
          </p>

          <div className="pt-6">
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-black/40">
              — Beyond Silence —
            </span>
          </div>
        </div>

        {/* Close Button UI */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-3 hover:bg-black/5 rounded-full transition-all group"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-90 transition-transform duration-300">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AboutModal;
