// 0 => Jan 1st 1970 00:00:00 am

var date = new Date();

// Today is 11/10/2017 21:03:00
// console.log(date) // 1510527885017
// console.log(date.getMonth()); // 10
// console.log(date.getDay()); // 11
// console.log(date.getFullYear()); // 2017
// console.log(date.getHours()); // 21
// console.log(date.getMinutes()); // 3
// console.log(date.getSeconds()); // 55

/**
 *  Moment.js -> https://momentjs.com/ -> npm install moment --save
 */ 

 const moment = require('moment');

 var date = moment();

console.log(date); // moment("2017-11-12T21:16:53.552")
console.log(date.format()); // 2017-11-12T21:16:53-02:00
console.log(date.format('MMMM Do YYYY, h: mm: ss a')); // November 12th 2017, 9: 16: 53 pm
console.log(date.format('MMM Do YY')); // Nov 12th 17

console.log(date.format('MMM Do, YYYY')); // Nov 12th, 2017
date.add(100, 'year').subtract(9, 'months')
console.log(date.format('MMM Do, YYYY')); // Feb 12th, 2117

console.log(moment().format('h:mm a')) // 9:27 pm

var createdAt = 1234;
var date1 = moment(createdAt);
console.log(date1.format('h:mm a')); // 10:00 pm


console.log(new Date().getTime()); // 1510529693447
// mesmo que
var someTimestamp = moment().valueOf();
console.log(someTimestamp); // 1510529693447