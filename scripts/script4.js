let idDoQuizzCriado=0;
// Variaveis Globais
let qtdPergunta = 0;
let qtdNivel = 0
// Referente aos dados finais
let dadosFinal = {
	title: 0,
	image: 0,
	questions: 0,
    levels: 0
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
    popularCrieNiveis(qtdNivel);
}

function criarNiveis(){
    let vetorPergunta = {title: "",color: "",answers:""};
    
    for(let i = 0; i < qtdPergunta;i++){
        let vetorPergunta = {title: "",color: "",answers:""};
        let divPergunta = document.querySelectorAll(`.campoPergunta${i+1} input`);
        console.log(divPergunta);
        vetorPergunta.title = divPergunta[0].value;
        vetorPergunta.color = divPergunta[1].value;

       
        
        let listaQuestoes = [];

        for(let i = 2 ; i < divPergunta.length ; i+=2){
            let vetorResposta = {text: "",image: "",isCorrectAnswer: ""};
            if(i===2){
                vetorResposta.text = divPergunta[i].value;
                vetorResposta.image = divPergunta[i+1].value; 
                vetorResposta.isCorrectAnswer = true;
                listaQuestoes.push(vetorResposta);
            } else {
                vetorResposta.text = divPergunta[i].value;
                vetorResposta.image = divPergunta[i+1].value; 
                vetorResposta.isCorrectAnswer = false;
                listaQuestoes.push(vetorResposta);
            }
        }

        vetorPergunta.answers = listaQuestoes;
        questoes.push(vetorPergunta);
    }
    dadosFinal.questions = questoes;
    console.log(dadosFinal);
    const telaCriePerguntas = document.querySelector(".tela3 .crie-perguntas");
    const telaNiveis = document.querySelector(".tela3 .niveis");

    telaCriePerguntas.classList.add("escondido");
    telaNiveis.classList.remove("escondido");

}

function quizzPronto(){
    for(let i = 0; i < qtdNivel ; i++){
        const divNivel = document.querySelectorAll(`.campoNivel${i+1} input`);
        let vetorNivel = {title: "",image:"",text:"",minValue:""};

        vetorNivel.title = divNivel[0].value;
        vetorNivel.image = divNivel[2].value;
        vetorNivel.text = divNivel[3].value;
        vetorNivel.minValue = Number(divNivel[1].value);

        niveis.push(vetorNivel);
    }
    dadosFinal.levels = niveis;

    const telaNiveis = document.querySelector(".tela3 .niveis");
    const telaQuizzConcluido = document.querySelector(".tela3 .quizz-concluido");
    const imgQuizzConcluido = document.querySelector(".tela3 .quizz-concluido img");
    const textoQuizzConcluido = document.querySelector(".quizz-concluido .texto-quizzConcluido")

    imgQuizzConcluido.setAttribute("src",dadosFinal.image);
    textoQuizzConcluido.innerHTML = dadosFinal.title;

    telaNiveis.classList.add("escondido");
    telaQuizzConcluido.classList.remove("escondido");
    console.log(dadosFinal);
    enviarQuizz();
}

function popularCriePerguntas(qtdPergunta){
    const divCriePerguntas = document.querySelector(".tela3 .crie-perguntas");
    for(let i = 0; i < qtdPergunta ; i++) {
        divCriePerguntas.innerHTML += `
        <div class="campo-branco campoPergunta${i+1}">
            <div class="pergunta">
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


function popularCrieNiveis(qtdNivel){
    const divCrieNiveis = document.querySelector(".tela3 .niveis");
    for(let i = 0; i < qtdNivel ; i++) {
        divCrieNiveis.innerHTML += `
            <div class="campo-branco campoNivel${i+1}">
                <div class="subtitulo">Nível ${i+1}</div>
                <input type="text" placeholder="Título do nível">
                <input type="text" placeholder="% de acerto mínima">
                <input type="text" placeholder="URL da imagem do nível">
                <input type="text" placeholder="Descrição do nível">
            </div>
        `;
    }
    
    divCrieNiveis.innerHTML += `
        <div class="botao" onclick="quizzPronto()">
            Finalizar Quizz
        </div>
    `;
}

function enviarQuizz(){
    const requerimento = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes",dadosFinal);
    requerimento.then(sucesso);
    requerimento.catch(erro);
}

function sucesso(resposta){
    console.log("deu certo")
    console.log(resposta.data)
    idQuizz=resposta.data.id
    
}

function erro(resposta){
    console.log("Deu erro")
    console.log(resposta.response)
}

function entrarNoQuizz(){
    const tela3 = document.querySelector(".tela3");
    const tela2 = document.querySelector(".tela2");
    
    tela3.classList.add("escondido");
    tela2.classList.remove("escondido");
    quizzSelecionado()
}