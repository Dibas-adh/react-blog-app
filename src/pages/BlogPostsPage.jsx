import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { fetchJson, isAbortError } from '../api'
import ErrorMessage from '../components/ErrorMessage/ErrorMessage'
import Spinner from '../components/Spinner/Spinner'
import styles from './Pages.module.css'

const POSTS_PER_PAGE = 10
const PREVIEW_LENGTH = 110

// Turns the post body into a one-line preview for the list
function makePreview(body) {
  const text = body.replace(/\s+/g, ' ').trim()
  return text.length > PREVIEW_LENGTH ? `${text.slice(0, PREVIEW_LENGTH).trimEnd()}…` : text
}

// Home page: fetches every post from the API and lists them with a preview
function BlogPostsPage() {
  const [posts, setPosts] = useState([])
  const [usersById, setUsersById] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    // Abort the requests if the user leaves the page before they finish
    const controller = new AbortController()
    const { signal } = controller
    setLoading(true)
    setError(null)

    // Users are fetched once as well so each card can show the author's name
    Promise.all([fetchJson('/posts', { signal }), fetchJson('/users', { signal })])
      .then(([postData, userData]) => {
        setPosts(postData)
        setUsersById(Object.fromEntries(userData.map((user) => [user.id, user])))
      })
      .catch((err) => {
        if (isAbortError(err)) return
        console.error('Error fetching posts:', err)
        setError('We couldn’t load the blog posts. Please check your connection and try again.')
      })
      .finally(() => {
        if (!signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [reloadKey])

  // Pagination: the current page is kept in the URL (?page=2) so it survives
  // going back from a post and can be bookmarked
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE))
  const requestedPage = Number(searchParams.get('page')) || 1
  const page = Math.min(Math.max(1, requestedPage), totalPages)
  const visiblePosts = posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)

  const goToPage = (newPage) => {
    setSearchParams(newPage === 1 ? {} : { page: String(newPage) })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <h1 className={styles.pageTitle}>Blog Posts</h1>

      {loading && <Spinner label="Loading posts..." />}

      {!loading && error && (
        <ErrorMessage message={error} onRetry={() => setReloadKey((k) => k + 1)} />
      )}

      {!loading && !error && posts.length === 0 && (
        <p className={styles.excerpt}>There are no posts yet. Check back soon!</p>
      )}

      {!loading && !error && posts.length > 0 && (
        <>
          <ul className={styles.postList}>
            {visiblePosts.map((post) => (
              <li key={post.id} className={styles.card}>
                <h2 className={styles.postTitle}>
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </h2>
                <p className={styles.meta}>
                  By {usersById[post.userId]?.name ?? 'Unknown author'} &middot; Post #{post.id}
                </p>
                <p className={styles.excerpt}>{makePreview(post.body)}</p>
                <div className={styles.cardFooter}>
                  <Link to={`/posts/${post.id}`} className={styles.readMore}>
                    Read more &rarr;
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <nav className={styles.pagination} aria-label="Pagination">
              <button
                type="button"
                className={styles.pageButton}
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
              >
                &larr; Previous
              </button>
              <span className={styles.pageInfo}>
                Page {page} of {totalPages}
              </span>
              <button
                type="button"
                className={styles.pageButton}
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
              >
                Next &rarr;
              </button>
            </nav>
          )}
        </>
      )}
    </>
  )
}

export default BlogPostsPage
