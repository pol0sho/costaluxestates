'use client';
import { useEffect } from 'react';

export default function LanguageRedirect() {
  useEffect(() => {
    const checkLanguage = async () => {
      try {
        const res = await fetch('/api/get-language');
        const data = await res.json();

        if (data.language) {
          const locale = data.language.toLowerCase();
          // only redirect if not already at that locale
          if (!window.location.pathname.startsWith(`/${locale}`)) {
            window.location.href = `/${locale}${window.location.pathname}`;
          }
        }
      } catch (err) {
        console.error('Language check failed:', err);
      }
    };

    checkLanguage();
  }, []);

  return null;
}