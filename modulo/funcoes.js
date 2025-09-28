/* *********************************************************************
* Objetivo: Arquivo de funções para gerenciar a API Whatsapp
* Data: 24/09/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

const MESSAGE_ERRO = {status: false, status_code: 500, development: 'Marcelo Vieira'}

const dados = require('./contatos.js')


/*funções de apoio*/

//função que captura os dados do USUARIO de acordo com o numero de telefone dele
const getUserData = (numeroUsuario) => {
    //varrendo o arquivo para encontrar o numero de usuario compativel com o parametro recebido
    let dadosUsuario = dados.contatos['whats-users'].find(usuario => usuario.number == numeroUsuario)
    //retornar os dados do usuario
    return dadosUsuario
}

//função que captura os dados de um CONTATO de acordo com o numero de telefone do usuario e do contato
const getContactData = (numeroUsuario, numeroContato) => {
    //chamando a função que encontra o usuario, e dentro dos contatos deste usuario: buscar o numero compativel com o parametro
    let dadosContato = getUserData(numeroUsuario).contacts.find(contato => contato.number == numeroContato)
    //retornar os dados do contato
    return dadosContato
}


/*funções principais (funcionalidades da API)*/

//listar todos os dados de todos os usuarios
const getAllData = () => {

    try {

        //formatação da mensagem de retorno desta funcionalidade
        let message = {status: true, status_code: 200, development: 'Marcelo Vieira', Todos_os_Dados: []}

        //varrendo o arquivo e exibindo todos os dados
        dados.contatos['whats-users'].forEach(item => {
            message.Todos_os_Dados.push(item)
        })

        return message

    } catch{

        return MESSAGE_ERRO
    }
}

//listar os dados de todos os perfis de usuarios
const getAllUsersProfile = () => {

    try {

        //armazenar as informações de perfis que serão buscadas no arquivo
        let perfis = []

        //varrer o arquivo e enviar as informações selecionadas para a variavel perfis
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

        //formatação da mensagem de retorno desta funcionalidade
        let message = {status: true, status_code: 200, development: 'Marcelo Vieira', Informacoes_Perfis: perfis}
        return message
        
    } catch {
        return MESSAGE_ERRO
    }
}

//listar todos os contatos de um usuario (filtrado pelo número)
const getAllUserContacts = (numeroUsuario) => {

    try {

        //armazenando os dados do usuario filtrado pelo numero(parametro)
        let dadosUsuario = getUserData(numeroUsuario)
        
        //armazenar as informações que serão buscadas sobre os contatos do usuario
        let dadosContatos = []
        
        //varrer o arquivo e enviar para dadosContatos as informações selecionadas
        dadosUsuario.contacts.forEach(contato => {
            dadosContatos.push({
                Nome: contato.name,
                Foto: contato.image,
                Descricao: contato.description,
                Numero: contato.number
            })
        })

        //formatação da mensagem de retorno desta funcionalidade
        let message = {status: true, status_code: 200, development: 'Marcelo Vieira', Usuario: dadosUsuario.account, Contatos: dadosContatos}
        return message

    } catch {
        return MESSAGE_ERRO
    }
}

//listar todas as mensagens de um usuario (filtrado pelo número)
const getAllUserMessages = (numeroUsuario) => {

    try {

        //armazenando os dados do usuario filtrado pelo numero(parametro)
        let dadosUsuario = getUserData(numeroUsuario)
    
        //armazenar dados de todas as mensagens do usuario, que serão buscados no arquivo
        let dadosMensagens = []

        //varrendo todas as mensagens do usuario e enviando para dadosMensagens
        dadosUsuario.contacts.forEach(contato => {
            dadosMensagens.push(contato.messages)
        })

        //formatação da mensagem de retorno desta funcionalidade
        let message = {status: true, status_code: 200, development: 'Marcelo Vieira', Usuario: dadosUsuario.account, Mensagens: dadosMensagens}
        return message

    } catch {
        return MESSAGE_ERRO
    }

}

//listar todas as mensagens de um usuario com um contato especifico (filtrado pelo número do usuario e número do contato)
const getUserChatWithContact = (numeroUsuario, numeroContato) => {

    try{

        //armazenando os dados do usuario filtrado pelo numeroUsuario(parametro)
        let dadosUsuario = getUserData(numeroUsuario)
        //armazenando os dados do contato filtrado pelo numeroContato(parametro)
        let dadosContato = getContactData(numeroUsuario, numeroContato)

        //armazenando as informações de perfil do contato
        let perfilContato = {Nome: dadosContato.name, Numero: dadosContato.number}

        //formatação da mensagem de retorno desta funcionalidade
        let message = {status: true, status_code: 200, development: 'Marcelo Vieira', Usuario: dadosUsuario.account, Contato: perfilContato, Mensagens: dadosContato.messages}

        return message

    } catch{
        return MESSAGE_ERRO
    }

}

//pesquisa de palavra chave com base em uma palavra nas conversas do usuário e do respectivo contato
const getSearchByKeyword = (palavraChave, numeroUsuario, numeroContato) => {

    try{

        //armazenando os dados do usuario filtrado pelo numeroUsuario(parametro)
        let dadosUsuario = getUserData(numeroUsuario)
        //armazenando os dados do contato filtrado pelo numeroContato(parametro)
        let dadosContato = getContactData(numeroUsuario, numeroContato)

        //armazenando as mensagens que possuam a palavraChave, utilizando filter para selecionar TODAS as ocorrencias da mesma palavra em um chat
        //.includes vai verificar o mensagem.content e retornar caso encontre uma ocorrencia da palavraChave
        //utilizando toLowerCase() para transformar todas as letras em minusculas assim como o parametro passado, para a função não ser Case Sensitive
        let resultadoBusca = dadosContato.messages.filter(mensagem => mensagem.content.toLowerCase().includes(palavraChave.toLowerCase()))

        //armazenando as informações de perfil do contato
        let perfilContato = {Nome: dadosContato.name, Numero: dadosContato.number}

        //formatação da mensagem de retorno desta funcionalidade
        let message = {status: true, status_code: 200, development: 'Marcelo Vieira', Usuario: dadosUsuario.account, Contato: perfilContato, Resultado_da_Busca: resultadoBusca}

        return message

    } catch{
        return MESSAGE_ERRO
    }
}

module.exports = {
    getAllData,
    getAllUsersProfile,
    getAllUserContacts,
    getAllUserMessages,
    getUserChatWithContact,
    getSearchByKeyword
}
