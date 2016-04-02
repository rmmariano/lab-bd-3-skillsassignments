$(document).ready(function(){
    $('#form').submit( function(e){
        e.preventDefault();

        var form_json = {
            "number": $('#number').val().trim(),
            "question": $('#title').val().trim(),
            "answer": [
              {
                "code": 1,
                "answer": $('#answer1').val().trim(),
                "competencies": [
                  {"name": "leadership", "value": $('#inputCheckboxLeadership1').val().trim()},
                  {"name": "communication", "value": $('#inputCheckboxCommunication1').val().trim()},
                  {"name": "values", "value": $('#inputCheckboxValues1').val().trim()},
                  {"name": "workGroup", "value": $('#inputCheckboxWorkGroup1').val().trim()},
                  {"name": "determination", "value": $('#inputCheckboxDetermination1').val().trim()},
                  {"name": "resilience", "value": $('#inputCheckboxResilience1').val().trim()},
                  {"name": "autonomy", "value": $('#inputCheckboxAutonomy1').val().trim()}
                ]
              },
              {
                "code": 2,
                "answer": $('#answer2').val().trim(),
                "competencies": [
                  {"name": "leadership", "value": $('#inputCheckboxLeadership2').val().trim()},
                  {"name": "communication", "value": $('#inputCheckboxCommunication2').val().trim()},
                  {"name": "values", "value": $('#inputCheckboxValues2').val().trim()},
                  {"name": "workGroup", "value": $('#inputCheckboxWorkGroup2').val().trim()},
                  {"name": "determination", "value": $('#inputCheckboxDetermination2').val().trim()},
                  {"name": "resilience", "value": $('#inputCheckboxResilience2').val().trim()},
                  {"name": "autonomy", "value": $('#inputCheckboxAutonomy2').val().trim()}
                ]
              },
              {
                "code": 3,
                "answer": $('#answer3').val().trim(),
                "competencies": [
                  {"name": "leadership", "value": $('#inputCheckboxLeadership3').val().trim()},
                  {"name": "communication", "value": $('#inputCheckboxCommunication3').val().trim()},
                  {"name": "values", "value": $('#inputCheckboxValues3').val().trim()},
                  {"name": "workGroup", "value": $('#inputCheckboxWorkGroup3').val().trim()},
                  {"name": "determination", "value": $('#inputCheckboxDetermination3').val().trim()},
                  {"name": "resilience", "value": $('#inputCheckboxResilience3').val().trim()},
                  {"name": "autonomy", "value": $('#inputCheckboxAutonomy3').val().trim()}
                ]
              },
              {
                "code": 4,
                "answer": $('#answer4').val().trim(),
                "competencies": [
                  {"name": "leadership", "value": $('#inputCheckboxLeadership4').val().trim()},
                  {"name": "communication", "value": $('#inputCheckboxCommunication4').val().trim()},
                  {"name": "values", "value": $('#inputCheckboxValues4').val().trim()},
                  {"name": "workGroup", "value": $('#inputCheckboxWorkGroup4').val().trim()},
                  {"name": "determination", "value": $('#inputCheckboxDetermination4').val().trim()},
                  {"name": "resilience", "value": $('#inputCheckboxResilience4').val().trim()},
                  {"name": "autonomy", "value": $('#inputCheckboxAutonomy4').val().trim()}
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
