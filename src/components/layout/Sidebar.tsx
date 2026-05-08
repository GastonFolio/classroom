import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  BookOpen, 
  Home, 
  Target, 
  Award, 
  Settings, 
  Users, 
  FileText,
  Shield,
  Code
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function Sidebar() {
  const { user } = useAuth();
  
  const commonLinks = [
    { name: 'Tableau de bord', to: '/', icon: Home },
    { name: 'Catalogue Cours', to: '/courses', icon: BookOpen },
    { name: 'TP Interactifs', to: '/tp/code', icon: Code },
    { name: 'Examens', to: '/exams', icon: Target },
    { name: 'Analytics', to: '/progression', icon: Award },
  ];

  const teacherLinks = [
    { name: 'Mes Groupes', to: '/groups', icon: Users },
    { name: 'Créer un Cours', to: '/admin/course-builder', icon: FileText },
  ];

  const adminLinks = [
    { name: 'Gestion Plateforme', to: '/admin', icon: Shield },
    { name: 'Utilisateurs', to: '/admin/users', icon: Users },
  ];

  let links = [...commonLinks];
  if (user?.role === 'FORMATEUR' || user?.role === 'ADMIN') {
    links = [...links, ...teacherLinks];
  }
  if (user?.role === 'ADMIN') {
    links = [...links, ...adminLinks];
  }

  return (
    <aside className="w-64 bg-slate-900 flex flex-col shrink-0 hidden md:flex">
      <div className="p-6 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold">E</div>
          <h1 className="text-white font-bold text-lg tracking-tight">EduForge <span className="text-indigo-400">AI</span></h1>
        </div>
      </div>
      
      <nav className="flex-1 py-4 px-4 space-y-1 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-indigo-600 text-white" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )
            }
          >
            <link.icon className="w-5 h-5" />
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <NavLink
            to="/settings"
            className="flex items-center gap-3 px-3 py-2 mb-4 text-slate-400 hover:bg-slate-800 hover:text-white rounded-md text-sm font-medium transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span>Paramètres</span>
        </NavLink>
        <div className="flex items-center gap-3 px-3 py-2 mb-4">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-slate-500 font-mono">GAS Backend: Connected</span>
        </div>
        <div className="p-3 bg-slate-800 rounded-xl">
          <p className="text-xs text-slate-400 mb-1">Prochaine Session Live</p>
          <p className="text-xs text-white font-semibold flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse"></div>
            Cybersécurité @ 14:00
          </p>
        </div>
      </div>
    </aside>
  );
}
