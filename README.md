# API RESTful - WhatsApp

API RESTful desenvolvida com Node.JS e Express, que será utilizada para o projeto integrado (Fullstack) clone do WhatsApp

## Endpoints

Listar todos os dados de todos os usuarios: https://api-whatsapp-c9gd.onrender.com/v1/whatsapp/users/all-data  
Listar os dados de todos os perfis de usuarios: https://api-whatsapp-c9gd.onrender.com/v1/whatsapp/users/profiles  
Listar todos os contatos de um usuario (parâmetro: userNumber via query): https://api-whatsapp-c9gd.onrender.com/v1/whatsapp/user/contacts?userNumber=11966578996  
Listar todas as mensagens de um usuario (parâmetro: userNumber via query): https://api-whatsapp-c9gd.onrender.com/v1/whatsapp/user/messages?userNumber=11966578996  
Listar todas as mensagens de um usuario com um contato especifico (parâmetros: userNumber e contactNumber via query): https://api-whatsapp-c9gd.onrender.com/v1/whatsapp/user/chat?userNumber=11966578996&contactNumber=26999999910  
Pesquisa de mensagens com palavra-chave (parâmetros: keyword, userNumber e contactNumber via query): https://api-whatsapp-c9gd.onrender.com/v1/whatsapp/search/keyword?keyword=hello&userNumber=11966578996&contactNumber=26999999910  

## Tecnologias
* Node.JS
* Express

## Autor
[Marcelo Vieira](<https://www.linkedin.com/in/marcelovieirasilva/>)
