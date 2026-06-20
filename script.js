let questions = [];

const state = {
  screen: "loading",
  currentQuestion: 0,
  selectedAnswer: null,
  answers: [],
  xp: 0,
  readiness: 0
};

const app = document.getElementById("app");
const xpPerCorrect = 10;

async function loadMissionData() {
  try {
    const response = await fetch("data/coffee_shop.json");
    if (!response.ok) throw new Error("Mission data request failed.");

    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Mission data is empty.");
    }

    questions = data;
    state.screen = "home";
    render();
  } catch (error) {
    state.screen = "error";
    render();
  }
}

function render() {
  if (state.screen === "loading") renderLoading();
  if (state.screen === "error") renderError();
  if (state.screen === "home") renderHome();
  if (state.screen === "question") renderQuestion();
  if (state.screen === "feedback") renderFeedback();
  if (state.screen === "complete") renderComplete();
}

function renderLoading() {
  app.innerHTML = `
    <section class="panel mission-card">
      <p class="eyebrow">Loading Mission</p>
      <h2>Coffee Shop</h2>
      <p>Preparing your TEF Canada practice mission.</p>
    </section>
  `;
}

function renderError() {
  app.innerHTML = `
    <section class="panel mission-card">
      <p class="eyebrow">Mission Data</p>
      <h2>Unable to load</h2>
      <p>Unable to load mission data. Please try again.</p>
    </section>
  `;
}

function getScore() {
  return state.answers.filter(Boolean).length;
}

function getSkillProfile() {
  const score = getScore();
  const answered = state.answers.length;
  return {
    "Vocabulary XP": score * xpPerCorrect,
    "Reading XP": answered * xpPerCorrect,
    "Situation XP": score * xpPerCorrect,
    "Expression XP": score * xpPerCorrect
  };
}

