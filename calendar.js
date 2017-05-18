'use strict'
var NAME_DAYS = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
var MONTHS= [{name: 'Enero', days: 31}, {name: 'Febrero', days: 28}, {name: 'Marzo', days: 31 },
        {name: 'Abril', days: 30 }, {name: 'Mayo', days: 31 }, {name: 'Junio',days: 30 },
        {name: 'Julio', days: 31 }, {name: 'Agosto', days: 31 }, {name: 'Septiembre', days: 30 },
        {name: 'Octubre', days: 31}, {name: 'Noviembre', days: 30 }, {name: 'Diciembre', days: 31 }]

var FULL_CURRENT_DATE = new Date();

var CURRENT_DATE = {
    day: FULL_CURRENT_DATE.getDate(), // 1-30(~)
    month: FULL_CURRENT_DATE.getMonth()+1, //0-11
    year: FULL_CURRENT_DATE.getFullYear(), //2017
    day_in_week: FULL_CURRENT_DATE.getDay() //0-6
}

class Calendar {
    constructor(date) {
        date = date || CURRENT_DATE;

        date.month--; //Ajustar acceso al array;
        this.current = Object.assign({}, date);
        this.isLeap = date.year % 4 == 0;
    }
    month(m){
        if(m<0 || m>11) throw 'Mes incorrecto';
        var month = MONTHS[m];
        return month;
    }
    get toDays(){
        var date = this.current;
        var days = date.day;
        //Suma los dias de los meses
        for(var i=0; i<date.month; i++){
            days += this.month(i).days;
        }
        //Suma los dias del año
        days += Math.floor(date.year * 365.25);

        //Sumar dias bisiestos;
        if( ( (date.month<2 && date.day <=29) ||(date.month <1) ) && ( this.isLeap ) ) {
            days--;
        }

        return days;
    }
}


function remainingDays(datesA, dateB){
    dateB = dateB || CURRENT_DATE;
    var calB = new Calendar(dateB);
    for(var i=0; i<datesA.length; i++){
        var dateA = datesA[i];
        var calA = new Calendar(dateA);
        datesA[i].remaining =  calB.toDays -calA.toDays;
    }
}
module.exports = Calendar;
module.exports.remainingDays = remainingDays;
