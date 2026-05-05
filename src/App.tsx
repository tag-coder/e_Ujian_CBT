import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { 
  Search, Bell, HelpCircle, LogOut, LayoutDashboard, FileText, Database, 
  Users, TrendingUp, Settings, ChevronRight, FileUp, Plus, Info, AlertTriangle,
  BookMarked, Key, ArrowRight, Home, MessageSquare,
  Shield, CheckCircle, Clock, Flag, Check, ChevronLeft, Menu, MoreVertical
} from 'lucide-react';

// --- Types ---
type View = 'login' | 'student-dashboard' | 'admin-results' | 'exam-session';

// --- Shared Components ---

const Sidebar = ({ activeView, setView }: { activeView: string, setView: (v: View) => void }) => {
  const menuItems = [
    { id: 'admin-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'admin-exams', label: 'Exams', icon: FileText },
    { id: 'admin-questions', label: 'Question Bank', icon: Database },
    { id: 'admin-results', label: 'Results', icon: TrendingUp },
    { id: 'users', label: 'Students', icon: Users },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-slate-50 border-r border-slate-200 hidden md:flex flex-col z-40">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-sm">
          <BookMarked className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-sm font-black text-primary font-display leading-tight">e-Ujian Admin</h2>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Institutional Portal</p>
        </div>
      </div>

      <nav className="flex-1 px-4 mt-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView('admin-results')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              activeView === item.id 
                ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600 shadow-sm' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-blue-600'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200 space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition-all">
          <Settings className="w-5 h-5" />
          Settings
        </button>
        <button 
          onClick={() => setView('login')}
          className="w-full flex items-center gap-3 px-4 py-2 text-rose-600 hover:bg-rose-50 rounded-lg text-sm font-medium transition-all"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

const TopBar = ({ title, userAvatar, userName, role }: { title: string, userAvatar: string, userName: string, role: string }) => {
  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-30">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-primary font-display tracking-tight">{title}</h1>
      </div>
      <div className="flex items-center gap-4 lg:gap-6">
        <div className="relative hidden lg:flex items-center">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs w-64 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>
          <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-700 leading-none">{userName}</p>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{role}</p>
            </div>
            <img 
              src={userAvatar} 
              alt="User" 
              className="w-9 h-9 rounded-full object-cover border border-slate-200 group-hover:ring-2 group-hover:ring-primary transition-all"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

// --- View: Login ---
const LoginView = ({ setView }: { setView: (v: View) => void }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 bg-[radial-gradient(at_0%_0%,rgba(0,91,191,0.05)_0,transparent_50%),radial-gradient(at_100%_100%,rgba(0,91,191,0.05)_0,transparent_50%)]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl"
      >
        <div className="text-center mb-12">
          <div className="inline-flex p-4 bg-white rounded-full shadow-sm border border-slate-200 mb-6">
            <BookMarked className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-black text-primary font-display mb-2">e-Ujian</h1>
          <p className="text-slate-500 text-lg">Integrated Examination Information System for Modern Institutions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-50 flex items-center justify-center rounded-xl text-primary">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">Teacher Login</h2>
                <p className="text-sm text-slate-500">Access educator dashboard</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-600 ml-1">Email / NIP</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Users className="w-4 h-4" /></span>
                  <input type="text" placeholder="Enter email or NIP" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-600 ml-1">Password</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Shield className="w-4 h-4" /></span>
                  <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                </div>
              </div>
              <button 
                onClick={() => setView('admin-results')}
                className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Enter Teacher Portal
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-slate-100 flex items-center justify-center rounded-xl text-slate-600">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">Student Login</h2>
                <p className="text-sm text-slate-500">Access student examination portal</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-600 ml-1">NIS (Student ID)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><LayoutDashboard className="w-4 h-4" /></span>
                  <input type="text" placeholder="Enter registration number" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-400 focus:border-transparent outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-600 ml-1">Password</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Shield className="w-4 h-4" /></span>
                  <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-400 focus:border-transparent outline-none transition-all" />
                </div>
              </div>
              <button 
                onClick={() => setView('student-dashboard')}
                className="w-full py-4 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 shadow-lg shadow-slate-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Access Exam Hall
                <LayoutDashboard className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- View: Student Dashboard ---
const StudentDashboard = ({ setView }: { setView: (v: View) => void }) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-black text-primary font-display">e-Ujian</h1>
            <nav className="hidden md:flex gap-6 h-16">
              <button className="text-primary font-bold border-b-2 border-primary h-full">Home</button>
              <button className="text-slate-500 hover:text-primary transition-colors">My Exams</button>
              <button className="text-slate-500 hover:text-primary transition-colors">Progress</button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 rounded-full hover:bg-slate-50"><Bell className="w-5 h-5" /></button>
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFx_EnfmIUB1OiO5AHEQvOTUXadYk2ku17ayYt0IcSTlf0pauMWU51-qNQpguBcNIn8wsCAKZI1uz42q69K9-FxjhkTreF8s7cn_qBXvvedeDvCgCTtiCzI4SggpIH60GOK8pqd_smnxJxepgZGRa9fUfRxYkQ2jWmsmc5GDDxgjn2xzINRBDbdFO40o1Qry7XSVD8di10lDmJA8R8piSk9sZJjP1rWsT0eLoA2UnrqH5uIYjaS_h2mj8XewiACukDGCMLwIvB2Z4C" className="w-9 h-9 rounded-full object-cover border-2 border-slate-200" alt="Student" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-primary rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-4xl font-display font-bold mb-3">Welcome back, Adryan!</h2>
              <p className="text-blue-100 text-lg max-w-md">You have 2 exams scheduled for today. Make sure you have your tokens ready to start.</p>
            </div>
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          </div>
          <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-8 flex flex-col justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-inner">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFx_EnfmIUB1OiO5AHEQvOTUXadYk2ku17ayYt0IcSTlf0pauMWU51-qNQpguBcNIn8wsCAKZI1uz42q69K9-FxjhkTreF8s7cn_qBXvvedeDvCgCTtiCzI4SggpIH60GOK8pqd_smnxJxepgZGRa9fUfRxYkQ2jWmsmc5GDDxgjn2xzINRBDbdFO40o1Qry7XSVD8di10lDmJA8R8piSk9sZJjP1rWsT0eLoA2UnrqH5uIYjaS_h2mj8XewiACukDGCMLwIvB2Z4C" className="w-full h-full object-cover" alt="S" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-800 text-xl">Adryan Putera</h3>
                <p className="text-slate-400 font-medium text-sm">ID: 202409812</p>
                <div className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-black uppercase tracking-widest inline-block">Grade 12 - Science A</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-100">
              <div><p className="text-[10px] text-slate-400 font-black uppercase">GPA</p><p className="text-3xl font-display font-black text-primary">3.85</p></div>
              <div><p className="text-[10px] text-slate-400 font-black uppercase">Completed</p><p className="text-3xl font-display font-black text-accent">24</p></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
              <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold flex items-center gap-2 text-slate-800"><Bell className="w-5 h-5 text-primary" /> Announcements</h3>
              </div>
              <div className="p-8 space-y-4">
                <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100 flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-700"><Info className="w-5 h-5" /></div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-blue-900">Final Semester Schedule</h4>
                    <p className="text-sm text-blue-700">The schedule for 2024 Final Exams is now live in your Portal.</p>
                  </div>
                </div>
              </div>
            </section>
            <section className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
              <div className="px-8 py-5 border-b border-slate-100"><h3 className="font-bold text-slate-800">Upcoming Exams</h3></div>
              <div className="p-8 group hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setView('exam-session')}>
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform"><BookMarked className="w-7 h-7" /></div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-800 text-lg">Advanced Physics II</h4>
                      <p className="text-sm text-slate-400">90 Minutes • 40 Questions</p>
                    </div>
                  </div>
              </div>
            </section>
          </div>
          <div className="lg:col-span-4 space-y-8">
            <section className="bg-white rounded-3xl border border-slate-200 p-8">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Key className="w-5 h-5 text-primary" /> Enter Exam Hall</h3>
              <div className="flex gap-2 my-6">
                {[1,2,3,4,5,6].map(i => (
                  <input key={i} type="text" maxLength={1} className="w-full aspect-square border border-slate-200 rounded-xl text-center text-xl font-black text-primary focus:ring-2 focus:ring-primary outline-none bg-slate-50" />
                ))}
              </div>
              <button onClick={() => setView('exam-session')} className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-blue-700 transition-all">Start Session</button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- View: Admin Results Recap ---
const AdminResultsView = ({ setView }: { setView: (v: View) => void }) => {
  return (
    <div className="min-h-screen bg-slate-50 md:pl-64 pt-16">
      <Sidebar activeView="admin-results" setView={setView} />
      <TopBar title="Exam Results Recap" userName="Sarah Mitchell" role="Senior Proctor" userAvatar="https://lh3.googleusercontent.com/aida-public/AB6AXuCYCGCodhHII5hpv7FA28QzQpfvaMANoiSOsgnf6T2LIHQbYmrOtpCUXs2yTeGCAw8Yy7KdOO7Y9HVUwIlJokg_39wRcpMSPnuPIyEIoteoePb-EwLtJyvf6SMcBgfQ8UcN9ufIzNJRgF3X9ki1StxsJ5egYUPsj0YjcsJ39RbahjfKKLN4ULk4zCrtLyBJPS1p8WjVQ_-n9dPWmiyl027CYvnfKJLIdBXOiwyUdMfn8rsbUvf4XswJjUlUeCCPzDgyzQWV2E4rHKz2" />
      <main className="p-8 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-6 bg-white p-8 rounded-3xl border border-slate-200">
          <div className="flex flex-wrap items-center gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Class</label>
              <select className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none"><option>All Classes</option></select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Session</label>
              <select className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none"><option>Mid-Term Semester 2</option></select>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all">Print</button>
            <button className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all">Export</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Total Students</p><p className="text-4xl font-display font-black text-slate-800">124</p></div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Class Average</p><p className="text-4xl font-display font-black text-slate-800">84.5</p></div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Pass Rate</p><p className="text-4xl font-display font-black text-slate-800">92%</p></div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Top Scorer</p><p className="font-bold text-slate-800 truncate">Aditya Pratama</p></div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase">Rank</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase">Name</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase">Score</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[{r:1, n:'Aditya Pratama', s:98},{r:2, n:'Bella Nurhaliza', s:94},{r:3, n:'Dimas Maulana', s:82}].map(row => (
                <tr key={row.r} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-6"><span className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ring-1 ring-slate-200">{row.r}</span></td>
                  <td className="px-8 py-6 font-bold text-slate-800">{row.n}</td>
                  <td className="px-8 py-6 text-2xl font-black text-primary font-display">{row.s}</td>
                  <td className="px-8 py-6 text-right"><button className="p-2 text-slate-400 hover:text-primary transition-all"><ChevronRight className="w-5 h-5" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-white p-10 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-display font-bold mb-6">Score Distribution</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{ r: '0-50', c: 5 }, { r: '50-60', c: 12 }, { r: '60-70', c: 25 }, { r: '70-80', c: 45 }, { r: '80-90', c: 65 }, { r: '90-95', c: 35 }, { r: '95-100', c: 18 }]}>
                  <XAxis dataKey="r" hide />
                  <Bar dataKey="c" fill="#005bbf" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="lg:col-span-4 bg-primary rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 flex flex-col h-full">
              <TrendingUp className="w-12 h-12 mb-8 text-blue-200" />
              <h3 className="text-2xl font-display font-bold mb-4">Batch Process Recaps</h3>
              <p className="text-blue-100 text-sm mb-10 flex-1 opacity-90 leading-relaxed">Generate personalized achievement certificates for all students in one click.</p>
              <button className="w-full py-4 bg-white text-primary font-black rounded-2xl hover:bg-slate-50 transition-all uppercase tracking-widest text-xs">Process Reports</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- View: Exam Session (Student) ---
const StudentExamView = ({ setView }: { setView: (v: View) => void }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-black text-primary font-display">e-Ujian</h1>
            <div className="h-8 w-px bg-slate-100"></div>
            <div className="space-y-0.5">
              <p className="text-sm font-bold text-slate-800 leading-none">Mathematics Final Exam</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Grade XII IPA 1</p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 bg-blue-50 px-6 py-2.5 rounded-2xl border border-blue-100">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-2xl font-black text-primary font-display tabular-nums">01:42:05</span>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-[1440px] mx-auto p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-[32px] border border-slate-200 p-12 shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <span className="bg-primary text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20">Question 24 of 50</span>
              <button className="flex items-center gap-2 text-xs font-bold text-slate-400"><Flag className="w-4 h-4" /> Report</button>
            </div>
            <div className="space-y-10">
              <p className="text-2xl font-display font-medium text-slate-800 leading-relaxed">If f(x) = 2x + 3 and g(x) = x² - 1, then (g ∘ f)(x) is...</p>
              <div className="grid grid-cols-1 gap-4">
                {['A. 4x² + 12x + 8', 'B. 4x² + 12x + 9', 'C. 4x² + 6x + 8', 'D. 2x² + 3x - 1'].map((opt, i) => (
                  <button key={i} className={`p-6 border-2 rounded-3xl transition-all text-left ${i === 1 ? 'border-primary bg-blue-50' : 'border-slate-100 hover:bg-slate-50'}`}>
                    <span className={`text-lg font-bold ${i === 1 ? 'text-primary' : 'text-slate-600'}`}>{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-[24px] border border-slate-200 p-6 flex items-center justify-between shadow-sm">
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-slate-50 text-slate-400 font-bold uppercase text-[10px] rounded-2xl">Previous</button>
              <button className="px-8 py-3 bg-primary text-white font-bold uppercase text-[10px] rounded-2xl shadow-lg">Next Question</button>
            </div>
            <button onClick={() => setView('student-dashboard')} className="px-10 py-3 bg-rose-500 text-white font-bold uppercase text-[10px] rounded-2xl shadow-lg">Finish Exam</button>
          </div>
        </div>
        <div className="lg:col-span-4">
          <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm">
            <h4 className="font-black text-slate-800 uppercase tracking-widest text-[10px] mb-6">Question Map</h4>
            <div className="grid grid-cols-5 gap-3">
              {Array.from({length: 25}, (_, i) => i + 1).map(n => (
                <div key={n} className={`aspect-square rounded-xl flex items-center justify-center font-bold text-sm ${n === 24 ? 'border-2 border-primary text-primary' : n < 24 ? 'bg-primary text-white' : 'bg-slate-50 text-slate-300'}`}>{n}</div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- View: Base Application Structure ---
const App = () => {
  const [view, setView] = useState<View>('login');

  return (
    <div className="App font-sans selection:bg-primary selection:text-white">
      <AnimatePresence mode="wait">
        <motion.div key={view} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}>
          {view === 'login' && <LoginView setView={setView} />}
          {view === 'student-dashboard' && <StudentDashboard setView={setView} />}
          {view === 'admin-results' && <AdminResultsView setView={setView} />}
          {view === 'exam-session' && <StudentExamView setView={setView} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default App;
