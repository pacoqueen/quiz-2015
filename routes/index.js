var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Quiz' });
});

// GET /quizes/question
/* router.get('/quizes/question', quizController.question); */

// GET /quizes/answer
/* router.get('/quizes/answer', quizController.answer); */

// GET /author
router.get('/author', function(req, res) {
    res.render('author');
});

// Definición de rutas de /quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

module.exports = router;
