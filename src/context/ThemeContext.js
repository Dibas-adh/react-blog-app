import { createContext } from 'react'

// Holds the current theme ('light' | 'dark') and a function to toggle it
const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} })

export default ThemeContext
