var mongoose = require('mongoose');
mongoose.Promise=global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
let emailLengthChecker= (email) => {
    if(!email){
        return false;
    } else{
        if(email.length < 5 || email.length >30 ){
            return false;
        } else {
            true;
        }
    }
};

let emailRegexChecker= (email) => {
    if(!email) return false;
    else{
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email);
    }
};
const emailValidator =[{
    validator : emailLengthChecker,
    message : 'E-mail must be in range 5 to 30'
},
{
    validator : emailRegexChecker,
    message : 'E-mail must be a valid'
}
];

const userSchema = new Schema({
email: {type:String,required:true,unique:true,lowercase:true, validate : emailValidator },
userName: {type:String,required:true,unique:true,lowercase:true},
password: {type:String,required:true}
});
userSchema.pre('save',function(next) {
    if(!this.isModified('password'))
    return next();
    bcrypt.hash(this.password,null,null,(err, hash) => {
        if(err){
            return next(err);
        }
        this.password=hash;
        next();
    })
});

userSchema.methods.comparePassword=(password)=>{
    return bcrypt.compareSync(password,this.password);
};

module.exports = mongoose.model('User', userSchema);