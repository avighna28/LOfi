import React, { useState } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const TaskPanel: React.FC<TaskPanelProps> = ({ isOpen, onClose }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const newTask: Task = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div 
      className={`fixed top-0 right-0 h-screen w-full sm:w-96 bg-white/40 backdrop-blur-2xl border-l border-white/20 z-[100] transition-transform duration-500 ease-out shadow-2xl ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 
            className="text-4xl text-black"
            style={{ fontFamily: '"Instrument Serif", serif' }}
          >
            Today's Priorities
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

        {/* Input */}
        <form onSubmit={addTask} className="mb-8 relative">
          <input 
            type="text" 
            placeholder="Add a task..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full bg-white/50 border border-black/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all text-black"
          />
          <button 
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black text-white p-2 rounded-xl hover:scale-105 transition-transform"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </form>

        {/* List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {tasks.length === 0 ? (
            <div className="text-center py-20 opacity-30">
              <p className="text-sm">Your sanctuary is calm. Add some tasks to begin flow.</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div 
                key={task.id}
                className="group flex items-center gap-4 bg-white/60 p-5 rounded-2xl border border-black/5 hover:border-black/10 transition-all"
              >
                <button 
                  onClick={() => toggleTask(task.id)}
                  className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
                    task.completed ? 'bg-black border-black' : 'border-black/20 group-hover:border-black/40'
                  }`}
                >
                  {task.completed && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </button>
                <span className={`flex-1 text-sm transition-all ${task.completed ? 'line-through opacity-40' : 'text-black font-medium'}`}>
                  {task.text}
                </span>
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-40 hover:!opacity-100 transition-opacity"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskPanel;
