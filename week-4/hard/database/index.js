const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect( process.env.CONNECTION_STRING);

// Define schemas

const UserSchema = new mongoose.Schema({
    // Schema definition here
    name : {type: String, required : true},
    email : {type: String, required : true},
    password : {type: String, required : true},
});

const TodoSchema = new mongoose.Schema({
    // Schema definition here
    title : {type: String, required : true},
    description: {type: String},
    createdAt: { type: Date, default: Date.now },
    userId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const User = mongoose.model('User', UserSchema);
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
    User,
    Todo
}