var Person = require('../models/person')


module.exports.list = () => {
    return Person.find()
        .then(resposta => {
            console.log(resposta)
            return resposta
        })
        .catch( erro =>{
            return erro
        })
}

module.exports.getPerson = id => {
    return Person.findOne({_id:id})
        .then(resposta => {
            return resposta
        })
        .catch( erro =>{
            return erro
        })
}

module.exports.addPerson = a => {
    return Person.create(a)
        .then(resposta => {
            return resposta
        })
        .catch( erro =>{
            return erro
        })
}

module.exports.updatePerson = a => {
    return Person.find({_id:a._id}, a)
        .then(resposta => {
            return resposta
        })
        .catch( erro =>{
            return erro
        })
}

module.exports.deletePerson = id => {
    return Person.find({_id:id._id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}