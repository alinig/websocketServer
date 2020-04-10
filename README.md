# websocketServer

Instalar o server node.js
Startar com: node server.js

## Client

Copiar o arquivo index.html para um servidor separado.
Funções do client:

### Abrir Conexão: 
Se conecta ao Websocket (os outros comandos também abrem a conexão caso não esteja aberta, mas o Promise não está funcionando direito e quebra na primeira conexão, pois tenta enviar mensagem antes da conexão estar up)

### Iniciar Ping: 
Dispara um contador que fica enviando e recebendo mensagens do servidor. 

### Solicitar Transaction: 
Envia um objeto e recebe um objeto


