'use client';

import { useEffect } from 'react';

export default function LanguageRedirect() {
  useEffect(() => {
    const checkLanguage = async () => {
      try {
        const res = await fetch('/api/get-language');
        const data = await res.json();

        if (data.language) {
          const lang = data.language.toLowerCase();

          if (!window.location.pathname.startsWith(`/${lang}`)) {
            window.location.href = `/${lang}${window.location.pathname}`;
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