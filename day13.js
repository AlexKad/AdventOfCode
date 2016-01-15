function fillTable(){
  var input = $('#input').val().split('\n');
  var guests = createGuests(input);

  //Part 2
  addMe(guests);

  var possibleRoutes = getPermutationsFromGuests(guests);
  countHappiness(possibleRoutes, guests);

  //console.log(renderAllDistances(possibleRoutes));
  var res = getMaximumRoute(possibleRoutes);
  
  $("#res").text("Result is " + res + '\n');

}

//parse input to object {from:'', to:'', value:''}
function createGuests(input){ 
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
  return permutate(getGuestsNames(guests));
}

function getGuestsNames(guests){
  var names = [];
  _.map(guests, function(el){ names.push(el.from); names.push(el.to)});
  names= _.uniq(names);
  return names;
}

function countHappiness(possibleRoutes, guests){
  var leftguest, rightguest, currHapp = 0;
  possibleRoutes.forEach(function(el){
    leftguest = null;
    rightguest = null;
    currHapp = 0;
    el.happiness = 0;

   for(var i=0; i<el.length;i++){
     leftguest = _.findWhere(guests, {from:el[i], to:el[i>0? i-1: el.length-1]});
     rightguest = _.findWhere(guests, {from:el[i], to:el[i == el.length-1? 0: i+1]});
    if(!leftguest || !rightguest) return 0;
    currHapp = parseInt(leftguest.value) + parseInt(rightguest.value);
    el.happiness = el.happiness + currHapp;
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
     + " = " + el.happiness +"\n"; },'');
}

function addMe(guests){
  var names = getGuestsNames(guests);
  var myName = 'Alex';
  for(var i=0; i<names.length; i++){
    guests.push({from:myName, to:names[i], value: 0});
    guests.push({from:names[i], to:myName, value: 0});
  }
}