function renderHome() {
  const skills = getSkillProfile();

  app.innerHTML = `
    <section class="screen home-grid">
      <div class="panel readiness-card">
        <div class="readiness-top">
          <div>
            <p class="eyebrow">Passport Progress</p>
            <h2>TEF Readiness</h2>
          </div>
          <div class="readiness-number">${state.readiness}%</div>
        </div>
        <div class="meter" aria-label="TEF Readiness ${state.readiness}%">
          <div class="meter-fill" style="--value: ${state.readiness}%"></div>
        </div>
        <div class="skill-grid">
          ${Object.entries(skills).map(([label, value]) => `
            <div class="skill-tile">
              <span>${label}</span>
              <strong>${value}</strong>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="panel journey">
        <div class="journey-title">
          <div>
            <p class="eyebrow">Canada Journey</p>
            <h2>Toronto</h2>
          </div>
          <div class="leaf" aria-hidden="true">MAPLE</div>
        </div>

        <div class="route" aria-label="Canada Journey">
          <div class="route-stop">
            <div class="route-icon" aria-hidden="true">TO</div>
            <p class="route-name">Toronto</p>
            <span class="route-state">Start</span>
          </div>
          <div class="route-arrow" aria-hidden="true">|</div>
          <div class="route-stop ready">
            <div class="route-icon" aria-hidden="true">CUP</div>
            <p class="route-name">Coffee Shop Mission</p>
            <span class="route-state">Ready</span>
          </div>
          <div class="route-arrow" aria-hidden="true">|</div>
          <div class="route-stop">
            <div class="route-icon" aria-hidden="true">BAG</div>
            <p class="route-name">Grocery Store</p>
            <span class="route-state">Locked</span>
          </div>
          <div class="route-arrow" aria-hidden="true">|</div>
          <div class="route-stop">
            <div class="route-icon" aria-hidden="true">$</div>
            <p class="route-name">Banking</p>
            <span class="route-state">Locked</span>
          </div>
        </div>

        <div class="actions">
          <button class="primary-btn" id="startMission">Start Coffee Shop Mission</button>
        </div>
      </div>
    </section>
  `;

  document.getElementById("startMission").addEventListener("click", startMission);
}

function startMission() {
  state.screen = "question";
  state.currentQuestion = 0;
  state.selectedAnswer = null;
  state.answers = [];
  state.xp = 0;
  render();
}

function renderQuestion() {
  const question = questions[state.currentQuestion];
  const progress = (state.currentQuestion / questions.length) * 100;

  app.innerHTML = `
    <section class="panel mission-card">
      <div class="mission-head">
        <div>
          <p class="eyebrow">Mission 1</p>
          <h2>Coffee Shop</h2>
        </div>
        <span class="pill">XP ${state.xp}</span>
      </div>

      <div class="question-meta">
        <span class="pill">Question ${state.currentQuestion + 1} / ${questions.length}</span>
        <span class="pill">Toronto daily life</span>
      </div>

      <div class="meter" aria-label="Mission progress">
        <div class="meter-fill" style="--value: ${progress}%"></div>
      </div>

      <p class="question-text">${question.question}</p>

      <div class="options">
        ${question.options.map((option, index) => `
          <button class="option ${state.selectedAnswer === index ? "selected" : ""}" data-option="${index}" type="button">
            ${option}
          </button>
        `).join("")}
      </div>

      <div class="actions">
        <button class="primary-btn" id="submitAnswer" ${state.selectedAnswer === null ? "disabled" : ""}>Submit</button>
      </div>
    </section>
  `;

  document.querySelectorAll(".option").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedAnswer = Number(button.dataset.option);
      renderQuestion();
    });
  });

  document.getElementById("submitAnswer").addEventListener("click", submitAnswer);
}

function submitAnswer() {
  const question = questions[state.currentQuestion];
  const isCorrect = state.selectedAnswer === question.answer;

  state.answers.push(isCorrect);
  if (isCorrect) state.xp += xpPerCorrect;
  state.screen = "feedback";
  render();
}

function renderFeedback() {
  const question = questions[state.currentQuestion];
  const isCorrect = state.answers[state.answers.length - 1];
  const correctAnswer = question.options[question.answer];
  const selectedAnswer = question.options[state.selectedAnswer];
  const earnedXp = isCorrect ? xpPerCorrect : 0;

  app.innerHTML = `
    <section class="panel mission-card">
      <div class="mission-head">
        <div>
          <p class="eyebrow">Mission 1: Coffee Shop</p>
          <h2>${isCorrect ? "Correct" : "Incorrect"}</h2>
          <div class="review-line">
            <p><strong>Question:</strong> ${question.question}</p>
            <p><strong>Your answer:</strong> ${selectedAnswer}</p>
          </div>
        </div>
        <span class="pill">XP ${state.xp}</span>
      </div>

      <div class="feedback-result ${isCorrect ? "correct" : "incorrect"}">
        +${earnedXp} XP
      </div>

      ${isCorrect ? "" : `<p><strong>Correct answer:</strong> ${correctAnswer}</p>`}

      <div class="options" aria-label="Answered options">
        ${question.options.map((option, index) => {
          const className = index === question.answer ? "correct" : index === state.selectedAnswer ? "wrong" : "";
          return `<button class="option ${className}" type="button" disabled>${option}</button>`;
        }).join("")}
      </div>

      <div class="learning-notes">
        <div class="note">
          <span>Vocabulary</span>
          ${question.vocabulary}
        </div>
        <div class="note">
          <span>Pattern</span>
          ${question.pattern}
        </div>
        <div class="note">
          <span>TEF Tip</span>
          ${question.tip}
        </div>
      </div>

      <div class="actions">
        <button class="primary-btn" id="nextQuestion">Next Question</button>
      </div>
    </section>
  `;

  document.getElementById("nextQuestion").addEventListener("click", nextQuestion);
}

function nextQuestion() {
  if (state.currentQuestion === questions.length - 1) {
    finishMission();
    return;
  }

  state.currentQuestion += 1;
  state.selectedAnswer = null;
  state.screen = "question";
  render();
}

function finishMission() {
  const score = getScore();
  state.readiness = Math.max(state.readiness, Math.round((score / questions.length) * 2));
  state.screen = "complete";
  render();
}

function renderComplete() {
  const score = getScore();
  const scorePercent = Math.round((score / questions.length) * 100);
  const situationPercent = Math.round(((state.answers.length + score) / (questions.length * 2)) * 100);

  app.innerHTML = `
    <section class="panel complete-card">
      <p class="eyebrow">Coffee Shop Stamp Earned</p>
      <h2>Mission Complete</h2>
      <p>You practiced a real Canadian coffee shop situation with TEF-style practical French.</p>

      <div class="score-row">
        <div class="stat-card">
          <span class="stat-label">Final Score</span>
          <strong>${score} / ${questions.length}</strong>
        </div>
        <div class="stat-card">
          <span class="stat-label">XP Earned</span>
          <strong>${state.xp}</strong>
        </div>
        <div class="stat-card">
          <span class="stat-label">TEF Readiness</span>
          <strong>${state.readiness}%</strong>
        </div>
      </div>

      <div class="report-grid">
        <div class="report-tile">
          <span>Vocabulary</span>
          <strong>${scorePercent}%</strong>
        </div>
        <div class="report-tile">
          <span>Situation</span>
          <strong>${situationPercent}%</strong>
        </div>
      </div>

      <p class="next-step">Next: Complete more missions to build your TEF profile.</p>

      <div class="actions">
        <button class="secondary-btn" id="backToJourney">Back to Canada Journey</button>
      </div>
    </section>
  `;

  document.getElementById("backToJourney").addEventListener("click", () => {
    state.screen = "home";
    render();
  });
}

render();
loadMissionData();
