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
app.set('views', './views');

// arquivos estáticos
app.use(express.static('statics'));
app.use(express.static('views'));

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
					res.json([]);
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
			"ra" : form_json.ra,
			"name" : form_json.name,
			"email" : form_json.email,
			"password" : form_json.password
		},
		function(err, result){
			if(err){
				// If it failed, return error
				res.json({"error": "There was a problem adding the information to the database."});
			}else{
				// And forward to success page
				res.json({"ok": "ok"});
			}
		}
	);
}

function add_question_into_collection(form_json, req, res){
	var form_json_db = {
			"number": form_json.number,
			"question": form_json.question,
			"answer": [
			  {
				"code": 1,
				"answer": form_json.answer01,
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
				"answer": form_json.answer02,
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
				"answer": form_json.answer03,
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
				"answer": form_json.answer04,
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
			"introduction": form_json.introduction,
			"introductionMediaType": "video"
		};

	db.collection('question').insertOne(form_json_db, function(err, result){
		if(err){
			// If it failed, return error
			res.json({"error": "There was a problem adding the information to the database."});
		}else{
			// And forward to success page
			res.json({"ok": "ok"});
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


// rotas
app.get('/', function (req, res) {
	/* res.send('Hello World!'); */
	res.render('index', {});
});
app.get('/index', function (req, res) {
	res.render('index', {});
});


app.get('/login', function (req, res) {
	res.render('login', {});
});
app.get('/login/:email/:password', function (req, res) {
	var email = req.params.email;
	var password = req.params.password;
	do_login({"email": email, "password": password}, 'student', req, res);
});


app.get('/createstudent', function (req, res) {
	res.render('createstudent', {});
});
app.post('/createstudent', function (req, res) {
	var form_json = req.body;
	console.log(form_json);
	add_student_into_collection(form_json, req, res);
});



app.get('/createquestion', function (req, res) {
	res.render('createquestion', {});
});
app.post('/createquestion', function (req, res) {
	var form_json = req.body;
	form_json = arrange_json(form_json);
	console.log(form_json);
	//add_question_into_collection(form_json, req, res);
	res.json({"hey": "heykid"});
});
/*
app.get('/createquestion/:value', function (req, res) {
	res.json({"value": req.params.value});
});
*/


app.get('/get_all_questions', function (req, res) {
	get_search_from_collection({}, 'question', req, res);
});

app.get('/get_question/:number_question', function (req, res) {
	var number_question = parseInt(req.params.number_question);
	get_search_from_collection({"number": number_question}, 'question', req, res);
});









/*
app.get('/get_users', function (req, res) {
	//res.send('Get Users');
	res.json({"hey": "kid", "hello": "its me"});
});
*/

//app.get('/competencies/:ra', function (req, res) {
 //var ra = req.params.ra;



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
