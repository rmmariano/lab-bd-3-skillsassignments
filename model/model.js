// responsabilidades do model

// chama o undercore, que é uma biblioteca JS com ferramentas para trabalhar com objetos
var _ = require("underscore");

//var db = "";
var db;
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/skills', function(err, database) {
	// conecta com o DB skills

	if (err) { throw err; }
	db = database;
});

// DB functions
function do_login(search, collection, req, res){
	// função para fazer o login
	// retorna o ra do aluno encontrado
	db.collection(collection).find(search).toArray(
		function(err, result) {
			try {
				if (err) { throw err; }
				if(_.isEqual(result, [])){
					res.json({"warning": "The record doesn't exist."});
					return;
				}

				res.json({"ra": result[0].ra});
			}catch(error) {
				res.json({"error": error, "in": "do_login",
                    "error_msg": "Some problem happens with the DB. Please contact an administrator."
				});
			}
		}
	);
}

function get_search_from_collection(search, collection, req, res){
	db.collection(collection).find(search).toArray(
		function(err, result) {
			try {
				if (err) { throw err; }
				if(_.isEqual(result, [])){
					res.json({"warning": "The records don't exist."});
					return;
				}
				res.json(result);
			}catch(error) {
                res.json({"error": error, "in": "get_search_from_collection",
                    "error_msg": "Some problem happens with the DB. Please contact an administrator."
				});
			}
		}
	);
}

function add_student_into_collection(form_json, req, res){
	var form_json_db = {
		"ra" : parseInt(form_json.ra),
		"name" : form_json.name,
		"email" : form_json.email,
		"password" : form_json.password,
		"institution": form_json.institution,
		"course": form_json.course,
		"year": parseInt(form_json.year),
		"period": parseInt(form_json.period),
		"competencies": [
			  {"name": "leadership", "value": 0},
			  {"name": "communication", "value": 0},
			  {"name": "values", "value": 0},
			  {"name": "workGroup", "value": 0},
			  {"name": "determination", "value": 0},
			  {"name": "resilience", "value": 0},
			  {"name": "autonomy", "value": 0}
	  	],
		"question": 1
	};

	db.collection('student').insertOne(form_json_db, function(err, result){
		if(err){
            res.json({"error": err, "in": "add_student_into_collection",
                "error_msg": "There was a problem adding the information to the database."
			});
		}else{
			res.json({"ok": "Record was add with success."});
		}
	});
}

function add_question_into_collection(form_json, req, res){
	var form_json_db = {
		"number": form_json["number"],
		"question": form_json["question"],
		"answer": [],
		"introduction": form_json["introduction"],
		"introductionMediaType": "video"
	};

	var obj_code = {};
	for (var i = 1; i <= 4; i++) {
		obj_code = {
			"code": form_json["answer"][i-1]["code"],
			"answer": form_json["answer"][i-1]["answer"],
			"competencies": [
				{"name": "leadership", "value": form_json["answer"][i-1]["competencies"][0]["value"]},
				{"name": "communication", "value": form_json["answer"][i-1]["competencies"][1]["value"]},
				{"name": "values", "value": form_json["answer"][i-1]["competencies"][2]["value"]},
				{"name": "workGroup", "value": form_json["answer"][i-1]["competencies"][3]["value"]},
				{"name": "determination", "value": form_json["answer"][i-1]["competencies"][4]["value"]},
				{"name": "resilience", "value": form_json["answer"][i-1]["competencies"][5]["value"]},
				{"name": "autonomy", "value": form_json["answer"][i-1]["competencies"][6]["value"]}
			]
		};
		form_json_db["answer"].push(obj_code);
	}

	db.collection('question').insertOne(form_json_db, function(err, result){
		if(err){
            res.json({"error": error, "in": "add_question_into_collection",
                "error_msg": "There was a problem adding the information to the database."
            });
		}else{
			res.json({"ok": "Record was add with success."});
		}
	});
}




/*
function do_test(search, collection, req, res){
	var r = db.collection(collection).find(search);
	console.log(r);

	return {};

	/*
		function(err, r) {
			try {
				if (err) { throw err; }
				if(_.isEqual(r, [])){
					result = {"warning": "The record doesn't exist."};
					return;
				}
				result = {"ra": r[0].ra};
				flag = true;
				console.log("flag true, hue");
			}catch(error) {
				result = {"error": error, "in": "do_login",
                    		"error_msg": "Some problem happens with the DB. Please contact an administrator."
				};
				flag = true;
				console.log("flag true, hue2");
			}
		}
	);
	* /
}
*/



// responsabilidades que serão utilizadas quando este arquivo for importado
module.exports = {
    _: _,
    do_login: do_login,
    get_search_from_collection: get_search_from_collection,
    add_student_into_collection: add_student_into_collection,
    add_question_into_collection: add_question_into_collection,


	//do_test: do_test
};
