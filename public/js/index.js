// $(document). ready(function (){

    console.log("Connection!");    

let socket = io( 'http://localhost:8888' );
    socket.on('greeting', function (data) {
        console.log(data.msg); //5
    socket.emit('thankyou', { msg: 'Thank you for connecting me! -Client' });
    });

    $('.posting_form').on ( 'submit', function(event){
        event.preventDefault();
        let userName = $('#userName').val();
        let dojoLocation = $('#dojoLocation').val();
        let favoriteLanguage = $('#favoriteLanguage').val();
        let comment = $('#comment').val();


        let send = {
                userName,
                favoriteLanguage,
                comment,
                dojoLocation 

        };
        socket.emit( 'posting_form', send );

    });
    socket.on('update_message', function (data) {
        console.log("esto es data recibida: ",data);
        console.log("data que sera renderizada: ",data.result[0].userName);
        let userInfo = 
        `<p> ${data.result[0].userName} </p> <p>${data.result[0].dojoLocation}</p><p> ${data.result[0].favoriteLanguage}</p><p>${data.result[0].comment}</p></div>`;
        $('.userInfo').append(userInfo);
    });


    socket.on('random_number', function (data) {
        console.log("estoes el random number: ",data);
        let number=
        `<p> ${data.x} </p>`;
        $('.number').append(number);

    });





    //     socket.emit('posting_form', {userName: "Ricardo", dojoLocation: "heredia", favoriteLanguage: "java", comment: "hello"});
    // });
    //  socket.on('newUser', function (data) {
    //     console.log(data.newUser);
    // });
    // socket.on('random_number', function (data) {
    //         console.log(data.msg);
    
    // });