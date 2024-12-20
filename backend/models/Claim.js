const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;
const { String, Number, Boolean, ObjectId } = Schema.Types;

const claimSchema = new Schema({
    MedicalProvider:{
        type:String,
        required:true
    },
    DescriptionOfClaim: {
            type: String,
            required: true,
    },
    Price:{
        type:Number,
        required:true
    },
    PostTime: { // New PostTime field
        type: Date,
        default: Date.now // Automatically set to current date and time when a new product is created
    },
    owner: {
            type:Schema.Types.ObjectId,
            ref: "User",
            default:null
    }
    

});

module.exports = mongoose.model('Claim', claimSchema);