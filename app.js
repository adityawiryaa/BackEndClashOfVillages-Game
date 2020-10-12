const express = require('express')
const routers = require('./routers/routes')
const mongooseConnect = require('./config/server')

mongooseConnect();
const app = express()
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routers);

app.listen(port, () => {
    console.log(`App run on http://localhost:${port}`)
})