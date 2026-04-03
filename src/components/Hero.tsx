import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 min-h-screen" 
      style={{ paddingTop: 'calc(8rem - 75px)', paddingBottom: '10rem' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <h1 
          className="text-5xl sm:text-7xl md:text-8xl font-normal leading-[0.95] tracking-[-2.46px] text-black animate-fade-rise"
          style={{ fontFamily: '"Instrument Serif", serif' }}
        >
          Beyond <span className="italic text-[#6F6F6F]">silence</span>, <br /> we build <span className="italic text-[#6F6F6F]">the eternal.</span>
        </h1>

        {/* Description */}
        <p className="mt-8 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-black/80 font-medium animate-fade-rise-delay">
          Building a sanctuary for deep work. <br />
          Let silence be your strength and pure flow be your guide.
        </p>
      </div>
    </section>
  );
};

export default Hero;
