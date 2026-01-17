import { Link } from 'react-router-dom';
import { House, ArrowLeft, Warning } from '@phosphor-icons/react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-graph-paper font-hand">
      <div className="bg-white p-12 max-w-md w-full shadow-sketch text-center relative rotate-slight-1 rounded-sm border-2 border-dashed border-gray-300">
         {/* Tape */}
         <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/40 backdrop-blur-sm -rotate-1 shadow-tape"></div>

         <Warning size={80} className="mx-auto text-marker-yellow mb-6" weight="duotone" />
         
         <h1 className="text-8xl font-bold text-pencil mb-2 -rotate-2">404</h1>
         <h2 className="text-2xl font-bold text-gray-500 mb-6 rotate-1">Page Torn Out?</h2>
         
         <p className="text-lg text-gray-400 mb-8">
           We looked everywhere under the desk, but this page is gone.
         </p>

         <div className="flex flex-col gap-3">
           <Link to="/" className="btn-primary flex items-center justify-center gap-2">
             <House size={20} /> Return Home
           </Link>
           <button onClick={() => window.history.back()} className="btn-doodle flex items-center justify-center gap-2">
             <ArrowLeft size={20} /> Go Back
           </button>
         </div>
         
         <div className="mt-8 text-xs text-gray-300">
           (It might have been the dog)
         </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
