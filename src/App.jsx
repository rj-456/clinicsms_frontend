import { useState } from 'react';
import RegisterPatient from './components/RegisterPatient';
import AddToQueue from './components/AddToQueue';

import { Activity, UserPlus, ListPlus, Menu, X, HeartPulse, Clock, Phone } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('home');
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
            <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setActiveTab('home')}>
              <img src="/santa_ana_logo.png" alt="Sta. Ana Municipal Clinic Logo" className="h-14 w-auto object-contain" />
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-blue-900">Sta. Ana Primary Care Facility</h1>
                <p className="text-sm font-bold text-yellow-500 tracking-wide uppercase">Patient Portal</p>
              </div>
            </div>
            {/* Desktop Navigation (Moved to center body) */}
          </div>
        </div>
      </nav>

      {/* Hero Background (Optional subtle gradient) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-slate-50 to-white -z-10 h-96"></div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
        
        {/* Home Screen */}
        {activeTab === 'home' && (
          <div className="flex flex-col items-center justify-center py-6 sm:py-12 animate-in zoom-in-95 duration-500">
            <div className="text-center mb-12">
              <p className="text-blue-900 font-extrabold tracking-widest uppercase mb-3 text-sm sm:text-base bg-blue-100 inline-block px-4 py-1.5 rounded-full">✨ Malaus ko pu, Pimpeños! ✨</p>
              <h2 className="text-4xl md:text-5xl font-black text-blue-950 tracking-tight mb-4 drop-shadow-sm">
                Welcome to Sta. Ana Clinic
              </h2>
              <p className="text-slate-600 max-w-2xl text-lg mx-auto leading-relaxed">
                Please select an option below to get started. If you are a new patient, you must register first before booking an appointment.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-4">
              <button 
                onClick={() => setActiveTab('register')}
                className="group relative bg-white/80 backdrop-blur-sm p-10 rounded-[2rem] shadow-xl border border-slate-100 hover:border-blue-900/30 hover:shadow-2xl transition-all duration-500 text-center overflow-hidden flex flex-col items-center hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="bg-blue-900 p-6 rounded-3xl text-yellow-400 mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg shadow-blue-900/20 relative z-10">
                  <UserPlus size={56} strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-4 group-hover:text-blue-900 transition-colors relative z-10">Step 1: Register</h3>
                <p className="text-slate-500 relative z-10 text-lg">Create your official medical profile to receive a unique Patient ID.</p>
              </button>

              <button 
                onClick={() => setActiveTab('queue')}
                className="group relative bg-white/80 backdrop-blur-sm p-10 rounded-[2rem] shadow-xl border border-slate-100 hover:border-blue-900/30 hover:shadow-2xl transition-all duration-500 text-center overflow-hidden flex flex-col items-center hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="bg-blue-900 p-6 rounded-3xl text-yellow-400 mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-lg shadow-blue-900/20 relative z-10">
                  <ListPlus size={56} strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-4 group-hover:text-blue-900 transition-colors relative z-10">Step 2: Book Appointment</h3>
                <p className="text-slate-500 relative z-10 text-lg">Already registered? Use your Patient ID to schedule a clinic visit.</p>
              </button>
            </div>
          </div>
        )}

        {/* Form Screens */}
        {activeTab !== 'home' && (
          <div className="animate-in fade-in duration-500">
            {/* Page Header */}
            <div className="mb-12 flex flex-col items-center text-center">
              <h2 className="text-4xl md:text-5xl font-black text-blue-950 tracking-tight mb-4 drop-shadow-sm">
                {activeTab === 'register' ? 'Patient Registration' : 'Book Appointment'}
              </h2>
              <p className="text-slate-600 max-w-2xl text-lg mb-8 leading-relaxed">
                {activeTab === 'register' 
                  ? 'Welcome to Sta. Ana Primary Care Facility. Please fill out your personal information below to create your official patient profile.' 
                  : 'Select your desired service and schedule an available date for your visit to the Sta. Ana Primary Care Facility.'}
              </p>

              {/* Toggle Buttons (Segmented Control) */}
              <div className="inline-flex flex-col sm:flex-row bg-white/60 backdrop-blur-md p-1.5 rounded-3xl sm:rounded-2xl shadow-sm border border-slate-200/60 gap-1 w-full sm:w-auto">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl sm:rounded-xl text-sm md:text-base font-bold transition-all duration-300 w-full sm:w-auto ${
                        isActive 
                          ? 'bg-blue-900 text-yellow-400 shadow-md transform scale-100' 
                          : 'text-slate-500 hover:text-blue-900 hover:bg-blue-50/50'
                      }`}
                    >
                      <Icon size={20} className={isActive ? "text-yellow-400" : "text-slate-400"} />
                      {item.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
              {activeTab === 'register' && <RegisterPatient />}
              {activeTab === 'queue' && <AddToQueue />}
            </div>
            
            {/* Back to Home Button */}
            <div className="mt-8 text-center">
              <button 
                onClick={() => setActiveTab('home')}
                className="text-slate-500 hover:text-blue-900 font-semibold underline underline-offset-4 transition-colors"
              >
                &larr; Back to Home Menu
              </button>
            </div>
          </div>
        )}
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
