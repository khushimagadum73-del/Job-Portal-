function showCareers(field) {
  const resultDiv = document.getElementById("result");
  let output = `<h2>${field.toUpperCase()} Careers</h2>`;

  careerData[field].forEach((career, index) => {
    output += `
      <div class="career-card" onclick="showDetails('${field}', ${index})">
        ${career.name}
      </div>
    `;
  });

  resultDiv.innerHTML = output;
}

function showDetails(field, index) {
  const career = careerData[field][index];
  const resultDiv = document.getElementById("result");

  let output = `
    <h2>${career.name}</h2>
    <p>${career.description}</p>

    <h3>Skills</h3>
    <ul>${career.skills.map(s => `<li>${s}</li>`).join("")}</ul>

    <h3>Tools</h3>
    <ul>${career.tools.map(t => `<li>${t}</li>`).join("")}</ul>

    <h3>Roadmap</h3>
    <ol>${career.roadmap.map(r => `<li>${r}</li>`).join("")}</ol>

    <button onclick="saveCareer('${career.name}')">❤️ Save Career</button>
    <br><br>
    <button onclick="location.reload()">⬅ Back</button>
  `;

  resultDiv.innerHTML = output;
}
function saveCareer(name) {
  localStorage.setItem("savedCareer", name);
  alert(name + " saved successfully 💖");
}

function searchCareer() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const resultDiv = document.getElementById("result");

  let output = "<h2>Search Results</h2>";

  for (let field in careerData) {
    careerData[field].forEach((career, index) => {
      if (career.name.toLowerCase().includes(input)) {
        output += `
          <div class="career-card" onclick="showDetails('${field}', ${index})">
            ${career.name}
          </div>
        `;
      }
    });
  }

  resultDiv.innerHTML = output;
}
function toggleDarkMode() {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    document.getElementById("darkBtn").innerText = "☀ Light Mode";
  } else {
    localStorage.setItem("theme", "light");
    document.getElementById("darkBtn").innerText = "🌙 Dark Mode";
  }
}

// Apply saved theme on load
window.onload = function () {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    document.getElementById("darkBtn").innerText = "☀ Light Mode";
  }
};
let quizStep = 0;
let scores = {
  technology: 0,
  medical: 0,
  business: 0
};

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
    question: "Which skill sounds exciting?",
    options: [
      { text: "Coding & logic", field: "technology" },
      { text: "Biology & care", field: "medical" },
      { text: "Leadership & marketing", field: "business" }
    ]
  },
  {
    question: "Your ideal work style?",
    options: [
      { text: "Remote / Tech-based", field: "technology" },
      { text: "Hospital / Clinic", field: "medical" },
      { text: "Office / Startup", field: "business" }
    ]
  }
];

function startQuiz() {
  quizStep = 0;
  scores = { technology: 0, medical: 0, business: 0 };
  showQuiz();
}

function showQuiz() {
  const resultDiv = document.getElementById("result");
  const q = quizQuestions[quizStep];

  let output = `<h2>${q.question}</h2>`;

  q.options.forEach(option => {
    output += `
      <button onclick="answerQuiz('${option.field}')">
        ${option.text}
      </button><br><br>
    `;
  });

  resultDiv.innerHTML = output;
}

function answerQuiz(field) {
  scores[field]++;
  quizStep++;

  if (quizStep < quizQuestions.length) {
    showQuiz();
  } else {
    showQuizResult();
  }
}

function showQuizResult() {
  const resultDiv = document.getElementById("result");

  const bestField = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  let message = "";
  if (bestField === "technology") message = "💻 Technology is PERFECT for you!";
  if (bestField === "medical") message = "🩺 Medical field suits you best!";
  if (bestField === "business") message = "📈 Business & management fits you!";

  resultDiv.innerHTML = `
    <h2>Your Result 🎉</h2>
    <p>${message}</p>
    <button onclick="showCareers('${bestField}')">
      Explore ${bestField} careers
    </button>
  `;
}
