"use client";

import React, { createContext, useContext } from "react";

type Dict = Record<string, any>;

const TranslationContext = createContext<Dict>({});

export function TranslationProvider({
  dict,
  children,
}: {
  dict: Dict;
  children: React.ReactNode;
}) {
  return (
    <TranslationContext.Provider value={dict}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useT() {
  return useContext(TranslationContext);
}