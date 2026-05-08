import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { BookOpen, ShieldCheck, Zap } from 'lucide-react';
import { jwtDecode } from "jwt-decode";

export function Login() {
  const { isAuthenticated, login } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      const decoded: any = jwtDecode(credentialResponse.credential);
      login(credentialResponse.credential, decoded);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl flex overflow-hidden">
        {/* Left Side - Visual */}
        <div className="w-1/2 bg-indigo-600 p-12 text-white flex flex-col justify-between hidden md:flex">
          <div>
            <div className="flex items-center gap-2 font-bold text-2xl mb-8">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              EduForge AI
            </div>
            <h1 className="text-4xl font-bold leading-tight mb-4">
              L'apprentissage<br/>réinventé pour<br/>les pros.
            </h1>
            <p className="text-indigo-100 text-lg">
              Une plateforme LMS moderne connectée à Google Workspace et GitHub Pages.
            </p>
          </div>
          
          <div className="space-y-4 text-sm text-indigo-200">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-indigo-300" />
              <span>Authentification sécurisée Google OAuth</span>
            </div>
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-indigo-300" />
              <span>Architecture Serverless Rapide</span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center text-center">
          <div className="w-full max-w-sm">
            <div className="mb-8 md:hidden flex justify-center">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Bienvenue</h2>
            <p className="text-slate-500 mb-8">Connectez-vous pour accéder à vos cours</p>
            
            <div className="flex justify-center w-full">
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => {
                  console.error('Login Failed');
                }}
                theme="outline"
                size="large"
                shape="rectangular"
                width="100%"
                useOneTap={false}
              />
            </div>
            
            <p className="text-xs text-slate-400 mt-8">
              En vous connectant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
