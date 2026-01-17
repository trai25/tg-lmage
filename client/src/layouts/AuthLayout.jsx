import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

const AuthLayout = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-graph-paper flex flex-col items-center justify-center p-4">
      
      {/* The Auth Card (Sticky Note Style) */}
      <div className="w-full max-w-md bg-white p-8 shadow-sketch relative rotate-slight-1 rounded-sm border border-gray-200">
        {/* Tape */}
        <div className="tape-top"></div>

        {/* Header */}
        <div className="text-center mb-8 pt-4">
          <h1 className="text-4xl font-bold text-pencil font-hand -rotate-2">
            <span className="bg-marker-yellow px-2 inline-block transform -skew-x-3">Doodle</span> Diary
          </h1>
          <p className="text-gray-400 font-hand text-lg mt-2 rotate-1">
            Unlock your sketchbook
          </p>
        </div>

        {/* Content */}
        <Outlet />

      </div>

      {/* Footer */}
      <div className="mt-8 text-center font-hand text-gray-400 text-sm">
        <p>© 2026 Doodle Diary · Just for fun</p>
      </div>
    </div>
  );
};

export default AuthLayout;
