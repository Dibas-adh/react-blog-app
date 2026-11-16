import { Link } from 'react-router'
import styles from './Pages.module.css'

function NotFoundPage() {
  return (
    <div className={styles.card}>
      <h1 className={styles.pageTitle}>Page not found</h1>
      <p className={styles.excerpt}>Sorry, we couldn&apos;t find what you were looking for.</p>
      <Link to="/" className={styles.readMore}>
        &larr; Back to all posts
      </Link>
    </div>
  )
}

export default NotFoundPage
