import { useState } from 'react'
import pageStyles from './Pages.module.css'
import styles from './ContactPage.module.css'

const emptyForm = { name: '', email: '', message: '' }

// Contact form for demo purposes only: nothing is sent to a backend
function ContactPage() {
  const [form, setForm] = useState(emptyForm)
  const [submittedName, setSubmittedName] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmittedName(form.name.trim())
    setForm(emptyForm)
  }

  return (
    <>
      <h1 className={pageStyles.pageTitle}>Contact</h1>
      <p className={pageStyles.intro}>Have a question or an idea for a post? Send me a message.</p>
      <div className={pageStyles.card}>
        {submittedName && (
          <p className={styles.success} role="status">
            Thanks, {submittedName}! Your message was received.
          </p>
        )}
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span className={styles.label}>Name</span>
            <input
              className={styles.input}
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Email</span>
            <input
              className={styles.input}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Message</span>
            <textarea
              className={styles.input}
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              required
            />
          </label>
          <button type="submit" className={styles.submit}>
            Send Message
          </button>
        </form>
      </div>
    </>
  )
}

export default ContactPage
