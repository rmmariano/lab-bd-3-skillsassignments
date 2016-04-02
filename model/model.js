// responsabilidades do model

// chama o undercore, que é uma biblioteca JS com ferramentas para trabalhar com objetos
var _ = require("underscore");

var MongoClient = require('mongodb').MongoClient;
var autoIncrement = require("mongodb-autoincrement");

/*
var db;
MongoClient.connect('mongodb://localhost:27017/skills', function(err, database) {
	// conecta com o DB skills

	if (err) { throw err; }
	db = database;
});
*/

var db_test;
MongoClient.connect('mongodb://localhost:27017/skills_test', function(err, database) {
	// conecta com o DB skills_test

	if (err) { throw err; }
	db_test = database;
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






/* test functions */
/*
function getNextSequence(name) {
   var ret = db_test.counters.findAndModify(
          {
            query: { _id: name },
            update: { $inc: { seq: 1 } },
            new: true
          }
   );

   return ret.seq;
}


db.collection('test').findAndModify(
	{hello: 'world'}, // query
	[['_id','asc']],  // sort order
	{$set: {hi: 'there'}}, // replacement, replaces only the field "hi"
	{}, // options
	function(err, object) {
		if (err){
			console.warn(err.message);  // returns error if no matching object found
		}else{
			console.dir(object);
		}
	}
);

*/

/*
function getNextSequence(name) {
	var ret = db_test.collection('counters').findAndModify(
		{ _id: name },     // query
		[],               // represents a sort order if multiple matches
		{ $inc: { seq: 1 } },   // update statement
		{ new: true },    // options - new to return the modified document
		function(err, doc) {
			if (err){
				console.log(">>> err: ");
				console.log(err.message);  // returns error if no matching object found
			}else{
				console.log(">>> doc: ");
				console.log(doc);
			}
		}
	);

	console.log(">>>>> ret: ");
	console.log(ret);


   return ret.seq;
}
*/


/*
function add_person_into_collection(req, res){
	var form_json_db = {
		//"number": getNextSequence('personnumber'),
		"number": 0,
		"name": "rod"
	};



	console.log(">>>>>> 1");

	autoIncrement.getNextSequence(db_test, 'person', "_id", function (err, autoIndex) {
		console.log(">>>>>> 2");

		console.log(">>>>>> err: "+err);
		console.log(">>>>>> autoIndex: ");
		console.log(autoIndex);

		var collection = db_test.collection('person');

		console.log(">>>>>> 3");

        collection.insert({
			"_id": autoIndex,
			"number": 0,
			"name": "rodapp"
        });

		console.log(">>>>>> 4");

    });

	console.log(">>>>>> 5");


	res.json({"ok": "Record ok"});


/*
	db_test.collection('person').insertOne(form_json_db, function(err, result){
		if(err){
            res.json({"error": err, "in": "add_student_into_collection",
                "error_msg": "There was a problem adding the information to the database."
			});
		}else{
			res.json({"ok": "Record was add with success."});
		}
	});
* /

}
*/

function getNextSequence(name, callback){
    db_test.collection('counters').findAndModify(
        { "_id": name },
        [],
        { "$inc": { "seq": 1 }},
        { "new": true, "upsert": true },
        callback
    );
}

function add_person_into_collection(req, res){

	getNextSequence('personnumber', function(err, obj) {
	    if (err) console.error(err);

	    db_test.collection('person').insert({
	        '_id': obj.value.seq,
	        'number': 0,
	        'name': "app"
	    },
		function(err,docs) {
	        if (err) console.error(err);
	        console.log(docs);
	        res.end();
	    });
	});

}






// responsabilidades que serão utilizadas quando este arquivo for importado
module.exports = {
    _: _,
    do_login: do_login,
    get_search_from_collection: get_search_from_collection,
    add_student_into_collection: add_student_into_collection,
    add_question_into_collection: add_question_into_collection,


	//do_test: do_test
	add_person_into_collection: add_person_into_collection
};
