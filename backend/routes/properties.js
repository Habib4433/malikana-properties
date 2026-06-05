const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { createClient } = require('@supabase/supabase-js');
const ws = require('ws');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
  realtime: { transport: ws }
});

router.get('/', async (req, res) => {
  try {
    const { sector, type, status } = req.query;
    let query = supabase.from('properties').select('*');
    if (sector) query = query.eq('sector', sector);
    if (type) query = query.eq('type', type);
    if (status) query = query.eq('status', status);
    const { data, error } = await query;
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: 'সার্ভার এরর', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase.from('properties').select('*').eq('id', req.params.id).single();
    if (error) throw error;
    if (!data) return res.status(404).json({ message: 'সম্পত্তি পাওয়া যায়নি' });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: 'সার্ভার এরর' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'অনুমতি নেই' });
    const { data, error } = await supabase.from('properties').insert([req.body]).select();
    if (error) throw error;
    res.status(201).json({ success: true, message: 'সম্পত্তি যোগ হয়েছে', data: data[0] });
  } catch (error) {
    res.status(500).json({ message: 'সার্ভার এরর' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'অনুমতি নেই' });
    const { data, error } = await supabase.from('properties').update(req.body).eq('id', req.params.id).select();
    if (error) throw error;
    res.json({ success: true, message: 'আপডেট হয়েছে', data: data[0] });
  } catch (error) {
    res.status(500).json({ message: 'সার্ভার এরর' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'অনুমতি নেই' });
    const { error } = await supabase.from('properties').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ success: true, message: 'মুছে ফেলা হয়েছে' });
  } catch (error) {
    res.status(500).json({ message: 'সার্ভার এরর' });
  }
});

module.exports = router;
