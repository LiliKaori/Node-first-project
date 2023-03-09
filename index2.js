const express = require("express") //Pegar dados do express
const port = 3000

const app = express() //Simplicar qndo usar a função

//Verbos HTTP
    //GET - Leitura (só receber informação)
    //POST - Criação (receber e guardar informação)
    //PUT - Atualização
    //DELETE - Deetar
    //PATCH - Atualização parcial
//Parâmetros
    // Query params => meusite.com/users?nome=rodolfo&age=28 FILTROS
    // Route params => /users/2 BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÌFICO
    // Body params => /users

//Nodemon "npm run dev"

app.get("/users", (request, response) => {
    const name = request.query.name
    const age = request.query.age
    //*MESMA COISA QUE: const {name, age} = request.query //Destructuring assignment

    return response.json({name, age})

    //*MESMA COISA QUE: return response.json({name: name, age: age}) SÓ SE CHAVE E VALOR SÂO IGUAIS
}) //Rota 

app.listen(port, () =>{
    console.log(`Running in http://localhost:${port}`)
}) //Avisar qual porta vai rodar