//select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");


//create our questions
let questions = [

    {
        question: "What does HTML stand for?",
        imgSrc: "images/html.png",
        choiceA: "Correct",
        choiceB: "Wrong",
        choiceC: "Wrong",
        correct: "A"
    },
    {
        question: "What does css stand for?",
        imgSrc: "images/css.png",
        choiceA: "Wrong",
        choiceB: "Correct",
        choiceC: "Wrong",
        correct: "B"
    },
    {
        question: "What does JS stand for?",
        imgSrc: "images/js.png",
        choiceA: "Wrong",
        choiceB: "Wrong",
        choiceC: "Correct",
        correct: "C"
    }
];



//create some variables
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; //10s
const gaugeWidth = 150; //150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;


//render a question
function renderQuestion() {

    let q = questions[runningQuestion];
    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}



// render progress
function renderProgress() {

    for (let qIndex = 0; qIndex <= lastQuestion;
        qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

start.addEventListener("click", startQuiz);


// start quiz
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); //1000ms = 1s
}



// counter render

function renderCounter() {

    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }
    //nustille farver på svare til spørgsmål
    else {
        count = 0;
        //change progess color to red
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        }
        else {
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}


// checkAnwser

function checkAnswer(answer) {

    if (answer == questions[runningQuestion].correct) {
        //answer is correct
        score++;
        //change progess color to green
        answerIsCorrect();
    }
    else {
        //answer is wrong
        //change progess color to red
        answerIsWrong();
    }
    //Når man klikker en af button, så man kommer videre til næste spørgsmål. 
    count = 0; //tiden bliver nustille når man kommer videre næste spørgsmål 
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    }
    else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}


//anser is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

//anser is wrong
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}


// score render
function scoreRender() {
    scoreDiv.style.display = "block";

    //calculate the amount of question percent anwered by the user 
    const scorePerCent = Math.round(100 * score / questions.length);

    //choose to the image based on the scorePerCent 
    let img = (scorePerCent >= 80) ? "images/5.png" :
              (scorePerCent >= 60) ? "images/4.png" : 
              (scorePerCent >= 40) ? "images/3.png" : 
              (scorePerCent >= 20) ? "images/2.png" : 
              "images/1.png";

    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"</p>";
}