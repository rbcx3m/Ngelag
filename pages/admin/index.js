import { useState } from 'react';
import { neon } from '@neondatabase/serverless';

export default function Home() {
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [tag, setTag] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    setLoading(true);

    try {
      const response = await fetch('/api/posts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, content, image, tag, author }),
      });

      if (response.ok) {
        alert('Post added!');
        setTitle('');
        setContent('');
      } else {
        alert('Failed to save the post.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '0 1rem', fontFamily: 'sans-serif' }}>
      <h1>Neon DB + Next.js Pages Form</h1>
      
      {/* Post Submission Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
            required
          />
        </div>
                <div>
          <label htmlFor="description" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Description</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDesc(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
            required
          />
        </div>
        <div>
          <label htmlFor="content" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', height: '100px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <div>
          <label htmlFor="image" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Image</label>
          <input
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
            required
          />
        </div>
        <div>
          <label htmlFor="tag" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Tag</label>
           <input
            id="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
            required
          />
        </div>
        <div>
          <label htmlFor="author" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Author</label>
           <input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
            required
          />
        </div>
        <button type="submit" disabled={loading} style={{ padding: '0.75rem', cursor: 'pointer' }}>
          {loading ? 'Submitting...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}

