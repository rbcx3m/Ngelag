import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);
import ImageFallback from '@/lib/ImageFallback';
import Layout from '@/components/Layout';

export default function Home({ data }) {
return(
  <Layout title={data.title} description={data.desc}>
    <h1>{data.title}</h1>
      {data.image && (
          <ImageFallback
             className='cover' 
             src={data.image} 
             alt={data.title} 
             width={0}
             height={0}
             sizes="100vw"
             loading="eager"
          />
      )}
    <article dangerouslySetInnerHTML={{ __html: data.content }} />
    <div>
      <span className="item-name">
        <a href={`/admin/${data.slug}`}>Edit Post {data.title}</a>
      </span>
    </div>
  </Layout>
)
}

export const getStaticPaths = async () => {
    const data = await sql `SELECT slug FROM posts ORDER BY id DESC`;
    const paths = data.map((post) => ({ params: post, }));
  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
      const { slug } = params;
    try {
       const [ data ] = await sql `SELECT * FROM posts WHERE slug = ${slug}`; 
    return {
      props: {
        data: JSON.parse(JSON.stringify(data)),
      },
      revalidate: 3600, 
    };
  } catch (error) {
    console.error('Database fetch failed:', error);
    return {
      notFound: true,
    };
  }
}