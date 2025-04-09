require('dotenv').config();
const cors     = require('cors');
const express  = require('express') ;
const app      = express();
const pRt      = require('./routes/products');
const cRt      = require('./routes/carts');
const uRt      = require('./routes/users');
const mongoose = require('mongoose');

app.use(express.json())
app.use(cors());

app.use('/api/products',pRt);
app.use('/api/carts',cRt);
app.use('/api/users',uRt);

mongoose.connect(process.env.MONGOURL).then(()=>{
    app.listen(process.env.PORT,()=>{console.log("Connected to Database and Listening for requests")});
}).catch(error=>{console.log(error)})