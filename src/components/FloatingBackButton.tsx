import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function FloatingBackButton() {
  const location = useLocation();
  const navigate = useNavigate();

  // Only display on project pages, hide on the main Hub page
  if (location.pathname === '/' || location.pathname === '') {
    return null;
  }

  return (
    <div className="fixed top-20 left-0 z-[9999] group pointer-events-auto select-none">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2.5 bg-black/80 hover:bg-black/95 text-white/90 hover:text-white backdrop-blur-xl border border-l-0 border-white/20 rounded-r-full py-2.5 pl-4 pr-3 shadow-2xl transform -translate-x-[calc(100%-20px)] group-hover:translate-x-0 transition-all duration-300 ease-out cursor-pointer group/btn"
        aria-label="Back to Hub"
        title="Back to Hub"
      >
        <span className="text-xs font-semibold tracking-wider uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-75">
          Back to Hub
        </span>
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 group-hover/btn:bg-white/20 transition-colors flex-shrink-0">
          <ArrowLeft className="w-4 h-4 text-white group-hover/btn:-translate-x-0.5 transition-transform" />
        </div>
      </button>
    </div>
  );
}
