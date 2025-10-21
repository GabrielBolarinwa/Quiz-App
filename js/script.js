const infoBox = document.getElementById("rules");
const quizBox = document.getElementById("quiz_box");
const timerText = document.getElementById("time");
const questions = document.querySelectorAll(".question");
const resultBox = document.getElementById("result");
const options = document.querySelectorAll(".option");
const indexNumber = document.getElementById("currentNumber");
const correctOptions = document.querySelectorAll(".correctOptions");
const checkboxes = document.querySelectorAll("input[type=radio]");
const scoreText = document.getElementById("score_text");
const resultIcon = document.getElementById("result-icon");
const questionCount = document.getElementById("totalCount");
const originalClasses = resultIcon.className;
const progressFill = document.getElementById("progress_fill");
const answerBreakdown = document.getElementById("answer_breakdown");
const feedBackText = document.getElementById("feedback_message");
const prevBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const buttons = document.getElementById("buttons");
let currentNumber = 1;
let totalCount = questions.length;
let secondsText;
let minutesText;
let count = 0;
let correctAnswers = 0;
let timerStart;
function displayRules() {
  infoBox.classList.add("display");
}
function hideRules() {
  infoBox.classList.remove("display");
}
function hideResult() {
  resultBox.classList.remove("showResult");
}
function showQuiz() {
  quizBox.classList.add("display");
  count = 0;
  currentNumber = 1;
  indexNumber.textContent = currentNumber;
  progressFill.style.width = "0";
  hideRules();
  initializeQuestionSwitch();
  hideResult();
  questionControl();
  updateProgressBar();
  correctAnswers = 0;
  resultIcon.className = originalClasses;
  resultIcon.innerHTML = "";
  questionCount.textContent = totalCount;
  deselectOptions();
  answerBreakdown.innerHTML = "";
  timerText.textContent = "03:00";
  let initialTime = new Date(100);
  let finalTime = new Date(180100);
  let timeDifference = finalTime - initialTime;
  console.log(correctAnswers);
  setTimeout(function () {
    timerStart = setInterval(() => {
      timeDifference = timeDifference - 1000;
      if (timeDifference <= 0) {
        clearInterval(timerStart);
        quizBox.classList.remove("display");
        showResult();
      } else {
        let seconds = Math.floor((timeDifference / 1000) % 60);
        let minutes = Math.floor(timeDifference / 1000 / 60);
        secondsText = seconds.toString().padStart(2, 0);
        minutesText = minutes.toString().padStart(2, 0);
        timerText.textContent = `${minutesText}:${secondsText}`;
      }
    }, 1000);
  }, 1000);
}

function initializeQuestionSwitch() {
  if (questions.length > 0) {
    questions[count].classList.add("displayQuestion");
  }
}

function questionControl() {
  if (count === totalCount) {
    clearInterval(timerStart);
    quizBox.classList.remove("display");
    showResult();
  }
  if (count === totalCount - 1) {
    nextBtn.textContent = " End Quiz";
    nextBtn.classList.replace("fa-chevron-right", "buttonEndMode");
  } else {
    nextBtn.textContent = "";
    nextBtn.classList.replace("buttonEndMode", "fa-chevron-right");
  }
  if (count === 1) {
    prevBtn.style.display = "initial";
  } else if (count === 0) {
    prevBtn.style.display = "none";
  }
  questions.forEach((question) => {
    question.classList.remove("displayQuestion");
  });
  try {
    questions[count].classList.add("displayQuestion");
    questions[count].classList.add("animate__slideInRight");
  } catch (e) {
    console.log(e);
  }
}

function deselectOptions() {
  checkboxes.forEach((radio) => {
    radio.checked = false;
  });
}

function previousQuestion() {
  console.log(correctAnswers);
  count--;
  currentNumber--;
  indexNumber.textContent = currentNumber;
  questionControl();
  updateProgressBar();
}

function nextQuestion() {
  console.log(correctAnswers);
  count++;
  currentNumber++;
  indexNumber.textContent = currentNumber;
  questionControl();
  updateProgressBar();
}
function compileResult() {
  const options = document.querySelectorAll(
    ".option input[type=radio]:checked"
  );
  console.log(correctAnswers);
  options.forEach((option) => {
    console.log(option);
    if (option && option.classList.contains("correctOption")) {
      correctAnswers++;
      console.log(correctAnswers);
    }
  });
}

function updateProgressBar() {
  let progressPercent = (currentNumber / totalCount) * 100;
  progressFill.style.width = `${progressPercent}%`;
}

function messageBox() {
 var msg = "",
  argNum = 0,
  startPos,
  endPos;
 var args = messageBox.arguments;
 var numArgs = args.length;

 if (numArgs) {
  var theStr = args[argNum++];

  if (numArgs === 1 || theStr === "") {
   msg = theStr;
  } else {

   startPos = 0;
   endPos = theStr.indexOf("%s", startPos);

   if (endPos === -1) {
    startPos = theStr.length;
   }

   while (startPos < theStr.length) {
    msg += theStr.substring(startPos, endPos);

    if (argNum < numArgs) {
     msg += args[argNum++];
    }

    startPos = endPos + 2;
    endPos = theStr.indexOf("%s", startPos);

    if (endPos === -1) {
     endPos = theStr.length;
    }
   }
   if (!msg) {
    msg = args[0];
   }
  }
 } 
 return(msg);
}

function showResult() {
  let feedback = "";
  compileResult();
  if (correctAnswers === 0) {
    resultIcon.classList.add("fa-exclamation");
    feedback = "A Poor Result! Keep practicing! You'll get better";
    feedBackText.style.color = "red";
  } else if (correctAnswers >= totalCount / 2 && correctAnswers < totalCount) {
    resultIcon.classList.add("fa-thumbs-up");
    feedback = "Good job! You're on the right track.";
    feedBackText.style.color = "#2ecc71";
  } else if (correctAnswers >= 1 && correctAnswers < totalCount / 2) {
    resultIcon.textContent = "😢";
    feedback = "Keep practicing! You'll get better";
    feedBackText.style.color = "#e76518";
  } else if (correctAnswers === totalCount) {
    resultIcon.classList.add("fa-crown");
    feedback = "Perfect Score! You're a genius!🎉";
    feedBackText.style.color = "lime";
  }
  scoreText.textContent = `You scored ${correctAnswers} out of ${totalCount}`;
  document.getElementById("feedback_message").textContent = feedback;
  resultBox.classList.add("showResult");

  questions.forEach(function (question, index) {
    const selectedOption = document.querySelector(
      `.question${index + 1} input[name=question${index + 1}]:checked`
    );
    const correctAnswer = question.querySelector(
      `.question${index + 1} .correctOption`
    );
    const li = document.createElement("li");
    if (selectedOption && selectedOption.classList.contains("correctOption")) {
      li.textContent = `Question ${index + 1}: Correct ✅`;
      li.classList.add("correct");
    } else {
      li.textContent = `Question ${
        index + 1
      }: Incorrect ❌ (Correct answer: ${correctAnswer.nextElementSibling.textContent.trim()})`;
      li.classList.add("incorrect");
    }
    answerBreakdown.appendChild(li);
  });
}
