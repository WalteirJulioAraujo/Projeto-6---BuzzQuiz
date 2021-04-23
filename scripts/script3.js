// Variaveis globais
let qtdPerguntas = 0;
let dados ={};
let respostas =[];
let opcao ={};
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
    
    //Vamos modificar os dados a serem enviados, formatando pro jeito final
    dados.title = tituloQuizz;
    dados.image = imgQuizz;
}

// Função roda quando clica no botao da tela 3.2

function criarNiveis(){
    //Localizando os inputs necessarios p/ as validaçoes
    //validando as informações da página

    //if(textoPergunta.length<20 || checarCorFundo(corFundo) || checarCamposVazios(qtdPerguntas) ){
    //    alert("As informações enviadas não são validas!");
   //     return;
    //

    // A página já esta populada, basta fazermos aparecer
    // Identificar as telas para ganharem ou perderem o escondido

    const telaCriePerguntas = document.querySelector(".tela3 .crie-perguntas");
    const telaNiveis = document.querySelector(".tela3 .niveis");

    // Coloco o escondido nessa tela 3.2 e removo o escondido da tela 3.3

    //telaCriePerguntas.classList.add("escondido");
    //telaNiveis.classList.remove("escondido");

    //Vamos modificar os dados a serem enviados, formatando pro jeito final
    for(let i=1;i<(qtdPerguntas+1);i++) {
        const textoPergunta = document.getElementById(`input-textoPergunta${i}`);
        const corFundo = document.getElementById(`input-corFundo${i}`);
        const respostaCorreta = document.getElementById(`input-respostaCorreta${i}`);
        const divRespostasIncorretas = document.querySelector(`.alternativa-incorreta${i}`);
        const respostasIncorretas = divRespostasIncorretas.querySelectorAll(".input-respostaIncorreta");
        
        const textoPerguntaValor = textoPergunta.value;
        const corFundoValor = corFundo.value;
        const respostaCorretaValor = respostaCorreta.value;
        console.log(textoPerguntaValor);
        const vetor = [{
            text: respostaCorretaValor ,
            image: "https://http.cat/411.jpg",
            isCorrectAnswer: true
        }];
        for(let i =0; i <  (respostasIncorretas.length) ; i+=2){

            const respostaIncorreta ={text: respostasIncorretas[i].value,
            image: respostasIncorretas[i+1].value,
            isCorrectAnswer: false}

            vetor.push(respostaIncorreta)
        }

        const dadosFinal = {
			title: textoPerguntaValor,
			color: corFundoValor,
			answers: vetor
        }
        respostas.push(dadosFinal);
    }
    
}

// Função roda quando clica no botao da tela 3.3

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
            <div class="campos">
                <div class="extra">
                    <span>Pergunta ${i+2}</span>
                    <ion-icon name="create" onclick="abrirPergunta(this)"></ion-icon>
                </div>

            

                <div class="pergunta-completa escondido">
                    <div class="perguntas">
                        <span>Pergunta ${i+2}</span>
                        <input type="text" placeholder="Texto da pergunta" id="input-textoPergunta${i+2}">
                        <input type="text" placeholder="Cor de fundo da pergunta" id="input-corFundo${i+2}">
                    </div>
                            
                    <div class="resposta-correta${i+2}">
                        <span>Resposta correta</span>
                        <input type="text" placeholder="Resposta correta" id="input-respostaCorreta${i+2}">
                        <input type="text" placeholder="Url da imagem">
                    </div>

                    <div class="resposta-incorreta">
                        <span>Resposta incorreta</span>
                        <div class="alternativa-incorreta${i+2}">
                            <input type="text" placeholder="Resposta incorreta " class="input-respostaIncorreta">
                            <input type="text" placeholder="URL da imagem " class="input-respostaIncorreta">
                            <input type="text" placeholder="Resposta incorreta " class="input-respostaIncorreta">
                            <input type="text" placeholder="URL da imagem " class="input-respostaIncorreta">
                            <input type="text" placeholder="Resposta incorreta " class="input-respstaIncorreta">
                            <input type="text" placeholder="URL da imagem" class="input-respostaIncoorreta">
                        </div>
                    </div>
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
            <div class="campos">
                <div class="extra">
                    <span>Nível ${i+2}</span>
                    <ion-icon name="create" onclick="abrirPergunta(this)"></ion-icon>
                </div>

                <div class="nivel escondido">
                    <div class="titulo-input">
                        <span>Nível ${i+2}</span>
                    </div>
                    <input type="text" placeholder="Título do nível">
                    <input type="text" placeholder="% de acerto mínimo">
                    <input type="text" placeholder="URL da imagem do nível">
                    <input type="text" placeholder="Descrição do nível">
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

// Tbm funciona para abrir o nivel
function abrirPergunta(elemento) {
    elemento = elemento.parentNode.parentNode
    const fecharConteudo = elemento.querySelector(".extra");
    const abrirConteudo = elemento.querySelector(".escondido");

    fecharConteudo.classList.add("escondido");
    abrirConteudo.classList.remove("escondido");

}   


//Funçoes de validação

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










