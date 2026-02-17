const quizQuestions = [
  {
    question: "What do you enjoy the most?",
    options: [
      { text: "Working with computers", field: "technology" },
      { text: "Helping sick people", field: "medical" },
      { text: "Managing money & ideas", field: "business" }
    ]
  },
  {
    question: "Which skill excites you?",
    options: [
      { text: "Coding & problem solving", field: "technology" },
      { text: "Biology & care", field: "medical" },
      { text: "Leadership & planning", field: "business" }
    ]
  },
  {
    question: "Your ideal work environment?",
    options: [
      { text: "Remote / Tech-based", field: "technology" },
      { text: "Hospital / Clinic", field: "medical" },
      { text: "Office / Startup", field: "business" }
    ]
  }
];

let quizIndex = 0;
let quizScores = {
  technology: 0,
  medical: 0,
  business: 0
};

function startQuiz() {
  quizIndex = 0;
  quizScores = { technology: 0, medical: 0, business: 0 };
  showQuizQuestion();
}

function showQuizQuestion() {
  const q = quizQuestions[quizIndex];
  const resultDiv = document.getElementById("result");

  let html = `<h2>${q.question}</h2>`;

  q.options.forEach(opt => {
    html += `
      <button onclick="answerQuiz('${opt.field}')">
        ${opt.text}
      </button><br><br>
    `;
  });

  resultDiv.innerHTML = html;
}

function answerQuiz(field) {
  quizScores[field]++;
  quizIndex++;

  if (quizIndex < quizQuestions.length) {
    showQuizQuestion();
  } else {
    showQuizResult();
  }
}
function showQuizResult() {
  const resultDiv = document.getElementById("result");

  const bestField = Object.keys(quizScores).reduce((a, b) =>
    quizScores[a] > quizScores[b] ? a : b
  );

  let message = "";

  if (bestField === "technology") {
    message = "💻 Technology suits you best!";
  } else if (bestField === "medical") {
    message = "🩺 Medical field suits you best!";
  } else if (bestField === "business") {
    message = "📈 Business & management suits you best!";
  }

  resultDiv.innerHTML = `
    <h2>Your Quiz Result 🎉</h2>
    <p>${message}</p>
    <button onclick="renderCareers('${bestField}')">
      Explore ${bestField} careers
    </button>
  `;
}

