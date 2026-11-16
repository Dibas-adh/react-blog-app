import { useState } from 'react'
import styles from './CommentForm.module.css'

const MAX_NAME_LENGTH = 50
const MAX_COMMENT_LENGTH = 500

// Checks both fields and returns an error message for each invalid one
function validate(name, text) {
  const errors = {}
  if (!name) errors.name = 'Please enter your name.'
  else if (name.length > MAX_NAME_LENGTH) errors.name = `Name must be ${MAX_NAME_LENGTH} characters or fewer.`

  if (!text) errors.text = 'Please write a comment.'
  else if (text.length > MAX_COMMENT_LENGTH) errors.text = `Comment must be ${MAX_COMMENT_LENGTH} characters or fewer.`
  return errors
}

// Collects a name and a comment, validates them, then calls onSubmit
// (which POSTs to the API). onSubmit returns a promise; if it rejects,
// the form keeps what the user typed and shows an error.
function CommentForm({ onSubmit }) {
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const trimmedName = name.trim()
    const trimmedText = text.trim()

    const newErrors = validate(trimmedName, trimmedText)
    setErrors(newErrors)
    setSubmitError('')
    setSuccess(false)
    if (Object.keys(newErrors).length > 0) return

    setSubmitting(true)
    try {
      await onSubmit(trimmedName, trimmedText)
      setName('')
      setText('')
      setSuccess(true)
    } catch (err) {
      console.error('Error posting comment:', err)
      setSubmitError('Sorry, your comment couldn’t be posted. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h3 className={styles.title}>Leave a comment</h3>

      <label className={styles.field}>
        <span className={styles.label}>Name</span>
        <input
          className={`${styles.input} ${errors.name ? styles.invalid : ''}`}
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(event) => {
            setName(event.target.value)
            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }))
          }}
          maxLength={MAX_NAME_LENGTH}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'comment-name-error' : undefined}
          disabled={submitting}
        />
        {errors.name && (
          <span id="comment-name-error" className={styles.fieldError}>
            {errors.name}
          </span>
        )}
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Comment</span>
        <textarea
          className={`${styles.input} ${errors.text ? styles.invalid : ''}`}
          placeholder="Write your comment"
          value={text}
          onChange={(event) => {
            setText(event.target.value)
            if (errors.text) setErrors((prev) => ({ ...prev, text: undefined }))
          }}
          rows={3}
          maxLength={MAX_COMMENT_LENGTH}
          aria-invalid={Boolean(errors.text)}
          aria-describedby={errors.text ? 'comment-text-error' : undefined}
          disabled={submitting}
        />
        <span className={styles.counter}>
          {text.length}/{MAX_COMMENT_LENGTH}
        </span>
        {errors.text && (
          <span id="comment-text-error" className={styles.fieldError}>
            {errors.text}
          </span>
        )}
      </label>

      {submitError && (
        <p className={styles.submitError} role="alert">
          {submitError}
        </p>
      )}
      {success && (
        <p className={styles.success} role="status">
          Thanks! Your comment was posted.
        </p>
      )}

      <button type="submit" className={styles.submit} disabled={submitting}>
        {submitting ? 'Posting...' : 'Submit'}
      </button>
    </form>
  )
}

export default CommentForm
