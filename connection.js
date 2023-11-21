const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(res => console.log("connected to db"))
  .catch(err => console.log("couldn't connect to db, err: ", err.message))