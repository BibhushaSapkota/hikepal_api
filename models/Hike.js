const mongoose= require('mongoose')

const HikeSchema=mongoose.Schema({
    image:{
        type:String
    },
    HikeLocation:{
        type: String     
    },
    StartDate:{
        type : String
    },
    Duration:{
        type:Number
    },
    Meetuplocation:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    Description:{
        type:String
    },   
}
)
module.exports= mongoose.model("Hike",HikeSchema)