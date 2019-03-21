const User = require('../models/user')
const MongooseHelpers = require('../helpers/mongoose')
const jwt = require('jsonwebtoken')
const config = require('../config/dev')
exports.auth = function(req,res) {
  console.log(req.body)
  const { email, password } = req.body

  if (!password || !email) {
    return res.status(422).send({errors:[{title:'data missing', detail:'Provide email and password!'}]})
  }

  User.findOne({email}, function(err,user){
    console.log(user)
    if(err){
      return res.status(422).send({err:MongooseHelpers.normalizeErrors(err.errors)})
    }
    if(!user){
      return res.status(422).send({errors:[{title:'Invalid User', detail:'User does not exist'}]})
    }
    if (user.isSamePassword(password)) {
      const token = jwt.sign({
        userId: user.id,
        username: user.username
      }, config.SECRET, { expiresIn: '1h' });
      return res.json(token)
    } else {
      return res.status(422).send({errors:[{title:'Wrong data', detail:'Wrong email or password'}]})
    }
  })
}


exports.register = function(req,res) {
  const {username,email,password,passwordConfirmation} = req.body
  console.log(username)
  if (!username || !email) {
    return res.status(422).send({errors:[{title:'data missing', detail:'Provide email and password!'}]})
  }
  if (password !== passwordConfirmation) {
    return res.status(422).send({errors:[{title:'Invalid password', detail:'Password is not the same as comformation'}]})
  }

  User.findOne({email},function(err,user){
    if(err){
      return res.status(422).send({err:MongooseHelpers.normalizeErrors(err.errors)})
    }
    if(user){
      return res.status(422).send({errors:[{title:'Invalid password', detail:'Email is already exist'}]})
    }

    const newuser = new User({
      username,
      email,
      password
    })
    newuser.save(function(err){
      if(err){
        return res.status(422).send({err:MongooseHelpers.normalizeErrors(err.errors)})
      }
      return res.json({'registered':true})
    })
  })
}

exports.authMiddleware = function(req,res,next){
  const token= req.headers.authorization

  if(token) {
    const user = parseToken(token)
    User.findById(user.userId,function(err,user){
      if(err){
        return res.status(422).send({err:MongooseHelpers.normalizeErrors(err.errors)})
      }

      if(user){
        res.locals.user = user
        next()
      }else{
        return res.status(422).send({errors: [{title:'Not authorization', detail:'need log in '}]})
      }
    })
  } else {
    return res.status(422).send({errors: [{title:'Not authorization', detail:'need log in '}]})
  }
}

function parseToken(token){
  return jwt.verify(token.split(' ')[1], config.SECRET);
}
