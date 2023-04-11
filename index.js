const express = require('express');
const { connection} = require("./db");
const {TripModel} = require("./Models/trips_model")
require("dotenv").config();

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.sendFile("Welcome")
})

app.get("/trips", async(req, res) => {
    const query = req.query
    console.log(query)
    if(query._sort && query._order){
        let sorted = query._sort;
        let order;
        query._order === "asc" ? order=1 : order= -1
        const sortTrips = await TripModel.find({query}).sort({[sorted]:order});
        res.send(sortTrips);
    }else{
        const allTrips = await TripModel.find({query});
        res.send(allTrips);
        console.log(allTrips)
    }
})

app.post("/trips", async(req, res) => {
    const data = req.body
    try{
        const trip = new TripModel(data);
        await trip.save();
        res.send("trip added");
    }catch(err){
        console.log("Couldn't add trip")
    }
})

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("Successfully connected to the Database")
    } catch (err) {
        console.log("Error while connecting to the Database")
        console.log(err)
    }
    console.log(`This server is running at port ${process.env.port}`);
})