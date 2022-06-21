const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

//connect to mongoose
mongoose.connect('mongodb+srv://VBAAdmin:MarkAnthony2022@vbacluster.o7dvq2u.mongodb.net/vba-ratings-db')

//require to route
app.use('/',require('./routes/raterSubmissionRoute'))

app.listen(3001,function() {
    console.log("express server is running on port 3001");
})

//MarkAnthony2022 = password for MongoDB
//VBAAdmin = username