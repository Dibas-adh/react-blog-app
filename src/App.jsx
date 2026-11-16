import { useState } from 'react'
import { Routes, Route } from 'react-router'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import BlogPostsPage from './pages/BlogPostsPage'
import IndividualPostPage from './pages/IndividualPostPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'
import styles from './App.module.css'

function App() {
  // Comments the user has posted, keyed by post id. JSONPlaceholder doesn't
  // really save them, so they are kept here to stay visible when the user
  // navigates between pages.
  const [postedComments, setPostedComments] = useState({})

  const addPostedComment = (postId, comment) => {
    setPostedComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] ?? []), comment],
    }))
  }

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<BlogPostsPage />} />
          <Route
            path="/posts/:postId"
            element={
              <IndividualPostPage
                postedComments={postedComments}
                onCommentPosted={addPostedComment}
              />
            }
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
