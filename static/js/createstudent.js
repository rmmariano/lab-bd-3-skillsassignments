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

        $.post("/createstudent", form_json, function(data){
            if( !(("error" in data) || ("warning" in data)) ){
                console.log("ok");
            }else{
                console.log("error");
            }
            console.log(data);
        });
    });
});
