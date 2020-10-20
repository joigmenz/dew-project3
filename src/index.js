const express = require('express')
const path = require('path')
const app = express()

const port = process.env.PORT || 8000

app.use(express.static(path.join(__dirname, 'public')))

app.set('port', port)

app.listen(80, "192.168.2.93")
/*
app.listen(port, () => {
    console.log(`App on the port ${port}`)
})
*/