const mongoose = require('mongoose')

// var moradaSchema = new mongoose.Schema({
//     cidade: String,
//     distrito: String
// })

// var partidoPoliticoSchema = new mongoose.Schema({
//     party_abbr: String,
//     party_name: String
// })

// var atributosSchema = new mongoose.Schema({
//     fumador: Boolean,
//     gosta_cinema: Boolean,
//     gosta_viajar: Boolean,
//     acorda_cedo: Boolean,
//     gosta_ler: Boolean,
//     gosta_musica: Boolean,
//     gosta_comer: Boolean,
//     gosta_animais_estimacao: Boolean,
//     gosta_dancar: Boolean,
//     comida_favorita: String,
// })

// var personSchema = new mongoose.Schema({
//     nome: String,
//     idade: Number,
//     sexo: String,
//     morada: moradaSchema,
//     BI: String,
//     profissao: String,
//     partido_politico: partidoPoliticoSchema,
//     religiao: String,
//     desportos: [String],
//     animais: [String],
//     figura_publica_pt: [String],
//     marca_carro: String,
//     destinos_favoritos: [String],
//     atributos: atributosSchema,
//     _id: String
// })

var personSchema = new mongoose.Schema({
        nome: String,
        idade: Number,
        morada: {
            type: Map,
            of: String
        },
        BI: String,
        CC: String,
        profissao: String,
        partido_politico: {
            type: Map,
            of: String
        },
        religiao: String,
        desportos: [String],
        animais: [String],
        figura_publica_pt: [String],
        marca_carro: String,
        destinos_favoritos: [String],
        atributos: {
            type: Map,
            of: String
        },
        _id: String
});

module.exports = mongoose.model('Person',personSchema)