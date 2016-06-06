// responsabilidades do model

// chama o undercore, que é uma biblioteca JS com ferramentas para trabalhar com objetos
var _ = require("underscore");

var MongoClient = require('mongodb').MongoClient;

var db;
MongoClient.connect('mongodb://localhost:27017/skills', function(err, database) {
	// conecta com o DB skills

	if (err) { throw err; }
	db = database;
});

// DB private functions
function getNextSequence(name, callback){
	// Está função serve para autoincremento do mongodb
    db.collection('counters').findAndModify(
        { "_id": name },
        [],
        { "$inc": { "seq": 1 }},
        { "new": true, "upsert": true },
        callback
    );
}


/*
res.status(500).send({ error: 'Something failed!' });
*/


// DB public functions
function do_login(search, collection, req, res){
	// função para fazer o login
	// retorna o ra do aluno encontrado
	var msg = {};
	db.collection(collection).find(search).toArray(
		function(err, result) {
			try {
				if (err) { throw err; }
				if(_.isEqual(result, [])){
					msg = {"warning": "The record doesn't exist."};
				}
				//msg = {"ra": result[0].ra};

				msg = result[0];			

			}catch(error) {
				msg = {"error": error, "in": "do_login",
                    "error_msg": "Some problem happens with the DB. Please contact an administrator."};
			}
			res.json(msg);
		}
	);
}

function get_search_from_collection(search, collection, template, context, req, res){
	var msg = {};
	// { _id: 1} quer dizer para ordenar crescentemente
	db.collection(collection).find(search).sort({ _id: 1}).toArray(
		function(err, result) {
			try {
				if (err) { throw err; }
				if(_.isEqual(result, [])){
					msg = {"warning": "The records don't exist."};
				}else{
					msg = result;
				}
			} catch(error) {
				msg = {"error": error, "in": "get_search_from_collection",
                    "error_msg": "Some problem happens with the DB. Please contact an administrator."};
			}

			if ( template == '' ) {
				//se nenhum template for especificado, apenas retorna um JSON com os valores
				res.json(msg);
			} else {
				//se um template for especificado, retorna um JSON com os valores dentro do contexto do template
				context["_dbresult_"] = msg;
				res.render(template, context);
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
			  {"name": "Leadership", "value": 0},
			  {"name": "Communication", "value": 0},
			  {"name": "Values", "value": 0},
			  {"name": "WorkGroup", "value": 0},
			  {"name": "Determination", "value": 0},
			  {"name": "Resilience", "value": 0},
			  {"name": "Autonomy", "value": 0}
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
		"number": 0,
		"question": form_json["question"],
		"answer": [],
		"introduction": form_json["introduction"],
		"introductionMediaType": "video"
	};
	var obj_code = {};
	for (var i = 1; i <= 4; i++) {
		obj_code = {
			"code": i,
			"answer": form_json["answer"][i-1]["answer"],
			"competencies": [
				{"name": "Leadership", "value": parseInt(form_json["answer"][i-1]["competencies"][0]["value"])},
				{"name": "Communication", "value": parseInt(form_json["answer"][i-1]["competencies"][1]["value"])},
				{"name": "Values", "value": parseInt(form_json["answer"][i-1]["competencies"][2]["value"])},
				{"name": "WorkGroup", "value": parseInt(form_json["answer"][i-1]["competencies"][3]["value"])},
				{"name": "Determination", "value": parseInt(form_json["answer"][i-1]["competencies"][4]["value"])},
				{"name": "Resilience", "value": parseInt(form_json["answer"][i-1]["competencies"][5]["value"])},
				{"name": "Autonomy", "value": parseInt(form_json["answer"][i-1]["competencies"][6]["value"])}
			]
		};
		form_json_db["answer"].push(obj_code);
	}
	getNextSequence('questionnumber', function(err, obj) {
	    if (err) console.error(err);

		//o campo number é auto incremento
		form_json_db["number"] = obj.value.seq;

	    db.collection('question').insert(form_json_db, function(err,docs) {
			if(err){
	            res.json({"error": error, "in": "add_question_into_collection",
	                "error_msg": "There was a problem adding the information to the database."
	            });
			}else{
				res.json({"ok": "Record was add with success."});
			}
		});
	});
}


// responsabilidades que serão utilizadas quando este arquivo for importado
module.exports = {
    //_: _,
    do_login: do_login,
    get_search_from_collection: get_search_from_collection,
    add_student_into_collection: add_student_into_collection,
    add_question_into_collection: add_question_into_collection,
};
