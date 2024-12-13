const generalKnowledgeQuiz = [
    {
      question: "What is the capital of France?",
      options: [
        { text: "Berlin", correct: false },
        { text: "Madrid", correct: false },
        { text: "Paris", correct: true },
        { text: "Rome", correct: false }
      ]
    },
    {
      question: "Who wrote the play 'Romeo and Juliet'?",
      options: [
        { text: "William Shakespeare", correct: true },
        { text: "Charles Dickens", correct: false },
        { text: "Mark Twain", correct: false },
        { text: "Leo Tolstoy", correct: false }
      ]
    },
    // Add more questions in the same format...
  ];
  
  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer_buttons");
  const nextButton = document.getElementById("next_btn");
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    const currentQuestion = generalKnowledgeQuiz[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;
  
    currentQuestion.options.forEach((option) => {
      const button = document.createElement("button");
      button.innerHTML = option.text;
      button.classList.add("btn");
      if (option.correct) {
        button.dataset.correct = option.correct;
      }
      button.addEventListener("click", selectAnswer);
      answerButtons.appendChild(button);
    });
  }
  
  function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }
  
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach((button) => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    nextButton.style.display = "block";
  }
  
  nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < generalKnowledgeQuiz.length - 1) {
      currentQuestionIndex++;
      showQuestion();
    } else {
      showScore();
    }
  });
  
  function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${generalKnowledgeQuiz.length}!`;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz);
  }
  
  startQuiz();
  