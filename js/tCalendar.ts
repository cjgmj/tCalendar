let calendar = function(year:number, monthO:number) {
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
    
    let result:string = `<div class="text-center"><h1>${MONTHS[month]}</h1><table class="table table-bordered">`;
    result += `<thead class="thead-dark"><tr>`;

    for(let day of DAYSN){
        result += `<th scope="col">${day}</th>`
    }

    result += `</tr></thead><tbody>`;
    
    for(let i=0; i<42; i++) {
        if	(i%7 == 0) {
            result += "<tr>";
        }
        
        if (dayStart != 0) {
            result += `<td id='#${year}-${month}-${DAYS[month-1] - dayStart +1}' class='table-active'>${(DAYS[month-1] - dayStart +1)}</td>`;
            dayStart--;
        } else if (dayStart == 0 && cont <= DAYS[month]) {
            if(year == today.getFullYear() && month == today.getMonth() && cont == today.getDate()) {
                result += `<td id='#${year}-${(month+1)}-${cont}' class='table-primary'>${cont}</td>`;
            } else {
                result += `<td id='#${year}-${(month+1)}-${cont}'>${cont}</td>`;
            }
            cont++;
        } else {
            result += `<td id='#${year}-${month+2}-${desp}' class='table-active'>${desp}</td>`;
            desp++;
        }
        
        if	((i+1)%7 == 0) {
            result += `</tr>`;
        }
        
    }
    
    result += `</tbody></table></div>`;
    
    return result;
}