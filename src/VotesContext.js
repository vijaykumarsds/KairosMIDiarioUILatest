import React, { createContext, useContext, useState, useMemo } from 'react';

const VotesContext = createContext();

export function VotesProvider({ children }) {
  const [votes, setVotes] = useState({}); // Initialize with an empty object

  // Wrap the context in useMemo to prevent unnecessary re-renders
  const value = useMemo(() => ({ votes, setVotes }), [votes, setVotes]);

  return <VotesContext.Provider value={value}>{children}</VotesContext.Provider>;
}

export function useVotes() {
  const context = useContext(VotesContext);
  if (!context) {
    throw new Error('useVotes must be used within a VotesProvider');
  }
  return context;
}
