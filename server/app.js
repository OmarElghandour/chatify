const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const WebSocket = require('ws');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const UserSchema = require('./schema/User');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require("jsonwebtoken");

require('dotenv').config();
app.use(cors());

const clients = {};
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan('combined'));


const wss = new WebSocket.Server({ port: 8080 });

// This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};


wss.on('request', function(request) {
  var userID = getUniqueID();
  console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));

});

wss.on('connection', function connection(socket) {
  wss.on('close', function() {
      console.log('clooooooooooooooosed');
  });

  socket.on('message', function incoming(data) {
    const event = JSON.parse(data.toString());
    if (event.eventName === 'connected') {
          console.log(event.payload);
          clients[event.payload] = socket;
    }
    if (event.eventName === 'newMessage') {
      console.log(event);

       const reciverId = JSON.parse(event.payload).to;
      //  const {body, sender} = JSON.parse(event.payload);
       if(clients[reciverId]) {
         clients[reciverId].send(JSON.stringify({eventName: 'newMessage', payload : JSON.parse(event.payload)}));
       }
      }


      if(event.eventName === 'connected') {
        wss.clients.forEach(client => {
          client.send(JSON.stringify({eventName: 'userConnected', payload : Object.keys(clients)  }));

        });
      }

  });

});


app.post('/register', async (request, response) => {
  const { error } = UserSchema.validate(request.body);
  if (error) {
    return response.send({ 'validationError': error });

  }

  const emailExist = await User.findOne({ email: request.body.email });
  if (emailExist) {
    return response.send({ 'error': 'email' + request.body.email + 'is already exist' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(request.body.password, salt);
  const user = new User({
    userName: request.body.userName,
    email: request.body.email,
    password: hashedPassword
  });


    // Create token
    const token = jwt.sign(
      { user_id: user._id, email : user.email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;
  
  await user.save()
    .then(() => response.send({ message: user._id }))
    .catch(err => response.send({ err: err }));

});



/**
 * checking for user credentials by username or email
 * @param request 
 * @param response 
 * @returns {Response}
 */
app.post('/login', async (request, response) => {
  const userEmail = await User.findOne({ email: request.body.email });

  const userName = await User.findOne({ userName: request.body.userName });

  const user = userEmail || userName;

  if (!user) {
    return response.status(401).send({ message: 'email or password doesnt exist' });
  }

  const password = await bcrypt.compare(request.body.password, user.password);

  if (!password) {
    return response.status(401).send({ message: 'email or password doesnt exist' });
  }


  // Create token
  const token = jwt.sign(
    { user_id: user._id, email : user.email },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );
  // save user token
  user.token = token;

  const userData = {
    id: user._id,
    token : token,
  };
  return response.send({ 'message': 'valid email and password', userData });
});


app.get('/users', async(request, response) => {
  const users = await User.find();
  return response.send(users);
});



// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

const { API_PORT } = process.env;
const port = 8000;

app.listen(port, () => {
  console.log(process.env.DATABASE_URL);
  //Set up default mongoose connection
  const mongoDB = `${process.env.DATABASE_URL}/chatfiy`;
  mongoose.connect(mongoDB, { 
      useNewUrlParser: true,
      useUnifiedTopology: true 
    }).then(()=> {
      console.log("Successfully connected to database")
    }).catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });

  //Get the default connection
  const db = mongoose.connection;

  //Bind connection to error event (to get notification of connection errors)
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));


  console.log(`Example app listening on port ${port}`)
});

module.exports = app;



