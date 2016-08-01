(function() {
  var DATA = {
    '16/7': '1️⃣️ 💥',
    '19/7': '🌾 ⚡',
    '21/7': '🌈 ⚡',
    '22/7': '🌈 ⚡',
    '26/7': '🌈 ⚡',
    '27/7': '🌈 ⚡',
    '29/7': '🌮 🐱🐱 💊 ⚡',
    '30/7': '🌈 🏊',
    '31/7': '👩🏽 ❤️ ⚡️',
    '1/8': '🌈 🌮'
  };

  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var START_DAY = 1;
  var START_MONTH = 7;
  var END_MONTH = 10;

  var monthSelector = document.querySelector('.month-selector');
  var monthHeader = monthSelector.querySelector('.month');
  var prevMonthBtn = monthSelector.querySelector('.prev-button');
  var nextMonthBtn = monthSelector.querySelector('.next-button');
  var calendar = document.querySelector('.calendar');
  var currentMonth = new Date().getMonth() + 1;

  function init () {
    updateCurrentMonth();
    bind();
  }

  function bind () {
    prevMonthBtn.addEventListener('click', goToPrevMonth);
    nextMonthBtn.addEventListener('click', goToNextMonth);
  }

  function updateCurrentMonth () {
    monthHeader.innerHTML = MONTHS[currentMonth - 1];
    toggleButtons(currentMonth);
    initCalendar(currentMonth);
  }

  function goToNextMonth () {
    currentMonth++;
    updateCurrentMonth();
  }

  function goToPrevMonth () {
    currentMonth--;
    updateCurrentMonth();
  }

  function toggleButtons (currentMonth) {
    var modifierClass = 'hidden';

    if (currentMonth === START_MONTH) {
      prevMonthBtn.classList.add(modifierClass);
    } else {
      prevMonthBtn.classList.remove(modifierClass);
    }

    if (currentMonth === END_MONTH) {
      nextMonthBtn.classList.add(modifierClass);
    } else {
      nextMonthBtn.classList.remove(modifierClass);
    }
  }

  function initCalendar (month) {
    calendar.innerHTML = displayMonth(month);
  }

  function getDayNumber(month, day) {
    var formattedDate = month + '/' + day + '/2016';

    return new Date(formattedDate).getDate();
  }

  function displayMonth (month) {
    var lastDay = 0;
    var daysOffset = new Date(currentMonth + '/1/2016').getDay();
    var monthContent = '<tr>';

    for (var i = 0; i < daysOffset - 1; i++) {
      monthContent += '<td class="disabled"></td>';
    }

    for (var day = START_DAY; day <= 31; day++) {
      if (daysOffset % 7 === 1 && day !== 1) {
        monthContent += '<tr>'
      }

      var dayNumber = getDayNumber(month, day);

      if (dayNumber > lastDay) {
        monthContent += addCell(day);
      }

      if (daysOffset % 7 === 0) {
        monthContent += '</tr>';
      }

      lastDay = day;
      daysOffset++;
    }

    return monthContent;
  }

  function addCell (date) {
    var data = DATA[date + '/' + currentMonth] || '';

    return `
      <td>
        <span class="day">${date}</span>
        ${data}
      </td>
    `;
  }

  init();
})();
