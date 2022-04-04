const mongoose = require('mongoose');

const {model, Schema} = mongoose;


const schema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password : {type : String , required : true}
});

// 3. Create a Model.
const User = model('User', schema);


module.exports = User;
