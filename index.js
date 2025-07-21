require('dotenv').config(); 
const express = require('express');

const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const claimRoutes = require('./routes/claimRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/claims', claimRoutes);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB first, then start server
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  app.listen(PORT, () => {
    console.log('Server started on port', PORT);
  });
})
.catch(err => {
  console.error('MongoDB connection failed:', err);
  process.exit(1); // Exit if DB connection fails
});
