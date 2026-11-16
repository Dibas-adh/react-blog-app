import styles from './Spinner.module.css'

// Loading indicator shown while data is being fetched
function Spinner({ label = 'Loading...' }) {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </div>
  )
}

export default Spinner
