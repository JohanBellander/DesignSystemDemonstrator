import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DesignSystem } from '../types/design-system';
import { loadDesignSystems } from '../utils/loadDesignSystems';
import { applyDesignTokens } from '../utils/applyDesignTokens';

interface DesignSystemContextValue {
  selectedSystem: DesignSystem | null;
  availableSystems: DesignSystem[];
  setSelectedSystem: (system: DesignSystem) => void;
  isLoading: boolean;
  error: string | null;
}

const DesignSystemContext = createContext<DesignSystemContextValue | null>(null);

interface DesignSystemProviderProps {
  children: ReactNode;
}

export function DesignSystemProvider({ children }: DesignSystemProviderProps) {
  const [selectedSystem, setSelectedSystemState] = useState<DesignSystem | null>(null);
  const [availableSystems, setAvailableSystems] = useState<DesignSystem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load design systems on mount
  useEffect(() => {
    async function loadSystems() {
      try {
        setIsLoading(true);
        const systems = await loadDesignSystems();
        
        if (systems.length === 0) {
          throw new Error('No design systems found');
        }

        setAvailableSystems(systems);
        setSelectedSystemState(systems[0]); // Select first system by default
        applyDesignTokens(systems[0]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load design systems');
        console.error('Error loading design systems:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadSystems();
  }, []);

  // Apply tokens when selected system changes
  const setSelectedSystem = (system: DesignSystem) => {
    setSelectedSystemState(system);
    applyDesignTokens(system);
  };

  const value: DesignSystemContextValue = {
    selectedSystem,
    availableSystems,
    setSelectedSystem,
    isLoading,
    error,
  };

  return (
    <DesignSystemContext.Provider value={value}>
      {children}
    </DesignSystemContext.Provider>
  );
}

export function useDesignSystem(): DesignSystemContextValue {
  const context = useContext(DesignSystemContext);
  
  if (!context) {
    throw new Error('useDesignSystem must be used within a DesignSystemProvider');
  }

  return context;
}
