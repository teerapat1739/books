

const corsOptionsDelegate = function (req, callback) {
  let corsOption = {
    methods: ['PUT', 'POST', 'DELETE', 'PATCH'],
    credentials: true,
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Cookie", "Referrer"],
    origin: false
  }
  // console.log(req.method)
  if (corsOption.methods.indexOf(req.method) === -1) {
    corsOption = { ...corsOption, origin: true }
  } else {
    if (process.env.CORS_WHITE_LIST.split(',').indexOf(req.header('origin')) !== -1) {
      console.log('origin', req.header('origin'))
      corsOption = { ...corsOption, origin: true }
    } else if (req.header('x-dev-key') === process.env.DEV_KEY && process.env.DEV_KEY) {
      corsOption = { ...corsOption, origin: true }
      console.log('x-dev')
    } else {
      return callback(new Error('Now allowed by CORS'))
    }

  }
  // console.log(corsOption)
  callback(null, corsOption)
}

module.exports = {
  corsOptionsDelegate
}