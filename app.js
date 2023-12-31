require('dotenv').config()
require('./connection');
const express = require('express')
const app = express()
const authRouter = require('./routes/auth')
const userRouter = require('./routes/users');
const userS3Router = require('./routes/usersS3');
const journeyRouter = require('./routes/journey');
const cors = require('cors')
const path = require('path');

// app.use((_req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, GET, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization');
//   res.header('Access-Control-Allow-Credentials', 'true');

//   next();
// });

// // const corsOptions ={
// //   origin:'https://main--sweet-halva-a45e9f.netlify.app', 
// //   // origin: 'http://localstorage:8000',
// //   credentials:true,            //access-control-allow-credentials:true
// //   optionSuccessStatus:200
// // }

// app.use(cors());

app.use(express.json())
app.use(express.static(__dirname));
app.use(express.static('public/audio'));
app.use(express.static('public/image'));
// routes
app.get('/', (req, res) => {
  res.send(
    '<h1> Task-Manager API</h1> <a href=""> Source Code</a>'
  )
})


// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user' , userRouter)
app.use('/api/v1/users3' , userS3Router);
app.use('/api/v1/journey' , journeyRouter);

// app.use('/api/v1/tasks', authenticateUser, tasksRouter)

const port = process.env.PORT || 3000

const start = async () => {
  try { 
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()


