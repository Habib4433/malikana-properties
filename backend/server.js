const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/properties');
const installmentRoutes = require('./routes/installments');
const adminRoutes = require('./routes/admin');

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/installments', installmentRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Malikana Properties API চালু আছে!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`সার্ভার চালু হয়েছে: http://localhost:${PORT}`);
});
