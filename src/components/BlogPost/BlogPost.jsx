import LikeButton from '../LikeButton/LikeButton'
import styles from './BlogPost.module.css'

// Full post: title, body (split into paragraphs on line breaks) and author details.
// author is the user object from the API, or null if it couldn't be loaded.
function BlogPost({ title, body, author }) {
  const paragraphs = body.split('\n').filter((line) => line.trim() !== '')

  return (
    <div className={styles.post}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.meta}>
        <strong>Author:</strong> {author ? author.name : 'Unknown author'}
      </p>

      {paragraphs.map((paragraph, i) => (
        <p key={i} className={styles.content}>
          {paragraph}
        </p>
      ))}

      <LikeButton />

      {author && (
        <aside className={styles.author} aria-label="About the author">
          <div className={styles.avatar} aria-hidden="true">
            {author.name.charAt(0)}
          </div>
          <div>
            <p className={styles.authorName}>
              {author.name} <span className={styles.username}>@{author.username}</span>
            </p>
            <ul className={styles.authorDetails}>
              <li>
                <span className={styles.detailLabel}>Email:</span>{' '}
                <a href={`mailto:${author.email}`}>{author.email}</a>
              </li>
              {author.website && (
                <li>
                  <span className={styles.detailLabel}>Website:</span>{' '}
                  <a href={`https://${author.website}`} target="_blank" rel="noreferrer">
                    {author.website}
                  </a>
                </li>
              )}
              {author.company?.name && (
                <li>
                  <span className={styles.detailLabel}>Company:</span> {author.company.name}
                </li>
              )}
              {author.address?.city && (
                <li>
                  <span className={styles.detailLabel}>City:</span> {author.address.city}
                </li>
              )}
            </ul>
          </div>
        </aside>
      )}
    </div>
  )
}

export default BlogPost
