const mongoose = require('mongoose');

// ----------------------
// USERS
// ----------------------
const usersSchema = new mongoose.Schema({
  // required for authentication: DO NOT TOUCH Or You May Get Punched
  email:     { type: String, required: true },
  password:  { type: String, required: true },
  // x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
  
   // example of optional fields
  username:  { type: String, required: true },
  createdAt: { type: Date, default: Date.now }

})

const favSchema = new mongoose.Schema({
	user_id: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  listing_id: { type: Number, required: true},
  title: { type: String },
  price: { type: String },
  MainImage: { type: Object },
  Shop: { type: Object }
})

module.exports = {
  User: mongoose.model('User', usersSchema),
  Fav: mongoose.model('Fav', favSchema)
}