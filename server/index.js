const express = require('express')
const morgan = require("morgan");
const http = require('http');
const mongoose = require("mongoose");

require("dotenv").config();
const cors = require("cors");

const routes = require('./src/routes/index.routes')

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "https://jonaflix.vercel.app"]
  }));

app.use('/api/v1', routes)

const server = http.createServer(app);

mongoose    
    .connect(process.env.MONGO_URL)
    .then(() => {
        server.listen(3001, () => {
            console.log('Listening on port 3001')
        })
        console.log('Connect to MONGODB')
    })
    .catch((error) => {
        console.log(error)
    })
