import { useEffect, useState } from 'react';

const useBreakpoint = () => {
  const [isMdUp, setIsMdUp] = useState(false); // Tailwind's `md` starts at 768px

  useEffect(() => {
    const handleResize = () => {
      setIsMdUp(window.innerWidth >= 1100);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMdUp;
};
export default useBreakpoint            
