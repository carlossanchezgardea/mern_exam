const mongoose = require('mongoose')
function arrayLimit(arr) {
    return arr.length <= 3;
}
const PetSchema = new mongoose.Schema({
    petName:{
        type: String,
        required:[true, "Please add a pet name"],
        minLength:[3, "Pet name must be at least 3 characters long"]
    },
    petType:{
        type: String,
        required: [true, "Please add a type for the pet"],
        minLength: [3, "Type must be at least 3 characters long"]
    },
    petDescription:{
        type:String,
        required:[true, "Please add a description for the pet"],
        minLength:[3, "Pet description must be at least 3 characters long"]
    },
    petLikes:{
        type:Number,
        required:false
    },
    petSkills:{
        type: [String],
        required: false,
        validate: [{
            validator: arrayLimit,
            message: "A pet can only have 3 skills"
        }]
    }
}, {timestamps: true})

const Pet = mongoose.model('Pets', PetSchema)

module.exports = Pet

