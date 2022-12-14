const User = require("../models/user.model")

const userAuth = async (req, res, next) => {
    if(!req?.headers.cookie){
        return res.send("user not authenticated")
    }
    const _id = req?.headers.cookie
    let arr = _id.split("=")
    const user = await User.findOne({_id:arr[1]})

    if(req?.headers.cookie && !user){
        return res.send("user not authenticated")
    }

    if(user){
    if(user.logStatus == true && user.status === "active"){
       return next()
    } else {
        res.status(404).send("user has not permision for this opration")
    }
    } else {
        res.send("user not exist please signup first")
    }
    
  }



module.exports = userAuth