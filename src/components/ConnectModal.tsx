import React from 'react';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConnectModal: React.FC<ConnectModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-black/10 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white/60 backdrop-blur-3xl border border-white/40 p-10 sm:p-14 rounded-[3.5rem] shadow-2xl animate-fade-rise overflow-y-auto max-h-[90vh] custom-scrollbar">
        
        {/* Header content */}
        <div className="text-center mb-10">
          <h2 
            className="text-4xl text-black"
            style={{ fontFamily: '"Instrument Serif", serif' }}
          >
            Connect with the Sanctuary
          </h2>
          <p className="mt-4 text-sm text-black/50 font-medium tracking-tight">
            Have a suggestion, a lofi track, or just want to say hi? We're listening.
          </p>
        </div>

        {/* Social Connectivity Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* Instagram */}
          <a 
            href="https://www.instagram.com/avighna_exe/?igsh=dzVxeW93Y2R4eXp4" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-6 rounded-[2rem] bg-white/50 border border-black/5 hover:border-black/20 hover:scale-[1.02] transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#515BD4] flex items-center justify-center text-white shadow-lg shadow-pink-500/20">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </div>
            <div className="text-left">
               <p className="text-[10px] text-black/40 uppercase font-bold tracking-widest leading-none mb-1">Instagram</p>
               <p className="text-base font-semibold text-black">@avighna_exe</p>
            </div>
          </a>

          {/* LinkedIn */}
          <a 
            href="https://www.linkedin.com/in/avighna-sisodia-726a99337?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-6 rounded-[2rem] bg-white/50 border border-black/5 hover:border-black/20 hover:scale-[1.02] transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#0077B5] flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </div>
            <div className="text-left">
               <p className="text-[10px] text-black/40 uppercase font-bold tracking-widest leading-none mb-1">LinkedIn</p>
               <p className="text-base font-semibold text-black">Avighna Sisodia</p>
            </div>
          </a>

          {/* GitHub */}
          <a 
            href="https://github.com/avighna28" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-6 rounded-[2rem] bg-white/50 border border-black/5 hover:border-black/20 hover:scale-[1.02] transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#24292e] flex items-center justify-center text-white shadow-lg shadow-gray-800/20">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </div>
            <div className="text-left">
               <p className="text-[10px] text-black/40 uppercase font-bold tracking-widest leading-none mb-1">GitHub</p>
               <p className="text-base font-semibold text-black">avighna28</p>
            </div>
          </a>

          {/* Direct Email */}
          <a 
            href="mailto:your-email@gmail.com"
            className="group flex items-center gap-4 p-6 rounded-[2rem] bg-black text-white hover:scale-[1.02] transition-all shadow-xl shadow-black/10"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white backdrop-blur-md border border-white/10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <div className="text-left">
               <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest leading-none mb-1">Direct Contact</p>
               <p className="text-base font-semibold">Message Sanctuary</p>
            </div>
          </a>
        </div>

        {/* Footer Accent */}
        <div className="text-center pt-6 opacity-30">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-black">
            — Beyond Silence • Pure Flow —
          </span>
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

export default ConnectModal;
