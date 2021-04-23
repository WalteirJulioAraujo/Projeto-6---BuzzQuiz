
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
    popularCrieNiveis(qtdNivel);
}

function criarNiveis(){
    let vetorPergunta = {title: "",color: "",answers:""};
    let answers = []
    for(let i = 0; i < qtdPergunta;i++){
        const divPergunta = document.querySelectorAll(`.campoPergunta${i+1} input`);
        console.log(divPergunta);
        vetorPergunta.title = divPergunta[0].value;
        vetorPergunta.color = divPergunta[1].value;

        for(let i = 2; i < divPergunta.length ;i+=2){
            let vetorResposta = {text: "",image: "",isCorrectAnswers: ""};
            if(i===2){
                vetorResposta.text = divPergunta[i].value;
                vetorResposta.image = divPergunta[i+1].value; 
                vetorResposta.isCorrectAnswers = true;
            }else{
                vetorResposta.text = divPergunta[i].value;
                vetorResposta.image = divPergunta[i+1].value; 
                vetorResposta.isCorrectAnswers = false;
            }
            answers.push(vetorResposta)
        }
        vetorPergunta.answers = answers;
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
        vetorNivel.minValue = divNivel[1].value;

        niveis.push(vetorNivel);
    }
    dadosFinal.levels = niveis;

    const telaNiveis = document.querySelector(".tela3 .niveis");
    const telaQuizzConcluido = document.querySelector(".tela3 .quizz-concluido")

    telaNiveis.classList.add("escondido");
    telaQuizzConcluido.classList.remove("escondido");
    console.log(dadosFinal);
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
