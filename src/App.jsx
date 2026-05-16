import { useState } from 'react';
import RegisterPatient from './components/RegisterPatient';
import AddToQueue from './components/AddToQueue';

import { Activity, UserPlus, ListPlus, Menu, X, HeartPulse, Clock, Phone } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('register');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { id: 'register', name: 'Register Patient', icon: UserPlus },
    { id: 'queue', name: 'Book Appointment', icon: ListPlus },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Banner */}
      <div className="bg-blue-900 text-yellow-400 text-xs py-2.5 px-4 hidden sm:block font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Clock size={14} /> Mon-Fri: 9AM - 5PM</span>
            <span className="flex items-center gap-1"><Phone size={14} /> Emergency: 911</span>
          </div>
          <div className="font-extrabold italic tracking-wider">
            "Mabilis ang aksyon at walang korapsyon! <span className="text-white">miDINAN neng LABUNG ing BALEN!</span>"
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center gap-4">
              <img src="/santa_ana_logo.png" alt="Sta. Ana Municipal Clinic Logo" className="h-14 w-auto object-contain" />
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-blue-900">Sta. Ana Primary Care Facility</h1>
                <p className="text-sm font-bold text-yellow-500 tracking-wide uppercase">Patient Portal</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden sm:flex sm:space-x-2 sm:items-center">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                      isActive 
                        ? 'bg-blue-900 text-yellow-400 shadow-md ring-1 ring-blue-800' 
                        : 'text-slate-600 hover:bg-blue-50 hover:text-blue-900'
                    }`}
                  >
                    <Icon size={18} className={isActive ? "text-yellow-400" : "text-slate-400"} />
                    {item.name}
                  </button>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-500 hover:text-blue-900 p-2 rounded-lg bg-slate-50"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-100 bg-white absolute w-full shadow-lg">
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-base font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-900 text-yellow-400'
                        : 'text-slate-600 hover:bg-blue-50 hover:text-blue-900'
                    }`}
                  >
                    <Icon size={20} className={isActive ? "text-yellow-400" : "text-slate-400"} />
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Background (Optional subtle gradient) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-slate-50 to-white -z-10 h-96"></div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
        
        {/* Page Header */}
        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            {activeTab === 'register' ? 'Welcome to Sta. Ana Primary Care Facility' : 'Schedule Your Visit'}
          </h2>
          <p className="mt-2 text-slate-500 max-w-2xl text-lg">
            {activeTab === 'register' 
              ? 'Please fill out your personal information below to create your patient profile.' 
              : 'Choose your desired service and select an available date for your appointment.'}
          </p>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
          {activeTab === 'register' && <RegisterPatient />}
          {activeTab === 'queue' && <AddToQueue />}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 opacity-50">
            <HeartPulse size={20} className="text-slate-400" />
            <p className="text-sm font-medium text-slate-500">
              &copy; {new Date().getFullYear()} Sta. Ana Primary Care Facility. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-blue-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-900 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
