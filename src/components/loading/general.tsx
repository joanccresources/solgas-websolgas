'use client'
import { useState, useEffect } from 'react';
import Loading from './layout';

export default function GlobalLoading() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };
 
    if (document.fonts) {
      document.fonts.ready.then(() => { 
        setTimeout(handleLoad, 300); 
      });
    } else {
      setLoading(false);  
    }
 
    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return loading ? <Loading /> : null;
}
