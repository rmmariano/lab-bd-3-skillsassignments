// responsabilidades do model

// chama o undercore, que é uma biblioteca JS com ferramentas para trabalhar com objetos
var _ = require("underscore");

var MongoClient = require('mongodb').MongoClient;

var db_test;
MongoClient.connect('mongodb://localhost:27017/skills_test', function(err, database) {
	// conecta com o DB skills_test

	if (err) { throw err; }
	db_test = database;
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

// DB public functions

//

// responsabilidades que serão utilizadas quando este arquivo for importado
module.exports = {
	//do_test: do_test
	//add_person_into_collection: add_person_into_collection
};
