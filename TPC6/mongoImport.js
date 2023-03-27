var axios = require('axios');

const dataJson = require('./dataset-extra1.json');
for (person in dataJson['pessoas']){
    axios.post('http://localhost:7777/persons', dataJson['pessoas'][person])
        .then(resp => {
        console.log(resp.data);  
        })
        .catch(error => {
            console.log('Erro: ' + error);
        }) 
}