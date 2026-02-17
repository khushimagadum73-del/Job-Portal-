function renderCareers(field) {
  const resultDiv = document.getElementById("result");
  appState.selectedField = field;

  let html = `<h2>${field.toUpperCase()} Careers</h2>`;

  careerData[field].forEach((career, index) => {
    html += `
      <div class="career-card" onclick="renderCareerDetails('${field}', ${index})">
        ${career.name}
      </div>
    `;
  });

  resultDiv.innerHTML = html;
}

function renderCareerDetails(field, index) {
  const career = careerData[field][index];
  appState.selectedCareer = career;

  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = `
    <h2>${career.name}</h2>
    <p>${career.description}</p>

    <h3>Skills</h3>
    <ul>${career.skills.map(s => `<li>${s}</li>`).join("")}</ul>

    <h3>Roadmap</h3>
    <ol>${career.roadmap.map(r => `<li>${r}</li>`).join("")}</ol>

    <button onclick="saveCareer('${career.name}')">❤️ Save</button>
    <br><br>
    <button onclick="renderCareers('${field}')">⬅ Back</button>
  `;
}
