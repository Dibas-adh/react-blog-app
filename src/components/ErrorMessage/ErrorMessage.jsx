import styles from './ErrorMessage.module.css'

// Friendly error box with an optional "Try again" button
function ErrorMessage({ message, onRetry }) {
  return (
    <div className={styles.box} role="alert">
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button type="button" className={styles.retry} onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
