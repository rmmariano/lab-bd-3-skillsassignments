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

// conecta com o DB skills
MongoClient.connect('mongodb://localhost:27017/skills', function(err, database) {
	if (err) { throw err; }
	db = database;
	// sobe o servidor depois que o DB estiver OK
	app.listen(3000, function () {
		console.log('Example app listening on port 3000!');
	});
});

// função para fazer o login
// retorna o ra do aluno encontrado
function do_login(search, collection, req, res){
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

// função de consulta no banco
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


// rotas
app.get('/', function (req, res) {
	/* res.send('Hello World!'); */
	res.render('index', {});
});
app.get('/index', function (req, res) {
	res.render('index', {});
});


app.get('/createuser', function (req, res) {
	res.render('createuser', {});
});


/*
app.get('/createquestion', function (req, res) {
	res.render('createquestion', {});
});
*/
app.post('/createquestion', function (req, res) {
	var form_json = req.body;
	console.log(form_json);
	//res.render('createquestion', {});
	res.json({"hey": "kid"});
});
/*
app.get('/createquestion/:value', function (req, res) {
	res.json({"value": req.params.value});
});
*/





app.get('/login', function (req, res) {
	res.render('login', {});
});
app.get('/login/:email/:password', function (req, res) {
	var email = req.params.email;
	var password = req.params.password;

	do_login({"email": email, "password": password}, 'student', req, res);
});


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
