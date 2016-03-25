// chamar o express
var express = require('express');
var app = express();

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

function get_search_from_collection(search, collection, req, res){
	db.collection(collection).find(search).toArray(
		function(err, result) {
			if (err) { throw err; }
			res.json(result);
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

app.get('/createquestion', function (req, res) {
	res.render('createquestion', {});
});

app.get('/createuser', function (req, res) {
	res.render('createuser', {});
});


app.get('/get_all_questions', function (req, res) {
	get_search_from_collection({}, 'question', req, res);
});

app.get('/get_question/:number_question', function (req, res) {
	var number_question = parseInt(req.params.number_question);
	get_search_from_collection({"number": number_question}, 'question', req, res);
});


app.get('/get_users', function (req, res) {
	//res.send('Get Users');
	//res.json({"hey": "kid", "hello": "its me"});

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


//app.get('/competencies/:ra', function (req, res) {
 //var ra = req.params.ra;
