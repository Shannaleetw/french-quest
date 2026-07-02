let questions = [];

const storageKey = "frenchQuestProgressV03";
const xpPerCorrect = 10;

const defaultProgress = {
  totalXp: 0,
  readiness: 0,
  lastAttempt: null,
  completedMissions: [],
  wrongQuestionIds: [],
  guessedQuestionIds: [],
  skillXp: {
    vocabulary: 0,
    reading: 0,
    situation: 0,
    expression: 0
  }
};

const state = {
  screen: "loading",
  currentQuestion: 0,
  selectedAnswer: null,
  guessedCurrent: false,
  answers: [],
  activeQuestions: [],
  reviewMode: false,
  xp: 0,
  readiness: 0,
  missionLoaded: false,
  errorMessage: "",
  questionStartTime: null,
  missionStartTime: null,
  progress: loadProgress()
};

const app = document.getElementById("app");

function getFreshDefaultProgress() {
  return JSON.parse(JSON.stringify(defaultProgress));
}

function loadProgress() {
  try {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return getFreshDefaultProgress();

    const parsed = JSON.parse(saved);
    return {
      ...getFreshDefaultProgress(),
      ...parsed,
      skillXp: {
        ...defaultProgress.skillXp,
        ...(parsed.skillXp || {})
      },
      wrongQuestionIds: parsed.wrongQuestionIds || [],
      guessedQuestionIds: parsed.guessedQuestionIds || [],
      completedMissions: parsed.completedMissions || []
    };
  } catch (error) {
    console.error("Progress loading failed:", error);
    return getFreshDefaultProgress();
  }
}

function saveProgress() {
  localStorage.setItem(storageKey, JSON.stringify(state.progress));
}

function uniqueIds(ids) {
  return [...new Set(ids.filter(Boolean))];
}

