import React, { useState } from 'react'
import Navbar from './components/Navbar'
import VideoBackground from './components/VideoBackground'
import StudyTimer from './components/StudyTimer'
import TaskPanel from './components/TaskPanel'
import AboutModal from './components/AboutModal'
import LofiPlayer from './components/LofiPlayer'
import ConnectModal from './components/ConnectModal'
import AnalyticsPanel from './components/AnalyticsPanel'
import Hero from './components/Hero'

function App() {
  const [isTaskPanelOpen, setIsTaskPanelOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isLofiPlayerOpen, setIsLofiPlayerOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  const closeAll = () => {
    setIsTaskPanelOpen(false);
    setIsAboutModalOpen(false);
    setIsLofiPlayerOpen(false);
    setIsConnectModalOpen(false);
    setIsAnalyticsOpen(false);
  };

  const toggleTaskPanel = () => {
    closeAll();
    setIsTaskPanelOpen(!isTaskPanelOpen);
  };

  const toggleAboutModal = () => {
    closeAll();
    setIsAboutModalOpen(!isAboutModalOpen);
  };

  const toggleLofiPlayer = () => {
    closeAll();
    setIsLofiPlayerOpen(!isLofiPlayerOpen);
  };

  const toggleConnectModal = () => {
    closeAll();
    setIsConnectModalOpen(!isConnectModalOpen);
  };

  const toggleAnalyticsPanel = () => {
    closeAll();
    setIsAnalyticsOpen(!isAnalyticsOpen);
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white text-black font-body">
      {/* Background layer */}
      <VideoBackground />
      
      {/* Content layer */}
      <div className="relative z-10">
        <Navbar 
          onToggleTasks={toggleTaskPanel} 
          onToggleAbout={toggleAboutModal}
          onToggleLofi={toggleLofiPlayer}
          onToggleConnect={toggleConnectModal}
          onToggleAnalytics={toggleAnalyticsPanel}
        />
        <Hero />
        <StudyTimer />
      </div>

      {/* Side Panel for Tasks */}
      <TaskPanel 
        isOpen={isTaskPanelOpen} 
        onClose={closeAll} 
      />

      {/* Analytics Journey Panel */}
      <AnalyticsPanel 
        isOpen={isAnalyticsOpen}
        onClose={closeAll}
      />

      {/* Side Panel for Lo-Fi Music */}
      <LofiPlayer 
        isOpen={isLofiPlayerOpen} 
        onClose={closeAll} 
      />

      {/* Center Modals */}
      <AboutModal 
        isOpen={isAboutModalOpen} 
        onClose={closeAll} 
      />

      <ConnectModal 
        isOpen={isConnectModalOpen} 
        onClose={closeAll} 
      />

      {/* Overlays for closing panels */}
      {(isTaskPanelOpen || isAboutModalOpen || isLofiPlayerOpen || isConnectModalOpen || isAnalyticsOpen) && (
        <div 
          className="fixed inset-0 bg-black/5 z-[90] backdrop-blur-[2px] transition-all"
          onClick={closeAll}
        />
      )}

      {/* Persistent Footer */}
      <footer className="fixed bottom-6 left-0 right-0 z-10 text-center pointer-events-none">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/70 font-body">
          Made by Avighna
        </p>
      </footer>
    </main>
  )
}

export default App
