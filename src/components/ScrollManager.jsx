import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollManager = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    console.log('✔ ScrollManager (layout effect):', pathname);

    // Odmah resetuj scroll pre nego što se prikaže stranica
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [pathname]);

  return null;
};

export default ScrollManager;
