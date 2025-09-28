/* *********************************************************************
* Objetivo: endPoints referentes a API Whatsapp
* Data: 24/09/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

//import das dependencias da API
const express = require('express') //responsavel pela API
const cors = require('cors') //responsavel pelas permissões da API

//import do arquivo de funções
const dados = require('./modulo/funcoes')

//retorna a porta do servidor atual ou colocamos uma porta local
const PORT = process.PORT || 8080

//criando uma instancia de uma classe do express
const app = express()

//configuração de permissões
app.use((request, response, next) => {

    //servidor de origem da API
    response.header('Access-Control-Allow-Origin', '*') 
    //verbos permitidos na API
    response.header('Access-Control-Allow-Methods', 'GET') 
    //carrega as configurações no CORS da API (Cors é como se fosse um firewall da API)
    app.use(cors())
    //carregar os próximos endpoints
    next()
})


//endPoints

//listar todos os dados de todos os usuarios
app.get('/v1/whatsapp/users/all-data', function(request, response){
    let usuarios = dados.getAllData()
    response.status(usuarios.status_code)
    response.json(usuarios)
})

//listar os dados de todos os perfis de usuarios
app.get('/v1/whatsapp/users/profiles', function(request, response){
    let usuarios = dados.getAllUsersProfile()
    response.status(usuarios.status_code)
    response.json(usuarios)
})

//listar todos os contatos de um usuario (filtrado pelo número)
app.get('/v1/whatsapp/user/contacts', function(request, response){
    let numeroUsuario = request.query.userNumber
    let usuario = dados.getAllUserContacts(numeroUsuario)
    response.status(usuario.status_code)
    response.json(usuario)
})

//listar todas as mensagens de um usuario (filtrado pelo número)
app.get('/v1/whatsapp/user/messages', function(request, response){
    let numeroUsuario = request.query.userNumber
    let usuario = dados.getAllUserMessages(numeroUsuario)
    response.status(usuario.status_code)
    response.json(usuario)
})

//listar todas as mensagens de um usuario com um contato especifico (filtrado pelo número do usuario e número do contato)
app.get('/v1/whatsapp/user/chat', function(request, response){
    
    let numeroUsuario = request.query.userNumber
    let numeroContato = request.query.contactNumber

    let usuario = dados.getUserChatWithContact(numeroUsuario, numeroContato)
    response.status(usuario.status_code)
    response.json(usuario)
})

//pesquisa de palavra chave com base em uma palavra nas conversas do usuário e do respectivo contato
app.get('/v1/whatsapp/search/keyword', function(request, response){
    
    let palavraChave  = request.query.keyword
    let numeroUsuario = request.query.userNumber
    let numeroContato = request.query.contactNumber

    let pesquisa = dados.getSearchByKeyword(palavraChave ,numeroUsuario, numeroContato)
    response.status(pesquisa.status_code)
    response.json(pesquisa)
})

//START na API
app.listen(PORT, () => {
    console.log('API aguardando requisições...')
})