/**
 * ごほうびカレンダーのDOM生成を担うレンダラー。
 * 各ヘルパーはDOM要素を生成して返すのみで、外側のコンテナへの挿入は呼び出し元の責務。
 */

const WEEKDAY_LABELS = ['にち', 'げつ', 'か', 'すい', 'もく', 'きん', 'ど'];

/**
 * 連続学習日数の表示要素を生成
 * @param {number} streak - 連続学習日数
 * @returns {HTMLElement}
 */
export function createStreakElement(streak) {
  const streakDiv = document.createElement('div');
  streakDiv.classList.add('calendar-streak');

  const emojiSpan = document.createElement('span');
  emojiSpan.className = 'streak-emoji';
  emojiSpan.textContent = '🔥';

  const numberSpan = document.createElement('span');
  numberSpan.className = 'streak-number';
  numberSpan.textContent = streak;

  streakDiv.append(emojiSpan, ' ', numberSpan, ' にちれんぞく！');
  return streakDiv;
}

/**
 * 年月ヘッダー要素を生成
 * @param {Date} date - 対象月の任意の日付
 * @returns {HTMLElement}
 */
export function createCalendarHeader(date) {
  const headerDiv = document.createElement('div');
  headerDiv.classList.add('calendar-header');
  headerDiv.textContent = `${date.getFullYear()}ねん ${date.getMonth() + 1}がつ`;
  return headerDiv;
}

/**
 * 曜日ヘッダー要素を生成
 * @returns {HTMLElement}
 */
export function createWeekdaysElement() {
  const weekdaysDiv = document.createElement('div');
  weekdaysDiv.classList.add('calendar-weekdays');

  WEEKDAY_LABELS.forEach((day) => {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('calendar-weekday');
    dayDiv.textContent = day;
    weekdaysDiv.appendChild(dayDiv);
  });

  return weekdaysDiv;
}

/**
 * 日付グリッド要素を生成
 * @param {Date} date - 対象月の任意の日付（年月の決定に使用）
 * @param {Object} calendarData - 日付キー(YYYY-MM-DD) -> 学習回数のマップ
 * @param {Date} [today=new Date()] - 今日として扱う日付（テスト用に注入可能）
 * @returns {HTMLElement}
 */
export function createCalendarGrid(date, calendarData, today = new Date()) {
  const gridDiv = document.createElement('div');
  gridDiv.classList.add('calendar-grid');

  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // 月初の曜日まで空セルを追加
  const firstDayOfWeek = firstDay.getDay();
  for (let i = 0; i < firstDayOfWeek; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.classList.add('calendar-day', 'calendar-day-empty');
    gridDiv.appendChild(emptyCell);
  }

  // 各日付のセルを追加（getDate() の呼び出しはループ外に抽出）
  const daysInMonth = lastDay.getDate();
  for (let day = 1; day <= daysInMonth; day++) {
    gridDiv.appendChild(createDayCell(year, month, day, calendarData, today));
  }

  return gridDiv;
}

/**
 * 1日分のセル要素を生成（内部利用）
 * @param {number} year
 * @param {number} month - 0始まり
 * @param {number} day
 * @param {Object} calendarData
 * @param {Date} today
 * @returns {HTMLElement}
 */
function createDayCell(year, month, day, calendarData, today) {
  const dayCell = document.createElement('div');
  dayCell.classList.add('calendar-day');

  const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const studyCount = calendarData[dateKey] || 0;

  const dateNumber = document.createElement('div');
  dateNumber.classList.add('calendar-day-number');
  dateNumber.textContent = day;
  dayCell.appendChild(dateNumber);

  if (studyCount > 0) {
    const stamp = document.createElement('div');
    stamp.classList.add('calendar-stamp');
    stamp.textContent = '⭐';
    dayCell.appendChild(stamp);
    dayCell.classList.add('calendar-day-studied');
  }

  if (
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear()
  ) {
    dayCell.classList.add('calendar-day-today');
  }

  return dayCell;
}

/**
 * カレンダー全体（連続日数 + ヘッダー + 曜日 + グリッド）を組み立てて返す
 * @param {Date} date - 対象月の任意の日付
 * @param {Object} calendarData
 * @param {number} streak
 * @param {Date} [today=new Date()]
 * @returns {DocumentFragment}
 */
export function renderCalendar(date, calendarData, streak, today = new Date()) {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(createStreakElement(streak));
  fragment.appendChild(createCalendarHeader(date));
  fragment.appendChild(createWeekdaysElement());
  fragment.appendChild(createCalendarGrid(date, calendarData, today));
  return fragment;
}
