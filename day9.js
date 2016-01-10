function findShortestWay(){
  var input = $('#input').val().split('\n');

  res="";

  $("#res").text("Result is " + res + '\n');
}

function getPlaces(input){
  var line, parsed, locations= [];
  for(var i=0;i<input.length; i++){
    line = input[i];
    parsed = line.match(/(\D+) to (\D+) = (\d+)/);
    locations.push({from:parsed[0], to:parsed[1], value:parsed[2]]});
  }
  return locations;
}


function permutate (arr) {
  var permutations = [];
  if (arr.length === 1) {
    return [ arr ];
  }

  for (var i = 0; i <  arr.length; i++) { 
    var subPerms = permutate(arr.slice(0, i).concat(arr.slice(i + 1)));
    for (var j = 0; j < subPerms.length; j++) {
      subPerms[j].unshift(arr[i]);
      permutations.push(subPerms[j]);
    }
  }
  return permutations;
}