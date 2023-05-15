const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 1000

// middleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res)=> {
    res.send('ema john online store is open')
})


app.listen(port, ()=>{
    console.log('ema john server is running');
})