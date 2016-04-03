$(document).ready(function(){
    $('#form').submit( function(e){
        e.preventDefault();

        var form_json = {
            "question": $('#title').val().trim(),
            "answer": [],
            "introduction": $('#introduction').val().trim(),
            "introductionMediaType": "video"
        };

        var obj_code = {};
        for (var i = 1; i <= 4; i++) {
            obj_code = {
                "code": i,
                "answer": $('#answer'+i).val().trim(),
                "competencies": [
                    {"name": "leadership", "value": $('#inputCheckboxLeadership'+i).val().trim()},
                    {"name": "communication", "value": $('#inputCheckboxCommunication'+i).val().trim()},
                    {"name": "values", "value": $('#inputCheckboxValues'+i).val().trim()},
                    {"name": "workGroup", "value": $('#inputCheckboxWorkGroup'+i).val().trim()},
                    {"name": "determination", "value": $('#inputCheckboxDetermination'+i).val().trim()},
                    {"name": "resilience", "value": $('#inputCheckboxResilience'+i).val().trim()},
                    {"name": "autonomy", "value": $('#inputCheckboxAutonomy'+i).val().trim()}
                ]
            };
            form_json["answer"].push(obj_code);
        }

        var request = $.ajax({
            url: "/createquestion",
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
