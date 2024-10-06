const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoute');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://pranavdeshmukh5454:yXoKh8dZ8X11gtLO@cluster0.tch8b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';  // Add MongoDB URI

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api', studentRoutes);

// Connect to MongoDB and start server
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log(error));
