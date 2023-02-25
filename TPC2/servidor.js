var http = require('http');
var url = require('url');
var fs = require('fs')

var myServer = http.createServer(function (req,res)
{
    // console.log(req.method + " " + req.url + " " + meta.myDateTIme())
    
    var pedido = url.parse(req.url, true).pathname;
    var pint = Number(pedido.substring(2));

    if (!pedido.startsWith("/c") || isNaN(pint) || pint > 100 || pint < 0)
    {
        pedido = "/index";
    } 

    fs.readFile('data/' + pedido.substring(1) + '.html', function(err,data){
        res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
        
        if (err)
        {
            res.write("Erro: na leitura do ficheiro :: " +  err);
        }
        else {
            res.write(data)
        }

        res.end();
        
    })

})

myServer.listen(7777);
console.log("Servidor à escuta na porta 7777...");