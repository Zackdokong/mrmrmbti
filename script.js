const questions = [
    { q: "사람이 많은 곳에 있으면 기운이 난다", yes: "E", no: "I" },
    { q: "혼자 조용히 쉬는 시간이 꼭 필요하다", yes: "I", no: "E" },
    { q: "새로운 사람과 금방 친해지는 편이다", yes: "E", no: "I" },

    { q: "계획 없이 바로 행동하는 편이다", yes: "P", no: "J" },
    { q: "미리 정해진 일정이 있어야 편하다", yes: "J", no: "P" },
    { q: "상황에 따라 계획을 바꾸기 어렵지 않다", yes: "P", no: "J" },
  
    { q: "결정할 때 사람의 감정을 먼저 생각한다", yes: "F", no: "T" },
    { q: "감정보다 사실과 논리가 더 중요하다", yes: "T", no: "F" },
    { q: "상대가 상처받을까 봐 말을 고르는 편이다", yes: "F", no: "T" },
  
    { q: "자연스럽게 앞에서 이끄는 역할을 맡는다", yes: "E", no: "I" },
    { q: "깊게 생각하고 분석하는 과정이 재미있다", yes: "T", no: "F" },
    { q: "일은 끝까지 정리되어야 마음이 놓인다", yes: "J", no: "P" },
  ];
  

const lettuceMap = {
    IFJ: {
      name: "버터헤드 찰스",
      mbti: "IFJ형",
      tag: ["안정", "배려", "신뢰"],
      desc: "기본에 충실하며 꾸준한 성과를 내는 안정형"
    },
  
    IFP: {
      name: "오틸리에",
      mbti: "IFP형",
      tag: ["감성", "개성", "섬세"],
      desc: "감각을 중시하며 부드러운 분위기를 가진 유형"
    },
  
    ITJ: {
      name: "라리크",
      mbti: "ITJ형",
      tag: ["계획", "체계", "효율"],
      desc: "논리적인 사고로 결과를 만들어내는 유형"
    },
  
    ETP: {
      name: "엑스와치",
      mbti: "ETP형",
      tag: ["도전", "변화", "실행"],
      desc: "빠른 판단으로 현장에서 빛나는 유형"
    },
  
    EFP: {
      name: "멀티그린",
      mbti: "EFP형",
      tag: ["활력", "다양성", "친화"],
      desc: "에너지가 넘쳐 분위기를 살리는 유형"
    },
  
    EFJ: {
      name: "큐오레",
      mbti: "EFJ형",
      tag: ["조화", "관리", "리더십"],
      desc: "환경을 조율하며 흐름을 안정적으로 이끄는 유형"
    },
  
    ITP: {
      name: "피델",
      mbti: "ITP형",
      tag: ["분석", "실험", "탐구"],
      desc: "독립적사고를 통해 강점을 발휘하는 유형"
    },
  
    ETJ: {
      name: "바티머",
      mbti: "ETJ형",
      tag: ["성과", "통제", "주도"],
      desc: "목표 지향적이며 생산성에서 강한 리더형"
    }
  };
  


let index = 0;
let score = { E: 0, I: 0, F: 0, T: 0, J: 0, P: 0 };

const area = document.getElementById("test-area");
const progressBar = document.getElementById("progressBar");

showQuestion();

function showQuestion() {
  const q = questions[index];
  area.innerHTML = `
      <div class="slide">
        <div class="question">${q.q}</div>
        <div class="buttons">
          <button class="btn" onclick="answer(true)">⭕</button>
          <button class="btn" onclick="answer(false)">❌</button>
        </div>
      </div>
    `;
  updateProgress();
}

function answer(isYes) {
  const q = questions[index];
  score[isYes ? q.yes : q.no]++;

  document.querySelectorAll(".btn").forEach((b) => (b.disabled = true));

  setTimeout(() => {
    index++;
    if (index < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 200);
}

function updateProgress() {
  const percent = (index / questions.length) * 100;
  progressBar.style.width = `${percent}%`;
}

function showResult() {
  updateProgress();
  area.innerHTML = "";

  const type =
    (score.E >= score.I ? "E" : "I") +
    (score.F >= score.T ? "F" : "T") +
    (score.J >= score.P ? "J" : "P");

  const r = lettuceMap[type];

  document.getElementById("result").classList.remove("hidden");
  document.getElementById("resultCard").innerHTML = `
  <div class="result-title">${r.name}</div>
  <div class="result-desc">${r.desc}</div>
  <div class="result-tags">
    ${r.tag.map((t) => `<span class="tag">${t}</span>`).join("")}
  </div>
  <button class="retry-btn" onclick="resetTest()">다시 검사하기</button>
`;
}

function resetTest() {
  index = 0;
  score = { E: 0, I: 0, F: 0, T: 0, J: 0, P: 0 };
  document.getElementById("result").classList.add("hidden");
  progressBar.style.width = "0%";
  showQuestion();
}
