import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { db, auth } from '../firebase';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  Timestamp 
} from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { X, Activity, CheckCircle2, Clock } from 'lucide-react';

interface AnalyticsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChartData {
  day: string;
  hours: number;
  tasks: number;
}

const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({ isOpen, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState<ChartData[]>([]);
  const [stats, setStats] = useState({ totalHours: 0, totalTasks: 0 });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchAnalytics = async () => {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const startTimestamp = Timestamp.fromDate(sevenDaysAgo);

      // Fetch Tasks
      const tasksQuery = query(
        collection(db, 'tasks'),
        where('userId', '==', user.uid),
        where('completed', '==', true)
      );

      // Fetch Sessions
      const sessionsQuery = query(
        collection(db, 'focus_sessions'),
        where('userId', '==', user.uid),
        where('timestamp', '>=', startTimestamp)
      );

      const [tasksSnap, sessionsSnap] = await Promise.all([
        getDocs(tasksQuery),
        getDocs(sessionsQuery)
      ]);

      // Process Data for the last 7 days
      const last7Days: ChartData[] = [];
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      
      let hourSum = 0;
      let taskSum = 0;

      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dayLabel = days[d.getDay()];
        
        // Calculate hours for this day
        let dayHours = 0;
        sessionsSnap.forEach(doc => {
          const s = doc.data();
          const sessionDate = s.timestamp?.toDate();
          if (sessionDate && sessionDate.toDateString() === d.toDateString()) {
            dayHours += s.durationMinutes / 60;
          }
        });

        // Calculate tasks for this day (placeholder logic, usually tasks need completedAt)
        // For now, let's just count total completed tasks as a stat
        
        last7Days.push({
          day: dayLabel,
          hours: Number(dayHours.toFixed(1)),
          tasks: 0 // We'll focus on hours first
        });
        hourSum += dayHours;
      }

      setStats({
        totalHours: Number(hourSum.toFixed(1)),
        totalTasks: tasksSnap.size
      });
      setData(last7Days);
    };

    fetchAnalytics();
  }, [user, isOpen]);

  return (
    <div 
      className={`fixed top-0 left-0 h-screen w-full sm:w-[450px] bg-white/40 backdrop-blur-2xl border-r border-white/20 z-[100] transition-transform duration-500 ease-out shadow-2xl ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full p-8 md:p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl text-black" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Your Journey
            </h2>
            <p className="text-[10px] uppercase tracking-widest text-black/40 font-bold mt-1">7-Day Productivity Insight</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <X size={24} color="black" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          <div className="bg-white/60 p-6 rounded-3xl border border-black/5">
            <Clock size={20} className="mb-4 text-black/40" />
            <div className="text-3xl font-normal leading-none text-black" style={{ fontFamily: '"Instrument Serif", serif' }}>
              {stats.totalHours}h
            </div>
            <p className="text-[10px] uppercase tracking-widest text-black/40 font-bold mt-2">Focus Time</p>
          </div>
          <div className="bg-white/60 p-6 rounded-3xl border border-black/5">
            <CheckCircle2 size={20} className="mb-4 text-black/40" />
            <div className="text-3xl font-normal leading-none text-black" style={{ fontFamily: '"Instrument Serif", serif' }}>
              {stats.totalTasks}
            </div>
            <p className="text-[10px] uppercase tracking-widest text-black/40 font-bold mt-2">Tasks Done</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Activity size={16} className="text-black/60" />
            <h3 className="text-xs uppercase tracking-widest font-bold text-black/60">Activity Pulse</h3>
          </div>
          
          <div className="h-64 mt-4 bg-white/30 p-6 rounded-[2rem] border border-white/40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#00000060', fontWeight: 'bold' }} 
                  dy={10}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255,255,255,0.8)', 
                    backdropFilter: 'blur(10px)', 
                    borderRadius: '1rem', 
                    border: '1px solid rgba(0,0,0,0.05)',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="hours" radius={[6, 6, 6, 6]} barSize={24}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 6 ? '#000000' : '#00000020'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Motivation Quote */}
          <div className="mt-auto pt-10 border-t border-black/5 text-center">
            <p className="text-sm font-serif italic text-black/60">
              "Every session is a step closer <br /> to the eternal flow."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
