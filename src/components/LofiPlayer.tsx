import React, { useState, useRef, useEffect } from 'react';

interface Track {
  id: number;
  title: string;
  url: string;
  vibe: string;
}

const TRACKS: Track[] = [
  { id: 1, title: 'Sunset Chill Sanctuary', vibe: 'Cozy & Lo-Fi', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 2, title: 'Morning Coffee Brew', vibe: 'Productive Jazz', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: 3, title: 'Midnight Study Session', vibe: 'Deep Focus', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 4, title: 'Nature\'s Whisper', vibe: 'Ambient Calm', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
];

interface LofiPlayerProps {
  isOpen: boolean;
  onClose: () => void;
}

const LofiPlayer: React.FC<LofiPlayerProps> = ({ isOpen, onClose }) => {
  const [playerMode, setPlayerMode] = useState<'local' | 'youtube'>('local');
  const [currentTrack, setCurrentTrack] = useState<Track>(TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [ytInput, setYtInput] = useState('');
  const [ytId, setYtId] = useState('jfKfPfyJRdk'); // Default Lo-fi radio ID
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Playback error", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const selectTrack = (track: Track) => {
    setPlayerMode('local');
    setCurrentTrack(track);
    setIsPlaying(true);
    
    // Force reset and play the new track
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = track.url;
      audioRef.current.load();
      audioRef.current.play().catch(e => console.error("Track change playback error", e));
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleYtSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Extract ID from URL if possible
    const match = ytInput.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^& \n]+)/);
    const id = match ? match[1] : ytInput;
    if (id) {
      setYtId(id);
      setPlayerMode('youtube');
      setIsPlaying(false); // Pause local audio
      audioRef.current?.pause();
    }
  };

  return (
    <div 
      className={`fixed top-0 right-0 h-screen w-full sm:w-96 bg-white/40 backdrop-blur-2xl border-l border-white/20 z-[100] transition-transform duration-500 ease-out shadow-2xl ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full p-8">
        {/* Audio Element for Local Tracks */}
        <audio 
          ref={audioRef} 
          src={currentTrack.url} 
          loop 
          onEnded={() => setIsPlaying(false)}
        />

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 
            className="text-4xl text-black"
            style={{ fontFamily: '"Instrument Serif", serif' }}
          >
            Lo-Fi Sanctuary
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-black/5 rounded-full transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-2 p-1 bg-black/5 rounded-2xl mb-8">
          <button 
            onClick={() => setPlayerMode('local')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${playerMode === 'local' ? 'bg-black text-white shadow-md' : 'text-black/40 hover:text-black/60'}`}
          >
            Local Tracks
          </button>
          <button 
            onClick={() => setPlayerMode('youtube')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${playerMode === 'youtube' ? 'bg-black text-white shadow-md' : 'text-black/40 hover:text-black/60'}`}
          >
            YouTube Music
          </button>
        </div>

        {/* Player Views */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
          {playerMode === 'local' ? (
            <>
              {/* Now Playing Card */}
              <div className="bg-black text-white p-8 rounded-[3rem] shadow-xl transform transition-all hover:scale-[1.02]">
                <div className="flex flex-col items-center gap-6">
                  <div className={`w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center ${isPlaying ? 'animate-pulse' : ''}`}>
                    <div className="flex gap-1 items-end h-6">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-1 bg-white rounded-full transition-all duration-300 ${isPlaying ? 'animate-bounce' : 'h-2'}`} style={{ animationDelay: `${i * 0.1}s`, height: isPlaying ? '1.5rem' : '0.5rem' }}></div>
                        ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-serif tracking-tight">{currentTrack.title}</h3>
                    <p className="text-xs uppercase tracking-widest text-white/50 mt-1">{currentTrack.vibe}</p>
                  </div>
                  <button onClick={togglePlay} className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-all">
                    {isPlaying ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Local Tracks List */}
              <div className="space-y-3 pt-4">
                {TRACKS.map((track) => (
                  <button key={track.id} onClick={() => selectTrack(track)} className={`w-full group flex items-center gap-4 bg-white/60 p-5 rounded-2xl border transition-all text-left ${currentTrack.id === track.id ? 'border-black' : 'border-black/5 hover:border-black/10'}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${currentTrack.id === track.id ? 'bg-black text-white' : 'bg-black/5'}`}>
                      {currentTrack.id === track.id && isPlaying ? "♫" : track.id}
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="font-semibold text-black">{track.title}</p>
                      <p className="text-[10px] text-black/40 uppercase font-bold">{track.vibe}</p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-6">
              {/* YouTube Player */}
              <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black/10">
                <iframe 
                   width="100%" 
                   height="100%" 
                   src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0`}
                   title="YouTube Audio" 
                   frameBorder="0" 
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                   allowFullScreen
                ></iframe>
              </div>

              {/* YouTube Form */}
              <div className="space-y-4">
                <div className="flex flex-col gap-3">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Paste YouTube Link or ID" 
                      value={ytInput}
                      onChange={(e) => setYtInput(e.target.value)}
                      className="w-full bg-white/50 border border-black/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all text-black"
                    />
                    <button 
                      onClick={handleYtSubmit}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black text-white px-4 py-2 rounded-xl text-xs font-bold hover:scale-105 transition-transform"
                    >
                      Play
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="h-px bg-black/10 flex-1" />
                    <span className="text-[10px] text-black/30 font-bold uppercase tracking-widest">or</span>
                    <div className="h-px bg-black/10 flex-1" />
                  </div>

                  <button 
                    onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(ytInput || 'lofi hip hop radio')}`, '_blank')}
                    className="w-full py-4 bg-white/40 border border-black/5 rounded-2xl text-xs font-bold text-black hover:bg-black/5 transition-all flex items-center justify-center gap-2 group"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    Search on YouTube
                  </button>
                </div>
                
                <p className="text-[10px] text-black/40 text-center uppercase tracking-widest px-4">
                  Privacy mode enabled. Ad-minimized streaming from YouTube-nocookie.
                </p>
              </div>
              
              {/* Instructions / Help */}
              <div className="pt-6 px-2 space-y-4">
                <h4 className="text-xs uppercase font-bold text-black/30 tracking-widest">How it works</h4>
                <div className="text-[11px] text-black/60 leading-relaxed space-y-2">
                   <p>• Find your favorite lofi stream on YouTube.</p>
                   <p>• Copy the video URL and paste it above.</p>
                   <p>• Press play to start your focus session.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LofiPlayer;
