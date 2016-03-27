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

        $.post("/login", {"email": email, "password": password}, function(data){
            if( !(("error" in data) || ("warning" in data)) ){
                console.log("ok");
                sessionStorage.setItem("ra", parseInt(data.ra));
                window.location.href = '/index';
            }else{
                console.log("error");
                error_login.show();
            }
            console.log(data);
        });
    });
});
