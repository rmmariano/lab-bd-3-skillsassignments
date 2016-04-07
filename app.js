// chama o express
var express = require('express');
var app = express();
//chama biblioteca para trabalhar com método POST
var bodyParser = require("body-parser");

// usar método POST retornando JSON
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// template
app.set('view engine', 'jade');
app.set('views', './view');

// arquivos estáticos
app.use(express.static('static'));
app.use(express.static('view'));

// Model/DB
var model = require("./model/model");
// Test Model/DB
//var model = require("./model/model_test");

// Meus módulos
var tools = require("./module/tools");


// rotas
app.get('/', function (req, res) {
	//res.render('index', {});
	res.render('index', { _title_: 'Index', _message_: 'Welcome!' });
});
app.get('/index', function (req, res) {
	//res.render('index', {});
	res.render('index', { _title_: 'Index', _message_: 'Welcome!' });
});


app.get('/login', function (req, res) {
	res.render('login', { _title_: 'Login' });
});
app.post('/login', function (req, res) {
	var email = req.body.email;
	var password = req.body.password;
	model.do_login({"email": email, "password": password}, 'student', req, res);
});


app.get('/createstudent', function (req, res) {
	res.render('createstudent', { _title_: 'Create Student' });
});
app.post('/createstudent', function (req, res) {
	var form_json = req.body;
	model.add_student_into_collection(form_json, req, res);
});

app.get('/get_all_students', function (req, res) {
	model.get_search_from_collection({}, 'student', '', {}, req, res);
});

app.get('/get_student/:ra', function (req, res) {
	var ra = parseInt(req.params.ra);
	model.get_search_from_collection({"ra": ra}, 'student', '', {},req, res);
});


app.get('/createquestion', function (req, res) {
	//res.render('createquestion', { _title_: 'Create Question' });
	model.get_search_from_collection({}, 'competencie', 'createquestion', { _title_: 'Create Question' }, req, res);
});
app.post('/createquestion', function (req, res) {
	var form_json = req.body;
	model.add_question_into_collection(form_json, req, res);
});

app.get('/get_all_questions', function (req, res) {
	model.get_search_from_collection({}, 'question', '', {}, req, res);
});

app.get('/get_question/:number_question', function (req, res) {
	var number_question = parseInt(req.params.number_question);
	model.get_search_from_collection({"number": number_question}, 'question', '', {}, req, res);
});



app.get('/get_all_competencies', function (req, res) {
	model.get_search_from_collection({}, 'competencie', '', {}, req, res);
});

app.get('/get_competencie/:_id_competencie', function (req, res) {
	var _id_competencie = parseInt(req.params._id_competencie);
	model.get_search_from_collection({"_id": _id_competencie}, 'competencie', '', {}, req, res);
});






app.get('/question', function (req, res) {
	res.render('question', {});
});

app.get('/searchassessment', function (req, res) {
	res.render('searchassessment', {});
});




/* test functions */
/*
app.get('/test_createperson', function (req, res) {
	model.add_person_into_collection(req, res);
});
*/



/* server is listening in port */
app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});




/*
var answer = prompt("What’s your nsme?");
console.log(answer);  

*/