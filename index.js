const express = require('express')
const cors = require('cors');
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 1000
require("dotenv").config();

// middleware
app.use(cors())
app.use(express.json())



app.get('/', (req, res)=> {
    res.send('ema john online store is open')
})


const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.iw4kl2c.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });

    const emajohnDB = client.db('ema-john-DB') 
    const productsCollection = emajohnDB.collection('products-collection') 

    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    app.get('/products', async(req, res)=> {
        const result = await productsCollection.find({}).toArray()
        res.send(result)
    })
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.listen(port, ()=>{
    console.log('ema john server is running');
})