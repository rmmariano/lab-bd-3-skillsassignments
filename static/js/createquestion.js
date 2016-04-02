$(document).ready(function(){
    $('#form').submit( function(e){
        e.preventDefault();

        var form_json = {
            "number": $('#number').val().trim(),
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

        $.ajax({
            type: 'POST',
            data: JSON.stringify(form_json),
            contentType: 'application/json',
            url: '/createquestion',
            success: function(data) {
                if( !(("error" in data) || ("warning" in data)) ){
                    console.log("ok");
                }else{
                    console.log("error");
                }
                console.log(data);
            },
            error: function() {
                console.log("error x(");
            }
        });

    });
});
