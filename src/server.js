const Tip = require('../model/tip')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = require('express')()
const port = process.env.API_PORT || 3001

const mongoDB = 'mongodb://127.0.0.1:27017/familytipsdb'
mongoose.connect(mongoDB, {
  useMongoClient: true
})

// When successfully connected
mongoose.connection.on('connected', function() {
  console.log('Mongoose default connection open')
})

// To prevent errors from Cross Origin Resource Sharing, we will set
// our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  )
  // and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

// now we should configure the API to use bodyParser and look for
// JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({
    message: 'Api connection'
  })
})

// get all tips from DB
app.get('/tip', (req, res) => {
  Tip.find({}, (err, tips) => {
    if (err) throw err

    const randNumb = Math.floor(Math.random() * tips.length)

    res.json({
      tip: tips[randNumb]
    })
  })
})

// post tip to DB
app.post('/tip', (req, res) => {
  console.log(req.body.tip)
  const tipName = req.body.tip
  const tip = new Tip({
    tip: tipName
  })

  tip.save(err => {
    if (err) throw err

    console.log('Tip created!')
  })
})

app.listen(port, () => {
  console.log(`api running on port ${port}`)
})
