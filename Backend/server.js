// // server.js
// const express = require('express');
// const connectDB = require('./config/db');
// const dotenv = require('dotenv');
// const cors = require('cors');
  

// dotenv.config();

// const app = express();

// // Connect Database
// connectDB();

// // Init Middleware
// app.use(cors());
// app.use(express.json({ extended: false }));

// // Define Routes
// app.use('/api', require('./routes/users'));
// app.use('/api', require('./routes/serviceRequestRoutes'));
// app.use('/api/cities', require('./routes/citiesRoutes'));

// const PORT = process.env.PORT || 5001;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



// server.js
const express = require('express');
const cors = require('cors');

const app = express();
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', require('./routes/users'));
app.use('/api', require('./routes/serviceRequestRoutes'));

// Error Handling Middleware
app.use('*',(req,res)=>{
    res.status(400).json({error:"Not Found"});
});


module.exports = app;