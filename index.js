var express = require("express") //install express
var app = express();
var usersign = require('./usersign_in')
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var server = app.listen(process.env.PORT||3000,function(){
    var port = server.address().port;
    console.log("Server is running on port "+port)

app.use('/user',usersign);

})