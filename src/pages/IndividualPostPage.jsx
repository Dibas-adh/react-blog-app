import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { fetchJson, isAbortError, NotFoundError, postJson } from '../api'
import BlogPost from '../components/BlogPost/BlogPost'
import CommentForm from '../components/CommentForm/CommentForm'
import CommentList from '../components/CommentList/CommentList'
import ErrorMessage from '../components/ErrorMessage/ErrorMessage'
import Spinner from '../components/Spinner/Spinner'
import NotFoundPage from './NotFoundPage'
import styles from './Pages.module.css'

const TOTAL_POSTS = 100 // JSONPlaceholder has posts 1-100

// Shows one full post (fetched by the :postId in the URL), its author and comments.
// postedComments/onCommentPosted come from App so comments you post survive
// navigating to another page and back.
function IndividualPostPage({ postedComments, onCommentPosted }) {
  const { postId } = useParams()
  const id = Number(postId)
  const isValidId = Number.isInteger(id) && id > 0

  // status values: 'loading' | 'ready' | 'notFound' | 'error'
  const [post, setPost] = useState(null)
  const [author, setAuthor] = useState(null)
  const [postStatus, setPostStatus] = useState('loading')
  const [postReloadKey, setPostReloadKey] = useState(0)

  const [comments, setComments] = useState([])
  const [commentsStatus, setCommentsStatus] = useState('loading')
  const [commentsReloadKey, setCommentsReloadKey] = useState(0)

  // 1) Fetch the post, then the user who wrote it (needs post.userId)
  useEffect(() => {
    if (!isValidId) return
    const controller = new AbortController()
    const { signal } = controller
    setPostStatus('loading')
    setPost(null)
    setAuthor(null)

    fetchJson(`/posts/${id}`, { signal })
      .then((postData) => {
        setPost(postData)
        setPostStatus('ready')
        return fetchJson(`/users/${postData.userId}`, { signal })
          .then((userData) => setAuthor(userData))
          .catch((err) => {
            // The post can still be shown if only the author request fails
            if (!isAbortError(err)) console.error('Error fetching author:', err)
          })
      })
      .catch((err) => {
        if (isAbortError(err)) return
        if (err instanceof NotFoundError) {
          setPostStatus('notFound')
        } else {
          console.error('Error fetching post:', err)
          setPostStatus('error')
        }
      })

    return () => controller.abort()
  }, [id, isValidId, postReloadKey])

  // 2) Fetch the comments at the same time as the post
  useEffect(() => {
    if (!isValidId) return
    const controller = new AbortController()
    setCommentsStatus('loading')
    setComments([])

    fetchJson(`/posts/${id}/comments`, { signal: controller.signal })
      .then((data) => {
        setComments(data)
        setCommentsStatus('ready')
      })
      .catch((err) => {
        if (isAbortError(err)) return
        console.error('Error fetching comments:', err)
        setCommentsStatus('error')
      })

    return () => controller.abort()
  }, [id, isValidId, commentsReloadKey])

  // 3) POST a new comment, then add it to the list.
  // Errors are re-thrown so the form can show a message and keep the text.
  const handleAddComment = async (name, text) => {
    const saved = await postJson(`/posts/${id}/comments`, { postId: id, name, body: text })
    // JSONPlaceholder gives every new comment the same id (501), so make our own key
    onCommentPosted(id, { ...saved, id: `local-${Date.now()}` })
  }

  if (!isValidId || postStatus === 'notFound') return <NotFoundPage />

  const allComments = [...comments, ...(postedComments[id] ?? [])]

  return (
    <>
      <Link to="/" className={styles.backLink}>
        &larr; All posts
      </Link>

      <article className={styles.card}>
        {postStatus === 'loading' && <Spinner label="Loading post..." />}

        {postStatus === 'error' && (
          <ErrorMessage
            message="We couldn’t load this post. Please try again."
            onRetry={() => setPostReloadKey((k) => k + 1)}
          />
        )}

        {postStatus === 'ready' && (
          // key resets the like button when switching to a different post
          <BlogPost key={post.id} title={post.title} body={post.body} author={author} />
        )}

        <section className={styles.comments}>
          <h2 className={styles.commentsTitle}>
            Comments
            {commentsStatus === 'ready' && (
              <span className={styles.commentTotal}> ({allComments.length})</span>
            )}
          </h2>

          {commentsStatus === 'loading' && <Spinner label="Loading comments..." />}

          {commentsStatus === 'error' && (
            <ErrorMessage
              message="We couldn’t load the comments."
              onRetry={() => setCommentsReloadKey((k) => k + 1)}
            />
          )}

          {commentsStatus === 'ready' && <CommentList comments={allComments} />}

          <CommentForm key={id} onSubmit={handleAddComment} />
        </section>
      </article>

      <nav className={styles.postNav} aria-label="More posts">
        {id > 1 ? <Link to={`/posts/${id - 1}`}>&larr; Previous post</Link> : <span />}
        {id < TOTAL_POSTS && <Link to={`/posts/${id + 1}`}>Next post &rarr;</Link>}
      </nav>
    </>
  )
}

export default IndividualPostPage
