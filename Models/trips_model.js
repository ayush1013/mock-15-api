const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
    name: String,
    email: String,
    destination: String,
    travellers: Number,
    budget: Number
})

const TripModel = mongoose.model("trips",tripSchema);

module.exports = {
    TripModel
}