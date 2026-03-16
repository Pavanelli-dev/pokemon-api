// =====================================
//   NOSSA API DE POKEMON
//   Feita com Node.js + Express

//   Agora as fotos NÃO são mais baixadas automaticamente.
//   Elas devem existir manualmente na pasta:

//   data/fotos/
// =====================================

//Importar o framework Express para criar o servidor
const express = require("express");
//Importar o CORS para permitir requisições de outros domínios (ex: front-end)
const cors = require("cors");
//importa o módulo de arquivos do Node
const fs = require("fs");
//importar utilidades para trabalhar com caminhos de arquivos
const path = require("path");
//importar o arquivo JSON que contém as raças e fotos
const pokemon = require("./data/poke.json");
//criar a aplicação Express
const app = express();
//definir a porta onde o servidor irá rodar
const PORT = 3000;
//habilitar o uso de CORs na aplicação
app.use(cors());

//===================================
//SERVIR ARQUIVOS ESTÁTICOS
//===================================

//Aqui estamos dizenso para o Express:
//"TUDOOOOOOOO que estiver na pasta data/fotos pode ser acessado pela URL /fotos"
app.use(
    "/fotos", //rota pública
    express.static(
        path.join(__dirname, "data/fotos") 
        //caminho real da pasta no servidor
    )
);

//===================================
// FUNÇÃO AUXILIAR
//===================================

//Função que recebe um array e retorna um item aleatório dele
function sortear(array) {
    //gerar um número aleatório entre 0 e o tamanho do array
    const i = Math.floor(Math.random() * array.length)
    //Math.random() gerar um número aleatório entre 0 e 1
    //array.length pega o tamanho do array (5 itens )
    //Math.floor arrendondar o numero para baixo

    //retorna o item sorteado
    return array[i];
}

//===================================
// ROTAS API
//===================================

//===================================
// ROTA 1 - Pokemon aleatório
//===================================

//http://localhost:3000/api/pokemon/aleatorio

app.get("/api/pokemon/aleatorio", (req, res) => {
    //pegar todas as fotos de todas as raças 
    // Object.values pega os valores do objeto
    // flat transforma tudo em um único array
    const todasAsFotos = Object.values(pokemon).flat();

    //sortear uma foto aleatória
    const item = sortear(todasAsFotos)
    //Responder para o cliente em formato JSON
    res.json({
        //status da resposta
        status: "sucess",
        //URL da imagem que foi sorteada
        message: `http://${req.get('host')}/fotos/${item}`
    });
});

//===================================
// ROTA 2 - Pokemon por tipo
//===================================
//http://localhost:3000/api/pokemon/fogo

app.get("/api/pokemon/:tipo", (req, res) => {

    //pega o parâmetro da URL (ex. fogo)
    const tipo = req.params.tipo.toLowerCase();

    //verifica se esse tipo existe no JSON
    if (!pokemon[tipo]){
        res.status(404).json({
            //status de erro
            status: "error",
            //mensagem explicando o problema
            message: `Tipo "${tipo}" não encontrada`
        });
        //encerra a execução da rota
        return;
    }
    //sortear uma foto do tipo solicitado
    const item = sortear(pokemon[tipo]);
    //retorna a resposta em JSON
    res.json({
        //status de sucesso
        status: "sucess",
        //URL da imagem sorteada
        message: `http://${req.get('host')}/fotos/${item}`
    });

});
//===================================
// INICIA O SERVIDOR
//===================================
//iniciar o servidor express
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor rodando em http://0.0.0.0:${PORT}`);
    console.log(`📂 Coloque as fotos manualmente em: data/fotos/`);	
    console.log("BUGADÃO")
    
})