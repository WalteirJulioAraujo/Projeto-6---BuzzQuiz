// Pegando os quizzes no servidor

const requerimento = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes');
requerimento.then(popularQuizz);

//Popular usando a resposta do requerimento


function popularQuizz(resposta) {
    const dados = resposta.data;
    let quizzes = document.querySelector('.todosQuiz');
    quizzes.innerHTML = "";

    for(let i =0; i< dados.length ; i++){
        quizzes.innerHTML += `
            <div class="quiz">
                <img src="${dados[i].image}">
                <div class="texto">${dados[i].title}</div>
            </div>
         `
        ;
    }
}