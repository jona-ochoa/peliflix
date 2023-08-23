const express = require('express')
const morgan = require("morgan");
const mongoose = require("mongoose");

require("dotenv").config();
// const cors = require("cors");

const routes = require('./src/routes/index.routes')

const app = express();

app.use(morgan("dev"));
app.use(express.json());
// app.use(cors());

app.use('/api', routes)

mongoose    
    .connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(3001, () => {
            console.log('Listening on port 3001')
        })
        console.log('Connect to MONGODB')
    })
    .catch((error) => {
        console.log(error)
    })
