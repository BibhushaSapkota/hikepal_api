const Hike= require('../models/Hike')

const addhike=((req,res,next)=>{
    console.log(req.user.user._id)  
    let hike= {
        HikeLocation: req.body.HikeLocation,
        StartDate: req.body.StartDate,
        Duration: req.body.Duration,
        Meetuplocation: req.body.Meetuplocation,
        Description: req.body.Description,
        user: req.user.user._id
    }
    const file = req.file;
    if (file) {
        const fileName = req.file.filename;
        hike.image = '/images/hike_image/' + fileName;
    }

    Hike.create(hike).then(hike => {
        res.status(201).json({
            status: 'Hike added successfully',
            data: hike
        })
    }).catch(next)
});


const gethike=((req,res,next)=>{
    Hike.find()
    .populate('user')
    .then(hike => {
        res.json({
            status: 'success',
            data: hike
        })
    }).catch(next)
}
);

const gethikeByUser=((req,res,next)=>{
    Hike.find({user:req.params.id})
    .populate('user')
    .then(hike => {
        res.json({
            status: 'success',
            data: hike
        })
    }).catch(next)
}

);

const gethikeByHike=((req,res,next)=>{
    Hike.find({hike:req.params.id})
    .populate('user')
    .then(hike => {
        res.json({
            status: 'success',
            data: hike
        })
    }).catch(next)
}
);


const deletehike=((req,res,next)=>{
    Hike.findByIdAndDelete(req.params.id)
    .then(hike => {
        res.json({
            status: 'success',
            data: hike
        })
    }).catch(next)
}
);





module.exports = {
    addhike,
    gethike,
    gethikeByUser,
    gethikeByHike,
    deletehike
}