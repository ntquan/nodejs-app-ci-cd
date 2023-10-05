const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('<h1>Hello World 123!</h1>')
})

app.get('/about', (req, res) => {
    res.send('<h1>HCMUS</h1>')
})


app.get('/contact', (req, res) => {
    res.send("<h1>FIT-HCMS</h1>");
})

app.get('/hello', (req, res) => {
    res.send("Quan Nguyen");
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app