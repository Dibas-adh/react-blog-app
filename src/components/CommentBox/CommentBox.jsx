import { useState } from 'react'
import styles from './CommentBox.module.css'

function CommentBox({ onSubmit }) {
  const [text, setText] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onSubmit(trimmed)
    setText('')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        placeholder="Add a comment"
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows={3}
      />
      <button type="submit" className={styles.submit}>
        Submit
      </button>
    </form>
  )
}

export default CommentBox
