$(document).ready(function(){
    var ok_add_question = $('#ok_add_question');
    var error_add_question = $('#error_add_question');
    ok_add_question.hide();
    error_add_question.hide();

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
                    {"name": "Leadership", "value": $('#inputCheckboxLeadership'+i).val().trim()},
                    {"name": "Communication", "value": $('#inputCheckboxCommunication'+i).val().trim()},
                    {"name": "Values", "value": $('#inputCheckboxValues'+i).val().trim()},
                    {"name": "WorkGroup", "value": $('#inputCheckboxWorkGroup'+i).val().trim()},
                    {"name": "Determination", "value": $('#inputCheckboxDetermination'+i).val().trim()},
                    {"name": "Resilience", "value": $('#inputCheckboxResilience'+i).val().trim()},
                    {"name": "Autonomy", "value": $('#inputCheckboxAutonomy'+i).val().trim()}
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
                ok_add_question.show();
            }else{
                console.log("error");
                error_add_question.show();
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
