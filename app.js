// chama o express
var express = require('express');
var app = express();
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

// Model/DB
var model = require("./model/model");

// Meus módulos
var tools = require("./module/tools");


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
	model.do_login({"email": email, "password": password}, 'student', req, res);
});


app.get('/createstudent', function (req, res) {
	res.render('createstudent', {});
});
app.post('/createstudent', function (req, res) {
	var form_json = req.body;
	model.add_student_into_collection(form_json, req, res);
});

app.get('/get_all_students', function (req, res) {
	model.get_search_from_collection({}, 'student', req, res);
});

app.get('/get_student/:ra', function (req, res) {
	var ra = parseInt(req.params.ra);
	model.get_search_from_collection({"ra": ra}, 'student', req, res);
});


app.get('/createquestion', function (req, res) {
	res.render('createquestion', {});
});
app.post('/createquestion', function (req, res) {
	var form_json = req.body;
	form_json = tools.arrange_json(form_json);
	model.add_question_into_collection(form_json, req, res);
});

app.get('/get_all_questions', function (req, res) {
	model.get_search_from_collection({}, 'question', req, res);
});

app.get('/get_question/:number_question', function (req, res) {
	var number_question = parseInt(req.params.number_question);
	model.get_search_from_collection({"number": number_question}, 'question', req, res);
});





app.get('/question', function (req, res) {
	res.render('question', {});
});

app.get('/searchassessment', function (req, res) {
	res.render('searchassessment', {});
});





app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
