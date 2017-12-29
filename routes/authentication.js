
  const User=require('../models/user');

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
      return router;
  }
