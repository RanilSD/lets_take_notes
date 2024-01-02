//importing dependencies

const express = require('express');
const noteRoutes = require('./routes/noteRoutes');
const pageRoutes = require('./routes/pageRoutes');

//initializing app and creating port

const app = express();
const PORT = process.env.Port || 3001;

//setting up the middleware for routes and all css, and javaScript from public folder files

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use('/api', noteRoutes);
app.use('/', pageRoutes);

//starting the server on port

app.listen(PORT, () => console.log("Server listening on port " + PORT));
