const express = require("express")


//omportar o cors para permetir requisições de outros dominios
const cors = require("cors")

//importar o modulo de arquivos node
const fs = require("fs")

//importar ultilidades para trabalhar com o caminho de arquivos
const path = require("path")

// importar o arquivo JSON que contem as raças e fotos
const cachorros = require("./data/dogs.json")
const status = require("statuses")

//criar aplicação express 
const app = express()

//definir a porta onde vai rodar
const PORT = 3000;

//habilitar o uso de cors na aplicação
app.use(cors())


//===============================================================================
//Servir arquivos estaicos
//===============================================================================

//aqui estamos dizendo para o express
//Tudo que esta na pasta data fotos pode ser acessado pela URL  /fotos

app.use(
    "/fotos",
    express.static(
        path.join(__dirname, "data/fotos")
        //caminho real da pasta do server
    )
)

//=========================
//Função auxiliar

//recebe um array e retorna um numero aleatorio dele
function sortear(array){
    //gera um numero aleatorio entre 0 e  o tamanho do array
    const i = Math.floor(Math.random() * array.length)
    //Math.random() gera um numero aleatorio entre0 e 1 
    //array.lenght pega o tamanho do array(5 items)
    //Math.floor arredonda o numero p baixo


    //retorna o item sorteado
    return array[i]
}


//=============================
//Rotas api
//=============================




//1- cachorro aleatorio
//http://localhost:3000/api/cachorros/aleatorio

app.get("/api/cachorros/aleatorio", (req,res) => {
    //pegar todas as fotos de todas as raças 
    //Object.values pega valores do objeto
    //flat transformA tudo em um unico array
    const todasAsFotos = Object.values(cachorros).flat()

    //sortear foto aleatoria
    const item = sortear(todasAsFotos)

    res.json({
        //status da resposta
        status:"success",

        //URL da imagem sorteada 
        message: `http://localhost:${PORT}/fotos/${item}`
    })
})


//=========================================
//Por raça
//==========================================

//http://

app.get("/api/cachorros/:raca", (req, res) =>{

    //pega o parametro da url
    const raca  = req.params.raca.toLowerCase()

    //verifica se essa raça existe no JSON
    if(!cachorros[raca]){
        res.status(404).json({
            status:"error",

            message : `Raça "${raca}" não encontrada`
        })
        return
    }


    //sortear de apenas uma raça
    const item = sortear (cachorros[raca])

    res.json({
        status:"sucess",
        message:`http://localhost:${PORT}/fotos/${item}`
    })
})


//=============================================
//rota 2 
//=============================================

app.listen(PORT, () => {
    console.log(`🤠Servidor rodando em http://localhost:${PORT}`)
    console.log(`coloque as fotos manualmente em data/fotos/`)
})