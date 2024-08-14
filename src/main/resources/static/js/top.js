const topTypingScore = document.getElementById("topTpScore");
const topGambleScore = document.getElementById("topGambleScore");

document.addEventListener("DOMContentLoaded", function () {
  // タイピングスコア表示
  if (localStorage.getItem("typingTotal")) {
    topTypingScore.innerHTML = localStorage.getItem("typingTotal");
  }
  // パチンコスコア表示
  if (localStorage.getItem("gambleTotal")) {
    topGambleScore.innerHTML = localStorage.getItem("gambleTotal");
  }
});
