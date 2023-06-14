const express = require('express');

const app = express();

app.use(express.json())

const api = require('./routes/api.router')

app.use('/api', api)


app.listen(3000, () => console.log(`Сервер работает`))