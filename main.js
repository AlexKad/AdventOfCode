//day 6 
function lightUp(){
  var line,
      lights = initArray(1000, 1000),
      instructions = $('#input').val().split('\n');

  for(var i=0; i<instructions.length; i++){
    line = instructions[i].split(' ');
    switch(line[0]){
      case 'turn':
        if(line[1]==='on'){
           turnLight(lights, line[2], line[4], true);
        }
        if(line[1]==='off'){
           turnLight(lights, line[2], line[4], false);
        }
        break;
        case 'toggle':
          turnLight(lights, line[1], line[3]);
          break;
    }
  }
  var res = countLights(lights);
  $("#res").text("Result is " + res);
}

function initArray(rows,columns){
  var arr = new Array(rows);
   for (var i = 0; i < rows; i++) {
       arr[i] = new Array(columns);
   }
   for(var i=0; i<rows; i++){
      for(var j=0; j<columns; j++){
        arr[i][j] = false;
      }
   }
   return arr;
}

function turnLight(arr, fr, t, flag){
  var count = 0;
  var from = { x:Math.min(fr.split(',')[0], t.split(',')[0]),
               y:Math.min(fr.split(',')[1], t.split(',')[1])};

  var to = { x:Math.max(fr.split(',')[0], t.split(',')[0]),
             y:Math.max(fr.split(',')[1], t.split(',')[1])};

  for(var x=from.x; x<=to.x; x++){
    for(var y=from.y; y<=to.y; y++){
      if(flag === undefined){
        arr[x][y] = arr[x][y]===undefined? true: !arr[x][y];
      }
      else{
         arr[x][y]= flag;
      }
    }
  }  
}

function countLights(lights){
  var res = 0;
  for(i=0; i<1000; i++){
    for(var j=0; j<1000; j++){
      if(lights[i][j]=== true) ++res;
    }
  }
  return res;
}

//day 5
function count(){
  var text = $('#input').val();
  var res = countNiceStrings(text);
  $("#res").text("Result is " + res);
}


function countNiceStrings(str){
  var lines = str.split('\n'),line,
      forbiddenStr = ['ab','cd','pq','xy'],
      containsForbidden = false;     
      res = 0;

  for(var i=0; i<lines.length; i++){
    line = lines[i];
    vowels = 0;
    doubleLeter = false;

    containsForbidden = containsSubstringArr(line, forbiddenStr);
   
    if(containsForbidden){
      containsForbidden = false;     
      continue;
    }

    if(countVowels(line) < 3){
        continue;
    }   
    for(var j=0; j<line.length; j++){           
        if(line[j] === line[j+1]){
             res++;
             break;
        }           
    }
  }  
  return res;
}

function containsSubstringArr(str, arr){
  var substring;
  for (var i = 0; i != arr.length; i++) {
    substring = arr[i];
    if (str.indexOf(substring) != - 1) {
             return true;
    }
  }
  return false; 
}

function countVowels(str) {
  var m = str.match(/[aeiou]/gi);
  return m === null ? 0 : m.length;
}

//day 4
function findNumber(str){
  var startStr = str;
  var number = 0;
  var fullStr, hash,found = false;

  while(!found){
     fullStr = startStr.toString()+ number.toString();
     hash = CryptoJS.MD5(fullStr).toString();
     if(hash.slice(0,5) === '00000'){
        found = true;
     }
     else{
      number++;
     }
  } 
  return number;
}


//day 3
function countLocation(str){
  var alreadyVisited = [{x:0, y:0}];
  var loc = {x:0, y:0};
  var houses=1;
  var flag = false;

  for(var i=0; i< str.length; i++){
    switch(str[i]){
       case ">":
        loc.x = loc.x+1;
        break;
      case "<":
        loc.x = loc.x-1;
        break;
      case "^":
        loc.y = loc.y+1;
        break;
      case "v":
        loc.y = loc.y-1;
        break;
       }
    flag = _.find(alreadyVisited, function(el){return el.x === loc.x && el.y===loc.y});
    if(!flag){
      houses++;
    }
    alreadyVisited.push(jQuery.extend(true, {}, loc));
    flag = false;
  }
  return houses;
}

