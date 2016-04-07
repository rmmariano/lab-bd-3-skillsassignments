$(document).ready(function(){
    $('#form').submit( function(e){
        e.preventDefault();

        var form_json = {
            "ra": $('#ra').val().trim(),
            "name": $('#name').val().trim(),
            "email": $('#email').val().trim(),
            "password": $('#password').val().trim(),
            "repeatPassword": $('#repeatPassword').val().trim(),
            "institution": $('#institution').val().trim(),
            "course": $('#course').val().trim(),
            "year": $('#year').val().trim(),
            "period": $('#period').val().trim()
        };

        var request = $.ajax({
            url: "/createstudent",
            method: "POST",
            data: JSON.stringify(form_json),
            contentType: 'application/json'
        });

        request.done(function(data, textStatus, information) {
            if( !(("error" in data) || ("warning" in data)) ){
                console.log("ok");
            }else{
                console.log("error");
            }
            console.log(data);
            console.log(textStatus);
            console.log(information);
        });

        request.fail(function(data, textStatus, information) {
            console.log("fail x( ");
            console.log(data);
            console.log(textStatus);
            console.log(information);
        });

        request.always(function(data, textStatus, information) {
            console.log("always x) ");
            console.log(data);
            console.log(textStatus);
            console.log(information);
        });


    });
});
