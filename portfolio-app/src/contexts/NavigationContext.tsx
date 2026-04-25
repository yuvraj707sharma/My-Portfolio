'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface NavigationContextType {
  scrollProgress: number;
  setScrollProgress: (v: number) => void;
  isBrainOpen: boolean;
  setBrainOpen: (v: boolean) => void;
  activeSection: string | null;
  setActiveSection: (v: string | null) => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBrainOpen, setBrainOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <NavigationContext.Provider
      value={{
        scrollProgress,
        setScrollProgress,
        isBrainOpen,
        setBrainOpen,
        activeSection,
        setActiveSection,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider');
  return ctx;
}
