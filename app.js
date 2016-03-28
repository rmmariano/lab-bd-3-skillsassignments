// chama o express
var express = require('express');
var app = express();
// chama o undercore, que é uma biblioteca JS com ferramentas para trabalhar com objetos
var _ = require("underscore");
//chama biblioteca para trabalhar com método POST
var bodyParser = require("body-parser");

// usar método POST retornando JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// template
app.set('view engine', 'jade');
app.set('views', './view');

// arquivos estáticos
app.use(express.static('static'));
app.use(express.static('view'));

// DB
var db;
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/skills', function(err, database) {
	// conecta com o DB skills
	if (err) { throw err; }
	db = database;
	// sobe o servidor depois que o DB conectar
	app.listen(3000, function () {
		console.log('Example app listening on port 3000!');
	});
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
				res.json({"error": "Some problem happens with the DB. Please contact an administrator.",
							"in": "do_login"});
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
				res.json({"error": "Some problem happens with the DB. Please contact an administrator.",
							"in": "get_search_from_collection"});
			}
		}
	);
}

function add_student_into_collection(form_json, req, res){
	db.collection('student').insertOne(
		{
			"ra" : parseInt(form_json.ra),
			"name" : form_json.name,
			"email" : form_json.email,
			"password" : form_json.password
		},
		function(err, result){
			if(err){
				res.json({"error": "There was a problem adding the information to the database.",
							"in": "add_student_into_collection"});
			}else{
				res.json({"ok": "Record was add with success."});
			}
		}
	);
}

function add_question_into_collection(form_json, req, res){
	var form_json_db = {
			"number": parseInt(form_json.number),
			"question": form_json.question,
			"answer": [
			  {
				"code": 1,
				"answer": form_json.answer0answer,
				"competencies": [
				  {"name": "leadership", "value": parseInt(form_json.answer0competencies0value)},
				  {"name": "communication", "value": parseInt(form_json.answer0competencies1value)},
				  {"name": "values", "value": parseInt(form_json.answer0competencies2value)},
				  {"name": "workGroup", "value": parseInt(form_json.answer0competencies3value)},
				  {"name": "determination", "value": parseInt(form_json.answer0competencies4value)},
				  {"name": "resilience", "value": parseInt(form_json.answer0competencies5value)},
				  {"name": "autonomy", "value": parseInt(form_json.answer0competencies6value)}
				]
			  },
			  {
				"code": 2,
				"answer": form_json.answer1answer,
				"competencies": [
				  {"name": "leadership", "value": parseInt(form_json.answer1competencies0value)},
				  {"name": "communication", "value": parseInt(form_json.answer1competencies1value)},
				  {"name": "values", "value": parseInt(form_json.answer1competencies2value)},
				  {"name": "workGroup", "value": parseInt(form_json.answer1competencies3value)},
				  {"name": "determination", "value": parseInt(form_json.answer1competencies4value)},
				  {"name": "resilience", "value": parseInt(form_json.answer1competencies5value)},
				  {"name": "autonomy", "value": parseInt(form_json.answer1competencies6value)}
				]
			  },
			  {
				"code": 3,
				"answer": form_json.answer2answer,
				"competencies": [
				  {"name": "leadership", "value": parseInt(form_json.answer2competencies0value)},
				  {"name": "communication", "value": parseInt(form_json.answer2competencies1value)},
				  {"name": "values", "value": parseInt(form_json.answer2competencies2value)},
				  {"name": "workGroup", "value": parseInt(form_json.answer2competencies3value)},
				  {"name": "determination", "value": parseInt(form_json.answer2competencies4value)},
				  {"name": "resilience", "value": parseInt(form_json.answer2competencies5value)},
				  {"name": "autonomy", "value": parseInt(form_json.answer2competencies6value)}
				]
			  },
			  {
				"code": 4,
				"answer": form_json.answer3answer,
				"competencies": [
				  {"name": "leadership", "value": parseInt(form_json.answer3competencies0value)},
				  {"name": "communication", "value": parseInt(form_json.answer3competencies1value)},
				  {"name": "values", "value": parseInt(form_json.answer3competencies2value)},
				  {"name": "workGroup", "value": parseInt(form_json.answer3competencies3value)},
				  {"name": "determination", "value": parseInt(form_json.answer3competencies4value)},
				  {"name": "resilience", "value": parseInt(form_json.answer3competencies5value)},
				  {"name": "autonomy", "value": parseInt(form_json.answer3competencies6value)}
				]
			  }
			],
			"introduction": form_json.introduction,
			"introductionMediaType": "video"
		};

	db.collection('question').insertOne(form_json_db, function(err, result){
		if(err){
			res.json({"error": "There was a problem adding the information to the database.",
						"in": "add_question_into_collection"});
		}else{
			res.json({"ok": "Record was add with success."});
		}
	});
}


// normal functions
function replaceAllSpecialCharacters(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "");
}

function arrange_json(form_json){
	var newkey;
	for(var key in form_json){
		newkey = replaceAllSpecialCharacters(key);
		if(newkey != key){
			form_json[newkey] = form_json[key];
			delete form_json[key];
		}
	}
	return form_json;
}







var model = require("./model/model");


app.get('/tests', function (req, res) {
	var resp = model.soma(1,2);
	var resp2 = model.mult(1,2);
	res.json({"resp": resp, "resp2": resp2});
});








// rotas
app.get('/', function (req, res) {
	res.render('index', {});
});
app.get('/index', function (req, res) {
	res.render('index', {});
});


