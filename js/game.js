//Just numbers
function isNumber(evt){
  evt = evt || window.event;
  var charCode = evt.which || evt.keyCode; 
  return charCode <= 31 || (charCode >= 48 && charCode <= 57);
}
//Paste disable
window.onload = function(){ 
  var rows = document.querySelector('.rows');
  var columns = document.querySelector('.columns');
  rows.onpaste = function(e){e.preventDefault();}
  columns.onpaste = function(e){e.preventDefault();} 
}
