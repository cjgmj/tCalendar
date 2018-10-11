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

let initCalendar = function(id:string, eventsCalendar:EventCalendar[]){
    $(`#${id}`).html(genCalendar());
    responsiveHeight();
    addEventsCalendar(eventsCalendar);
    $(window).resize(responsiveHeight);
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
    let eventsGrouped:Map<string,number> = new Map<string,number>();

    for(let eventCalendar of eventsCalendar){
        let key:string = `${eventCalendar.year}-${eventCalendar.month}-${eventCalendar.day}`;
        let value:number|undefined = eventsGrouped.get(key);
        if(typeof value === "undefined"){
            eventsGrouped.set(key, 1);
        }else{
            eventsGrouped.set(key, (value+1));
        
        }
    }

    let lastKey:string="";
    for(let eventCalendar of eventsCalendar){
        let key:string = `${eventCalendar.year}-${eventCalendar.month}-${eventCalendar.day}`;
        let value:number|undefined = eventsGrouped.get(key);
        if(typeof value !== "undefined"){
            let tdHeight:number|undefined = $(`#${key}`).height();
            if(typeof tdHeight !== "undefined"){
                if(value*22 > tdHeight){
                    if(lastKey === key){
                        continue;
                    }

                    eventCalendar.eventCalendar = `${value} eventos`;
                }

                addEventCalendar(eventCalendar);

                if(tdHeight < 50)
                    $(".event").css("display","none");
                else
                    $(".event").css("display","block");
            }
        }
        lastKey=key;
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
            $(".event").css("display","none");
        else
            $(".event").css("display","block");
    }
}