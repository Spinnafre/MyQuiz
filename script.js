const AnswerButtonContainer = document.querySelector("#answer-buttons");
const buttonStart = document.querySelector(".start-btn");
const ButtonNext = document.querySelector(".next-btn");
const questionContainer = document.querySelector("#question-container");
const questionTitle = document.querySelector("#question");
const pointsCounter = document.querySelector(".points");
const TotalQuestion = document.querySelector(".TotalQuestions");
const resultContainer = document.querySelector(".resultContainer");
const result = document.querySelector("#resultPoints");
const resultStatus = document.querySelector("#resultStatus");
const selectedButton=document.querySelector('.selectedButton')
const img = document.getElementsByTagName("img")[0];

let questionContent, choose, questionIndex, points, QuestionLength, resultTotal;
buttonStart.addEventListener("click", startGame);
// Quando clicar irá para a próxima questão
ButtonNext.addEventListener("click", () => {
  questionIndex++;
  choose = 1;
  // Selecionar outras perguntas
  nextQuestion();
});

function startGame() {
  buttonStart.classList.add("hide");
  questionContent = questoes.sort(() => Math.random() - .2);
  QuestionLength = questionContent.length;
  TotalQuestion.innerText = QuestionLength;
  questionIndex = 0;
  choose = 1;
  points = 0;
  resultTotal = 0;
  questionContainer.classList.remove("hide");
  nextQuestion();
}
// resetar as cores e deletar os botões
function ResetAll() {
  //
  ButtonNext.classList.add("hide");
  resultContainer.classList.add("hide");
  selectedButton.classList.add('hide')

  // Tirar todos os botões
  while (AnswerButtonContainer.firstChild) {
    AnswerButtonContainer.removeChild(AnswerButtonContainer.firstChild);
  }
}

function clearWrongOrCorrect(element) {
  element.classList.remove("wrong");
  element.classList.remove("correct");
}
function nextQuestion() {
  ResetAll();
  ShowQuestion(questionContent[questionIndex]);
}
function ShowQuestion(question) {
  questionTitle.innerText = question.question;
  // Crio os botões de acordo com a quantidade de
  // respostas
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add("btn");
    button.innerHTML = answer.text;
    // Se tiver a propriedade correct e ela for verdadeira,
    // irá adicionála ao button
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    if(choose==1){
      button.addEventListener("click", selectAnswer);

    }else{
      return
    }

    AnswerButtonContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  // Pego o meu botão
  const buttonSelect = event.target;
  // Pego o valor da resposta
  const correctAnswer = buttonSelect.dataset.correct;
  
  // Mudar a cor do background de acordo com as respostas
  // escolhidas
  if (correctAnswer && choose===1) {
    points+=choose;
    choose=0
    selectedButton.textContent=`Sua resposta: ${buttonSelect.textContent}`
  }else if(choose===1 && !correctAnswer){
    choose=0
    selectedButton.textContent=`Sua resposta: ${buttonSelect.textContent}`
  }
  pointsCounter.innerText = points;


  // Percorro todos os filho da div answer-buttons e
  // Para cada um dos elementos eu chamo a função que irá
  // Adicionar ou remover o estilo dependendo da resposta
  Array.from(AnswerButtonContainer.children).map((button) =>
    CorrectOrWrong(button, button.dataset.correct)
  );

  // SE O ÍNDICE QUE É INCREMENTADO COM O CLIQUE DO
  // MOUSE FOR MENOR DO QUE A QUANTIDADE DE PERGUNTAS
  if (questionContent.length >= questionIndex + 1) {
    selectedButton.classList.remove('hide')
  }
  if (questionContent.length > questionIndex + 1) {
    // MOSTRAR O BOTÃO NEXT
    ButtonNext.classList.remove("hide");
    
  }
  // SE TERMINAR ENTÃO IRÁ APARECER O BOTÃO RECOMEÇAR
  else {
    resultTotal = (points / QuestionLength) * 100;
    result.innerText = `${resultTotal}%`;

    resultContainer.classList.remove("hide");

    buttonStart.innerText = "RECOMEÇAR";
    // choose=false
    buttonStart.classList.remove("hide");

    if (resultTotal > 60) {
      resultStatus.innerText = "Você consegiur passar no exame";
      img.src = "./imgs/sucess.png";
    } else {
      resultStatus.innerText = "Você não conseguiu chegar lá";
      img.src = "./imgs/notSucess.png";
    }
  }
}
function CorrectOrWrong(element, correct) {
  clearWrongOrCorrect(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}
const questoes = [
  {
    question: "10*2?",
    answers: [
      { text: "20",correct: true },
      { text: "50", correct: false },
      { text: "21", correct: false },
      { text: "19", correct: false },
    ],
  },
  {
    question: "10+10=?",
    answers: [
      { text: "20",correct: true },
      { text: "50", correct: false },
      { text: "21", correct: false },
      { text: "19", correct: false },
    ],
  },
  {
    question: "4 * 2?",
    answers: [
      { text: "6", correct: false },
      { text: "8", correct: true },
    ],
  },
  {
    question: "20 * 2?",
    answers: [
      { text: "40", correct: true },
      { text: "80", correct: false },
    ],
  },
];