async function loadMissionData() {
  try {
    const response = await fetch("./data/coffee_shop.json");
    if (!response.ok) throw new Error("Mission data request failed.");

    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Mission data is empty.");
    }

    questions = data;
    state.missionLoaded = true;
    state.readiness = state.progress.readiness || 0;
    state.screen = "home";
    render();
  } catch (error) {
    console.error("Mission loading failed:", error);
    state.missionLoaded = false;
    state.errorMessage = error instanceof Error ? error.message : String(error);
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
      <p>Debug: ${state.errorMessage}</p>
    </section>
  `;
}

function getActiveQuestions() {
  return state.activeQuestions.length ? state.activeQuestions : questions;
}

function getScore() {
  return state.answers.filter((answer) => answer.isCorrect).length;
}

function getWrongAnswers() {
  return state.answers.filter((answer) => !answer.isCorrect);
}

function getGuessedAnswers() {
  return state.answers.filter((answer) => answer.guessed);
}

function getTotalAnswerTimeMs() {
  return state.answers.reduce((total, answer) => total + (answer.timeSpentMs || 0), 0);
}

function getSkillProfile() {
  const skillXp = state.progress.skillXp || defaultProgress.skillXp;
  return {
    "Vocabulary XP": skillXp.vocabulary || 0,
    "Reading XP": skillXp.reading || 0,
    "Situation XP": skillXp.situation || 0,
    "Expression XP": skillXp.expression || 0
  };
}

function getCorrectIndex(question) {
  if (typeof question.correctIndexOverride === "number") return question.correctIndexOverride;
  if (typeof question.answer === "number") return question.answer;

  const answerMap = {
    A: 0,
    B: 1,
    C: 2,
    D: 3
  };

  return answerMap[String(question.answer).trim().toUpperCase()];
}

function shuffleArray(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function prepareQuestionForSession(question, randomizeOptions = false) {
  if (!randomizeOptions) {
    return {
      ...question,
      options: [...question.options],
      correctIndexOverride: getCorrectIndex(question)
    };
  }

  const correctOption = question.options[getCorrectIndex(question)];
  const shuffledOptions = shuffleArray(question.options);

  return {
    ...question,
    options: shuffledOptions,
    correctIndexOverride: shuffledOptions.indexOf(correctOption)
  };
}

function prepareQuestionsForSession(sourceQuestions, { randomizeQuestions = false, randomizeOptions = false } = {}) {
  const prepared = sourceQuestions.map((question) => prepareQuestionForSession(question, randomizeOptions));
  return randomizeQuestions ? shuffleArray(prepared) : prepared;
}

function formatDateTime(value) {
  if (!value) return "";
  return new Date(value).toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatDuration(milliseconds) {
  const totalSeconds = Math.max(0, Math.round((milliseconds || 0) / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes === 0) return `${seconds}s`;
  return `${minutes}m ${seconds}s`;
}

function getReviewQuestions() {
  const ids = uniqueIds([
    ...state.progress.wrongQuestionIds,
    ...state.progress.guessedQuestionIds
  ]);

  return questions.filter((question) => ids.includes(question.id));
}

function renderHome() {
  const skills = getSkillProfile();
  const lastAttempt = state.progress.lastAttempt;
  const reviewCount = getReviewQuestions().length;
  const hasCompletedCoffeeShop = state.progress.completedMissions.includes("coffee_shop");

  app.innerHTML = `
    <section class="screen home-grid">
      <div class="panel readiness-card">
        <div class="readiness-top">
          <div>
            <p class="eyebrow">Passport Progress</p>
            <h2>TEF Readiness</h2>
          </div>
          <div class="readiness-number">${state.progress.readiness}%</div>
        </div>
        <div class="meter" aria-label="TEF Readiness ${state.progress.readiness}%">
          <div class="meter-fill" style="--value: ${state.progress.readiness}%"></div>
        </div>
        <div class="skill-grid">
          ${Object.entries(skills).map(([label, value]) => `
            <div class="skill-tile">
              <span>${label}</span>
              <strong>${value}</strong>
            </div>
          `).join("")}
        </div>
        ${lastAttempt ? `
          <div class="stat-card">
            <span class="stat-label">Last Attempt</span>
            <strong>${lastAttempt.score} / ${lastAttempt.total}</strong>
            <p class="next-step">${formatDateTime(lastAttempt.completedAt)} · Wrong: ${lastAttempt.wrongCount} · Guessed: ${lastAttempt.guessedCount} · Time: ${formatDuration(lastAttempt.totalTimeMs)}</p>
          </div>
        ` : `
          <p class="next-step">Start your first mission to build your TEF profile.</p>
        `}
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
            <span class="route-state">${hasCompletedCoffeeShop ? "Completed" : "Ready"}</span>
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
          <button class="primary-btn" id="startMission" ${state.missionLoaded ? "" : "disabled"}>Start Coffee Shop Mission</button>
          ${hasCompletedCoffeeShop ? `<button class="secondary-btn" id="retakeMission">Retake</button>` : ""}
          ${reviewCount ? `<button class="secondary-btn" id="reviewMission">Review ${reviewCount} Weak Spots</button>` : ""}
        </div>
      </div>
    </section>
  `;

  if (state.missionLoaded) {
    document.getElementById("startMission").addEventListener("click", () => startMission({ randomizeQuestions: false, randomizeOptions: false, reviewMode: false }));

    const retakeButton = document.getElementById("retakeMission");
    if (retakeButton) retakeButton.addEventListener("click", () => startMission({ randomizeQuestions: true, randomizeOptions: true, reviewMode: false }));

    const reviewButton = document.getElementById("reviewMission");
    if (reviewButton) reviewButton.addEventListener("click", startReviewMode);
  }
}

function startMission({ randomizeQuestions = false, randomizeOptions = false, reviewMode = false } = {}) {
  if (!state.missionLoaded || questions.length === 0) return;

  state.screen = "question";
  state.currentQuestion = 0;
  state.selectedAnswer = null;
  state.guessedCurrent = false;
  state.answers = [];
  state.xp = 0;
  state.reviewMode = reviewMode;
  state.activeQuestions = prepareQuestionsForSession(questions, { randomizeQuestions, randomizeOptions });
  state.missionStartTime = Date.now();
  state.questionStartTime = Date.now();
  render();
}

function startReviewMode() {
  const reviewQuestions = getReviewQuestions();
  if (!reviewQuestions.length) return;

  state.screen = "question";
  state.currentQuestion = 0;
  state.selectedAnswer = null;
  state.guessedCurrent = false;
  state.answers = [];
  state.xp = 0;
  state.reviewMode = true;
  state.activeQuestions = prepareQuestionsForSession(reviewQuestions, { randomizeQuestions: true, randomizeOptions: true });
  state.missionStartTime = Date.now();
  state.questionStartTime = Date.now();
  render();
}

function renderQuestion() {
  const activeQuestions = getActiveQuestions();
  const question = activeQuestions[state.currentQuestion];
  const progress = (state.currentQuestion / activeQuestions.length) * 100;

  app.innerHTML = `
    <section class="panel mission-card">
      <div class="mission-head">
        <div>
          <p class="eyebrow">${state.reviewMode ? "Review Mode" : "Mission 1"}</p>
          <h2>Coffee Shop</h2>
        </div>
        <span class="pill">XP ${state.xp}</span>
      </div>

      <div class="question-meta">
        <span class="pill">Question ${state.currentQuestion + 1} / ${activeQuestions.length}</span>
        <span class="pill">${state.reviewMode ? "Weak spots" : "Toronto daily life"}</span>
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
        <button class="secondary-btn" id="guessToggle" type="button">${state.guessedCurrent ? "Marked as guessed" : "I guessed this"}</button>
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

  document.getElementById("guessToggle").addEventListener("click", () => {
    state.guessedCurrent = !state.guessedCurrent;
    renderQuestion();
  });

  document.getElementById("submitAnswer").addEventListener("click", submitAnswer);
}

