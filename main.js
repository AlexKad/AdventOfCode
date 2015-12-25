
function count(){
  var text = $('#input').val();
  var res = countNiceStrings(text);
  $("#res").text("Result is " + res);
}


function countNiceStrings(str){
  var lines = str.split('\n'),line,
      forbiddenStr = ['ab','cd','pq','xy'],
      containsForbidden =false;     
      res = 0;

  for(var i=0; i<lines.length; i++){
    line = lines[i];
    vowels=0;
    doubleLeter = false;

    containsForbidden = forbiddenStr.indexOf(line.toLowerCase()) !== -1;
   
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

