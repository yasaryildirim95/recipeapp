import React, { createContext, useState, useContext } from 'react';

// Create a context for user preferences
const UserPreferencesContext = createContext();

// Custom hook to use UserPreferencesContext
export const useUserPreferences = () => useContext(UserPreferencesContext);

// Component to provide user preferences
export const UserPreferencesProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Default theme is 'light'

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  document.documentElement.classList.toggle('light', theme === 'dark');

  return (
    <UserPreferencesContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};
