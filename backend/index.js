const config = require('./config/config');
const dbConnection = require('./config/database');
const express = require('express')
const app = express();
const cors = require('cors');
require('dotenv').config();

dbConnection.then(() => {
    app.use(cors({
        origin: 'http://localhost:3000', // Replace with your frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
        credentials: true
      }));
      
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));

    require('./config/express')(app);
    require('./config/routes')(app);
  
    app.use(function (err, req, res, next) {
        console.error(err);
        res.status(500).send(err.message);
        console.log('*'.repeat(90))
    });

    app.listen(config.port, console.log(`Listening on port ${config.port}!`))

}).catch(console.error);