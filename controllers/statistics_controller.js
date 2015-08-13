var models = require('../models/models.js');

var statistics ={
	quizes: 0,
	comments: 0,
	commentedQuizes: 0
}

var errors = [];

// Datos para las estadísticas
exports.statistics = function (req,res,next) {

 models.Quiz.count()
  .then(function (numQuizes) { // número de preguntas
    statistics.quizes = numQuizes;
    return models.Comment.count();
  })
  .then(function (numComments) { // número de comentarios
    statistics.comments = numComments;
    return models.Comment.countCommentedQuizes();
  })
  .then(function (numCommented) { // número de preguntas con comentario
    statistics.commentedQuizes = numCommented;
  })
  .catch( function(err){ errors.push(err); })
  .finally(function () {
    next();
  });

};

// GET /quizes/statistics
exports.show = function (req, res) {
  res.render('/quizes/statistics', { statistics: statistics, errors: errors });
};