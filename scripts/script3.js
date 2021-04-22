// Variaveis globais
let qtdPerguntas = 0;

// Função roda quando clica no botao da tela 3.1

function criarQuizz(){
    // Armazenando os dados inseridos na tela 3.1

    const tituloQuizz = document.getElementById("input-titulo").value;
    const imgQuizz = document.getElementById("input-imgUrl").value;
    qtdPerguntas = document.getElementById("input-qtdPergunta").value;
    const qtdNiveis = document.getElementById("input-qtdNiveis").value;
    
    // Verificando informações
    if((tituloQuizz.lenght < 2) || (tituloQuizz.lenght > 65) || (qtdPerguntas < 3) || (qtdNiveis < 2)){
        alert("As informações enviadas não são validas!");
        return;
    }
    

    // Identificar as telas para ganharem ou perderem o escondido

    const telaComeco = document.querySelector(".tela3 .comeco");
    const telaCriePerguntas = document.querySelector(".tela3 .crie-perguntas");

    // Coloco o escondido nessa tela 3.1 e removo o escondido da tela 3.2
    telaComeco.classList.add("escondido");
    telaCriePerguntas.classList.remove("escondido");

    // Rodar a função que vai popular minha tela 3.2
    popularCriePerguntas(qtdPerguntas);
    popularNiveis(qtdNiveis);
}

// Função roda quando clica no botao da tela 3.2

function criarNiveis(){
    //Localizando os inputs necessarios p/ as validaçoes
    const textoPergunta = document.getElementById("input-textoPergunta");
    const corFundo = document.getElementById("input-corFundo");
    //validando as informações da página
    if(textoPergunta.length<20 || checarCorFundo(corFundo) || checarCamposVazios(qtdPerguntas) ){

    }


    // A página já esta populada, basta fazermos aparecer
    // Identificar as telas para ganharem ou perderem o escondido

    const telaCriePerguntas = document.querySelector(".tela3 .crie-perguntas");
    const telaNiveis = document.querySelector(".tela3 .niveis");

    // Coloco o escondido nessa tela 3.2 e removo o escondido da tela 3.3

    telaCriePerguntas.classList.add("escondido");
    telaNiveis.classList.remove("escondido");
}

// Função roda quando clica no botao da tela 3.2

function quizzPronto(){
    // Identificar as telas para ganharem ou perderem o escondido

    const telaNiveis = document.querySelector(".tela3 .niveis");
    const telaQuizzConcluido = document.querySelector(".tela3 .quizz-concluido")

    // Coloco o escondido nessa tela 3.2 e removo o escondido da tela 3.3

    telaNiveis.classList.add("escondido");
    telaQuizzConcluido.classList.remove("escondido")
}

// Popula minha tela 3.2
function popularCriePerguntas(qtdPerguntas){

    const camposExtra = (qtdPerguntas - 1) ;
    const telaCriePerguntas = document.querySelector(".tela3 .crie-perguntas");

    for(let i = 0; i < camposExtra ; i++) {
        telaCriePerguntas.innerHTML += `    
            <div class="campos" onclick="abrirPergunta()">
                <div class="extra">
                    <span>Pergunta ${i+2}</span>
                    <ion-icon name="create"></ion-icon>
                </div>
            </div>
            `
        ;  
    }

    telaCriePerguntas.innerHTML += `
        <div class="botao" onclick="criarNiveis()">
            Prosseguir pra criar niveis
        </div>
        `
    ;
}

// Popula minha tela 3.3
function popularNiveis(qtdNiveis){
    const camposExtra = (qtdNiveis - 1) ;
    const telaNiveis = document.querySelector(".tela3 .niveis");

    for(let i = 0; i < camposExtra ; i++) {
        telaNiveis.innerHTML += `    
            <div class="campos" onclick="abrirNivel()">
                <div class="extra">
                    <span>Nível ${i+2}</span>
                    <ion-icon name="create"></ion-icon>
                </div>
            </div>
            `
        ;
    }

    telaNiveis.innerHTML += `
        <div class="botao" onclick="quizzPronto()">
            Finalizar Quizz
        </div>
        `
    ;
}

// Checa se a cor de fundo esta no formato valido

function checarCorFundo(elemento){
    if(elemento.lenght !== 7){
        return false;
    }
    if(elemento[0] !== "#"){
        return false;
    }

    for(let i = 1; i<elemento.length;i++){
        if(elemento[i].matches("[A-F]*") || elemento[i].matches("[a-f]*")){
            return true;
        }else{
            return false;
        }
    }

}

// Checa se todos os campos não estao vazios

function checarCamposVazios(qtdPergunta){
    const inputRespostaCorreta = document.getElementById("input-respostaCorreta");
    if(inputRespostaCorreta === ""){
        return false;
    }
    for(let i = 0;i < (qtdPergunta - 1);i++) {
        const inputRespostaIncorreta = document.getElementById(`input-respostaIncorreta${i}`);
        if(inputRespostaIncorreta === ""){
            return false;
        }else{
            return true;
        }
    }

}










