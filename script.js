const questions = [
  {
    question: "Choose the French word for: coffee",
    options: ["thé", "café", "lait", "sucre"],
    answer: 1,
    vocabulary: "café = coffee",
    pattern: "Je prends un café.",
    tip: "點餐最常見單字之一。"
  },
  {
    question: "Choose the French word for: tea",
    options: ["eau", "lait", "thé", "jus"],
    answer: 2,
    vocabulary: "thé = tea",
    pattern: "Je voudrais un thé.",
    tip: "飲品類核心字彙。"
  },
  {
    question: "Choose the French word for: milk",
    options: ["sucre", "beurre", "lait", "pain"],
    answer: 2,
    vocabulary: "lait = milk",
    pattern: "Avec du lait.",
    tip: "常見於咖啡與茶類訂製。"
  },
  {
    question: "Choose the French word for: sugar",
    options: ["sucre", "sel", "café", "tasse"],
    answer: 0,
    vocabulary: "sucre = sugar",
    pattern: "Avec du sucre.",
    tip: "咖啡店高頻字彙。"
  },
  {
    question: "Choose the French word for: cup",
    options: ["bouteille", "tasse", "table", "assiette"],
    answer: 1,
    vocabulary: "tasse = cup",
    pattern: "Une tasse de café.",
    tip: "餐飲情境常見名詞。"
  },
  {
    question: "Choose the French word for: menu",
    options: ["facture", "reçu", "menu", "porte"],
    answer: 2,
    vocabulary: "menu = menu",
    pattern: "Puis-je voir le menu ?",
    tip: "加拿大餐廳高頻字彙。"
  },
  {
    question: "Choose the French word for: receipt",
    options: ["reçu", "menu", "addition", "table"],
    answer: 0,
    vocabulary: "reçu = receipt",
    pattern: "Puis-je avoir un reçu ?",
    tip: "加拿大生活常需要索取收據。"
  },
  {
    question: "Choose the French word for: bill",
    options: ["menu", "reçu", "addition", "caisse"],
    answer: 2,
    vocabulary: "addition = bill",
    pattern: "L'addition, s'il vous plaît.",
    tip: "法語區結帳必備表達。"
  },
  {
    question: "What does this coffee shop phrase mean? Bonjour !",
    options: ["Goodbye", "Thank you", "Hello", "Please"],
    answer: 2,
    vocabulary: "bonjour = hello",
    pattern: "Bonjour !",
    tip: "加拿大法語區進店最常見的問候語。"
  },
  {
    question: "What does this coffee shop question mean? À emporter ou sur place ?",
    options: ["Payment method", "Takeout or dine-in", "Drink size", "Receipt needed"],
    answer: 1,
    vocabulary: "à emporter = takeout; sur place = dine-in",
    pattern: "À emporter ou sur place ?",
    tip: "加拿大咖啡店與餐廳最常見的問題之一。"
  },
  {
    question: "What does this checkout phrase mean? Ça fait 5,95 $.",
    options: ["The store is closing.", "Your order is ready.", "The total is $5.95.", "There is a discount."],
    answer: 2,
    vocabulary: "ça fait = the total is",
    pattern: "Ça fait + montant.",
    tip: "加拿大法語區結帳時的高頻表達。"
  },
  {
    question: "What does this coffee shop question mean? Voulez-vous un reçu ?",
    options: ["Would you like a receipt?", "Would you like sugar?", "Would you like a coffee?", "Would you like milk?"],
    answer: 0,
    vocabulary: "reçu = receipt",
    pattern: "Voulez-vous + nom ?",
    tip: "加拿大消費情境中經常出現。"
  },
  {
    question: "What does this coffee shop question mean? Avec du lait ?",
    options: ["Would you like milk?", "Would you like tea?", "Would you like a receipt?", "Would you like a table?"],
    answer: 0,
    vocabulary: "lait = milk",
    pattern: "Avec + nom ?",
    tip: "點咖啡時常見的簡短確認問句。"
  },
  {
    question: "What does this coffee shop phrase mean? Votre commande est prête.",
    options: ["Your table is ready.", "Your order is ready.", "Your coffee is cold.", "Your receipt is ready."],
    answer: 1,
    vocabulary: "commande = order; prête = ready",
    pattern: "Votre commande est prête.",
    tip: "加拿大連鎖咖啡店與餐廳高頻句型。"
  },
  {
    question: "What does this coffee shop phrase mean? Merci, bonne journée !",
    options: ["Thank you, have a nice day.", "Please wait here.", "Your order is ready.", "Would you like a receipt?"],
    answer: 0,
    vocabulary: "bonne journée = have a nice day",
    pattern: "Merci, bonne journée !",
    tip: "加拿大法語區離開商店時常見的結尾語。"
  }
];

const state = {
  screen: "home",
  currentQuestion: 0,
  selectedAnswer: null,
  answers: [],
  xp: 0,
  readiness: 0
};

const app = document.getElementById("app");
const xpPerCorrect = 15;

function render() {
  if (state.screen === "home") renderHome();
  if (state.screen === "question") renderQuestion();
  if (state.screen === "feedback") renderFeedback();
  if (state.screen === "complete") renderComplete();
}

function getScore() {
  return state.answers.filter(Boolean).length;
}

function getSkillProfile() {
  const score = getScore();
  return {
    Vocabulary: score,
    Reading: state.answers.length,
    Situations: score,
    Expressions: score
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

  app.innerHTML = `
    <section class="panel mission-card">
      <div class="mission-head">
        <div>
          <p class="eyebrow">Mission 1: Coffee Shop</p>
          <h2>${isCorrect ? "Correct" : "Incorrect"}</h2>
        </div>
        <span class="pill">XP ${state.xp}</span>
      </div>

      <div class="feedback-result ${isCorrect ? "correct" : "incorrect"}">
        ${isCorrect ? "Correct" : "Incorrect"}
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
  state.readiness = Math.max(state.readiness, Math.round((score / questions.length) * 8));
  state.screen = "complete";
  render();
}

function renderComplete() {
  const score = getScore();
  const scorePercent = Math.round((score / questions.length) * 100);
  const situationPercent = Math.round(((state.answers.length + score) / (questions.length * 2)) * 100);

  app.innerHTML = `
    <section class="panel complete-card">
      <p class="eyebrow">Toronto Stamp Earned</p>
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

      <div class="actions">
        <button class="secondary-btn" id="backToJourney">Back to Journey</button>
      </div>
    </section>
  `;

  document.getElementById("backToJourney").addEventListener("click", () => {
    state.screen = "home";
    render();
  });
}

render();
