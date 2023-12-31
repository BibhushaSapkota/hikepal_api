require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')//
const path = require('path')
const mailService = require('./controllers/mailService');
const user_routes = require('./routes/user_routes')
const hike_routes = require('./routes/hike_routes')
const jhike_routes = require('./routes/jhike_routes')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

port =3000
const app = express()
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/hikepal')
    .then(() => {
        console.log('connected to mongodb server')
        app.listen(port, () => {
            console.log(`App is running on port: ${port} `)
        })
    }).catch((err) => console.log(err))



    

// application level middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`)
    next()
})

app.use(
    "/images",
    express.static(path.join(__dirname, "/images"))
);



// starts with(^) / or ends with($) / or is index or index.html then 
app.get('^/$|index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

//express defined middleware
app.use(express.json())


// routes
app.use('/users',user_routes)
app.use('/hikes',hike_routes)	
app.use('/jhikes',jhike_routes)

app.post('/api/send-email', (req, res) => {
  console.log(req.body)
  const { email, code } = req.body;


  mailService.sendVerificationCode(email, code);

  res.sendStatus(200);
}); 

app.put('/api/update-password',async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      // User with the provided email doesn't exist
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Generate a salt and hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    // Password updated successfully
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to update password' });
  }

  res.json({ success: true });
});



// error handling middleware
// when there is value in err parameter then it gets executed

app.use((err, req, res, next) => {
 
    if (res.statusCode == 200) res.status(500)
    res.json({ "err": err.message , message:err.message})
})

module.exports = app