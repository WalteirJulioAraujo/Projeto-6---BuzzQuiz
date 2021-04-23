
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
    quizzes.innerHTML = "";

    for(let i =0; i< dados.length ; i++){
        quizzes.innerHTML += `
            <div class="quiz" onclick="selecionarQuizz(this)">
                <img src="${dados[i].image}" class="${dados[i].id}">
                <div class="texto">${dados[i].title}</div>
            </div>
         `
        ;
    }   
}

function selecionarQuizz(elemento) {
    const imgQuizz = elemento.querySelector("img");
    idQuizz = imgQuizz.getAttribute("class");
    console.log(idQuizz);

    const tela1 = document.querySelector(".tela1");
    const tela2 = document.querySelector(".tela2");
    
    tela1.classList.add("escondido");
    tela2.classList.remove("escondido");

    quizzSelecionado()
    window.scrollTo(0,0);

}