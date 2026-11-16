// Static blog post data. Each post has a short excerpt for the list page
// and its full content (an array of paragraphs) for the individual post page.
const posts = [
  {
    id: 1,
    title: 'My First Blog Post',
    excerpt: 'Welcome to my blog! Here is why I started writing and what you can expect to find here.',
    content: [
      'This is the content of my first blog post. Welcome to my blog! Hope you enjoy reading it.',
      'I started this blog as a place to write down what I learn while studying web development. Writing things out in my own words is the best way I have found to make sure I really understand them.',
      'Expect posts about HTML, CSS, JavaScript and React, plus the occasional detour into tools and productivity. Thanks for stopping by, and feel free to leave a comment below!',
    ],
    author: 'John Doe',
    date: '2026-10-01',
  },
  {
    id: 2,
    title: 'Rendering Lists in React',
    excerpt: 'Blog posts, comments, search results: most data comes as a list. Here is how map() and keys turn an array into UI.',
    content: [
      'Lists are everywhere in an app: the posts on a home page, the comments under a post. In JavaScript we keep them in an array, often stored in state, and add new items with the spread operator: setComments([...comments, newComment]).',
      'Instead of rendering each item by hand, we call map() on the array and return an element for every item. You can return a simple <li> or a whole custom component, such as a Comment that receives each comment object as a prop and shows its name and content.',
      'React also needs a unique key on each item so it can tell them apart between renders. Use a real id from your data when you have one. The array index works as a last resort, but it breaks if the list gets reordered.',
    ],
    author: 'John Doe',
    date: '2026-10-12',
  },
  {
    id: 3,
    title: 'Conditional Rendering in React',
    excerpt: 'Show the right UI at the right time, like a "no comments yet" message when a list is empty.',
    content: [
      'Conditional rendering means showing different UI depending on a condition, like showing a comment box only to logged-in users, or a friendly message when a post has no comments yet.',
      'For two options, the ternary operator works well inside JSX: comments.length === 0 ? <p>No comments yet</p> : <CommentList />. For something like a loading state, a plain if/else that returns early, such as "Comments are loading...", keeps the code easy to read.',
      'When something should only appear if a condition is true, use the logical AND operator: tab === "comments" && <Comments />. If the condition is false, React renders nothing.',
    ],
    author: 'John Doe',
    date: '2026-10-24',
  },
]

export default posts
