import { Link } from 'react-router'
import styles from './Logo.module.css'

// Custom logo drawn as inline SVG (original artwork, no copyrighted assets)
function Logo() {
  return (
    <Link to="/" className={styles.logo} aria-label="My Blog home">
      <svg
        className={styles.icon}
        viewBox="0 0 64 64"
        width="40"
        height="40"
        aria-hidden="true"
      >
        <rect width="64" height="64" rx="14" fill="#ffffff" fillOpacity="0.18" />
        <path
          d="M18 44 L22 34 L40 16 a4 4 0 0 1 6 0 l2 2 a4 4 0 0 1 0 6 L30 42 Z"
          fill="#ffffff"
        />
        <path d="M18 44 L30 42 L22 34 Z" fill="#f9a825" />
        <rect x="16" y="48" width="32" height="3" rx="1.5" fill="#ffffff" opacity="0.85" />
      </svg>
      <span className={styles.text}>My Blog</span>
    </Link>
  )
}

export default Logo
