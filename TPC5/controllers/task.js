var axios = require("axios")

// Task list
module.exports.list = () => {
    return axios.get('http://localhost:3000/tasks?_sort=nome')
        .then(resposta => {
            return resposta.data
        })
        .catch( erro =>{
            return erro
        })
}

// Get task
module.exports.getTask = id => {
    return axios.get('http://localhost:3000/tasks/' + id)
        .then(resposta => {
            return resposta.data
        })
        .catch( erro =>{
            return erro
        })
}

// Add tasks
module.exports.addTask = a => {
    return axios.post('http://localhost:3000/tasks', a)
        .then(resposta => {
            return resposta.data
        })
        .catch( erro =>{
            return erro
        })
}

// Update task
module.exports.updateTask = a => {
    return axios.put('http://localhost:3000/tasks/'+a.id, a)
        .then(resposta => {
            return resposta.data
        })
        .catch( erro =>{
            return erro
        })
}

// Delete task
module.exports.deleteTask = id => {
    return axios.delete('http://localhost:3000/tasks/' + id)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}