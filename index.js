const express = require('express');
const router = require('./routers');
const app = express();
const port = 3000;

// Middleware for Allow Request from x-www-form-urlencoded Content Type
app.use(express.urlencoded({extended: true}));

// Middleware for Allow Request from JSON Content Type
app.use(express.json());

app.use(router);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});