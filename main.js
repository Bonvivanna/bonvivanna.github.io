var DATA = {
  '16/7': '1️⃣️ 💥',
  '19/7': '🌾 ⚡',
  '21/7': '🌈 ⚡',
  '22/7': '🌈 ⚡',
  '26/7': '🌈 ⚡',
  '27/7': '🌈 ⚡',
  '29/7': '🐱🐱 💊 ⚡',
  '30/7': '🌈 🏊'
};

var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var START_DAY = 1;
var START_MONTH = 7;
var END_MONTH = 10;

var monthSelector = document.querySelector('.month-selector');
var prevMonthBtn = monthSelector.querySelector('.prev-button');
var nextMonthBtn = monthSelector.querySelector('.next-button');
var calendar = document.querySelector('.calendar');
var currentMonth = new Date().getMonth() + 1;

function init () {
  initMonthSelector();
  updateCurrentMonth();
}

function initMonthSelector () {
  prevMonthBtn.addEventListener('click', goToPrevMonth);
  nextMonthBtn.addEventListener('click', goToNextMonth);
}

function updateCurrentMonth () {
  toggleButtons(currentMonth);
  monthSelector.querySelector('.month').innerHTML = MONTHS[currentMonth - 1];
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
  if (currentMonth === START_MONTH) {
    prevMonthBtn.classList.add('hidden');
  } else {
    prevMonthBtn.classList.remove('hidden');
  }

  if (currentMonth === END_MONTH) {
    nextMonthBtn.classList.add('hidden');
  } else {
    nextMonthBtn.classList.remove('hidden');
  }
}

function initCalendar (month) {
  var calendarContent = '';

  calendarContent += displayDays(month);
  calendar.innerHTML = calendarContent;
}

function displayDays (month) {
  var lastDay = 0;
  var daysContent = '<tr>';
  var daysOffset = new Date(currentMonth + '/1/2016').getDay();

  for (var i = 0; i < daysOffset - 1; i++) {
    daysContent += '<td class="disabled"></td>';
  }

  for (var day = START_DAY; day <= 31; day++) {
    if (daysOffset % 7 === 1 && day !== 1) {
      daysContent += '<tr>'
    }

    var formattedDate = month + '/' + day + '/2016';
    var dayNumber = new Date(formattedDate).getDate();

    if (dayNumber > lastDay) {
      daysContent += addCell(day);
    }

    lastDay = day;

    if (daysOffset % 7 === 0) {
      daysContent += '</tr>';
    }

    daysOffset++;
  }

  return daysContent;
}

function addCell (date) {
  var data = DATA[date + '/' + currentMonth] || '';

  return '<td>'+ data +'<span class="day">' + date + '</span></td>';
}

init();
