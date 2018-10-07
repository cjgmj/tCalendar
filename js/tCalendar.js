"use strict";
var EventCalendar = /** @class */ (function () {
    function EventCalendar(day, month, year, eventCalendar) {
        this.day = day;
        this.month = month;
        this.year = year;
        this.eventCalendar = eventCalendar;
    }
    return EventCalendar;
}());
var initCalendar = function (id, month, year) {
    $("#" + id).html(genCalendar(month, year));
};
var genCalendar = function (monthO, year) {
    var MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    var DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var DAYSN = ["L", "M", "X", "J", "V", "S", "D"];
    var month = monthO - 1;
    var today = new Date();
    var dateSelected = new Date(year, month, 0);
    var dayStart = dateSelected.getDay();
    var cont = 1;
    var desp = 1;
    if ((year % 4 == 0) && ((year % 100 != 0) || (year % 400 == 0))) {
        DAYS[1] = 29;
    }
    var result = "<div class=\"text-center\"><h1>" + MONTHS[month] + "</h1></div><div class=\"table-responsive text-right\"><table class=\"table table-bordered\">";
    result += "<thead class=\"thead-dark\"><tr>";
    for (var _i = 0, DAYSN_1 = DAYSN; _i < DAYSN_1.length; _i++) {
        var day = DAYSN_1[_i];
        result += "<th scope=\"col\">" + day + "</th>";
    }
    result += "</tr></thead><tbody>";
    for (var i = 0; i < 42; i++) {
        if (i % 7 == 0) {
            result += "<tr>";
        }
        if (dayStart != 0) {
            result += "<td id=\"" + year + "-" + month + "-" + (DAYS[month - 1] - dayStart + 1) + "\" class=\"table-active\">" + (DAYS[month - 1] - dayStart + 1) + "</td>";
            dayStart--;
        }
        else if (dayStart == 0 && cont <= DAYS[month]) {
            if (year == today.getFullYear() && month == today.getMonth() && cont == today.getDate()) {
                result += "<td id=\"" + year + "-" + (month + 1) + "-" + cont + "\" class=\"table-primary\">" + cont + "</td>";
            }
            else {
                result += "<td id=\"" + year + "-" + (month + 1) + "-" + cont + "\">" + cont + "</td>";
            }
            cont++;
        }
        else {
            result += "<td id=\"" + year + "-" + (month + 2) + "-" + desp + "\" class=\"table-active\">" + desp + "</td>";
            desp++;
        }
        if ((i + 1) % 7 == 0) {
            result += "</tr>";
        }
    }
    result += "</tbody></table></div>";
    return result;
};
var addEventsCalendar = function (eventsCalendar) {
    for (var _i = 0, eventsCalendar_1 = eventsCalendar; _i < eventsCalendar_1.length; _i++) {
        var eventCalendar = eventsCalendar_1[_i];
        addEventCalendar(eventCalendar);
    }
};
var addEventCalendar = function (eventCalendar) {
    $("#" + eventCalendar.year + "-" + eventCalendar.month + "-" + eventCalendar.day).append("<div class=\"alert alert-info text-left\" role=\"alert\">" + eventCalendar.eventCalendar + "</div>");
};
