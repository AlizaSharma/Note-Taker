const express = require('express');
const apiRoutes = require('./routes/api');
const htmlRoutes = require('./routes/html');
const PORT = 3001; 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
app.use(express.static('public'));

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);



