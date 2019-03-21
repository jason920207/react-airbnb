const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  username: {
    type:String,
    min:[4,'Too short, max is 4 characaters'],
    max:[32,'Too long, max is 32 characaters']
  },
  email:{
    type:String,
    min:[4,'Too short, max is 4 characaters'],
    max:[32,'Too long, max is 32 characaters'],
    unique:true,
    lowercase:true,
    required: 'email is required',
    match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  password:{
    type: String,
    min:[4,'Too short, max is 4 characaters'],
    max:[32,'Too long, max is 32 characaters'],
    required: 'Password is required'
  },
  rentals: [{
    type: Schema.Types.ObjectId,
    ref:'Rental'
  }]
})

userSchema.methods.isSamePassword = function(password) {
  return bcrypt.compareSync(password,this.password)
}

userSchema.pre('save',function(next){
  const user = this
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
          user.password = hash
          next()
      });
  });
})

module.exports = mongoose.model('User', userSchema)
