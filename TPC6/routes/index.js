var express = require('express');
var router = express.Router();
var Person = require('../controllers/person')


router.get('/persons', function(req, res) {
  Person.list()
    .then( dados => res.status(200).json(dados))
    .catch( erro => res.status(520).json([{erro: erro, message: "Não consegui obter a lista de pessoas"}]))
});

router.get('/persons/:id', function(req, res) {
  Person.getPerson(req.params.id)
  .then( dados => res.status(200).json(dados))
  .catch( erro => res.status(521).json([{erro: erro, message: "Não consegui obter a informação da pessoa"}]))
});

router.post('/persons', function(req, res) {
  Person.addPerson(req.body)
  .then( dados => res.status(200).json(dados))
  .catch( erro => res.status(522).json([{erro: erro, message: "Não consegui inserir a informação da pessoa"}]))
});


router.put('/persons/:id', function(req, res) {
  Person.updatePerson(req.body)
  .then( dados => res.status(200).json(dados))
  .catch( erro => res.status(523).json([{erro: erro, message: "Não consegui alterar a informação da pessoa"}]))
});

router.delete('/persons/:id', function(req, res) {
  Person.deletePerson(req.params.id)
  .then( dados => res.status(200).json(dados))
  .catch( erro => res.status(524).json([{erro: erro, message: "Não consegui apagar a informação da pessoa"}]))
});

module.exports = router;
