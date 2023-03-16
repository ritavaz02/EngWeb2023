
var http = require('http')
var axios = require('axios')
var templates = require('./templates')
var static = require('./static.js')
const { parse } = require('querystring');



// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}


// Server creation
var tasksServer = http.createServer(function (req, res) {
    
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{ 
        switch(req.method){
            case "GET": 
                // GET /tasks --------------------------------------------------------------------
                if((req.url == "/") || (req.url == "/tasks")){
                    axios.get("http://localhost:3000/tasks")
                        .then(response => {
                            var tasks = response.data
                            // Render page with the student's list
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.tasksListPage(tasks, d, ""))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Error getting tasks... \n Error: " + erro)
                            res.end()
                        })
                }
                else if(/\/tasks\/edit\/[0-9]+$/i.test(req.url)){
                    var idTask = req.url.split("/")[3]
                    // Get aluno record
                    axios.get('http://localhost:3000/tasks/' + idTask)
                        .then(function(resp){
                            var task = resp.data
                            axios.get("http://localhost:3000/tasks")
                                .then(response => {
                                    var tasks = response.data
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write(templates.tasksListPage(tasks, d, task))
                                    res.end()
                                })
                                .catch(function(erro){
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Error getting tasks... \n Error: " + erro)
                                    res.end()
                                })
                        })
                        .catch(erro => {
                            console.log("Erro: " + erro)
                            res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.errorPage("Unable to collect record: " + idTask, d))
                        })
                }
                else if(/\/tasks\/done\/[0-9]+$/i.test(req.url)){
                    console.log(req.url)
                    var idTask = req.url.split("/")[3]
                    console.log("HERE")
                    axios.get('http://localhost:3000/tasks/' + idTask)
                        .then(function(resp){
                            var task = resp.data
                            task.done="1"
                            console.log(task)
                            axios.put('http://localhost:3000/tasks/' + idTask, task)
                                .then(resp => {
                                    console.log(resp.data);
                                    res.writeHead(302, { 'Content-Type': 'text/html;charset=utf-8', 'Location': '/' });
                                    res.end()
                                })
                                .catch(error => {
                                    res.writeHead(201, { 'Content-Type': 'text/html;charset=utf-8' })
                                    res.write("<p>Unable to update task record..</p>")
                                    res.end()
                                })
                        })
                        .catch(erro => {
                            console.log("Erro: " + erro)
                            res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.errorPage("Unable to collect record: " + idTask, d))
                        })
                }
                else if(/\/tasks\/registo\/$/i.test(req.url)){
                    console.log("REGISTO")
                    console.log(req.url)
                    collectRequestBodyData(req, result => {
                        if(result){
                            result.done = "0"
                            axios.get('http://localhost:3000/tasks/')
                                .then(function(resp){
                                    var tasks = resp.data
                                    result.id = tasks.lenght
                                    console.log("RESULT")
                                    console.log(result)
                                  
                                    axios.put('http://localhost:3000/tasks/' + result.id, result)
                                        .then(resp => {
                                            console.log(resp.data);
                                            res.writeHead(302, { 'Content-Type': 'text/html;charset=utf-8', 'Location': '/' });
                                            res.end()
                                        })
                                        .catch(error => {
                                            res.writeHead(201, { 'Content-Type': 'text/html;charset=utf-8' })
                                            res.write("<p>Unable to update task record..</p>")
                                            res.end()
                                        })
                                })
                                .catch(erro => {
                                    console.log("Erro: " + erro)
                                    res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.end(templates.errorPage("Unable to collect record: " + idTask, d))
                                })
                            
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }
                break
            case "POST":
                if(/\/tasks\/edit\/[0-9]+$/i.test(req.url)){
                    var idTask = req.url.split("/")[3]
                    collectRequestBodyData(req, result => {
                        if(result){
                            result.done = "0"
                            axios.get('http://localhost:3000/tasks/' + idTask)
                                .then(function(resp){
                                    var task = resp.data
                                    if(result.who === undefined)
                                        result.who = task.who
                                    if(result.deadline === undefined)
                                        result.deadline = task.deadline
                                    if(result.description === undefined)
                                        result.description = task.description
                                    result.id = idTask
                                    console.log("RESULT")
                                    console.log(result)
                                  
                                    axios.put('http://localhost:3000/tasks/' + idTask, result)
                                        .then(resp => {
                                            console.log(resp.data);
                                            res.writeHead(302, { 'Content-Type': 'text/html;charset=utf-8', 'Location': '/' });
                                            res.end()
                                        })
                                        .catch(error => {
                                            res.writeHead(201, { 'Content-Type': 'text/html;charset=utf-8' })
                                            res.write("<p>Unable to update task record..</p>")
                                            res.end()
                                        })
                                })
                                .catch(erro => {
                                    console.log("Erro: " + erro)
                                    res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.end(templates.errorPage("Unable to collect record: " + idTask, d))
                                })
                            
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }
                else if(/\/$/i.test(req.url)){
                    console.log("REGISTO")
                    console.log(req.url)
                    
                    collectRequestBodyData(req, result => {
                        console.log(result)
                        if(result){
                            axios.get('http://localhost:3000/tasks/')
                                .then(function(resp){
                                    var tasks = resp.data
                                    result.id = tasks.length + 1
                                    result.done = "0"
                                    console.log("RESULT")
                                    console.log(result)
                                  
                                    axios.post('http://localhost:3000/tasks', result)
                                        .then(resp => {
                                            console.log(resp.data);
                                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                            // res.write(studentFormPage(d))
                                            res.end('<p>Registo inserido:' + JSON.stringify(resp.data)  + '</p>')
                                        })
                                        .catch(error => {
                                            console.log('Erro: ' + error);
                                            res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.write("<p>Unable to insert record...</p>")
                                            res.end()
                                        });
                                })
                                .catch(erro => {
                                    console.log("Erro: " + erro)
                                    res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.end(templates.errorPage("Unable to collect record: " + idTask, d))
                                })
                            
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    })
                    // collectRequestBodyData(req, result => {
                    //     if(result){
                    //         result.done = "0"
                    //         axios.get('http://localhost:3000/tasks/')
                    //             .then(function(resp){
                    //                 var tasks = resp.data
                    //                 result.id = tasks.lenght
                    //                 console.log("RESULT")
                    //                 console.log(result)
                                  
                    //                 axios.put('http://localhost:3000/tasks/' + result.id, result)
                    //                     .then(resp => {
                    //                         console.log(resp.data);
                    //                         res.writeHead(302, { 'Content-Type': 'text/html;charset=utf-8', 'Location': '/' });
                    //                         res.end()
                    //                     })
                    //                     .catch(error => {
                    //                         res.writeHead(201, { 'Content-Type': 'text/html;charset=utf-8' })
                    //                         res.write("<p>Unable to update task record..</p>")
                    //                         res.end()
                    //                     })
                    //             })
                    //             .catch(erro => {
                    //                 console.log("Erro: " + erro)
                    //                 res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                    //                 res.end(templates.errorPage("Unable to collect record: " + idTask, d))
                    //             })
                            
                    //     }
                    //     else{
                    //         res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                    //         res.write("<p>Unable to collect data from body...</p>")
                    //         res.end()
                    //     }
                    // });
                }
                else{
                    console.log(req.url)
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write('<p>Unsupported POST request: ' + req.url + '</p>')
                    res.write('<p><a href="/">Return</a></p>')
                    res.end()
                }
                break
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }
    
})

tasksServer.listen(7777, ()=>{
    console.log("Server listining in port 7777...")
})