import { useState } from 'react';
import Layout from '@/components/Layout';
import ImageFallback from '@/lib/ImageFallback';
import Date from '@/lib/date';
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);

export default function Home({ data }) {
    const [posts, setPosts] = useState(data)
    const [disabled, setDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(2);

  const getData = async () => {
      setLoading(true)
      try {
        const hostname = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const res = await fetch(`${hostname}/api?limit=3&page=${page}`);
        const data = await res.json();
        setPosts([...posts, ...data.posts])
        setPage(page + 1)
        if (!data.hasMore) {
          setDisabled(true)
        }
      setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }


  return (
    <Layout title="Ngelag.Site" description="A simple blog built with Next.js">
      {posts.map((post, index) => (
        <div key={post.id} className={index === 0 ? 'post-first' : 'post'}>
          <div className='wrap'>
          <a href={`/post/${post.slug}`}><h3 className='title'>{post.title}</h3>
          <ImageFallback
             className='thumbnail' 
             src={post.image} 
             alt={post.title} 
             width={0}
             height={0}
             sizes="100vw"
             loading="eager"
          />
          </a>
          <div className='desc'>
            <p><Date dateString={post.date} /> - {post.description}</p>
          </div>
          </div>
        </div>
        ))
        }
      <div className='navigation'>
      <hr style={{ backgroundColor: "#dadce0", border: "0", height: "1px", left: "0", marginTop: "18px", position: "absolute", width: "100%"}} aria-hidden="true" />
      <button
         disabled={loading || disabled}
         onClick={getData}>
        <span>{loading ? 'Loading...': disabled ? 'No more items' : 'Load More'}</span>
      </button>
      </div>  
  </Layout>
  );
}

export async function getStaticProps() {
  try {
  const items = await sql.query('SELECT * FROM posts ORDER BY id DESC');
       let results = [...items];
       const data = results.slice(0, 3);
      return {
        props: {
         data: JSON.parse(JSON.stringify(data)), 
        },
      }
  } catch (error) {
    console.error('Database fetch failed:', error);
    return {
      notFound: true,
    };
  }
}