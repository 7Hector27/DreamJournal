const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Import of Routes
const userRoutes = require('./routes/userRoutes');
const journalRoutes = require('./routes/journalRoutes');

// Import of database
const connectDb = require('./database/db');

// Utilization
app.use(cors());
app.use(express.json());

app.use('/api', userRoutes, journalRoutes);
connectDb();

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
