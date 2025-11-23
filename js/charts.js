/**
 * グラフ表示モジュール（Chart.js使用）
 */

import {
  calculateAccuracyByLevel,
  calculateStudyTime,
  getWeakestQuestions,
  getDailyHistory,
  getAccuracyByTimeOfDay,
} from "./statistics.js";

/**
 * 段ごとの正解率を棒グラフで表示
 */
export function renderLevelAccuracyChart() {
  const canvas = document.getElementById("levelAccuracyChart");
  if (!canvas) return;

  const levelStats = calculateAccuracyByLevel();
  const labels = [];
  const data = [];

  for (let level = 1; level <= 9; level++) {
    labels.push(`${level}の段`);
    data.push(levelStats[level].accuracy.toFixed(1));
  }

  // 既存のチャートがあれば破棄
  if (window.levelAccuracyChartInstance) {
    window.levelAccuracyChartInstance.destroy();
  }

  const ctx = canvas.getContext("2d");
  window.levelAccuracyChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "正解率 (%)",
          data: data,
          backgroundColor: "rgba(76, 175, 80, 0.6)",
          borderColor: "rgba(76, 175, 80, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: "正解率 (%)",
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "段ごとの正解率",
        },
      },
    },
  });
}

/**
 * 日別の学習履歴を折れ線グラフで表示
 */
export function renderDailyHistoryChart() {
  const canvas = document.getElementById("dailyHistoryChart");
  if (!canvas) return;

  const dailyData = getDailyHistory(7);
  const labels = Object.keys(dailyData).reverse();
  const accuracyData = labels.map((key) => dailyData[key].accuracy.toFixed(1));
  const gamesData = labels.map((key) => dailyData[key].games);

  // 既存のチャートがあれば破棄
  if (window.dailyHistoryChartInstance) {
    window.dailyHistoryChartInstance.destroy();
  }

  const ctx = canvas.getContext("2d");
  window.dailyHistoryChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "正解率 (%)",
          data: accuracyData,
          borderColor: "rgba(76, 175, 80, 1)",
          backgroundColor: "rgba(76, 175, 80, 0.1)",
          yAxisID: "y",
        },
        {
          label: "プレイ回数",
          data: gamesData,
          borderColor: "rgba(33, 150, 243, 1)",
          backgroundColor: "rgba(33, 150, 243, 0.1)",
          yAxisID: "y1",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false,
      },
      scales: {
        y: {
          type: "linear",
          display: true,
          position: "left",
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: "正解率 (%)",
          },
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",
          beginAtZero: true,
          grid: {
            drawOnChartArea: false,
          },
          title: {
            display: true,
            text: "プレイ回数",
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "過去7日間の学習履歴",
        },
      },
    },
  });
}

/**
 * 時間帯別の正解率を円グラフで表示
 */
export function renderTimeOfDayChart() {
  const canvas = document.getElementById("timeOfDayChart");
  if (!canvas) return;

  const timeData = getAccuracyByTimeOfDay();
  const labels = [];
  const data = [];
  const backgroundColors = [
    "rgba(255, 206, 86, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(54, 162, 235, 0.6)",
  ];

  Object.keys(timeData).forEach((key) => {
    const slot = timeData[key];
    if (slot.total > 0) {
      labels.push(slot.label);
      const accuracy = (slot.correct / slot.total) * 100;
      data.push(accuracy.toFixed(1));
    }
  });

  // データがない場合は表示しない
  if (data.length === 0) {
    canvas.style.display = "none";
    return;
  }

  canvas.style.display = "block";

  // 既存のチャートがあれば破棄
  if (window.timeOfDayChartInstance) {
    window.timeOfDayChartInstance.destroy();
  }

  const ctx = canvas.getContext("2d");
  window.timeOfDayChartInstance = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          label: "正解率 (%)",
          data: data,
          backgroundColor: backgroundColors.slice(0, data.length),
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "時間帯別正解率",
        },
        legend: {
          position: "bottom",
        },
      },
    },
  });
}

/**
 * 学習統計サマリーを表示
 */
export function renderStatisticsSummary() {
  const summaryDiv = document.getElementById("statisticsSummary");
  if (!summaryDiv) return;

  const studyTime = calculateStudyTime();
  const weakQuestions = getWeakestQuestions();

  let weakQuestionsHTML = "";
  if (weakQuestions.length > 0) {
    weakQuestionsHTML = `
      <div class="weak-questions">
        <h4>苦手な問題トップ5</h4>
        <ul>
          ${weakQuestions
            .map(
              (q) =>
                `<li>${q.question}: ${q.accuracy.toFixed(1)}% (${q.attempts}回)`
            )
            .join("")}
        </ul>
      </div>
    `;
  } else {
    weakQuestionsHTML = `
      <div class="weak-questions">
        <h4>苦手な問題トップ5</h4>
        <p>まだデータがありません。3回以上挑戦した問題から表示されます。</p>
      </div>
    `;
  }

  summaryDiv.innerHTML = `
    <div class="summary-cards">
      <div class="summary-card">
        <div class="summary-value">${studyTime.week}</div>
        <div class="summary-label">今週のプレイ回数</div>
      </div>
      <div class="summary-card">
        <div class="summary-value">${studyTime.month}</div>
        <div class="summary-label">今月のプレイ回数</div>
      </div>
    </div>
    ${weakQuestionsHTML}
  `;
}

/**
 * すべてのグラフを更新
 */
export function updateAllCharts() {
  renderLevelAccuracyChart();
  renderDailyHistoryChart();
  renderTimeOfDayChart();
  renderStatisticsSummary();
}