app.get('/login', function (req, res) {
	res.render('login', {});
});
app.post('/login', function (req, res) {
	var email = req.body.email;
	var password = req.body.password;
	do_login({"email": email, "password": password}, 'student', req, res);
});


app.get('/createstudent', function (req, res) {
	res.render('createstudent', {});
});
app.post('/createstudent', function (req, res) {
	var form_json = req.body;
	add_student_into_collection(form_json, req, res);
});

app.get('/get_all_students', function (req, res) {
	get_search_from_collection({}, 'students', req, res);
});

app.get('/get_student/:ra', function (req, res) {
	var ra = parseInt(req.params.ra);
	get_search_from_collection({"ra": ra}, 'student', req, res);
});


app.get('/createquestion', function (req, res) {
	res.render('createquestion', {});
});
app.post('/createquestion', function (req, res) {
	var form_json = req.body;
	form_json = arrange_json(form_json);
	add_question_into_collection(form_json, req, res);
});

app.get('/get_all_questions', function (req, res) {
	get_search_from_collection({}, 'question', req, res);
});

app.get('/get_question/:number_question', function (req, res) {
	var number_question = parseInt(req.params.number_question);
	get_search_from_collection({"number": number_question}, 'question', req, res);
});


// facul
/*
app.get('/get_all_questions', function (req, res) {
	var onejson =
		[
		  {
			"number": 1,
			"question": "Qual é este tipo de Interação Humano Computador?",
			"answer": [
			  {
				"code": 1,
				"answer": "Interface Gráfica",
				"competencies": [
				  {
					"name": "leadership",
					"value": 1
				  },
				  {
					"name": "workGroup",
					"value": 3
				  }
				]
			  },
			  {
				"code": 2,
				"answer": "Interface Linha de Comando",
				"competencies": [
				  {
					"name": "leadership",
					"value": 0
				  },
				  {
					"name": "workGroup",
					"value": 0
				  }
				]
			  },
			  {
				"code": 3,
				"answer": "Interface Natural",
				"competencies": [
				  {
					"name": "leadership",
					"value": 10
				  },
				  {
					"name": "workGroup",
					"value": 10
				  },
				  {
					"name": "communication",
					"value": 10
				  }
				]
			  },
			  {
				"code": 4,
				"answer": "Interface Orgânica",
				"competencies": [
				  {
					"name": "leadership",
					"value": 0
				  }
				]
			  }
			],
			"introduction": "https://www.youtube.com/watch?v=5t1FPSvpDko",
			"introductionMediaType": "video"
		  }
		]

		res.json(onejson);

		//var twojson = [{"number":1,"question":"Qual é este tipo de Interação Humano Computador?","answer":[{"code":1,"answer":"Interface Gráfica","competencies":[{"name":"leadership","value":1},{"name":"workGroup","value":3}]},{"code":2,"answer":"Interface Linha de Comando","competencies":[{"name":"leadership","value":0},{"name":"workGroup","value":0}]},{"code":3,"answer":"Interface Natural","competencies":[{"name":"leadership","value":10},{"name":"workGroup","value":10},{"name":"communication","value":10}]},{"code":4,"answer":"Interface Orgânica","competencies":[{"name":"leadership","value":0}]}],"introduction":"https://www.youtube.com/watch?v=5t1FPSvpDko","introductionMediaType":"video"}];
		//res.json(twojson);
});

app.get('/get_question/:number_question', function (req, res) {
	var onejson =
		[
		  {
		    "number": 1,
		    "question": "Qual é este tipo de Interação Humano Computador?",
		    "answer": [
		      {
		        "code": 1,
		        "answer": "Interface Gráfica",
		        "competencies": [
		          {
		            "name": "leadership",
		            "value": 1
		          },
		          {
		            "name": "workGroup",
		            "value": 3
		          }
		        ]
		      },
		      {
		        "code": 2,
		        "answer": "Interface Linha de Comando",
		        "competencies": [
		          {
		            "name": "leadership",
		            "value": 0
		          },
		          {
		            "name": "workGroup",
		            "value": 0
		          }
		        ]
		      },
		      {
		        "code": 3,
		        "answer": "Interface Natural",
		        "competencies": [
		          {
		            "name": "leadership",
		            "value": 10
		          },
		          {
		            "name": "workGroup",
		            "value": 10
		          },
		          {
		            "name": "communication",
		            "value": 10
		          }
		        ]
		      },
		      {
		        "code": 4,
		        "answer": "Interface Orgânica",
		        "competencies": [
		          {
		            "name": "leadership",
		            "value": 0
		          }
		        ]
		      }
		    ],
		    "introduction": "https://www.youtube.com/watch?v=5t1FPSvpDko",
		    "introductionMediaType": "video"
		  }
		]

		res.json(onejson);


		//var twojson = [{"number":1,"question":"Qual é este tipo de Interação Humano Computador?","answer":[{"code":1,"answer":"Interface Gráfica","competencies":[{"name":"leadership","value":1},{"name":"workGroup","value":3}]},{"code":2,"answer":"Interface Linha de Comando","competencies":[{"name":"leadership","value":0},{"name":"workGroup","value":0}]},{"code":3,"answer":"Interface Natural","competencies":[{"name":"leadership","value":10},{"name":"workGroup","value":10},{"name":"communication","value":10}]},{"code":4,"answer":"Interface Orgânica","competencies":[{"name":"leadership","value":0}]}],"introduction":"https://www.youtube.com/watch?v=5t1FPSvpDko","introductionMediaType":"video"}];
		//res.json(twojson);
});

*/
