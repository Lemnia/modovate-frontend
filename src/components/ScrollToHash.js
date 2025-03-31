import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ScrollToHash = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { pathname, hash } = location;

    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else if (pathname !== '/') {
        // Redirect to home first, then scroll after
        navigate('/', { replace: false, state: { hash } });
      }
    }
  }, [location, navigate]);

  return null;
};

export default ScrollToHash;
