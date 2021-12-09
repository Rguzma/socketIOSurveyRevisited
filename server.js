

var express = require("express");

var app = express();
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(__dirname + "/public"));
const server = app.listen(8888);
 console.log("listening on port 8888");
const io = require('socket.io')(server);
// server.listen(80);
var counter = 0;
// app.set('view engine', 'ejs');


var x=parseInt(Math.floor(Math.random() *1000 + 1));
const result= [];


io.on('connection', function (socket) { //2
    console.log("You've reache the server");
    // console.log(socket);
    socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server' }); //3
    socket.on('thankyou', function (data) { //7
        console.log(data.msg); //8 (note: this log will be on your server's terminal)
    });

    socket.on('posting_form', function (data) {
        console.log("this is the data from the form: "+data);
        const userName= data.userName;
        const dojoLocation = data.dojoLocation;
        const favoriteLanguage= data.favoriteLanguage;
        const comment = data.comment;
        const newUser = {
                userName,
                favoriteLanguage,
                comment,
                dojoLocation  
            };
            result.push(newUser);
        socket.emit('update_message', {result});
        socket.emit('random_number', { x});
    });



    // socket.on('greeting', function (data){
    //     let info = {
    //         message:"Hello, nice tohave you here!"
    //     }
    //     socket.emit( 'informtaion',)
    // });
} );
// app.get('/', function(req, res) {
//  res.render("index");
// })

// app.get( '/result', function( req, res ){
//     console.log("result en el get " +result);
//         res.render( 'users', { user:result } );
// });

// app.post("/result", function(req, res) {
//  console.log("POST DATA", req.body);
// const userName= req.body.userName;
// const dojoLocation = req.body.dojoLocation;
// const favoriteLanguage= req.body.favoriteLanguage;
// const comment = req.body.comment;

// const newUser = {
//     userName,
//     favoriteLanguage,
//     comment,
//     dojoLocation  
// };
// result.push(newUser);

// console.log("este es result: "+result);
//  res.redirect('/result');
// })

// app.listen(8888, function() {
//  console.log("listening on port 8888");
// });