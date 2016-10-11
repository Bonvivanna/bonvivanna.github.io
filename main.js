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
    '31/7': '👳🏾 ❤️ ⚡️',
    '1/8': '🌈 🌮',
    '2/8': '🌈 🍔 ⚡',
    '3/8': '🌈 ⚡️',
    '4/8': '🌈 🏚💤',
    '5/8': '🌈 💥',
    '7/8': '🌈 🍦 🍲 🚄 ⚡️',
    '24/8': '🌈 🌞 ⚡️',
    '25/8': '🌈 💻 ⚡️',
    '26/8': '🌈 🌮 ⚡️',
    '27/8': '🌈 ⚡️',
    '28/8': '🌈 🌈 🏊 ⚡️',
    '30/8': '🌈⚡️',
    '9/9': '🌈 🌮 🎆⚡️',
    '10/9': '🌈 ⚡️',
    '11/9': '🌈 ⚡️',
    '14/9': '🌈 🏥',
    '17/9': '🌈 🍸 ⚡️',
    '18/9': '🌈 🏰',
    '19/9': '🌈 ⚡️',
    '21/9': '🌈 🌮 ⚡️',
    '22/9': '🌈',
    '23/9': '🌈 ⚡️',
    '24/9': '🌈 🍲 💥',
    '25/9': '🌈 🌯 ⚡️',
    '26/9': '🌈 ⚡️',
    '28/9': '🌈',
    '29/9': '🌈 🇵🇱 ⚡️',
    '30/9': '🌈 🇵🇱 🏜',
    '1/10': '🌈 🇵🇱 🏗 🍸 🎂',
    '2/10': '🌈 🇵🇱 🏢 ⚡️',
    '3/10': '🌈',
    '4/10': '🌈 🌮 ⚡️',
    '5/10': '🌈 ⚡️',
    '7/10': '🌈 🔥 ⚡️',
    '9/10': '🌈 💻 ⚡️'
  };

  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var START_MONTH = 7;
  var END_MONTH = 10;

  var cellTemplate = document.getElementById('cell-template');
  var monthSelector = document.querySelector('.month-selector');
  var monthHeader = monthSelector.querySelector('.month');
  var prevMonthBtn = monthSelector.querySelector('.prev-button');
  var nextMonthBtn = monthSelector.querySelector('.next-button');
  var calendar = document.querySelector('.calendar');

  var currentMonth = new Date().getMonth() + 1;
  var weekOpened = false;

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

  function openWeek () {
    weekOpened = true;
    return '<tr>';
  }

  function closeWeek () {
    weekOpened = false;
    return '</tr>';
  }

  function getDayNumber(month, day) {
    var formattedDate = month + '/' + day + '/2016';

    return new Date(formattedDate).getDate();
  }

  function displayMonth (month) {
    var monthContent = '';
    var daysOffset = new Date(month + '/1/2016').getDay();
    var lastSeenDay = 0;

    for (var i = 1; i < daysOffset; i++) {
      if (i % 7 === 1) {
        monthContent += openWeek();;
      }

      monthContent += addDisabledCell();

      if (i % 7 === 0) {
        monthContent += closeWeek();
      }
    }

    for (var day = daysOffset; day <= (31 + daysOffset - 1); day++) {
      if (day % 7 === 1 && !weekOpened) {
        monthContent += openWeek();
      }


      var realDay = day - daysOffset + 1;

      if (isInvalidDay(month, day, daysOffset)) {
        monthContent += addDisabledCell();
      } else if (getDayNumber(month, realDay) > lastSeenDay) {
        monthContent += addCell(realDay);
        lastSeenDay = realDay;
      }

      if (day % 7 === 0 && weekOpened) {
        monthContent += closeWeek();
      }
    }

    return monthContent;
  }

  function isInvalidDay(month, day, daysOffset) {
    return ((month === 7) && (day - daysOffset + 1) < 9) ||
           ((month === 10 && (day - daysOffset + 1) > 16));
  }

  function addCell (date) {
    return template(cellTemplate.innerHTML, {
      DATE: date,
      DATA: DATA[date + '/' + currentMonth] || ''
    });
  }

  function addDisabledCell () {
    return '<td class="disabled"></td>';
  }

  function template (input, values) {
    values = values || {};

    for (var key in values) {
      input = input.replace(new RegExp('{' + key + '}', 'g'), values[key]);
    }

    return input;
  }

  init();
})();
