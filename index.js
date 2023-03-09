const express = require("express")
const uuid = require("uuid")

const port = 3000
const app = express()
app.use(express.json())

const users = [] //Uma array teste só para testar códigos
//Middleware => Interceptador: poder de parar ou alterar dados da requisição
const checkUserId = (request, response,next)=>{
    const {id} = request.params //Pegar o id para atualizar no params
    const index = users.findIndex(user => user.id === id) //Encontrar o usuário no array, pode usar FILTER
    if(index <0){
        return response.status(404).json({message: "User not found"})
    }
    request.userIndex = index //Alterando dados
    request.userId = id
    next() //Seguir para a função
}

//GET
app.get("/users", (request, response) => {
    return response.json(users)
})

app.listen(port, () => {
    console.log(`Running in http://localhost:${port} 👍`)
})

//POST
app.post("/users", (request, response) => {
    const {name, age} = request.body
    const user = {id:uuid.v4(), name, age}
    users.push(user)

    return response.status(201).json(users)
})

//PUT
app.put("/users/:id", checkUserId, (request, response) => {
    const {name,age} = request.body //Pegar os dados que quer atualizar
    const index = request.userIndex
    const id = request.userId
    const updatedUser = {id, name, age} // Criar user atualizado
        
    users[index] = updatedUser

    return response.json(users)
})

//DELETE
app.delete("/users/:id", checkUserId, (request, response) => {
    const index = request.userIndex
    
    users.splice(index,1)
    return response.status(204).json()
})

