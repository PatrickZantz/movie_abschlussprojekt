import React, { createContext, useState } from 'react';

type MainContextType = {
  // Fügen Sie hier die benötigten Eigenschaften hinzu
  someValue: string;
  setSomeValue: React.Dispatch<React.SetStateAction<string>>;
};

const defaultContextValue: MainContextType = {
  someValue: '',
  setSomeValue: () => {},
};

export const MainContext = createContext<MainContextType>(defaultContextValue);

export default function MainProvider({ children }: { children: React.ReactNode }) {
  const [someValue, setSomeValue] = useState('');

  return (
    <MainContext.Provider value={{ someValue, setSomeValue }}>
      {children}
    </MainContext.Provider>
  );
}
