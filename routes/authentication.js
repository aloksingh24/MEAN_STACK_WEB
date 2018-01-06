
  const User = require('../models/user');
  const jwt = require('jsonwebtoken');
  const config = require('../config/database.js');
  module.exports=(router)=>{
      router.post('/register',(req,res)=>{
          //req.body.email
          //req.body.userName
          //req.body.password
          if(!req.body.email){
              res.json({ success:false, message: 'You must provide e-mail'});
          }
          else {
              if(!req.body.username){
                  res.json({ success:false, message: 'You must provide userName'});
              }
              else{
                  if(!req.body.password){
                      res.json({ success:false, message: 'You must provide password'});
                  }
                  else{
                      let user=new User({
                          email: req.body.email.toLowerCase(),
                          userName: req.body.username.toLowerCase(),
                          password: req.body.password
                      });
                      user.save((err)=>{
                          if(err){
                              if(err.code == 11000){
                                  res.json({ success: false , message: 'UserName or email already exists'});
                              } else {
                                  if(err.errors){
                                      if(err.errors.email){
                                          res.json( { success: false, message: err.errors.email.message });
                                      } else {
                                          if(err.errors.userName){
                                              res.json( { success: false, message: err.errors.userName.message });
                                          } else {
                                              if(err.errors.password){
                                                  res.json( { success: false, message: err.errors.password.message });
                                              } else{
                                                  res.json({ success : false, message : err});
                                              }
                                          }
                                      }
                                  } else {
                                      res.json({success: false, message: 'Could not save User',err});
                                  }
                              }
                          }
                          else{
                              res.json({success: true, message: 'Account register !'})
                          }
                      });
                  }
              }
          }
      });
      router.get('/checkEmail/:email',(req,res) => {
          if(!req.params.email){
              res.json({ success: false, message: 'Please provide an e-mail'});
          } else{
              User.findOne({ email: req.params.email},(err,user) => {
                  if(err){
                      res.json({ success: false, message: err });
                  } else {
                      if(user){
                          res.json({ success: false, message: 'E-mail is already taken' });
                      } else{
                          res.json({ success: true, message: 'E-mail is available'});
                      }

                  }
              })
          }
      });
      //check for UserName
      router.get('/checkUserName/:username',(req,res) => {
          if(!req.params.username){
              res.json({ success: false, message: 'Please provide an Username'});
          } else{
              User.findOne({ userName: req.params.username},(err,user) => {
                  if(err){
                      res.json({ success: false, message: err });
                  } else {
                      if(user){
                          res.json({ success: false, message: 'Username is already taken' });
                      } else{
                          res.json({ success: true, message: 'Username is available'});
                      }

                  }
              })
          }
      });

      //For login
      router.post('/login',(req,res) => {
        if(!req.body.username){
          res.json({ success: false, message: 'Username was not provided' });
        } else {
          if(!req.body.password){
            res.json({ success: false, message: 'Password was not provided' });
          } else{
            User.findOne({ userName: req.body.username.toLowerCase()}, (err,user) =>{
              if(err){
                res.json({ success: false, message: err});
              } else{
                  if(!user){
                    res.json({ success: false, message: 'Username was not found' });
                  } else{
                      const validPassword = user.comparePassword(req.body.password);
                      if(!validPassword){
                        res.json({ success: false, message: 'Invalid password'});
                      } else{
                        const token = jwt.sign({userId: user._id}, config.secert, {expiresIn: '24h' });
                        res.json({ success: true, message: 'Success !!', token: token, user: {username: user.userName} });
                      }
                  }
              }
             });
          }
        }
      });
      //grap the token from header
      router.use((req,res,next) => {
        const token = req.headers['authorization'];
        console.log('alok token value: ' + token);
        if(!token){
          res.json({success: false, message: 'Token is not valid'});
        } else{
          jwt.verify(token, config.secert, (err, decoded) => {
            if(err){
              res.json({success: false, message: 'Invalid Token: '+ err});
            } else{
                req.decoded = decoded;
                next();
            }
          });
        }
      });
      // for profile
      router.get('/profile',(req,res) =>{
        User.findOne({_id: req.decoded.userId }).select('userName email').exec((err, user) => {
          if(err){
            res.json({success: false, message: err})
          } else{
            if(!user){
              res.json({success: false, message: 'User not found' });
            } else{
              console.log('Alok value of user: '+ user);
              res.json({success: true, user: user});
            }
          }
        })
      })
      return router;
  }
