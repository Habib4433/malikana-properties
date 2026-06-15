const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Table তৈরি (প্রথমবার চালু হলে)
pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100),
    password VARCHAR(255) NOT NULL,
    nominee VARCHAR(100),
    nid VARCHAR(50),
    role VARCHAR(20) DEFAULT 'buyer',
    created_at TIMESTAMP DEFAULT NOW()
  )
`).then(() => console.log('Users table ready'))
  .catch(err => console.error('Table error:', err));

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, phone, email, password, nominee, nid } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({ message: 'নাম, ফোন ও পাসওয়ার্ড আবশ্যক' });
    }

    const existing = await pool.query('SELECT id FROM users WHERE phone = $1', [phone]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'এই ফোন নম্বর দিয়ে আগেই রেজিস্ট্রেশন হয়েছে' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, phone, email, password, nominee, nid) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, name, phone, role',
      [name, phone, email || null, hashedPassword, nominee || null, nid || null]
    );

    const user = result.rows[0];
    const token = jwt.sign(
      { id: user.id, phone: user.phone, role: user.role },
      process.env.JWT_SECRET || 'malikana_secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({ message: 'রেজিস্ট্রেশন সফল হয়েছে', token, user });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'সার্ভার এরর' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: 'ফোন ও পাসওয়ার্ড আবশ্যক' });
    }

    const result = await pool.query('SELECT * FROM users WHERE phone = $1', [phone]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'ফোন নম্বর বা পাসওয়ার্ড ভুল' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'ফোন নম্বর বা পাসওয়ার্ড ভুল' });
    }

    const token = jwt.sign(
      { id: user.id, phone: user.phone, role: user.role },
      process.env.JWT_SECRET || 'malikana_secret',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'লগইন সফল হয়েছে',
      token,
      user: { id: user.id, name: user.name, phone: user.phone, role: user.role }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'সার্ভার এরর' });
  }
});

// Profile (token দিয়ে)
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token নেই' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'malikana_secret');
    const result = await pool.query(
      'SELECT id, name, phone, email, nominee, nid, role, created_at FROM users WHERE id = $1',
      [decoded.id]
    );

    if (result.rows.length === 0) return res.status(404).json({ message: 'User পাওয়া যায়নি' });
    res.json({ user: result.rows[0] });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
