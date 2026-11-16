# My Blog – React Blog App

A blog built with React and React Router that loads its posts, authors and comments from the [JSONPlaceholder](https://jsonplaceholder.typicode.com) API.

**Live app:** _add your Vercel URL here_

> The post titles and text are in Latin-style placeholder text ("lorem ipsum"). That is the sample data JSONPlaceholder provides, not a bug.

## Features

- **Blog Posts page**: fetches all posts from `/posts` and shows each post's title, author, a short preview and a link to the full post. Posts are split into pages of 10 (`?page=2`).
- **Individual post page**: reads `postId` from the URL with `useParams`, fetches `/posts/{postId}`, then the author from `/users/{userId}`. Shows the full post and an "About the author" card (name, email, website, company, city).
- **Comments**: fetched from `/posts/{postId}/comments` and shown below the post, with a "No comments yet. Be the first to comment!" message when there are none.
- **Comment form**: checks that the name and comment aren't empty, then sends them to `/posts/{postId}/comments` with a POST request and adds the new comment to the list.
- **Loading spinners** while posts and comments are being fetched.
- **Error handling**: friendly messages with a "Try again" button if data fails to load or a comment can't be posted.
- **Light and dark mode**, saved between visits.
- **Responsive layout** styled with CSS Modules.

> JSONPlaceholder is a fake API, so it doesn't really save new comments. They stay visible while you browse, but disappear after a page refresh.

## Tech stack

- React 19
- React Router
- Vite
- CSS Modules
- Fetch API

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

To make a production build (output goes to `dist/`):

```bash
npm run build
```

## Project structure

```
src/
  api.js          helpers for calling the API (fetchJson, postJson)
  App.jsx         routes and the comments you have posted
  pages/          BlogPostsPage, IndividualPostPage, ContactPage, NotFoundPage
  components/     BlogPost, CommentList, CommentForm, Spinner, ErrorMessage, Navbar, ...
  context/        theme (light/dark) provider
```

## Deployment

The app is deployed on Vercel. `vercel.json` (and `public/_redirects` for Netlify) send every URL to `index.html`, so links like `/posts/5` still work after a page refresh.
