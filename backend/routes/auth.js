const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = [];

router.post('/register', async (req, res) => {
  try {
    const { name, phone, email, password, nominee, nid } = req.body;
    const existingUser = users.find(u => u.phone === phone);
    if (existingUser) return res.status(400).json({ message: 'এই ফোন নম্বর দিয়ে আগেই রেজিস্ট্রেশন হয়েছে' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: users.length + 1, name, phone, email, password: hashedPassword, nominee, nid, role: 'buyer', createdAt: new Date() };
    users.push(newUser);
    const token = jwt.sign({ id: newUser.id, phone: newUser.phone, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ message: 'রেজিস্ট্রেশন সফল হয়েছে', token, user: { id: newUser.id, name: newUser.name, phone: newUser.phone, role: newUser.role } });
  } catch (error) {
    res.status(500).json({ message: 'সার্ভার এরর' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = users.find(u => u.phone === phone);
    if (!user) return res.status(400).json({ message: 'ফোন নম্বর বা পাসওয়ার্ড ভুল' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'ফোন নম্বর বা পাসওয়ার্ড ভুল' });
    const token = jwt.sign({ id: user.id, phone: user.phone, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ message: 'লগইন সফল হয়েছে', token, user: { id: user.id, name: user.name, phone: user.phone, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'সার্ভার এরর' });
  }
});

module.exports = router;
