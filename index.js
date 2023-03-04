const express = require('express');
const app = express();
const order = require ('./routes/order');

app.use(express.json());

app.use('/order', order);

const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Listening on Port: ${port}`));
