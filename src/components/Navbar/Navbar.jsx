import { NavLink } from 'react-router'
import useTheme from '../../context/useTheme'
import styles from './Navbar.module.css'

// NavLink passes isActive so the current page's link can be highlighted
const linkClass = ({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`

function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <ul className={styles.list}>
        <li>
          <NavLink to="/" end className={linkClass}>
            Blog Posts
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
        </li>
      </ul>
      <button
        type="button"
        className={styles.toggle}
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        <span aria-hidden="true">{isDark ? '☀️' : '🌙'}</span>
        <span>{isDark ? 'Light' : 'Dark'}</span>
      </button>
    </nav>
  )
}

export default Navbar
