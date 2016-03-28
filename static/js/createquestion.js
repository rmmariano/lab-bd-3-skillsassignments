$(document).ready(function(){
    $('#form').submit( function(e){
        e.preventDefault();

        var form_json = {
            "number": $('#number').val().trim(),
            "question": $('#title').val().trim(),
            "answer": [
              {
                "code": 1,
                "answer": $('#answer01').val().trim(),
                "competencies": [
                  {"name": "leadership", "value": $('#inputCheckboxLeadership01').val().trim()},
                  {"name": "communication", "value": $('#inputCheckboxCommunication01').val().trim()},
                  {"name": "values", "value": $('#inputCheckboxValues01').val().trim()},
                  {"name": "workGroup", "value": $('#inputCheckboxWorkGroup01').val().trim()},
                  {"name": "determination", "value": $('#inputCheckboxDetermination01').val().trim()},
                  {"name": "resilience", "value": $('#inputCheckboxResilience01').val().trim()},
                  {"name": "autonomy", "value": $('#inputCheckboxAutonomy01').val().trim()}
                ]
              },
              {
                "code": 2,
                "answer": $('#answer02').val().trim(),
                "competencies": [
                  {"name": "leadership", "value": $('#inputCheckboxLeadership02').val().trim()},
                  {"name": "communication", "value": $('#inputCheckboxCommunication02').val().trim()},
                  {"name": "values", "value": $('#inputCheckboxValues02').val().trim()},
                  {"name": "workGroup", "value": $('#inputCheckboxWorkGroup02').val().trim()},
                  {"name": "determination", "value": $('#inputCheckboxDetermination02').val().trim()},
                  {"name": "resilience", "value": $('#inputCheckboxResilience02').val().trim()},
                  {"name": "autonomy", "value": $('#inputCheckboxAutonomy02').val().trim()}
                ]
              },
              {
                "code": 3,
                "answer": $('#answer03').val().trim(),
                "competencies": [
                  {"name": "leadership", "value": $('#inputCheckboxLeadership03').val().trim()},
                  {"name": "communication", "value": $('#inputCheckboxCommunication03').val().trim()},
                  {"name": "values", "value": $('#inputCheckboxValues03').val().trim()},
                  {"name": "workGroup", "value": $('#inputCheckboxWorkGroup03').val().trim()},
                  {"name": "determination", "value": $('#inputCheckboxDetermination03').val().trim()},
                  {"name": "resilience", "value": $('#inputCheckboxResilience03').val().trim()},
                  {"name": "autonomy", "value": $('#inputCheckboxAutonomy03').val().trim()}
                ]
              },
              {
                "code": 4,
                "answer": $('#answer04').val().trim(),
                "competencies": [
                  {"name": "leadership", "value": $('#inputCheckboxLeadership04').val().trim()},
                  {"name": "communication", "value": $('#inputCheckboxCommunication04').val().trim()},
                  {"name": "values", "value": $('#inputCheckboxValues04').val().trim()},
                  {"name": "workGroup", "value": $('#inputCheckboxWorkGroup04').val().trim()},
                  {"name": "determination", "value": $('#inputCheckboxDetermination04').val().trim()},
                  {"name": "resilience", "value": $('#inputCheckboxResilience04').val().trim()},
                  {"name": "autonomy", "value": $('#inputCheckboxAutonomy04').val().trim()}
                ]
              }
            ],
            "introduction": $('#introduction').val().trim(),
            "introductionMediaType": "video"
        };

        $.post("/createquestion", form_json, function(data){
            if( !(("error" in data) || ("warning" in data)) ){
                console.log("ok");
            }else{
                console.log("error");
            }
            console.log(data);
        });
    });
});
