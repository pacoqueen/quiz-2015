// GET /quizes/question
exports.question = function(reg, res) {
    res.render('quizes/question', {pregunta: 'Capital de Italia'});
}

// GET /quizes/amswer
exports.answer = function(req, res) {
    if (req.query.respuesta === 'Roma'){
        res.render('quizes/answer', {respuesta: 'Correcto'});
    } else {
        res.render('quizes/answer', {respuesta: 'Incorrecto'});
    }
};
