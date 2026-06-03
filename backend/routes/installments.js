const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

let installments = [
  { id: 1, buyerId: 1, propertyId: 1, month: "জানুয়ারি ২০২৫", amount: 15000, status: "পরিশোধিত", date: "০৫ জানুয়ারি ২০২৫" },
  { id: 2, buyerId: 1, propertyId: 1, month: "ফেব্রুয়ারি ২০২৫", amount: 15000, status: "পরিশোধিত", date: "০৩ ফেব্রুয়ারি ২০২৫" },
  { id: 3, buyerId: 1, propertyId: 1, month: "মার্চ ২০২৫", amount: 15000, status: "বকেয়া", date: "" },
];

router.get('/buyer/:buyerId', authMiddleware, (req, res) => {
  const buyerInstallments = installments.filter(i => i.buyerId === parseInt(req.params.buyerId));
  res.json({ success: true, data: buyerInstallments });
});

router.get('/', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'অনুমতি নেই' });
  res.json({ success: true, data: installments });
});

router.post('/', authMiddleware, (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'অনুমতি নেই' });
    const newInstallment = { id: installments.length + 1, ...req.body, createdAt: new Date() };
    installments.push(newInstallment);
    res.status(201).json({ success: true, message: 'কিস্তি যোগ হয়েছে', data: newInstallment });
  } catch (error) {
    res.status(500).json({ message: 'সার্ভার এরর' });
  }
});

router.put('/:id', authMiddleware, (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'অনুমতি নেই' });
    const index = installments.findIndex(i => i.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'কিস্তি পাওয়া যায়নি' });
    installments[index] = { ...installments[index], ...req.body };
    res.json({ success: true, message: 'কিস্তি আপডেট হয়েছে', data: installments[index] });
  } catch (error) {
    res.status(500).json({ message: 'সার্ভার এরর' });
  }
});

module.exports = router;
