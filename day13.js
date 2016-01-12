function fillTable(){
  var input = $('#input').val().split('\n');

  var guests = getNames(input);
  var possibleRoutes = getPermutationsFromGuests(guests);
  countDistance(possibleRoutes, guests);

  console.log(renderAllDistances(possibleRoutes));
  //var res = getMinimumRoute(possibleRoutes);  //first part
  var res = getMaximumRoute(possibleRoutes);
  
  $("#res").text("Result is " + res + '\n');

}

//parse input to object {from:'', to:'', value:''}
function getNames(input){ 
  var line, parsed, guests= [],happiness = 1;
  for(var i=0; i<input.length; i++){
    line = input[i];
    parsed = line.match(/(\D+) would (\D+) (\d+) happiness units by sitting next to (\D+)./);
    happiness = parsed[2] == 'gain'? 1: -1;
    guests.push({from:parsed[1], to:parsed[4], value: happiness * parsed[3]});
  }
  return guests;
}

// create array of places and make permutations for them
function getPermutationsFromGuests(guests){ 
  var names = [];
  _.map(guests, function(el){ names.push(el.from); names.push(el.to)});
  names= _.uniq(names);
  return permutate(names);
}

function countDistance(possibleRoutes, guests){
  var names;
  possibleRoutes.forEach(function(el){
    name = null;
    el.happiness = 0;
   for(var i=0; i<el.length-1;i++){
    names = _.findWhere(guests, {from:el[i], to:el[i+1]});    
    if(!names) return 0;
    el.happiness = el.happiness + parseInt(names.value);
   }
 });
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

function getMinimumRoute(possibleRoutes){
  var min = possibleRoutes[0].dihappinessst;
  possibleRoutes.forEach(function(el){ if (el.happiness < min) min = el.happiness});
  return min;
}

function getMaximumRoute(possibleRoutes){
  var max = possibleRoutes[0].happiness;
  possibleRoutes.forEach(function(el){ if (el.happiness >max) max = el.happiness});
  return max;
}


function renderAllDistances(possibleRoutes){
  return  possibleRoutes.reduce(function(str, el){
   return str + el.reduce(function(st, name) { 
    return st + ' -> ' + name; }, "") 
     + " = " + el.happiness ; },'');
}