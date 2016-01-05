 function lightUp(){
    var input = $('#input').val().split('\n').filter(function(str){return str.length>0});
    var commands = input.map(parseCommand);    
    var lightedGrid = commands.reduce(applyCommand, []);
    var res = lightedGrid.reduce(function(count, row){
      var currentRowCount = row.reduce(function(sum,el){ return sum + el;},0); 
      return count + currentRowCount;
    },0);
    $("#res").text("Result is " + res);
 }
 
function parseCommand(text) {
  var parsed = text.match(/(.*) (\d+),(\d+) through (\d+),(\d+)/);
  return { 
    action : parsed[1], 
    start : { x: Math.min(parsed[2],parsed[4]), y: Math.min(parsed[3],parsed[5])}, 
    end :   { x: Math.max(parsed[2],parsed[4]), y: Math.max(parsed[3],parsed[5])} 
  }
}

function applyCommand(arr, command) {
  for (var x=command.start.x; x<=command.end.x; x++ ) {
    for (var y=command.start.y; y<=command.end.y; y++ ) {
      if (arr[x] == undefined) arr[x] = [];
      if (arr[x][y] == undefined) arr[x][y] = false;
      switch(command.action) {
        case "turn on":
          arr[x][y] = arr[x][y]+1;
          break;
        case "turn off":
          arr[x][y] = arr[x][y]>1? arr[x][y]-1:0;
          break;
        case "toggle":
          arr[x][y] = arr[x][y]+2;
          break;
      }
    }    
  } 
  return arr;
}