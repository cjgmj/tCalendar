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
let eventsGrouped:Map<string,number> = new Map<string,number>();
let eventsMoreOne:string[] = [];
let charged:boolean = false;
let eventsCalendar:EventCalendar[] = [];

let initCalendar = function(id:string, eventsCalendar:EventCalendar[]){
    $(`#${id}`).html(genCalendar());
    responsiveHeight();
    addEventsCalendar(eventsCalendar);
    displayEvents();
    $(window).resize(responsiveHeight);
    charged = true;
}

let genCalendar = function() {
    const MONTHS:string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const DAYS:number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYSN:string[] = ["L", "M", "X", "J", "V", "S", "D"]

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
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
    eventsCalendar = eventsCalendar;

    for(let eventCalendar of eventsCalendar){
        let key:string = `${eventCalendar.year}-${eventCalendar.month}-${eventCalendar.day}`;
        let value:number|undefined = eventsGrouped.get(key);
        if(typeof value === "undefined"){
            eventsGrouped.set(key, 1);
        }else{
            eventsGrouped.set(key, (value+1));
        }

        if(eventsMoreOne.indexOf(key) === -1){
            eventsMoreOne.push(key);
        }

        addEventCalendar(eventCalendar);
    }
}

let addEventCalendar = function(eventCalendar:EventCalendar){
    $(`#${eventCalendar.year}-${eventCalendar.month}-${eventCalendar.day}`).append(`<p class="event">${eventCalendar.eventCalendar}</p>`);
}

let responsiveHeight = function(){
    let tdWidth:number|undefined = $(".td").width();
    if(typeof tdWidth !== "undefined"){
        let tdHeight:number = Math.round(tdWidth-40);
        $(".td").height(tdHeight);

        if(tdHeight < 50)
            $(".event").css("display", "none");
        else
            $(".event").css("display", "block")
    }

    if(charged){
        displayEvents();
    }
}

let displayEvents = function(){
    for(let idEvent of eventsMoreOne){
        let value:number|undefined = eventsGrouped.get(idEvent);
        let tdHeight:number|undefined = $(`#${idEvent}`).height();
            if(typeof tdHeight !== "undefined" && typeof value !== "undefined"){
                if(tdHeight < 50){
                    $(".event").css("display", "none");
                    break;
                }
                if((value*22) > (tdHeight-40)){
                    $(`#${idEvent} > p`).css("display", "none");
                    $(`#${idEvent}`).append(`<p class="event" id="eventGroup">${value} eventos</p>`);
                } else{
                    $(`#${idEvent} > p`).css("display", "block");
                    $(`#eventGroup`).remove();
                }
            }
    }
}