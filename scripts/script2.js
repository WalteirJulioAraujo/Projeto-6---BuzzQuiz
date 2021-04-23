
let numeroDeperguntas=0;
let comparador=0;
let acertos=0;
let dadosDoQuizz=[];
let salvarNivel=0;
const lista = [0, 1, 2, 3]

lista.sort(sorteador);
function sorteador() {
  return Math.random() - 0.5;
}


//const promessa = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes")
//promessa.then(verResposta);

//function verResposta(resposta) {
//  console.log(resposta.data)
//}

function quizzSelecionado(){
  const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes/${idQuizz}`)
  promise.then(checarResposta);
}

function checarResposta(resposta) {
  
  renderizarQuiz(resposta.data)
}

function renderizarQuiz(dados) {
  dadosDoQuizz=dados
  const tela2 = document.querySelector(".tela2");
  
  numeroDeperguntas=dados.questions.length
  tela2.innerHTML = `
  <div class="banner ">
  <img src="${dados.image}">
  <p>${dados.title}</p>
</div>
  `;
  
  for (let i = 0; i < dados.questions.length; i++) {
    tela2.innerHTML += `
    <div class="caixa-de-perguntas"id="${i}">

    <div class="pergunta-quizz" style="background-color:${dados.questions[i].color};" >
        <p >${dados.questions[i].title}</p>
    </div>
    <div class="caixa-respostas ${i}" >
    <div class="resposta ${dados.questions[i].answers[lista[0]].isCorrectAnswer}" onclick="responder(this)">
        <img src="${dados.questions[i].answers[lista[0]].image}" alt="gato">
        <p>${dados.questions[i].answers[lista[0]].text}</p>
    </div>
    <div class="resposta ${dados.questions[i].answers[lista[1]].isCorrectAnswer}" onclick="responder(this)">
        <img src="${dados.questions[i].answers[lista[1]].image}" alt="gato">
        <p >${dados.questions[i].answers[lista[1]].text}</p>
    </div>
    <div class="resposta ${dados.questions[i].answers[lista[2]].isCorrectAnswer}" onclick="responder(this)">
        <img src="${dados.questions[i].answers[lista[2]].image}" alt="gato">
        <p>${dados.questions[i].answers[lista[2]].text}</p>
    </div>
    <div class="resposta ${dados.questions[i].answers[lista[3]].isCorrectAnswer}" onclick="responder(this)">
        <img src="${dados.questions[i].answers[lista[3]].image}" alt="gato">
        <p>${dados.questions[i].answers[lista[3]].text}</p>
    </div>
</div>
    </div>`
  }
  tela2.innerHTML += `
  <div class="telafinal escondido">

</div>
`
}
// atribui um selecionado
//atribuir opaco a todos que não tiverem a classe selecionado

function responder(elemento) {
  const pai = elemento.parentNode;
  
  let proxima=pai.parentNode.getAttribute('id')
  const respostas = pai.querySelectorAll(".resposta")
  proxima=parseInt(proxima)+1
  const odin=pai.querySelector(".selecionado");
  if(odin!==null){ return}
  elemento.classList.add("selecionado")
  
  comparador++
  for (let i = 0; i < respostas.length; i++) {


    if (respostas[i].classList.contains("selecionado")) {
      verdeOuVermelho(respostas[i])
      if(respostas[i].classList.contains('verde')){
        acertos++
      }
    } else {
      respostas[i].classList.add("opaco")
      verdeOuVermelho(respostas[i])
    }
    
  }  

  const elementoQueQueroQueApareca = document.getElementById(proxima);
  setTimeout(irPraProxima,2000)
  function irPraProxima(){elementoQueQueroQueApareca.scrollIntoView();}
  const finalDaTela=document.querySelector(".telafinal")
  
  if(comparador==numeroDeperguntas){
    
    let porcentagem=acertos/numeroDeperguntas*100
    porcentagem=Math.round(porcentagem)
    for(let i=0;i<dadosDoQuizz.levels.length;i++){
      if(porcentagem>dadosDoQuizz.levels[i].minValue){
        salvarNivel=i
      }
    }
    finalDaTela.classList.remove('escondido')
    finalDaTela.innerHTML=  `
    <div class="final " >
    <div class="acertos">
        <p>${porcentagem}% ${dadosDoQuizz.levels[salvarNivel].title}</p>
    </div>
  
    <div class="caixa-meme-e-texto">
        <img src="${dadosDoQuizz.levels[salvarNivel].image}">
        <p>${dadosDoQuizz.levels[salvarNivel].text}</p>
    </div>
  </div>
  <div class="botoes-finais ">
    <button class="reinicio" onclick="reiniciar()"> Reiniciar Quizz</button>
    <p class="volta" onclick="home()">Voltar pra home</p>
  </div>
  `
  setTimeout(irProFinal,2000)
  function irProFinal(){finalDaTela.scrollIntoView();}
  }
}
function verdeOuVermelho(resposta) {
  if (resposta.classList.contains("false")) {
    resposta.classList.add('vermelho')
  } else {
    resposta.classList.add('verde')
  }

}
function reiniciar(){
  quizzSelecionado()
  window.scrollTo(0,0);
}
function home(){
  requererQuizz();
  const tela2 = document.querySelector(".tela2");
  const tela1 = document.querySelector(".tela1");
  tela2.classList.add('escondido');
  tela1.classList.remove('escondido')
  window.scrollTo(0,0);
}