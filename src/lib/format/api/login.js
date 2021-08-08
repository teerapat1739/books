const { DateTime } = require('luxon')

const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()
const tokenSecretKey = process.env.tokenSecretKey
function getDate(){
    return DateTime.local().toFormat("yyyy-MM-dd HH:mm:ss",{zone: "utc+7"});
}
function genarate_token(id,token_is_created){
    let isCreated = token_is_created ? true : false;
    let dt = getDate();
    let payload = {
      dt: dt,
      token: isCreated
        ? jwt.sign({ id: id }, tokenSecretKey, {
            expiresIn:  '1h'
        })
        : null,
      refresh_token: isCreated ? uuidv4() : null,
      refresh_token_iat: isCreated ? dt : null,
      refresh_token_exp: isCreated
        ? DateTime.local().plus({ hours: 1 }).toFormat("yyyy-MM-dd HH:mm:ss")
        : null
    };
    return payload;
}
module.exports = {
    genarate_token
 }