import React from 'react';
import { useAuth, UserRole } from '../context/AuthContext';
import { BookOpen, Target, Clock, Trophy, Play, CheckCircle2, ShieldCheck } from 'lucide-react';

export function Dashboard() {
  const { user, setRole } = useAuth();

  // Mock dev mode toggle
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value as UserRole);
  };

  return (
    <div className="space-y-6">
      {/* Test Role Switcher (Dev Only) */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between">
        <div>
          <h3 className="font-medium text-amber-900 text-sm">Mode Développement (Changement de rôle)</h3>
          <p className="text-amber-700 text-xs mt-1">Vous pouvez changer de rôle pour visualiser les différentes interfaces de EduForge AI.</p>
        </div>
        <select 
          value={user?.role || ''} 
          onChange={handleRoleChange}
          className="text-sm border-amber-300 rounded-md shadow-sm focus:border-amber-500 focus:ring-amber-500"
        >
          <option value="ETUDIANT">Étudiant</option>
          <option value="FORMATEUR">Formateur</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      {/* Remove previous header to match minimalist UI logic which puts identity in header */}
      {user?.role === 'ETUDIANT' && <StudentDashboard />}
      {user?.role === 'FORMATEUR' && (
        <div className="p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Bonjour, {user?.name}</h1>
          <p className="text-slate-500 mb-6">Heureux de vous revoir. Voici votre résumé d'apprentissage.</p>
          <TeacherDashboard />
        </div>
      )}
      {user?.role === 'ADMIN' && (
        <div className="p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Bonjour, {user?.name}</h1>
          <p className="text-slate-500 mb-6">Heureux de vous revoir. Voici votre résumé d'apprentissage.</p>
          <AdminDashboard />
        </div>
      )}
    </div>
  );
}

function StudentDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full p-4 sm:p-8">
      
      {/* Left Column: Courses */}
      <div className="md:col-span-12 lg:col-span-8 flex flex-col gap-6">
        
        {/* Hero Course Resume */}
        <div className="bg-indigo-700 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Reprendre le module 4</h2>
            <p className="text-indigo-100 opacity-80 mb-6">Cybersécurité : Cryptographie et VPN</p>
            <div className="w-full bg-indigo-900/40 h-2 rounded-full mb-2">
              <div className="bg-white h-full rounded-full" style={{ width: '65%' }}></div>
            </div>
            <p className="text-xs font-medium">65% complété • 4 modules restants</p>
          </div>
          <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
            <svg width="240" height="240" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
          </div>
        </div>

        {/* Small Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col hover:border-blue-300 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold">Py</div>
              <span className="text-xs font-semibold px-2 py-1 bg-slate-100 rounded text-slate-500">20 Modules</span>
            </div>
            <h3 className="font-bold mb-1 group-hover:text-blue-600 transition-colors">Python Avancé</h3>
            <p className="text-xs text-slate-500">Automation & Data Handling</p>
            <div className="mt-4 flex items-center gap-2 mt-auto pt-4">
              <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full" style={{ width: '20%' }}></div>
              </div>
              <span className="text-[10px] font-bold text-slate-400">20%</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col hover:border-emerald-300 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center font-bold">Net</div>
              <span className="text-xs font-semibold px-2 py-1 bg-slate-100 rounded text-slate-500">10 Modules</span>
            </div>
            <h3 className="font-bold mb-1 group-hover:text-emerald-600 transition-colors">Réseaux & Services</h3>
            <p className="text-xs text-slate-500">Configuration Switch & Routeurs</p>
            <div className="mt-4 flex items-center gap-2 mt-auto pt-4">
              <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full" style={{ width: '85%' }}></div>
              </div>
              <span className="text-[10px] font-bold text-slate-400">85%</span>
            </div>
          </div>
        </div>

        {/* Code Lab Snippet */}
        <div className="bg-slate-900 rounded-2xl p-6 flex flex-col grow min-h-[250px]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/20"></div>
              </div>
              <span className="ml-4 text-xs font-mono text-slate-500 relative bg-slate-800 px-3 py-1 rounded-md">interactive_lab_v1.py</span>
            </div>
            <button className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 transition-colors text-white text-xs font-bold rounded-lg whitespace-nowrap">
              Run Sandbox
            </button>
          </div>
          <div className="font-mono text-sm leading-relaxed text-slate-300 border-l border-slate-700 pl-4 py-2 mt-2 overflow-auto flex-1">
            <p><span className="text-indigo-400">def</span> <span className="text-amber-300">check_vulnerability</span>(host):</p>
            <p className="pl-4">status = ping_host(host)</p>
            <p className="pl-4"><span className="text-indigo-400">if</span> status == <span className="text-emerald-300">"ACTIVE"</span>:</p>
            <p className="pl-8"><span className="text-indigo-400">return</span> <span className="text-amber-300">scan_ports</span>(host, [22, 80, 443])</p>
            <p className="text-slate-500 mt-2"># Todo: Integrate nmap simulation...</p>
          </div>
        </div>
      </div>

      {/* Right Column: Stats/Social */}
      <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Google Classroom Sync</h3>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-300 transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-emerald-600 rounded text-white flex items-center justify-center font-bold shrink-0">C</div>
              <div>
                <p className="text-xs font-bold text-slate-900">Algorithmique Avancée</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Nouvel examen disponible</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-300 transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-indigo-600 rounded text-white flex items-center justify-center font-bold shrink-0">C</div>
              <div>
                <p className="text-xs font-bold text-slate-900">Culture Numérique</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Module 3 validé par le formateur</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex-1 flex flex-col">
          <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Leaderboard Groupe A</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-slate-50">
              <span className="w-5 text-xs font-bold text-slate-400 text-center">01</span>
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">TR</div>
              <span className="flex-1 text-xs font-semibold text-slate-700">Thomas R.</span>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">2,450 XP</span>
            </div>
            <div className="flex items-center gap-3 p-2 -mx-2 rounded-lg bg-slate-50 ring-1 ring-slate-200 shadow-sm">
              <span className="w-5 text-xs font-bold text-amber-500 text-center">02</span>
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">JD</div>
              <span className="flex-1 text-xs font-semibold text-slate-900 italic">Moi (Julien)</span>
              <span className="text-xs font-bold text-indigo-600 bg-white px-2 py-1 rounded shadow-sm border border-slate-100">2,310 XP</span>
            </div>
            <div className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-slate-50">
              <span className="w-5 text-xs font-bold text-slate-400 text-center">03</span>
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-600">SL</div>
              <span className="flex-1 text-xs font-semibold text-slate-700">Sarah L.</span>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">2,100 XP</span>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-100 mt-auto">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Tes Badges</h4>
            <div className="flex gap-2 flex-wrap">
              <div title="Python Starter" className="w-8 h-8 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center text-sm cursor-help hover:scale-110 transition-transform">🐍</div>
              <div title="10 Day Streak" className="w-8 h-8 bg-amber-50 border border-amber-100 rounded-lg flex items-center justify-center text-sm cursor-help hover:scale-110 transition-transform">⚡</div>
              <div title="Cyber Pro" className="w-8 h-8 bg-purple-50 border border-purple-100 rounded-lg flex items-center justify-center text-sm cursor-help hover:scale-110 transition-transform">🛡️</div>
              <div title="Code Master" className="w-8 h-8 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center justify-center text-sm cursor-help hover:scale-110 transition-transform">💻</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 flex items-center justify-between text-white">
           <div className="flex flex-col">
             <span className="text-[10px] font-bold opacity-60 uppercase tracking-wider mb-1">Storage</span>
             <span className="text-sm font-semibold italic text-slate-200">Drive & Sheet Sync</span>
           </div>
           <div className="flex -space-x-2">
             <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-slate-900 shadow-sm"></div>
             <div className="w-8 h-8 bg-emerald-500 rounded-full border-2 border-slate-900 shadow-sm relative z-10 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-white" />
             </div>
           </div>
        </div>
      </div>

    </div>
  );
}

function TeacherDashboard() {
  return (
    <div className="p-8 text-center bg-white border border-slate-200 rounded-xl">
      <Trophy className="w-12 h-12 text-slate-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-slate-900">Tableau de Bord Formateur</h3>
      <p className="text-slate-500 mt-2 max-w-md mx-auto">
        Ici, vous pourrez assigner des cours, voir les résultats de vos étudiants sur Google Sheets, et créer des examens.
      </p>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="p-8 text-center bg-white border border-slate-200 rounded-xl">
      <ShieldCheck className="w-12 h-12 text-slate-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-slate-900">Panneau d'Administration</h3>
      <p className="text-slate-500 mt-2 max-w-md mx-auto">
        Gérez l'ensemble de la plateforme, les logs d'activité et la synchronisation avec Google Classroom API.
      </p>
    </div>
  );
}
