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

mongoose.connect('process.env.MONGODB_URI', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true })
  .then(() =>
     app.listen(5000, () => console.log('Server started on port 5000')));
