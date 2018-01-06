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
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email);
    }
};

let userNameLengthChecker= (userName) => {
    if(!userName) return false;
    else{
        if(userName.length < 3 || userName.length > 15){
            return false;
        }else {
            return true;
        }
    }
};

let userNameValid = (userName) => {
    if(!userName) return false;
    else{
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(userName);
    }
};

let passwordLengthChecker = (password) => {
    if(!password) return false;
    else{
        if(password.length < 8 || password.length > 25){
            return false;
        }else {
            return true;
        }
    }
};

let passwordValid = (password) => {
    if(!password) return false;
    else {
        const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
        return regExp.test(password);
    }
}

const passwordValidators= [{
    validator : passwordLengthChecker,
    message : "Password must be atleast 8 or less than 35"
},
{
    validator : passwordValid,
    message : "Please enter a valid password"
}
]

const userNameValidators = [{
    validator : userNameLengthChecker,
    message : "userName must be in range 3 to 15"
},
{
    validator : userNameValid,
    message : "Enter a valid userName"
}
]
const emailValidators =[{
    validator : emailLengthChecker,
    message : 'E-mail must be in range 5 to 30'
},
// {
//     validator : emailRegexChecker,
//     message : 'E-mail must be a valid form'
// }
];

const userSchema = new Schema({
email: {type:String,required:true,unique:true,lowercase:true, validate : emailValidators },
userName: {type:String,required:true,unique:true,lowercase:true, validate : userNameValidators },
password: {type:String,required:true, validate: passwordValidators }
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

userSchema.methods.comparePassword=function(password){
    return bcrypt.compareSync(password,this.password);
};

module.exports = mongoose.model('User', userSchema);
