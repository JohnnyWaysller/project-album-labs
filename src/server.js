const express = require('express')
const path = require('node:path')
const router = require('./routes')
require('dotenv').config()


const app = express()

app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


app.use(express.static(path.join(__dirname,'..', 'public')))

app.use(router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`O Servidor foi iniciado na porta: http://localhost:${PORT}`)
})