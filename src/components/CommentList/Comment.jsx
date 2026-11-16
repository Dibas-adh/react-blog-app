import styles from './CommentList.module.css'

function Comment({ name, email, text }) {
  return (
    <li className={styles.item}>
      <p className={styles.name}>
        {name}
        {email && <span className={styles.email}> &middot; {email}</span>}
      </p>
      <p className={styles.text}>{text}</p>
    </li>
  )
}

export default Comment
