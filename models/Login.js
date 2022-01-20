const mongoose = require('mongoose');
const LoginSchema = new mongoose.Schema({
    email: { type: String,
        required: [true, 'Please add a title'],
        unique: true,
        maxlength: [40, 'Title cannot be more than 40 characters']},
    password: { type: String,
        required: [true, 'Please add a title'],
        unique: true,
        maxlength: [40, 'Title cannot be more than 40 characters']}
})

module.exports = mongoose.models.Login || mongoose.model('Login', LoginSchema);

