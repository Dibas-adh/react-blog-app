import { useContext } from 'react'
import ThemeContext from './ThemeContext'

// Small helper so components can call useTheme() instead of useContext(ThemeContext)
function useTheme() {
  return useContext(ThemeContext)
}

export default useTheme
