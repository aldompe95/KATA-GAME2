"use strict";
//while this variable is true you can activate cells
var active = true;
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
function maxNumber(number){return (number <= 30);}
//Create world
function createWorld(){
  var rows = document.querySelector('.rows').value;
  var columns = document.querySelector('.columns').value;
  if (maxNumber(rows) == false || maxNumber(columns) == false){ //I dont know how to do this without if
    alert("Max 30");
    return false;
  }
  createMatrix(rows,columns);
}
//Create matrix
function createMatrix(y,x){
  var e = eval;
  e("matrix = new Array("+y+")");
  e("mirror = new Array("+y+")");
  for (var i = 0; i < y; i++){
    e("matrix"+i+" = new Array("+x+")");
    e("mirror"+i+" = new Array("+x+")");
    for (var j = 0; j < x; j++){
      e("matrix" + i + "[" + j + "] = 0");
      e("mirror" + i + "[" + j + "] = 0");
    };
    e("matrix["+i+"] = matrix"+i);
    e("mirror["+i+"] = matrix"+i);
  }
  printMatrix(matrix);
}
//Print matrix
function printMatrix(matrix){
  var html = "<table>";
  for (var i = 0; i < matrix.length; i++){
    html += "<tr>";
    for (var j = 0; j < matrix[0].length; j++){
      html += ({
        0: "<td class='cell' onclick='activeCell("+i+","+j+","+active+")'>" +"</td>",
        1: "<td class='cell active' onclick='activeCell("+i+","+j+","+active+")'>" +"</td>"
      })[matrix[i][j]];
    }
    html += "</tr>";
  }
  html += "</table>";
  html += " <button onclick='startGame()' type='button'>PLAY</button>";
  document.querySelector(".world").innerHTML = html;
}
//Active cells
function activeCell(x,y,active){
  if(active == true){ //I dont know how to do this without if(is the same problem)
    matrix[x][y] = ({0: 1, 1: 0})[matrix[x][y]];
    printMatrix(matrix);
  }
}
//Start game
function startGame(){
  active = false; // You cant active cells anymore :(
  for (var i = 0; i < matrix.length; i++){
    for (var j = 0; j < matrix[0].length; j++){
      var neighbours = checkNeighbours(i,j);
      (neighbours < 2) && (function(){mirror[i][j] = 0})();
      (neighbours > 3) && (function(){mirror[i][j] = 0})();
      (neighbours == 3) && (function(){mirror[i][j] = 1})();
    }
  }
  mirroring(mirror);
  printMatrix(matrix);
  setTimeout(function(){startGame(matrix)},1000); // 1000ms = 1s
}
//Check neighbours
function checkNeighbours(i,j){
  var n = 0;
  //LEFT
  (j - 1 >= 0) && ((matrix[i][j-1]) && (function(){n += 1;})());
  //RIGHT
  (j + 1 < matrix[0].length) && ((matrix[i][j+1]) && (function(){n += 1;})());
  //TOP
  (i - 1 >= 0) && ((matrix[i-1][j] == 1) && (function(){n += 1;})());
  //BOTTOM
  (i + 1 < matrix.length) && ((matrix[i+1][j] == 1) && (function(){n += 1;})());
  //TOP LEFT
  var a = i-1;
  (i - 1 >= 0) && ((j - 1 >= 0) && ((matrix[a][j-1] == 1) && (function(){n += 1;})() ));
  //TOP RIGHT
  (i - 1 >= 0) && ((j + 1 < matrix[0].length) && ((matrix[a][j+1] == 1) && (function(){n += 1;})()));
  //BOTTOM-LEFT
  var b = i+1;
  (i + 1 < matrix.length) && ((j - 1 >= 0) && ((matrix[b][j-1] == 1) && (function(){n += 1;})()));
  //BOTTOM-RIGHT
  (i + 1 < matrix.length) && ((j + 1 < matrix[0].length) && ((matrix[b][j+1] == 1) && (function(){n += 1;})()));
  return n;
}
//mirroring matrixs
function mirroring(mirror){
  for (var i = 0; i < matrix.length; i++){
    for (var j = 0; j < matrix[0].length; j++){
      matrix[i][j] = mirror[i][j];
    }
  }
}