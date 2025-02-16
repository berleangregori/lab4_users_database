const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, minlength: 4 },
    email: { 
        type: String, 
        required: true, 
        validate: [validator.isEmail, "Invalid email address"]
    },
    address: {
        street: { type: String, required: true },
        suite: { type: String, required: true },
        city: { 
            type: String, 
            required: true, 
            validate: {
                validator: function(value) {
                    return /^[a-zA-Z\s]+$/.test(value);
                },
                message: "City must contain only letters and spaces"
            }
        },
        zipcode: { 
            type: String, 
            required: true, 
            validate: {
                validator: function(value) {
                    return /^\d{5}-\d{4}$/.test(value);
                },
                message: "Zip code must be in format DDDDD-DDDD"
            }
        }
    },
    phone: { 
        type: String, 
        required: true, 
        validate: {
            validator: function(value) {
                return /^1-\d{3}-\d{3}-\d{4}$/.test(value);
            },
            message: "Phone number must be in format D-DDD-DDD-DDDD"
        }
    },
    website: { 
        type: String, 
        required: true, 
        validate: [validator.isURL, "Invalid URL format"]
    },
    company: {
        name: { type: String, required: true },
        catchPhrase: { type: String, required: true },
        bs: { type: String, required: true }
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