function submitAnswer() {
  const activeQuestions = getActiveQuestions();
  const question = activeQuestions[state.currentQuestion];
  const correctIndex = getCorrectIndex(question);
  const isCorrect = state.selectedAnswer === correctIndex;
  const timeSpentMs = Date.now() - (state.questionStartTime || Date.now());

  state.answers.push({
    questionId: question.id,
    skill: question.skill,
    isCorrect,
    guessed: state.guessedCurrent,
    selectedIndex: state.selectedAnswer,
    correctIndex,
    timeSpentMs
  });

  if (isCorrect) state.xp += xpPerCorrect;
  state.screen = "feedback";
  render();
}

function renderFeedback() {
  const activeQuestions = getActiveQuestions();
  const question = activeQuestions[state.currentQuestion];
  const answer = state.answers[state.answers.length - 1];
  const correctIndex = getCorrectIndex(question);
  const correctAnswer = question.options[correctIndex];
  const selectedAnswer = question.options[answer.selectedIndex];
  const earnedXp = answer.isCorrect ? xpPerCorrect : 0;

  app.innerHTML = `
    <section class="panel mission-card">
      <div class="mission-head">
        <div>
          <p class="eyebrow">${state.reviewMode ? "Review Mode" : "Mission 1: Coffee Shop"}</p>
          <h2>${answer.isCorrect ? "Correct" : "Incorrect"}</h2>
          <div class="review-line">
            <p><strong>Question:</strong> ${question.question}</p>
            <p><strong>Your answer:</strong> ${selectedAnswer}</p>
            <p><strong>Time spent:</strong> ${formatDuration(answer.timeSpentMs)}</p>
            ${answer.guessed ? `<p><strong>Marked:</strong> Guessed / Not sure</p>` : ""}
          </div>
        </div>
        <span class="pill">XP ${state.xp}</span>
      </div>

      <div class="feedback-result ${answer.isCorrect ? "correct" : "incorrect"}">
        +${earnedXp} XP
      </div>

      ${answer.isCorrect ? "" : `<p><strong>Correct answer:</strong> ${correctAnswer}</p>`}

      <div class="options" aria-label="Answered options">
        ${question.options.map((option, index) => {
          const className = index === correctIndex ? "correct" : index === answer.selectedIndex ? "wrong" : "";
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
          ${question.tef_tip || ""}
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
  const activeQuestions = getActiveQuestions();

  if (state.currentQuestion === activeQuestions.length - 1) {
    finishMission();
    return;
  }

  state.currentQuestion += 1;
  state.selectedAnswer = null;
  state.guessedCurrent = false;
  state.questionStartTime = Date.now();
  state.screen = "question";
  render();
}

function finishMission() {
  const activeQuestions = getActiveQuestions();
  const score = getScore();
  const wrongAnswers = getWrongAnswers();
  const guessedAnswers = getGuessedAnswers();
  const totalTimeMs = getTotalAnswerTimeMs();
  const averageTimeMs = activeQuestions.length ? totalTimeMs / activeQuestions.length : 0;
  const readinessGain = Math.round((score / activeQuestions.length) * 2);

  state.progress.totalXp += state.xp;
  state.progress.readiness = Math.max(state.progress.readiness || 0, readinessGain);
  state.readiness = state.progress.readiness;

  state.answers.forEach((answer) => {
    if (answer.isCorrect) {
      const skill = answer.skill || "vocabulary";
      if (!state.progress.skillXp[skill]) state.progress.skillXp[skill] = 0;
      state.progress.skillXp[skill] += xpPerCorrect;
    }
  });

  state.progress.wrongQuestionIds = uniqueIds([
    ...state.progress.wrongQuestionIds,
    ...wrongAnswers.map((answer) => answer.questionId)
  ]);

  state.progress.guessedQuestionIds = uniqueIds([
    ...state.progress.guessedQuestionIds,
    ...guessedAnswers.map((answer) => answer.questionId)
  ]);

  if (!state.reviewMode && !state.progress.completedMissions.includes("coffee_shop")) {
    state.progress.completedMissions.push("coffee_shop");
  }

  state.progress.lastAttempt = {
    mission: state.reviewMode ? "Coffee Shop Review" : "Coffee Shop",
    score,
    total: activeQuestions.length,
    xp: state.xp,
    wrongCount: wrongAnswers.length,
    guessedCount: guessedAnswers.length,
    totalTimeMs,
    averageTimeMs,
    completedAt: new Date().toISOString()
  };

  saveProgress();
  state.screen = "complete";
  render();
}

function renderComplete() {
  const activeQuestions = getActiveQuestions();
  const score = getScore();
  const scorePercent = Math.round((score / activeQuestions.length) * 100);
  const wrongCount = getWrongAnswers().length;
  const guessedCount = getGuessedAnswers().length;
  const totalTimeMs = getTotalAnswerTimeMs();
  const averageTimeMs = activeQuestions.length ? totalTimeMs / activeQuestions.length : 0;
  const situationPercent = Math.round(((state.answers.length + score) / (activeQuestions.length * 2)) * 100);

  app.innerHTML = `
    <section class="panel complete-card">
      <p class="eyebrow">${state.reviewMode ? "Review Complete" : "Coffee Shop Stamp Earned"}</p>
      <h2>${state.reviewMode ? "Review Complete" : "Mission Complete"}</h2>
      <p>You practiced a real Canadian coffee shop situation with TEF-style practical French.</p>

      <div class="score-row">
        <div class="stat-card">
          <span class="stat-label">Final Score</span>
          <strong>${score} / ${activeQuestions.length}</strong>
        </div>
        <div class="stat-card">
          <span class="stat-label">XP Earned</span>
          <strong>${state.xp}</strong>
        </div>
        <div class="stat-card">
          <span class="stat-label">TEF Readiness</span>
          <strong>${state.progress.readiness}%</strong>
        </div>
        <div class="stat-card">
          <span class="stat-label">Wrong Questions</span>
          <strong>${wrongCount}</strong>
        </div>
        <div class="stat-card">
          <span class="stat-label">Guessed Questions</span>
          <strong>${guessedCount}</strong>
        </div>
        <div class="stat-card">
          <span class="stat-label">Total Time</span>
          <strong>${formatDuration(totalTimeMs)}</strong>
        </div>
        <div class="stat-card">
          <span class="stat-label">Average Time</span>
          <strong>${formatDuration(averageTimeMs)}</strong>
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

      <p class="next-step">Next: Review wrong and guessed questions to build a stronger TEF profile.</p>

      <div class="actions">
        <button class="secondary-btn" id="backToJourney">Back to Canada Journey</button>
      </div>
    </section>
  `;

  document.getElementById("backToJourney").addEventListener("click", () => {
    state.screen = "home";
    state.activeQuestions = [];
    state.reviewMode = false;
    state.questionStartTime = null;
    state.missionStartTime = null;
    render();
  });
}

render();
loadMissionData();
