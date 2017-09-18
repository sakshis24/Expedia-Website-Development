var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
 
$(document).ready(function() {
  $(".datepicker").each(function() {
    $(this).append("<div class='date-text'></div>");
    $(this).append("<div class='month-year-picker'></div>");
    $(this).append("<div class='calendar'></div>");
     
    buildCalendarMonth($(this).attr("id"), new Date());
  });
});
 
function buildCalendarMonth(id, date) {
  // clear it out
  $("#" + id).find(".date-text").html("");
  $("#" + id).find(".month-year-picker").html("");
  $("#" + id).find(".calendar").html("");
   
  // repopulate upper section
  $("#" + id).find(".date-text").append(getDisplayDate(date));
  $("#" + id).find(".month-year-picker").append("<select class='month-dropdown'></select><select class='year-dropdown'></select>");
   
  // get first and last dates
  var firstOfMonthDate = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastOfMonthDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  var numDaysInMonth = lastOfMonthDate.getDate();
   
  // populate month dropdown
  for (var i = 0; i < 12; i++) {
    if (date.getMonth() == i) {
      $("#" + id).find(".month-dropdown").append("<option value='" + i + "' selected>" + months[i] + "</options>");
    }
    else {
      $("#" + id).find(".month-dropdown").append("<option value='" + i + "'>" + months[i] + "</options>");
    }
  }
   
  // populate year dropdown
  for (var i = date.getFullYear() - 15; i < date.getFullYear() + 15; i++) {
    if (date.getFullYear() == i) {
      $("#" + id).find(".year-dropdown").append("<option value='" + i + "' selected>" + i + "</options>");
    }
    else {
      $("#" + id).find(".year-dropdown").append("<option value='" + i + "'>" + i + "</options>");
    }
  }
   
  // add navigation buttons
  $("#" + id).find(".calendar").append("<div class='today-date-button'><span class='prev-month'> << </span><span class='today-month'>Today</span><span class='next-month'> >> </span></div>");
   
  // add duds
  for (var i = 0; i < (7 - (7 - firstOfMonthDate.getDay())); i++) {
    $("#" + id).find(".calendar").append("<div class='cal-date-block-dud'> </div>");
  }
   
  // add calendar days
  for (var i = 0; i < numDaysInMonth; i++) {
    if (date.getDate() == (i + 1)) {
      $("#" + id).find(".calendar").append("<div id='date-block-" + (i + 1) + "-" + id + "' class='cal-date-block cal-date-block-current'>" + (i + 1) + "</div>");
    }
    else {
      $("#" + id).find(".calendar").append("<div id='date-block-" + (i + 1) + "-" + id + "' class='cal-date-block'>" + (i + 1) + "</div>");
    }
  }
   
  // add duds
  for (var i = 0; i < (7 - lastOfMonthDate.getDay() - 1); i++) {
    $("#" + id).find(".calendar").append("<div class='cal-date-block-dud'> </div>");
  }
   
  $(".prev-month").click(function () {
    var pid = $(this).closest(".datepicker").attr("id");
    var date = new Date($("#" + id).find(".year").html(), $("#" + id).find(".month").html() - 2, 1);
 
    buildCalendarMonth(pid, date);
  });
 
  $(".next-month").click(function () {
    var pid = $(this).closest(".datepicker").attr("id");
    var date = new Date($("#" + id).find(".year").html(), $("#" + id).find(".month").html(), 1);
 
    buildCalendarMonth(pid, date);
  });
 
  $(".today-month").click(function () {
    var pid = $(this).closest(".datepicker").attr("id");
    var date = new Date();
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
 
    buildCalendarMonth(pid, date);
  });
 
  $(".cal-date-block").click(function () {
    var pid = $(this).closest(".datepicker").attr("id");
    var day = $(this).html();
 
    updateDay(pid, day);
  });
 
  $(".month-dropdown").change(function () {
    var pid = $(this).closest(".datepicker").attr("id");
    var date = new Date($("#" + id).find(".year").html(), $("#" + id).find(".month-dropdown option:selected").val(), 1);
 
    buildCalendarMonth(pid, date);
  });
 
  $(".year-dropdown").change(function () {
    var pid = $(this).closest(".datepicker").attr("id");
    var date = new Date($("#" + id).find(".year-dropdown option:selected").val(), $("#" + id).find(".month").html() - 1, 1);
 
    buildCalendarMonth(pid, date);
  });
}
 
function updateDay(id, day) {
  $("#" + id).find(".day").html(day);
  $("#" + id).find(".cal-date-block-current").removeClass("cal-date-block-current");
  $("#date-block-" + day + "-" + id).addClass("cal-date-block-current");
}
 
function getDisplayDate(date) {
  return "<span class='month'>" + (date.getMonth() + 1) + "</span>/<span class='day'>" + date.getDate() + "</span>/<span class='year'>" + date.getFullYear() + "</span>";
}
 
function getDate(id) {
  return $("#" + id).find(".year").html() + "/" + $("#" + id).find(".month").html() + "/" + $("#" + id).find(".day").html();
}