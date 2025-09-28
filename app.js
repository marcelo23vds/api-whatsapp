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
app.use((request, response, next)=>{

    //servidor de origem da API
    response.header('Access-Control-Allow-Origin', '*') 
    //verbos permitidos na API
    response.header('Access-Control-Allow-Methods', 'GET') 
    //carrega as configurações no CORS da API (Cors é como se fosse um firewall da API)
    app.use(cors())
    //carregar os próximos endpoints
    next()
})