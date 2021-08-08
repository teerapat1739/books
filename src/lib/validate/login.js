const yup = require('yup')


const validate_input = yup.object().shape({

  email:yup.string().email(),
  password:  yup.string().trim().min(6).required(),
})

module.exports = {
    validate_input
}