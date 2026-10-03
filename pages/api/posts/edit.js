import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);

export default async function PUT(req, res) {
  const { id } = req.query;

    const { title, slug, content, image } = req.body;
   
    try {
      await sql` UPDATE posts 
        SET slug = ${slug}, title = ${title}, content = ${content}, image = ${image} 
        WHERE id = ${id} `;

      return res.status(200).json({ message: 'Post updated successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  

}