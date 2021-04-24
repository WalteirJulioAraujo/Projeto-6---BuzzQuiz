
let idQuizz = 0;

requererQuizz();
// Pegando os quizzes no servidor
function requererQuizz(){
    const requerimento = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes');
    requerimento.then(popularQuizz);
}

//Popular usando a resposta do requerimento

function popularQuizz(resposta) {
    const dados = resposta.data;
    let quizzes = document.querySelector('.todosQuiz');
    let meusQuizzes = document.querySelector('.seusQuiz');
    quizzes.innerHTML = "";
    meusQuizzes.innerHTML = "";

    for(let i =0; i< dados.length ; i++){
        if(listaDosMeusQuizzes.length == 0){
            const caixaCriar = document.querySelector(".caixa-criar-quizz");
            const tituloPrimeiro = document.querySelector(".primeiro");
            tituloPrimeiro.classList.add("escondido");
            caixaCriar.classList.remove('escondido');
            meusQuizzes.classList.add('escondido');
        }else{
            const caixaCriar = document.querySelector(".caixa-criar-quizz");
            const tituloPrimeiro = document.querySelector(".primeiro");
            tituloPrimeiro.classList.remove("escondido");
            caixaCriar.classList.add('escondido');
            meusQuizzes.classList.remove('escondido');
        }
        if(listaDosMeusQuizzes.includes(dados[i].id)){
            meusQuizzes.innerHTML+=`
            <div class="quiz" onclick="selecionarQuizz(this)">
                <img src="${dados[i].image}" class="${dados[i].id}">
                <div class="texto">${dados[i].title}</div>
            </div>
            `
        }else {
            quizzes.innerHTML += `
            <div class="quiz" onclick="selecionarQuizz(this)">
                <img src="${dados[i].image}" class="${dados[i].id}">
                <div class="texto">${dados[i].title}</div>
            </div>
         `
        }
        ;
    }   
}

function selecionarQuizz(elemento) {
    const imgQuizz = elemento.querySelector("img");
    idQuizz = imgQuizz.getAttribute("class");
    
    const tela1 = document.querySelector(".tela1");
    const tela2 = document.querySelector(".tela2");
    
    tela1.classList.add("escondido");
    tela2.classList.remove("escondido");

    quizzSelecionado()
    window.scrollTo(0,0);
}

