'use strict'
var NAME_DAYS = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
var MONTHS= {1:{name: 'Enero', daysNumber: 31}, 2:{name: 'Febrero', daysNumber: 28}, 3:{name: 'Marzo', daysNumber: 31 },
        4:{name: 'Abril', daysNumber: 30 }, 5:{name: 'Mayo', daysNumber: 31 }, 6:{name: 'Junio',daysNumber: 30 },
        7:{name: 'Julio', daysNumber: 31 }, 8:{name: 'Agosto', daysNumber: 31 }, 9:{name: 'Septiembre', daysNumber: 30 },
        10:{name: 'Octubre', daysNumber: 31}, 11:{name: 'Noviembre', daysNumber: 30 }, 12:{name: 'Diciembre', daysNumber: 31 }}

var FULL_CURRENT_DATE = new Date();

var CURRENT_DATE = {
    day: FULL_CURRENT_DATE.getDate(), // 1-30(~)
    month: FULL_CURRENT_DATE.getMonth()+1, //1-12
    year: FULL_CURRENT_DATE.getFullYear(), //2017
    day_in: FULL_CURRENT_DATE.getDay() //0-6 //Numero de dia con respecto a la semana
}

class Calendar {
    constructor(date) { // date => {day: int, month: int, year: int, day_in: int}
        date = (date == undefined)? CURRENT_DATE: date;
        this.date = Object.assign({}, date);
        this.isLeap = date.year % 4 == 0;
    }
    month(m){
        m = (m==undefined)? this.date.month: m;
        if(m<0 || m>11) throw 'Mes incorrecto';
        var month = Object.assign({},MONTHS[m]);
        if(m==2 && this.isLeap){
            month.daysNumber=29;
        }
        month.date = m;
        return month;
    }
    remainingDays(finalDates){ //Dias que dalta desde un dia (this) hasta x dias finales (finalDates)
        for(var i=0; i<finalDates.length; i++){
            var finalDate = new Calendar(finalDates[i]);
            // console.log("Calendario final", finalDate);
            finalDates[i].remaining = finalDate.toDays - this.toDays;
        }
    }
    nextDays(n){
        var pointer = new Calendar(this.date);
        // console.log("pointer",pointer);
        var months = [];
        while(n>0){
            var month = pointer.month()
            var infoMonth = {
                date: month.date,
                name: month.name,
                year: pointer.year
            }
            //Dias restantes para que termine el mes
            var restOfDays = (month.daysNumber - pointer.day)+1
            // console.log("Duas a mostrar",restOfDays)
            if(restOfDays>n){ //hay mas dias restantes del mes que días que mostrar;
                infoMonth.days =  pointer._moveDays(n);
                n=0;
            }else { //Se cambia de mes

                infoMonth.days = pointer._moveDays(restOfDays);
                pointer._moveMonth();
                n -= restOfDays;
            }
            months.push(infoMonth);
        }
        return months;
    }
    //Metodos getter
    get year(){
        return this.date.year;
    }
    get toDays(){
        var date = this.date;
        var days = date.day;
        //Suma los dias de los meses
        for(var i=1; i<date.month; i++){
            var tmp = this.month(i).daysNumber;
            days += tmp;
        }
        //Suma los dias del año contanto los años bisiestos
        days += Math.floor(date.year * 365.25);

        if(this.isLeap) {
            //en caso de que la fecha sea inferior al dia bisiesto se resta un dia
            //pues para fechar inferiores a 29-2 se aplica multiplicando por 365.25
            //y para fechar superiores se aplica sumando 29 dias de febrero
            days--;
        }
        return days;
    }
    get day(){
        return this.date.day;
    }

    //Methodos privados
    _moveMonth(){
        if(++this.date.month>11){
            this.date.year++;
            this.date.month = 1; //Mes de enero
        }
        this.date.day= 1;
    }
    _moveDays(n){ //Genera un array con los dias desde (dia de calendario - n dias) dentro de un mes
        var days = new Array(n)
        for(var i=0; i<n; i++){

            days[i] = {
                date: this.date.day++,
                name: NAME_DAYS[(this.date.day_in++)%7]
            }
        }
        return days;
    }
}

module.exports = Calendar;
