const mongoose= require('mongoose')

const JoinedHikeSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    hike:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hike",
    }
}
)
module.exports= mongoose.model("JoinedHike",JoinedHikeSchema)

