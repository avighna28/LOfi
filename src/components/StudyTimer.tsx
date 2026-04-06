import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';

const PRESETS = [
  { label: '30m', minutes: 30 },
  { label: '1h', minutes: 60 },
  { label: '2h', minutes: 120 },
  { label: '4h', minutes: 240 },
  { label: '6h', minutes: 360 },
];

const StudyTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'study' | 'break'>('study');
  const [currentPreset, setCurrentPreset] = useState(30);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const logSession = async (minutes: number) => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'focus_sessions'), {
        userId: user.uid,
        durationMinutes: minutes,
        timestamp: serverTimestamp(),
        type: 'study'
      });
      console.log("Session logged successfully");
    } catch (err) {
      console.error("Error logging session:", err);
    }
  };

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      
      if (mode === 'study') {
        logSession(currentPreset);
        alert('Focus session complete. Time for a short break!');
        setMode('break');
        setTimeLeft(5 * 60); 
      } else {
        alert('Break over. Back to your sanctuary.');
        setMode('study');
        setTimeLeft(30 * 60);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, user, currentPreset]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(currentPreset * 60);
    setMode('study');
  };

  const setPreset = (minutes: number) => {
    setIsActive(false);
    setCurrentPreset(minutes);
    setTimeLeft(minutes * 60);
    setMode('study');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="relative z-10 flex flex-col items-center justify-center text-center px-4 md:px-6 min-h-[140vh] sm:min-h-screen pt-24 md:pt-40 pb-20">
      <div className="w-full max-w-4xl mx-auto backdrop-blur-md bg-white/20 p-6 sm:p-10 md:p-12 rounded-[2.5rem] sm:rounded-[4rem] border border-white/20 shadow-2xl animate-fade-rise">
        
        {/* Mode Label */}
        <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium text-[#6F6F6F] mb-4 block">
          {mode === 'study' ? '— Focus Session —' : '— Break Time —'}
        </span>

        {/* Timer Display */}
        <h1 
          className="text-[4.5rem] sm:text-[8rem] md:text-[12rem] font-normal leading-none tracking-[-0.05em] text-black"
          style={{ fontFamily: '"Instrument Serif", serif' }}
        >
          {formatTime(timeLeft)}
        </h1>

        {/* Preset Selectors */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-6 md:mt-8 animate-fade-rise-delay">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => setPreset(p.minutes)}
              className="px-4 md:px-6 py-2 rounded-full border border-black/10 bg-white/50 text-[10px] md:text-sm font-medium hover:bg-black hover:text-white transition-all active:scale-95"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 mt-10 md:mt-12 animate-fade-rise-delay-2 w-full max-w-sm mx-auto">
          <button 
            onClick={toggleTimer}
            className="w-full sm:w-auto rounded-full px-10 md:px-14 py-4 md:py-5 text-base md:text-lg font-medium bg-black text-[#FFFFFF] shadow-xl transition-all hover:scale-[1.05] active:scale-[0.95]"
          >
            {isActive ? 'Pause' : 'Start Focus'}
          </button>
          
          <button 
            onClick={resetTimer}
            className="w-full sm:w-auto rounded-full px-8 md:px-10 py-4 md:py-5 text-base md:text-lg font-medium border border-black/20 bg-white/30 text-black hover:bg-white/60 transition-all active:scale-[0.95]"
          >
            Reset
          </button>
        </div>
        
        {/* Supporting Text */}
        <div className="mt-10 md:mt-12 pt-8 border-t border-black/5">
          <p className="text-black/80 max-w-md mx-auto text-[10px] md:text-sm font-medium leading-relaxed italic">
            Building a sanctuary for deep work. <br />
            Let silence be your strength and pure flow be your guide.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StudyTimer;
