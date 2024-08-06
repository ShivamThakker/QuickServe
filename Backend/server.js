// server.js
const express = require('express');
const cors = require('cors');

const app = express();
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', require('./routes/users'));
// app.use('/api', require('./routes/serviceRequestRoutes'));
app.use('/api', require('./routes/serviceDetailsRoutes'));


// Error Handling Middleware
app.use('*',(req,res)=>{
    res.status(400).json({error:"Not Found"});
});


module.exports = app;