import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';

interface NavbarProps {
  onToggleTasks: () => void;
  onToggleAbout: () => void;
  onToggleLofi: () => void;
  onToggleConnect: () => void;
  onToggleAnalytics: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onToggleTasks, 
  onToggleAbout, 
  onToggleLofi, 
  onToggleConnect,
  onToggleAnalytics 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  const handleLogout = () => signOut(auth);

  const NavLinks = () => (
    <>
      <a href="#" className="text-sm font-medium text-[#000000] transition-colors" onClick={() => setIsMenuOpen(false)}>Home</a>
      <button 
        onClick={() => { onToggleTasks(); setIsMenuOpen(false); }}
        className="text-sm font-medium text-[#6F6F6F] transition-colors hover:text-black text-left"
      >
        Tasks
      </button>
      <button 
        onClick={() => { onToggleAnalytics(); setIsMenuOpen(false); }}
        className="text-sm font-medium text-[#6F6F6F] transition-colors hover:text-black text-left"
      >
        Journey
      </button>
      <button 
        onClick={() => { onToggleAbout(); setIsMenuOpen(false); }}
        className="text-sm font-medium text-[#6F6F6F] transition-colors hover:text-black text-left"
      >
        About
      </button>
      <button 
        onClick={() => { onToggleLofi(); setIsMenuOpen(false); }}
        className="text-sm font-medium text-[#6F6F6F] transition-colors hover:text-black text-left"
      >
        Lo-Fi
      </button>
      <button 
        onClick={() => { onToggleConnect(); setIsMenuOpen(false); }}
        className="text-sm font-medium text-[#6F6F6F] transition-colors hover:text-black text-left"
      >
        Reach Us
      </button>
      
      {/* Mobile Login/Logout */}
      <div className="md:hidden pt-4 border-t border-black/5 mt-2">
        {user ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={user.photoURL || ''} alt="Profile" className="w-8 h-8 rounded-full border border-black/10" />
              <span className="text-sm font-medium text-black">{user.displayName}</span>
            </div>
            <button onClick={handleLogout} className="text-xs font-bold text-red-500 uppercase tracking-widest">Logout</button>
          </div>
        ) : (
          <button onClick={handleLogin} className="w-full py-3 bg-black text-white rounded-xl text-sm font-bold">Sign In with Google</button>
        )}
      </div>
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-[150]">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 sm:px-8 py-6">
        <div 
          className="text-2xl sm:text-3xl tracking-tight text-[#000000]"
          style={{ fontFamily: '"Instrument Serif", serif' }}
        >
          GT<sup>®</sup>
        </div>
        
        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center gap-8">
          <NavLinks />
          
          {/* Desktop Auth */}
          <div className="pl-6 border-l border-black/5">
            {user ? (
              <div className="flex items-center gap-4 group relative">
                <img src={user.photoURL || ''} alt="Profile" className="w-9 h-9 rounded-full border-2 border-transparent hover:border-black/10 transition-all cursor-pointer" />
                <button 
                  onClick={handleLogout}
                  className="text-[10px] font-bold uppercase tracking-widest text-[#6F6F6F] hover:text-black transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={handleLogin}
                className="text-sm font-bold text-black border-2 border-black/5 px-6 py-2 rounded-full hover:bg-black hover:text-white transition-all scale-100 active:scale-95"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Trigger */}
        <button 
          className="md:hidden p-2 rounded-xl bg-black/5 hover:bg-black/10 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`md:hidden absolute top-[80px] left-6 right-6 p-8 bg-white/80 backdrop-blur-3xl rounded-[2.5rem] border border-white/20 shadow-2xl transition-all duration-500 ease-out flex flex-col gap-6 ${
        isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'
      }`}>
        <NavLinks />
      </div>
    </nav>
  );
};

export default Navbar;
