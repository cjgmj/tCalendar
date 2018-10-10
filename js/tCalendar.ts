class EventCalendar {
    day:number;
    month:number;
    year:number;
    eventCalendar:string;

    constructor(day:number, month:number, year:number, eventCalendar:string){
        this.day=day;
        this.month=month;
        this.year=year;
        this.eventCalendar=eventCalendar;
    }
}


let initCalendar = function(id:string, month:number, year:number){
    $(`#${id}`).html(genCalendar(month, year));
    responsiveHeight();
    $(window).resize(responsiveHeight);
}

let genCalendar = function(monthO:number, year:number) {
    const MONTHS:string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const DAYS:number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYSN:string[] = ["L", "M", "X", "J", "V", "S", "D"]

    let month = monthO-1;
    let today = new Date();
    let dateSelected = new Date(year, month, 0);
    let dayStart = dateSelected.getDay();
    
    let cont = 1;
    let desp = 1;
    
    if ((year % 4 == 0) && ((year % 100 != 0) || (year % 400 == 0))) {
        DAYS[1] = 29;
    }
    
    let result:string = `<div class="table"><h1 class="header">${MONTHS[month]}</h1>`;
    result += `<div class="thead"><div class="tr">`;

    for(let day of DAYSN){
        result += `<div class="th">${day}</div>`
    }

    result += `</div></div><div class="tbody">`;
    
    for(let i=0; i<42; i++) {
        if	(i%7 == 0) {
            result += `<div class="tr">`;
        }
        
        if (dayStart != 0) {
            result += `<div class="td outMonth" id="${year}-${month}-${DAYS[month-1] - dayStart +1}"><span class="day">${(DAYS[month-1] - dayStart +1)}</span></div>`;
            dayStart--;
        } else if (dayStart == 0 && cont <= DAYS[month]) {
            if(year == today.getFullYear() && month == today.getMonth() && cont == today.getDate()) {
                result += `<div class="td today" id="${year}-${(month+1)}-${cont}"><span class="day">${cont}</span></div>`;
            } else {
                result += `<div class="td dayMonth" id="${year}-${(month+1)}-${cont}"><span class="day">${cont}</span></div>`;
            }
            cont++;
        } else {
            result += `<div class="td outMonth" id="${year}-${month+2}-${desp}"><span class="day">${desp}</span></div>`;
            desp++;
        }
        
        if	((i+1)%7 == 0) {
            result += `</div>`;
        }
        
    }
    
    result += `</div></div>`;    
    
    return result;
}

let addEventsCalendar = function(eventsCalendar:EventCalendar[]){
    for(let eventCalendar of eventsCalendar){
        addEventCalendar(eventCalendar);
    }
}

let addEventCalendar = function(eventCalendar:EventCalendar){
    $(`#${eventCalendar.year}-${eventCalendar.month}-${eventCalendar.day}`).append(`<p class="event">${eventCalendar.eventCalendar}</p>`);
    
}

let responsiveHeight = function(){
    let tdWidth = $(".td").width();
    if(typeof tdWidth !== "undefined")
        $(".td").height(tdWidth);
}