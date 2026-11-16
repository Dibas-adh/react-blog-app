import { useState } from 'react'
import styles from './LikeButton.module.css'

// Extra credit: heart "Like" button that toggles and keeps a count
function LikeButton() {
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(0)

  const toggleLike = () => {
    setCount((c) => (liked ? c - 1 : c + 1))
    setLiked((l) => !l)
  }

  return (
    <button
      type="button"
      className={`${styles.button} ${liked ? styles.liked : ''}`}
      onClick={toggleLike}
      aria-pressed={liked}
      aria-label={liked ? 'Unlike this post' : 'Like this post'}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path
          d="M12 21s-7.5-4.6-10-9.3C.5 8.5 2.2 5 5.6 5c2 0 3.4 1.1 4.4 2.5C11 6.1 12.4 5 14.4 5 17.8 5 19.5 8.5 18 11.7 15.5 16.4 12 21 12 21z"
          transform="translate(1.3 0)"
          fill={liked ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      <span>{count}</span>
    </button>
  )
}

export default LikeButton
