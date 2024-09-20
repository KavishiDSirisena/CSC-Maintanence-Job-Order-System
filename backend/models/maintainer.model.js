const mongoose =require('mongoose');

const Schema = mongoose.Schema;

const maintainerSchema = new Schema({
    
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
    
},
{
    timestamps:true,
});


const Maintainer = mongoose.model('Maintainer',maintainerSchema);

module.exports= Maintainer;