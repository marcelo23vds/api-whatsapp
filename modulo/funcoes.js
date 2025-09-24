/* *********************************************************************
* Objetivo: Arquivo de funções para gerenciar a API Whatsapp
* Data: 24/09/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

const MESSAGE_ERRO = {status: false, status_code: 500, development: 'Marcelo Vieira'}
const MESSAGE_OK = {status: true, status_code: 200, development: 'Marcelo Vieira'}

const dados = require('./contatos.js')

const getAllData = () => {

    let message = {MESSAGE_OK, Todos_os_Dados: []}

    dados.contatos['whats-users'].forEach(item => {
        message.Todos_os_Dados.push(item)
    })

    if(dados.contatos['whats-users'])
        return console.log(message)//CONSOLE LOG TEMPORARIO
    else
        return console.log(MESSAGE_ERRO)//CONSOLE LOG TEMPORARIO

}

getAllData()//TEMPORARIO PARA TESTE

const getDadosUsersProfile = () => {}

const getDadosUsers = () => {}

const getAllUserMessages = () => {}

const getChatUserWithContact = () => {}

const getSearchByKeyword = () => {}

// module.exports = {
//     getAllDados
// }
