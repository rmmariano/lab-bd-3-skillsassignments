// to use this script: in mongo shell use the command:
// load('path')
// load("H:\BD\FATEC A sem\Lab 3\projectsnodejs\skillsassignments\model\scripts\for_db.js")
// or
// mongo < for_db.js

use skills

function getNextSequence(name){
    var ret = db.counters.findAndModify({
        query: {_id: name},
        update: {$inc: {seq: 1}},
        new: true
    });
    return ret.seq;
}

function clear_db(){
    db.counters.remove({});
    db.competencie.remove({});
    db.student.remove({});
    db.question.remove({});
    db.user.remove({});
}

function add_counters(){
    db.counters.insert({ "_id" : "questionnumber", "seq" : 0 });
    db.counters.insert({ "_id" : "competencie_id", "seq" : 0 });
}

function add_competencies(){
    db.competencie.insert({ "_id" : getNextSequence('competencie_id'), "name" : "Leadership" });
    db.competencie.insert({ "_id" : getNextSequence('competencie_id'), "name" : "Communication" });
    db.competencie.insert({ "_id" : getNextSequence('competencie_id'), "name" : "Values" });
    db.competencie.insert({ "_id" : getNextSequence('competencie_id'), "name" : "WorkGroup" });
    db.competencie.insert({ "_id" : getNextSequence('competencie_id'), "name" : "Determination" });
    db.competencie.insert({ "_id" : getNextSequence('competencie_id'), "name" : "Resilience" });
    db.competencie.insert({ "_id" : getNextSequence('competencie_id'), "name" : "Autonomy" });
}

function add_students(){
  db.student.insert({
      "ra" : 1212, "name" : "Joao",
      "email" : "joao@gmail.com", "password" : "12345",
      "institution": "A", "course": "M",
      "year": 1990, "period": 2,
      "competencies": [
            {"name": "Leadership", "value": 0},
            {"name": "Communication", "value": 0},
            {"name": "Values", "value": 0},
            {"name": "WorkGroup", "value": 0},
            {"name": "Determination", "value": 0},
            {"name": "Resilience", "value": 0},
            {"name": "Autonomy", "value": 0}
      ],
      "question": 1
  });
  db.student.insert({
      "ra" : 2121, "name" : "Zod",
      "email" : "zod@gmail.com", "password" : "zod",
      "institution": "Y", "course": "W",
      "year": 1980, "period": 1,
      "competencies": [
            {"name": "Leadership", "value": 0},
            {"name": "Communication", "value": 0},
            {"name": "Values", "value": 0},
            {"name": "WorkGroup", "value": 0},
            {"name": "Determination", "value": 0},
            {"name": "Resilience", "value": 0},
            {"name": "Autonomy", "value": 0}
      ],
      "question": 1
  });
}

function add_questions(){
  var form_json_db = {
  	"number": getNextSequence('questionnumber'),
        "question": "umaquestaoaqui",
  	"answer": [],
  	"introduction": "https://www.youtube.com/watch?v=qFZ9e4wx1H8",
  	"introductionMediaType": "video"
  };

  var obj_code = {}; var count = 1;
  for (var i = 1; i <= 4; i++) {
  	obj_code = {
  		"code": i, "answer": "Resposta"+i,
  		"competencies": [
  			{"name": "Leadership", "value": count},
  			{"name": "Communication", "value": count+1},
  			{"name": "Values", "value": count+2},
  			{"name": "WorkGroup", "value": count+3},
  			{"name": "Determination", "value": count+4},
  			{"name": "Resilience", "value": count+5},
  			{"name": "Autonomy", "value": count+6}
  		]
  	};
  	form_json_db["answer"].push(obj_code);
        count = count + 7;
  }

  db.question.insert(form_json_db);

  form_json_db = {
  "number": getNextSequence('questionnumber'),
      "question": "outraquestaoaqui",
  "answer": [],
  "introduction": "https://www.youtube.com/watch?v=e5O90uzvUA4",
  "introductionMediaType": "video"
  };

  obj_code = {}; count = 10;
  for (var i = 1; i <= 4; i++) {
  	obj_code = {
  		"code": i, "answer": "Resposta"+i,
  		"competencies": [
  			{"name": "Leadership", "value": count},
  			{"name": "Communication", "value": count+1},
  			{"name": "Values", "value": count+2},
  			{"name": "WorkGroup", "value": count+3},
  			{"name": "Determination", "value": count+4},
  			{"name": "Resilience", "value": count+5},
  			{"name": "Autonomy", "value": count+6}
  		]
  	};
  	form_json_db["answer"].push(obj_code);
        count = count + 7;
  }

  db.question.insert(form_json_db);
}

function add_users(){
  db.user.insert({
      "cpf": 1234, "name": "Roger",
      "email": "roger@gmail.com", "password": "1234",
      "type": "adm"
  });
  db.user.insert({
      "cpf": 2345, "name": "Lice",
      "email": "lice@gmail.com", "password": "2345",
      "type": "adm"
  });
  db.user.insert({
      "cpf": 3456, "name": "Meed",
      "email": "meed@gmail.com", "password": "3456",
      "type": "psicologo"
  });
  db.user.insert({
      "cpf": 4567, "name": "Juliet",
      "email": "juliet@gmail.com", "password": "4567",
      "type": "psicologo"
  });
}

function new_db(){
    clear_db();
    add_counters();
    add_competencies();
    add_students();
    add_questions();
    add_users();
}

//print("1");
new_db();
