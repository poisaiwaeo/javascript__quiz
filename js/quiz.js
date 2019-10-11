
//select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("score");


//create our question
let question = [

    {
        question: "What does HTML stand for?",
        imgSrc: "images/html.png",
        choiceA: "Correct",
        choiceB: "Wrong",
        choiceC: "Wrong",
        correct: "A"
    },
    {
        question: "What does Css stand for?",
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
    /*
    {
        question: "Her skal spørgsmålet være?",
        imgSrc: "et-billede-som-matcher-spørgsmålet.png",
        choiceA: "Wrong",
        choiceB: "Wrong",
        choiceC: "Correct",
        correct: "C"
    }*/
];



//create some variables
const lastQuestion = question.length - 1;
let runningQuestion = 0;let count = 0;
const questionTime = 10; //10s
const gaugeWidth = 150; //150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;



//render a question
function renderQuestion() {

    let q = question [runningQuestion];
    question.innerHTML = "<p>"+ q.q +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}


start.addEventListener("click", startQuiz)

//start quiz
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval (renderCounter, 1000); //1000ms = 1s
}



// render progess
function renderProgress(){

    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++)
    {
        progress.innerHTML += "<div class='prog' id="+ qIndex +"> </div>";
    }
}



// counter render
function renderCounter(){

    if (count <= questionTime) 
    {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }
    else
    {
        count = 0;
        //change progress color to red
        answerIsWrong();
        if (runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }
        else 
        {
            //end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}


//checkAnswser 
function checkAwser(answer){
    
    if(answer == question [runningQuestion].correct)
    {
        //answer is correct
        score++
        //change progress color to green
        answerIsCorrect();
    }
    else 
    {
        //answer is wrong
         //change progress color to red
         answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }
    else{
        //end the quiz and show score 
        clearInterval(TIMER);
        scoreRender();
    }
}

//answer is correct
function answerIsCorrect(){

    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

//answer is wrong
function answerIsWrong(){

    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

//score render
function scoreRender(){
    scoreDiv.style.display = "block";

    //
}