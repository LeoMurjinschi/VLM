import { useContext } from 'react';
<<<<<<< HEAD
import { ThemeContext } from '../context/ThemeContext'; // Ajustează calea către contextul tău

// Definim ce tipuri de date conține contextul
interface ThemeContextType {
  theme: string; // sau 'light' | 'dark'
  toggleTheme: () => void;
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  // Dacă componenta nu este înfășurată în ThemeProvider, aruncăm o eroare
  // Astfel, TypeScript știe sigur că aici 'context' nu va fi niciodată null
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context; // TypeScript știe acum că returnează garantat { theme, toggleTheme }
};
=======
import { ThemeContext } from '../context/ThemeContext';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
>>>>>>> 70661552ed75a7b09d5225a951f264947d53ef3d
