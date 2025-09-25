/* *********************************************************************
* Objetivo: Arquivo de funções para gerenciar a API Whatsapp
* Data: 24/09/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

const MESSAGE_ERRO = {status: false, status_code: 500, development: 'Marcelo Vieira'}
const MESSAGE_OK = {status: true, status_code: 200, development: 'Marcelo Vieira'}

const dados = require('./contatos.js')

//listar todos os dados de todos os usuarios
const getAllData = () => {

    let message = {MESSAGE_OK, Todos_os_Dados: []}

    dados.contatos['whats-users'].forEach(item => {
        message.Todos_os_Dados.push(item)
    })

        return message

}

//listar os dados de todos os perfis de usuarios
const getUserProfile = () => {

    let perfis = []

    dados.contatos['whats-users'].forEach(perfil => {
        perfis.push({
            Nome: perfil.account,
            Nick: perfil.nickname,
            Foto: perfil['profile-image'],
            Cor_de_Fundo: perfil.background,
            Numero: perfil.number,
            Inicio_Conta: perfil['created-since'].start,
            Encerramento_Conta: perfil['created-since'].end
        })
    })

    let message = {MESSAGE_OK, Informacoes_Perfis: perfis}

    return message

}

//listar todos os contatos de um usuario (filtrado pelo número)
const getUserContacts = (numeroUsuario) => {

    let dadosUsuario = dados.contatos['whats-users'].find(usuario => usuario.number == numeroUsuario)
    
    let dadosContatos = []
    
    dadosUsuario.contacts.forEach(contato => {
        dadosContatos.push({
            Nome: contato.name,
            Foto: contato.image,
            Descricao: contato.description,
            Numero: contato.number
        })
    })

    let message = {MESSAGE_OK, Usuario: dadosUsuario.account, Contatos: dadosContatos}

    return message

}

//listar todas as mensagens de um usuario (filtrado pelo número)
const getAllUserMessages = (numeroUsuario) => {}

//listar todas as mensagens de um usuario com um contato especifico (filtrado pelo número do usuario e número do contato)
const getUserChatWithContact = (numeroUsuario, numeroContato) => {}

//pesquisa de palavra chave com base em uma palavra nas conversas do usuário e do respectivo contato
const getSearchByKeyword = (palavraChave, numeroUsuario, numeroContato) => {}

// module.exports = {}
