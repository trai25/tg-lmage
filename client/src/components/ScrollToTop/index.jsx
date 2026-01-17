import { useState, useEffect } from 'react';
import { ArrowUp } from '@phosphor-icons/react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 p-3 bg-white border-2 border-pencil rounded-full shadow-sketch hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-pencil animate-bounce"
      title="Up we go!"
    >
      <ArrowUp size={24} weight="bold" />
    </button>
  );
};

export default ScrollToTop;
