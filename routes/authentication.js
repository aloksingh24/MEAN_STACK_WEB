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
            if(!req.body.userName){
                res.json({ success:false, message: 'You must provide userName'});
            }
            else{
                if(!req.body.password){
                    res.json({ success:false, message: 'You must provide password'});  
                }
                else{
                    let user=new User({
                        email: req.body.email.toLowerCase(),
                        userName: req.body.userName.toLowerCase(),
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
                                    }   
                                } else {
                                    res.json({success: false, message: 'Could not save User',err});
                                }
                            }
                        }
                        else{
                            res.json({success: true, message: 'User saved !'})
                        }
                    });
                }
            }
        }
    });
    return router;
}