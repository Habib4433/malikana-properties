const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Properties table তৈরি
pool.query(`
  CREATE TABLE IF NOT EXISTS properties (
    id SERIAL PRIMARY KEY,
    area VARCHAR(200) NOT NULL,
    size VARCHAR(100) NOT NULL,
    price BIGINT NOT NULL,
    type VARCHAR(50) DEFAULT 'আবাসিক',
    status VARCHAR(50) DEFAULT 'পাওয়া যাচ্ছে',
    sector VARCHAR(100) NOT NULL,
    description TEXT DEFAULT '',
    image_url TEXT DEFAULT '',
    created_at TIMESTAMP DEFAULT NOW()
  )
`).then(() => console.log('Properties table ready'))
  .catch(err => console.error('Table error:', err));

// সব property আনুন
router.get('/', async (req, res) => {
  try {
    const { sector } = req.query;
    let query = 'SELECT * FROM properties';
    let params: any[] = [];
    if (sector) {
      query += ' WHERE sector = $1';
      params = [sector];
    }
    query += ' ORDER BY created_at DESC';
    const result = await pool.query(query, params);
    res.json({ data: result.rows });
  } catch (error) {
    res.status(500).json({ message: 'সার্ভার এরর' });
  }
});

// একটা property আনুন
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM properties WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'পাওয়া যায়নি' });
    res.json({ data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'সার্ভার এরর' });
  }
});

module.exports = router;
