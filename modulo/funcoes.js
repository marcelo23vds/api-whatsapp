/* *********************************************************************
* Objetivo: Arquivo de funções para gerenciar a API Whatsapp
* Data: 24/09/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

const MESSAGE_ERRO = {status: false, status_code: 500, development: 'Marcelo Vieira'}
const MESSAGE_OK = {status: true, status_code: 200, development: 'Marcelo Vieira'}

const dados = require('./contatos.js')

//As duas funções abaixo são de apoio para as funções da API

//função que captura os dados do USUARIO de acordo com o numero de telefone dele
const getUserData = (numeroUsuario) => {
    let dadosUsuario = dados.contatos['whats-users'].find(usuario => usuario.number == numeroUsuario)
    return dadosUsuario
}
//função que captura os dados de um CONTATO de acordo com o numero de telefone do usuario e do contato
const getContactData = (numeroUsuario, numeroContato) => {
    let dadosContato = getUserData(numeroUsuario).contacts.find(contato => contato.number == numeroContato)
    return dadosContato
}

//Funcionalidades da API

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

    let dadosUsuario = getUserData(numeroUsuario)
    
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
const getAllUserMessages = (numeroUsuario) => {

    let dadosUsuario = getUserData(numeroUsuario)
    
    let dadosMensagens = []
    
    dadosUsuario.contacts.forEach(contato => {
        dadosMensagens.push(contato.messages)
    })

    let message = {MESSAGE_OK, Usuario: dadosUsuario.account, Mensagens: dadosMensagens}

    return message

}

//listar todas as mensagens de um usuario com um contato especifico (filtrado pelo número do usuario e número do contato)
const getUserChatWithContact = (numeroUsuario, numeroContato) => {

    let dadosUsuario = getUserData(numeroUsuario)
    let dadosContato = getContactData(numeroUsuario, numeroContato)

    let perfilContato = {Nome: dadosContato.name, Numero: dadosContato.number}

    let message = {MESSAGE_OK, Usuario: dadosUsuario.account, Contato: perfilContato, Mensagens: dadosContato.messages}

    return message

}

//pesquisa de palavra chave com base em uma palavra nas conversas do usuário e do respectivo contato
const getSearchByKeyword = (palavraChave, numeroUsuario, numeroContato) => {

    let dadosUsuario = getUserData(numeroUsuario)
    let dadosContato = getContactData(numeroUsuario, numeroContato)

    let resultadoBusca = dadosContato.messages.filter(mensagem => mensagem.content.toLowerCase().includes(palavraChave.toLowerCase()))

    let perfilContato = {Nome: dadosContato.name, Numero: dadosContato.number}

    let message = {MESSAGE_OK, Usuario: dadosUsuario.account, Contato: perfilContato, Resultado_da_Busca: resultadoBusca}

    return message
}

// module.exports = {}
