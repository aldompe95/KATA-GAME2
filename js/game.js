"use strict";

//Just numbers
function isNumber(evt){
  evt = evt || window.event;
  var charCode = evt.which || evt.keyCode; 
  return charCode <= 31 || (charCode >= 48 && charCode <= 57);
}
//Paste and drop disable
window.onload = function(){ 
  var rows = document.querySelector('.rows');
  var columns = document.querySelector('.columns');
  columns.ondrop = rows.ondrop = columns.onpaste = rows.onpaste = function disableEnvent(){return false;} 
}
//Max number
function maxNumber(number){
  return (number <= 30);
}