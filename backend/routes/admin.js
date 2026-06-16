const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Admin middleware
const isAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token নেই' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'malikana_secret');
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'Admin access নেই' });
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// সব user দেখুন
router.get('/users', isAdmin, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, phone, email, nid, nominee, role, created_at FROM users ORDER BY created_at DESC');
    res.json({ users: result.rows });
  } catch (error) {
    res.status(500).json({ message: 'সার্ভার এরর' });
  }
});

// User কে admin বানান
router.patch('/users/:id/role', isAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    await pool.query('UPDATE users SET role = $1 WHERE id = $2', [role, req.params.id]);
    res.json({ message: 'Role আপডেট হয়েছে' });
  } catch (error) {
    res.status(500).json({ message: 'সার্ভার এরর' });
  }
});

// User delete
router.delete('/users/:id', isAdmin, async (req, res) => {
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [req.params.id]);
    res.json({ message: 'User মুছে গেছে' });
  } catch (error) {
    res.status(500).json({ message: 'সার্ভার এরর' });
  }
});

// Property add
router.post('/properties', isAdmin, async (req, res) => {
  try {
    const { area, size, price, type, status, sector, description, image_url } = req.body;
    if (!area || !size || !price || !sector) return res.status(400).json({ message: 'সব তথ্য দিন' });
    const result = await pool.query(
      'INSERT INTO properties (area, size, price, type, status, sector, description, image_url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
      [area, size, price, type || 'আবাসিক', status || 'পাওয়া যাচ্ছে', sector, description || '', image_url || '']
    );
    res.status(201).json({ message: 'Property যোগ হয়েছে', property: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'সার্ভার এরর' });
  }
});

// Property edit
router.patch('/properties/:id', isAdmin, async (req, res) => {
  try {
    const { area, size, price, type, status, sector, description, image_url } = req.body;
    await pool.query(
      'UPDATE properties SET area=$1, size=$2, price=$3, type=$4, status=$5, sector=$6, description=$7, image_url=$8 WHERE id=$9',
      [area, size, price, type, status, sector, description, image_url, req.params.id]
    );
    res.json({ message: 'Property আপডেট হয়েছে' });
  } catch (error) {
    res.status(500).json({ message: 'সার্ভার এরর' });
  }
});

// Property delete
router.delete('/properties/:id', isAdmin, async (req, res) => {
  try {
    await pool.query('DELETE FROM properties WHERE id = $1', [req.params.id]);
    res.json({ message: 'Property মুছে গেছে' });
  } catch (error) {
    res.status(500).json({ message: 'সার্ভার এরর' });
  }
});

// First admin তৈরি (শুধু একবার)
router.post('/make-first-admin', async (req, res) => {
  try {
    const { secret, phone } = req.body;
    if (secret !== 'malikana_admin_2025') return res.status(403).json({ message: 'Secret ভুল' });
    await pool.query('UPDATE users SET role = $1 WHERE phone = $2', ['admin', phone]);
    res.json({ message: `${phone} কে admin বানানো হয়েছে` });
  } catch (error) {
    res.status(500).json({ message: 'সার্ভার এরর' });
  }
});

module.exports = router;
