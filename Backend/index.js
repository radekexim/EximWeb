const express = require('express');
const cors = require("cors");
const app = express();
const { port } = require('./config');

//routes
const apiRouter = require('./routes/api');

app.use(express.json());
app.use(cors());
app.use('/api', apiRouter);
//server
app.listen(port, function () {
    console.log('Serwer słucha... http://localhost:' + port);
})