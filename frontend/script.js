/*
=====================================
  FRONT-END — consome nossa API local
=====================================

Este arquivo roda no navegador.
Ele faz requisições para nossa API Node.js
e mostra os dados na tela.
*/


// ==============================
// ELEMENTOS DO HTML
// ==============================

// pega o elemento <img id="pokemonImage">
// será usado para mostrar a foto do pokemon
const pokemonImage = document.getElementById("pokemonImage");

// pega o elemento que mostra o nome do tipo
const typeName = document.getElementById("typeName");

// botão que busca um pokemon aleatório
const randomBtn = document.getElementById("randomBtn");

// botão que busca pokemon por tipo
const searchBtn = document.getElementById("searchBtn");

// campo de texto onde o usuário digita o tipo
const typeInput = document.getElementById("typeInput");

// área onde fica a imagem do pokemon
// usamos querySelector porque é uma classe (.pokemon-area)
const pokemonArea = document.querySelector(".pokemon-area");


// ==============================
// URL DA NOSSA API
// ==============================

// endereço base da nossa API local
// localhost = computador do próprio usuário
// porta 3000 = onde o servidor Node está rodando
const API = "http://localhost:3000/api/pokemon";


// ==============================
// FUNÇÃO PRINCIPAL
// ==============================

// função assíncrona que busca um pokemon na API
// recebe uma URL como parâmetro
async function buscarPokemon(url) {

    // adiciona a classe "loading"
    // normalmente usada para mostrar animação de carregamento
    pokemonArea.classList.add("loading");

    try {

        // faz a requisição HTTP para a API
        const response = await fetch(url);

        // converte a resposta para JSON
        const data = await response.json();

        // mostra no console a resposta da API
        console.log("Resposta da API:", data);

        // verifica se a API retornou erro
        if (data.status === "error") {

            // mostra a mensagem de erro na tela
            typeName.textContent = data.message;

            // remove a imagem
            pokemonImage.src = "";

            // para a execução da função
            return;
        }

        // coloca a imagem do pokemon na tela
        // o src define qual imagem será exibida
        pokemonImage.src = data.message;

        // extrai o nome do tipo da URL da imagem
        // exemplo da URL:
        // http://localhost:3000/fotos/fogo/1.jpg

        // separa a URL em partes usando "/"
        const partes = data.message.split("/");

        // pega a posição 5 do array
        // que corresponde ao nome do tipo
        const tipo = partes[5];

        // coloca a primeira letra maiúscula
        // ex: fogo → Fogo
        typeName.textContent =
            tipo.charAt(0).toUpperCase() + tipo.slice(1);

    } catch (erro) {

        // caso o servidor esteja desligado
        // ou aconteça algum erro na requisição

        // mostra erro no console
        console.error(erro);

        // mostra mensagem na tela
        typeName.textContent =
            "⚠️ Servidor offline — rode: node server-prof.js";

        // remove a imagem
        pokemonImage.src = "";

    } finally {

        // remove a classe de carregamento
        // independentemente de erro ou sucesso
        pokemonArea.classList.remove("loading");

    }

}


// ==============================
// AÇÕES
// ==============================


// função que busca um pokemon aleatório
function pokemonAleatorio() {

    // chama a função principal
    // passando a rota /aleatorio da API
    buscarPokemon(`${API}/aleatorio`);
}


// função que busca pokemon por tipo
function buscarPorTipo() {

    // pega o texto digitado no input
    const tipo = typeInput.value.trim().toLowerCase();

    // verifica se o usuário digitou algo
    if (!tipo) {

        // se não digitou, mostra alerta
        alert("Digite um tipo!");

        // interrompe a função
        return;
    }

    // chama a API passando o tipo na URL
    // exemplo: /api/pokemon/fogo
    buscarPokemon(`${API}/${tipo}`);
}


// ==============================
// EVENTOS
// ==============================


// quando clicar no botão "Aleatório"
randomBtn.addEventListener("click", pokemonAleatorio);


// quando clicar no botão "Buscar"
searchBtn.addEventListener("click", buscarPorTipo);


// quando clicar na imagem do pokemon
// carrega outro pokemon aleatório
pokemonImage.addEventListener("click", pokemonAleatorio);


// quando o usuário apertar ENTER no input
typeInput.addEventListener("keypress", (event) => {

    // verifica se a tecla pressionada foi Enter
    if (event.key === "Enter") {

        // executa a busca por tipo
        buscarPorTipo();
    }

});


// ==============================
// CARREGA AO ABRIR A PÁGINA
// ==============================


// assim que a página abre
// já busca um pokemon aleatório
pokemonAleatorio();