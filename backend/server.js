const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/routes');
require('dotenv').config();

// Import of database
const connectDb = require('./database/db');

// Utilization
app.use(cors());
app.use(express.json());

app.use('/api', routes);
connectDb();

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
