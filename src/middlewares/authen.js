const jwt = require('jsonwebtoken');
require('dotenv').config()
const tokenSecretKey = process.env.tokenSecretKey

const authen_token_api = () =>{
  return (req, res, next) => {

      const token = req.headers.authorization ? req.headers.authorization .split(' ')[1] : ''
      jwt.verify(token,tokenSecretKey, (err, data) => {
        if (err) {
          res.status(401).json({ success : 0,"data" : "Unauthorized" });
        } 
        else{
           next();
        }
      });  
  }
}
  module.exports = {

    authen_token_api
  }