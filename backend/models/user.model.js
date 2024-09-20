const mongoose =require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    EmpId : {
        type : String, 
        unique :true,
        trim: true,
    },
    firstname : {
        type : String ,
        required: true,
    },
    lastname : {
        type : String,
        required: true,
    },
    designation : {
        type : String ,
        required: true,
    },
    department : {
        type : String,
        required: true,
    },
    sex : {
        type : String,
        required: true,
    },
    username : {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true,
    },
    
},
{
    timestamps:true,
});


const User = mongoose.model('User',userSchema);

module.exports= User;