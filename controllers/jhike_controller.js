const User=require('../models/User')
const Hike=require('../models/Hike')
const Jhike=require('../models/JHike');
const JHike = require('../models/JHike');



const addJhike=((req,res,next)=>{
    try {
      Jhike.find({user:req.user._id})
      .then((jhike) => 
      {
          jhike= new Jhike({
            hike: req.body.hike,
            user: req.user.user,
            
          })
          jhike.save().then((jhike) => {
            res.status(201).json({
              success: true,
              message: "Hike joined successfully",
              data: jhike,
            });
          })
      });
      
    } catch (error) {
        res.status(500).json({  
            message: error.message, 
        })
    }}

);

const getJhike=((req,res,next)=>{
    Jhike.find()
    .populate('user')
    .populate('hike')
    .then(jhike=>{
        res.json({
            status:'success',
            data:jhike
        })
    }).catch(next)
}
);

const getJhikeByUser=(req,res,next)=>{
    console.log(req.params.id)
    try{
    JHike.find()
    .where("user").equals(req.params.id)
    .populate('user')
    .populate('hike')
   .then((jhike)=> {
      console.log(jhike)
      res.status(200).json({
        success: true,
        message: "List of Joined Hikes",
        data: jhike,
      })
    })

  }catch (error) {
    res.status(500).json({
        message: error.message
    })
}
}


const getJhikeByHike=((req,res,next)=>{
    Jhike.find({hike:req.params.id})
    .populate('user')
    .populate('hike')
    .then(jhike=>{
        res.json({
            status:'success',
            data:jhike
        })
    }).catch(next)
}
);

const clearJhike=(req,res,next)=>{
    Jhike.find()
    .where("user").equals(req.params.id)
    .then((jhike)=>{
    jhike.forEach((jhike)=>{
      jhike.remove()
    })
    res.status(200).json({
      success: true,
      message: "Joined Hike removed successfully!",     
    })
  })
}

const deleteJhikeItem= async function(req,res,next){
  try {
    const HikeId = req.params.id;
    const userId = req.user.user._id;
    console.log(HikeId, userId);
    const response = await JHike.deleteOne().where("hike").equals(HikeId).where("user").equals(userId);
    if (response.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: "Item Deleted Successfully!",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "This item is not in cart!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
}

module.exports={
    addJhike,
    getJhike,
    getJhikeByUser,
    getJhikeByHike,
    clearJhike,
    deleteJhikeItem
}

