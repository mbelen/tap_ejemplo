const express = require("express");
const app = express();
const http = require("http").createServer(app);
const PORT = 5000;

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://c55juser:0jbMXjJQnKTCJCts@cluster0.4re0f.mongodb.net/tap2021?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

collection  = null;

client.connect(err => {
  collection = client.db("tap2021").collection("burgers");
  // perform actions on the collection object
  //client.close();
});

http.listen(PORT,() =>{
    console.log(`listening to ${PORT}`);
})

app.get("/burgers/:offset/:limit", async (req,res) =>{

    let { limit = 5, offset = 0 } = req.params;
    console.log(limit);
    try{
        result = await collection.find({}).skip(parseInt(offset)).limit(parseInt(limit)).toArray();
        console.log(result);
    }catch(error){
        console.log("error");
    }    

    res.json({burgers: result});
})


