const mongoose = require('mongoose');
const RegisterSchema = new mongoose.Schema({
    name: { type: String,
        required: [true, 'Please add a title'],
        unique: true,
        maxlength: [40, 'Title cannot be more than 40 characters']},
    email: { type: String,
        required: [true, 'Please add a title'],
        unique: true,
        maxlength: [40, 'Title cannot be more than 40 characters']},
    password: { type: String,
        required: [true, 'Please add a title'],
        unique: true,
        maxlength: [40, 'Title cannot be more than 40 characters']}
})

module.exports = mongoose.models.Register || mongoose.model('Register', RegisterSchema);

