import { Menu, Bell, Search, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 z-10 sticky top-0 shrink-0">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-slate-500 hover:text-slate-700 flex-shrink-0">
          <Menu className="w-6 h-6" />
        </button>
        <div className="hidden sm:flex items-center gap-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{user?.role || 'Apprenant'} Dashboard</span>
          <div className="h-4 w-px bg-slate-200 hidden md:block"></div>
          <span className="text-sm text-slate-600 italic hidden md:block">"La connaissance est une forge."</span>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full cursor-pointer hover:bg-amber-100 transition-colors">
          <span className="text-lg leading-none">🔥</span>
          <span className="text-sm font-bold text-amber-700">12 Jours Streak</span>
        </div>

        <button className="relative p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors hidden sm:block">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-0 sm:pl-4 sm:border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 leading-none">{user?.name}</p>
            <p className="text-[10px] text-indigo-600 font-semibold mt-1 uppercase tracking-wider">
              {user?.role === 'ETUDIANT' ? 'Classe: BTS SIO - Réf: 2024' : user?.role}
            </p>
          </div>
          <div className="relative cursor-pointer group flex items-center">
            <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center text-slate-600 font-bold">
              {user?.picture ? (
                 <img src={user.picture} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                 <span className="text-sm">{user?.name?.charAt(0) || 'U'}</span>
              )}
            </div>
          </div>
          
          <button 
            onClick={logout}
            title="Se déconnecter"
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors ml-1 hidden sm:block"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
