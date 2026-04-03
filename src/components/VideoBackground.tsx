import React, { useEffect, useRef, useState } from 'react';

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4";

const VideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let frameId: number;

    const handleLoop = () => {
      const currentTime = video.currentTime;
      const duration = video.duration;

      if (!isNaN(duration)) {
        // Fade in logic (first 0.5s)
        if (currentTime < 0.5) {
          setOpacity(currentTime / 0.5);
        } 
        // Fade out logic (last 0.5s)
        else if (currentTime > duration - 0.5) {
          setOpacity((duration - currentTime) / 0.5);
        } 
        // Mid-point opacity
        else {
          setOpacity(1);
        }

        // Near end logic - Trigger loop slightly before physical end for seamlessness
        if (currentTime >= duration - 0.1) {
          video.currentTime = 0;
          // Loop starts again, handleLoop will naturally pick up and fade-in from 0
        }
      }
      frameId = requestAnimationFrame(handleLoop);
    };

    video.play();
    frameId = requestAnimationFrame(handleLoop);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute z-0 overflow-hidden" 
      style={{ 
        top: '120px', 
        inset: 'auto 0 0 0',
        height: 'calc(100vh - 120px)' 
      }}
    >
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        playsInline
        className="w-full h-full object-cover"
        style={{ opacity }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />
    </div>
  );
};

export default VideoBackground;
