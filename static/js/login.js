$(document).ready(function(){
    var error_login = $('#error_login');
    error_login.hide();

    $('#form').submit( function(e){
        e.preventDefault();
        var email = $('#email').val().trim();
        var password = $('#password').val().trim();

        if(email == "" || password == ""){
            error_login.show();
            return;
        }

        var request = $.ajax({
            url: "/login",
            method: "POST",
            data: JSON.stringify({"email": email, "password": password}),
            contentType: 'application/json'
        });

        request.done(function(data, textStatus, information) {
            if( !(("error" in data) || ("warning" in data)) ){
                console.log("ok");
                //sessionStorage.setItem("ra", parseInt(data.ra));
                sessionStorage.setItem("inf_student", JSON.stringify(data));
                window.location.href = '/index';
            }else{
                console.log("error");
                error_login.show();
            }
            console.log(data);
            //sessionStorage.setItem("inf_student", JSON.stringify(data));
            //var consultando = JSON.parse(sessionStorage.getItem("inf_student"));
            /*console.log(textStatus);
            console.log(information);*/
        });

        request.fail(function(data, textStatus, information) {
            console.log("fail x( ");
            console.log(data);
            /*console.log(textStatus);
            console.log(information);*/
        });

        request.always(function(data, textStatus, information) {
            console.log("always x) ");
            /*console.log(data);
            console.log(textStatus);
            console.log(information);*/
        });

    });
});
