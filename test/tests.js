'use strict'
let Calendar = require('../calendar');

describe('Calendar Utils',function(){
    it('10 remaining days respect 20/2/2016 - 1/3/2016',function(){
        var current_date = new Date();

        var dateA = [{day:20, month:2, year: 2016}]
        Calendar.remainingDays(dateA, {day:1, month:3, year: 2016});
        dateA[0].remaining.should.be.equal(10);
    });
    it('Not 365 remaining days respect 1/1/2016 - 1/1/2017',function(){
        var current_date = new Date();

        var dateA = [{day:1, month:1, year: 2016}]
        Calendar.remainingDays(dateA, {day:1, month:1, year: 2017});
        dateA[0].remaining.should.not.be.equal(365);
    });
});
