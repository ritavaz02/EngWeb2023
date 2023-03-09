var http = require('http');
var axios = require('axios');
var url = require('url');
var mypages = require('./mypages')
var fs = require('fs')

http.createServer(function (req,res)
{
    var d = new Date().toISOString().substring(0,16)
    console.log(req.method + "" + req.url + "" + d)
    
    if(req.url == '/')
    {
        axios.get("http://localhost:3000/pessoas")
            .then(function(resp){
                var pessoas = resp.data
                res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
                res.end(mypages.indexPage())
            }) 

            // correu mal -> função anónima
            .catch(err => {
                console.log("Erro: " + err);
                res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
                res.end('<p> Erro na obtenção dos dados' +  req.url + '<p>')
            })
        }
    else if(req.url == '/pessoas')
    {
        axios.get("http://localhost:3000/pessoas")
            .then(function(resp){
                var pessoas = resp.data
                res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
                res.end(mypages.genMainPage(pessoas,d," About people ..."))
            }) 

            // correu mal -> função anónima
            .catch(err => {
                console.log("Erro: " + err);
                res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
                res.end('<p> Erro na obtenção dos dados' +  req.url + '<p>')
            })
        }
    else if (req.url == '/pessoasOrdenadas')
    {
        axios.get("http://localhost:3000/pessoas?_sort=name")
            .then(function(resp){
                var pessoas = resp.data
                res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
                res.end(mypages.genMainPage(pessoas,d, " About people ..."))
            }) 

            // correu mal -> função anónima
            .catch(err => {
                console.log("Erro: " + err);
                res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
                res.end('<p> Erro na obtenção dos dados' +  req.url + '<p>')
            })
        }
    else if(req.url.match(/[a-zA-Z]*w3\.css/))
    {
        fs.readFile("w3.css", function(err, dados){
            if(err){
                res.writeHead(404, {'Content-type': 'text/html; charset=utf-8'});
                res.end('<p> Erro na leitura do ficheiro' +  err + '<p>')
            }
            else{
                res.writeHead(200, {'Content-type': 'text/css'});
                res.end(dados)
            }
        })
    }
    else if(req.url.match(/\/pessoas\/p\d+$/))
    {
        axios.get('http://localhost:3000/pessoas/' + req.url.substring(9) )
        .then(function(resp){
            var pessoa = resp.data
            res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
            res.end(mypages.genPersonPage(pessoa,d))
        }) 

        // correu mal -> função anónima
        .catch(err => {
            console.log("Erro: " + err);
            res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
            res.end('<p> Erro na obtenção dos dados' +  req.url + '<p>')
        })
    }
    else if(req.url.match(/\/pessoas\/(distribuicao|top10)\/[a-zA-Z]+s\/[a-zA-Z]+$/))
    {
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            let urlParts = req.url.split("/")
            var pessoas = resp.data
            res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
            if(req.url.includes("top10"))
                res.end(mypages.genDistOptionsXPage(pessoas,d,urlParts[3],urlParts[4],0))
            else res.end(mypages.genDistOptionsXPage(pessoas,d,urlParts[3],urlParts[4],1))
        }) 

        // correu mal -> função anónima
        .catch(err => {
            console.log("Erro: " + err);
            res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
            res.end('<p> Erro na obtenção dos dados' +  req.url + '<p>')
        })
    }
    else if(req.url.match(/\/pessoas\/(distribuicao|top10)\/[a-zA-Z]+s$/))
    {
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data
            res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
            if(req.url.includes("top10"))
                res.end(mypages.genDistOptionsPage(pessoas,d,req.url.substring(15),0))
            else
                res.end(mypages.genDistOptionsPage(pessoas,d,req.url.substring(22),1))
        }) 

        // correu mal -> função anónima
        .catch(err => {
            console.log("Erro: " + err);
            res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
            res.end('<p> Erro na obtenção dos dados' +  req.url + '<p>')
        })
    }
    else if(req.url.match(/\/pessoas\/(distribuicao|top10)\/[a-zA-Z]+\/[a-zA-Z]+$/))
    {
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            let urlParts = req.url.split("/")
            var pessoas = resp.data
            res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
            if(req.url.includes("top10"))
                res.end(mypages.genDistOptionXPage(pessoas,d,urlParts[3],urlParts[4],0))
            else
                res.end(mypages.genDistOptionXPage(pessoas,d,urlParts[3],urlParts[4],1))
        }) 

        // correu mal -> função anónima
        .catch(err => {
            console.log("Erro: " + err);
            res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
            res.end('<p> Erro na obtenção dos dados' +  req.url + '<p>')
        })
    }
    else if(req.url.match(/\/pessoas\/(distribuicao|top10)\/[a-zA-Z]+$/))
    {
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data
            res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
            if(req.url.includes("top10"))
                res.end(mypages.genDistOptionPage(pessoas,d,req.url.substring(15),0))
            else
                res.end(mypages.genDistOptionPage(pessoas,d,req.url.substring(22),1))
        }) 

        // correu mal -> função anónima
        .catch(err => {
            console.log("Erro: " + err);
            res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
            res.end('<p> Erro na obtenção dos dados' +  req.url + '<p>')
        })
    }
    else if(req.url.match(/\/pessoas\/(distribuicao|top10)\/[a-zA-Z_]+\/[a-zA-Z]+/))
    {
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            let urlParts = req.url.split("/")
            var pessoas = resp.data
            res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});

            if(req.url.includes("top10"))
            {
                if(urlParts[4].includes("marca_carro"))
                    res.end(mypages.genDistOptionsXPage(pessoas,d,urlParts[3],urlParts[4],0))
                else
                    res.end(mypages.genDistOptionsXPage(pessoas,d,urlParts[3],urlParts[4],0))
            }
            else
            {
                if(urlParts[4].includes("marca_carro"))
                    res.end(mypages.genDistOptionsXPage(pessoas,d,urlParts[3],urlParts[4],1))
                else
                    res.end(mypages.genDistOptionsXPage(pessoas,d,urlParts[3],urlParts[4],1))
            }
        }) 

        // correu mal -> função anónima
        .catch(err => {
            console.log("Erro: " + err);
            res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
            res.end('<p> Erro na obtenção dos dados' +  req.url + '<p>')
        })
    }
    else if(req.url.match(/\/pessoas\/(distribuicao|top10)\/[a-zA-Z_]+$/))
    {
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data
            res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
            
            if(req.url.includes("top10"))
            {
                if(req.url.substring(15).includes("marca_carro"))
                    res.end(mypages.genDistOptionPage(pessoas,d,req.url.substring(15),0))
                else
                    res.end(mypages.genDistOptionsPage(pessoas,d,req.url.substring(15),0))
            }

            else
            {
                if(req.url.substring(22).includes("marca_carro"))
                    res.end(mypages.genDistOptionPage(pessoas,d,req.url.substring(22),1))
                else
                    res.end(mypages.genDistOptionsPage(pessoas,d,req.url.substring(22),1))
            }
        }) 

        // correu mal -> função anónima
        .catch(err => {
            console.log("Erro: " + err);
            res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
            res.end('<p> Erro na obtenção dos dados' +  req.url + '<p>')
        })
    }
    else if(req.url.match(/\/pessoas\/distribuicao$/))
    {
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data
            res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
            res.end(mypages.indexDistribuicoes())
        }) 

        // correu mal -> função anónima
        .catch(err => {
            console.log("Erro: " + err);
            res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
            res.end('<p> Erro na obtenção dos dados' +  req.url + '<p>')
        })
    }
    else if(req.url.match(/\/pessoas\/top10/))
    {
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data
            res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
            res.end(mypages.indexTop10())
        }) 

        // correu mal -> função anónima
        .catch(err => {
            console.log("Erro: " + err);
            res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
            res.end('<p> Erro na obtenção dos dados' +  req.url + '<p>')
        })
    }
    else{
        res.writeHead(404, {'Content-type': 'text/html; charset=utf-8'});
        res.end('<p> Operação não suportada' +  req.url + '<p>')
    }

}).listen(7777);


console.log("Servidor à escuta na porta 7777...");