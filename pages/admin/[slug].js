import { useState} from 'react';
import { useRouter } from 'next/router';
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);
function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')    // Remove special characters
    .replace(/[\s_-]+/g, '-')     // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, '');     // Remove extra hyphens
}

const EditPost = ({ data }) => { 
  const [slug, setSlug]  = useState(data.slug)
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);
  const [image, setImage] = useState(data.image);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
 async function handleSubmit(e) {
  setLoading(true)
    e.preventDefault();
try {
    const res = await fetch(`http://localhost:3000/api/posts/edit?id=${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, slug, content, image }),
    });
    if (res.ok) {
        alert('Post added!');
      router.push(`/admin/${slug}`);
    } else {
      alert('Failed to update post');
    }
    } catch (error) {
      console.error('Database fetch failed:', error);
    return {
      notFound: true,
    };
    } finally {
      setLoading(false)
    }
  }
  

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Post</h1>
      <div>
        <label>Title:</label>
        <input value={title} onChange={(e) => {
          setTitle(e.target.value);
          setSlug(slugify(e.target.value));
          }} placeholder={title}
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
            required />
      </div>
      <div>
          <label htmlFor="content" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)} placeholder={content}
            style={{ width: '100%', padding: '0.5rem', height: '100px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <div>
          <label htmlFor="image" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Image</label>
          <input
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)} placeholder={image}
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
            required
          />
        </div>
      <button type="submit">Save Changes</button>
    </form>
  );
}
export default EditPost;

export const getServerSideProps = async ({ params }) => {
      const { slug } = params;
    try {
       const [ data ] = await sql `SELECT * FROM posts WHERE slug = ${slug} LIMIT 1`;
    return {
      props: {
        data: JSON.parse(JSON.stringify(data)),
      }
    };
  } catch (error) {
    console.error('Database fetch failed:', error);
    return {
      notFound: true,
    };
  }
}