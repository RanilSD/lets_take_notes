//importing dependencies

const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//initializing app and creating port

const app = express();
const PORT = process.env.Port || 3001;

//setting up the middleware for routes and all css, and javaScript from public folder files

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//starting the server on port

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
