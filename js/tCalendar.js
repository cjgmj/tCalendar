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
var initCalendar = function (id, eventsCalendar) {
    $("#" + id).html(genCalendar());
    responsiveHeight();
    addEventsCalendar(eventsCalendar);
    $(window).resize(responsiveHeight);
};
var genCalendar = function () {
    var MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    var DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var DAYSN = ["L", "M", "X", "J", "V", "S", "D"];
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var dateSelected = new Date(year, month, 0);
    var dayStart = dateSelected.getDay();
    var cont = 1;
    var desp = 1;
    if ((year % 4 == 0) && ((year % 100 != 0) || (year % 400 == 0))) {
        DAYS[1] = 29;
    }
    var result = "<div class=\"table\"><h1 class=\"header\">" + MONTHS[month] + "</h1>";
    result += "<div class=\"thead\"><div class=\"tr\">";
    for (var _i = 0, DAYSN_1 = DAYSN; _i < DAYSN_1.length; _i++) {
        var day = DAYSN_1[_i];
        result += "<div class=\"th\">" + day + "</div>";
    }
    result += "</div></div><div class=\"tbody\">";
    for (var i = 0; i < 42; i++) {
        if (i % 7 == 0) {
            result += "<div class=\"tr\">";
        }
        if (dayStart != 0) {
            result += "<div class=\"td outMonth\" id=\"" + year + "-" + month + "-" + (DAYS[month - 1] - dayStart + 1) + "\"><span class=\"day\">" + (DAYS[month - 1] - dayStart + 1) + "</span></div>";
            dayStart--;
        }
        else if (dayStart == 0 && cont <= DAYS[month]) {
            if (year == today.getFullYear() && month == today.getMonth() && cont == today.getDate()) {
                result += "<div class=\"td today\" id=\"" + year + "-" + (month + 1) + "-" + cont + "\"><span class=\"day\">" + cont + "</span></div>";
            }
            else {
                result += "<div class=\"td dayMonth\" id=\"" + year + "-" + (month + 1) + "-" + cont + "\"><span class=\"day\">" + cont + "</span></div>";
            }
            cont++;
        }
        else {
            result += "<div class=\"td outMonth\" id=\"" + year + "-" + (month + 2) + "-" + desp + "\"><span class=\"day\">" + desp + "</span></div>";
            desp++;
        }
        if ((i + 1) % 7 == 0) {
            result += "</div>";
        }
    }
    result += "</div></div>";
    return result;
};
var addEventsCalendar = function (eventsCalendar) {
    var eventsGrouped = new Map();
    for (var _i = 0, eventsCalendar_1 = eventsCalendar; _i < eventsCalendar_1.length; _i++) {
        var eventCalendar = eventsCalendar_1[_i];
        var key = eventCalendar.year + "-" + eventCalendar.month + "-" + eventCalendar.day;
        var value = eventsGrouped.get(key);
        if (typeof value === "undefined") {
            eventsGrouped.set(key, 1);
        }
        else {
            eventsGrouped.set(key, (value + 1));
        }
    }
    var lastKey = "";
    for (var _a = 0, eventsCalendar_2 = eventsCalendar; _a < eventsCalendar_2.length; _a++) {
        var eventCalendar = eventsCalendar_2[_a];
        var key = eventCalendar.year + "-" + eventCalendar.month + "-" + eventCalendar.day;
        var value = eventsGrouped.get(key);
        if (typeof value !== "undefined") {
            var tdHeight = $("#" + key).height();
            if (typeof tdHeight !== "undefined") {
                if (value * 22 > tdHeight) {
                    if (lastKey === key) {
                        continue;
                    }
                    eventCalendar.eventCalendar = value + " eventos";
                }
                addEventCalendar(eventCalendar);
                if (tdHeight < 50)
                    $(".event").css("display", "none");
                else
                    $(".event").css("display", "block");
            }
        }
        lastKey = key;
    }
};
var addEventCalendar = function (eventCalendar) {
    $("#" + eventCalendar.year + "-" + eventCalendar.month + "-" + eventCalendar.day).append("<p class=\"event\">" + eventCalendar.eventCalendar + "</p>");
};
var responsiveHeight = function () {
    var tdWidth = $(".td").width();
    if (typeof tdWidth !== "undefined") {
        var tdHeight = Math.round(tdWidth - 40);
        $(".td").height(tdHeight);
        if (tdHeight < 50)
            $(".event").css("display", "none");
        else
            $(".event").css("display", "block");
    }
};
