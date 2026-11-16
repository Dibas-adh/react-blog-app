import Comment from './Comment'
import styles from './CommentList.module.css'

// comments come from the API: { id, name, email, body }
function CommentList({ comments }) {
  if (comments.length === 0) {
    return <p className={styles.empty}>No comments yet. Be the first to comment!</p>
  }

  return (
    <ul className={styles.list}>
      {comments.map((comment) => (
        <Comment key={comment.id} name={comment.name} email={comment.email} text={comment.body} />
      ))}
    </ul>
  )
}

export default CommentList
