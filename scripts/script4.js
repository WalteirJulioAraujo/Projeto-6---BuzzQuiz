
// Variaveis Globais
let qtdPergunta = 0;
let qtdNivel = 0
// Referente aos dados finais
let dadosFinal = {
	title: "",
	image: "",
	questions: "",
    levels: ""
}
let questoes = [];
let niveis = [];
//

function criarQuizz(){
    qtdPergunta = document.getElementById("qtdPergunta-quizz").value;
    qtdNivel = document.getElementById("qtdNiveis-quizz").value;

    dadosFinal.title = document.getElementById("titulo-quizz").value;
    dadosFinal.image = document.getElementById("url-quizz").value;

    const telaComeco = document.querySelector(".tela3 .comeco");
    const telaCriePerguntas = document.querySelector(".tela3 .crie-perguntas");
    telaComeco.classList.add("escondido");
    telaCriePerguntas.classList.remove("escondido");

    popularCriePerguntas(qtdPergunta);
}

function criarNiveis(){
    let vetorPergunta = {};
    for(let i = 0; i<qtdPergunta;i++){
        respostacorreta e url 
        resportaincorreta e url
        
    }




    const telaCriePerguntas = document.querySelector(".tela3 .crie-perguntas");
    const telaNiveis = document.querySelector(".tela3 .niveis");

    telaCriePerguntas.classList.add("escondido");
    telaNiveis.classList.remove("escondido");
}

function quizzPronto(){
    const telaNiveis = document.querySelector(".tela3 .niveis");
    const telaQuizzConcluido = document.querySelector(".tela3 .quizz-concluido")

    telaNiveis.classList.add("escondido");
    telaQuizzConcluido.classList.remove("escondido");
}

function popularCriePerguntas(qtdPergunta){
    const divCriePerguntas = document.querySelector(".tela3 .crie-perguntas");
    for(let i = 0; i < qtdPergunta ; i++) {
        divCriePerguntas.innerHTML += `
        <div class="campo-branco">
            <div class="pergunta pergunta${i+1}">
                <div class="subtitulo">Pergunta ${i+1}</div>
                <input type="text" placeholder="Texto da pergunta">
                <input type="text" placeholder="Cor de fundo da pergunta">
            </div>
            <div class="resposta-correta">
                <div class="subtitulo">Resposta Correta</div>
                <input type="text" placeholder="Resposta correta">
                <input type="text" placeholder="URL da imagem">
            </div>
            <div class="resposta-incorreta">
                <div class="subtitulo">Resposta Incorreta</div>
                <input type="text" placeholder="Resposta incorreta 1">
                <input type="text" placeholder="URL da imagem 1">
                <input type="text" placeholder="Resposta incorreta 2">
                <input type="text" placeholder="URL da imagem 2">
                <input type="text" placeholder="Resposta incorreta 3">
                <input type="text" placeholder="URL da imagem 3">
            </div>
        
        </div>`;
    }

    divCriePerguntas.innerHTML += `
        <div class="botao" onclick="criarNiveis()">
            Prosseguir pra criar niveis
        </div>
    `;
}