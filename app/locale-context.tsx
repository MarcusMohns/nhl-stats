"use client";

import { createContext, useContext, ReactNode } from "react";

type LocaleContextType = {
  locale: string;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

type LocaleProviderProps = {
  children: ReactNode;
  locale: string;
};

export function LocaleProvider({ children, locale }: LocaleProviderProps) {
  return (
    <LocaleContext.Provider value={{ locale }}>
      {children}
    </LocaleContext.Provider>
  );
}

// Hook to get the current locale in client components
export function useLocale(): string {
  const context = useContext(LocaleContext);
  if (!context) {
    // Fallback to navigator.language if context is not available
    return typeof navigator !== "undefined" ? navigator.language : "en-US";
  }
  return context.locale;
}
