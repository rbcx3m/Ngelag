import { neon } from '@neondatabase/serverless'
const sql = neon(process.env.DATABASE_URL)

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')    // Remove special characters
    .replace(/[\s_-]+/g, '-')     // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, '');     // Remove extra hyphens
}

export default async function POST(req, res) {

    const { title, description, content, image, tag, author } = req.body;
    const slug = slugify(title);

  try {
    const result = await sql` INSERT INTO posts ( title, slug, description, content, image, tag, author )
        VALUES ( ${title}, ${slug}, ${description}, ${content}, ${image}, ${tag}, ${author} )
        RETURNING * `;

    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}