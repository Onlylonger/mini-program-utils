'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getUnixTimeInfo = exports.getUnixTimeInfo = function getUnixTimeInfo(unixTimeStamp) {
  if (typeof timeStamp !== 'string') throw new Error('timeStamp must be number type');
  var curDate = new Date(v * 1000);
  var year = curDate.getFullYear();
  var month = ('0' + (curDate.getMonth() + 1)).slice(-2);
  var date = ('0' + curDate.getDate()).slice(-2);
  var hours = ('0' + curDate.getHours()).slice(-2);
  var mins = ('0' + curDate.getMinutes()).slice(-2);
  var seconds = ('0' + curDate.getSeconds()).slice(-2);
  return {
    year: year,
    month: month,
    date: date,
    hours: hours,
    mins: mins,
    seconds: seconds
  };
};