function findShortestWay(){
  var input = $('#input').val().split('\n');

  var locations = getPlaces(input);
  var possibleRoutes = getPermutationsFromLocations(locations);
  countDistance(possibleRoutes, locations);

  //var res = renderAllDistances(possibleRoutes);
  var res = getMinimumRoute(possibleRoutes);
  
  $("#res").text("Result is " + res + '\n');

}

//parse input to object {from:'', to:'', value:''}
function getPlaces(input){ 
  var line, parsed, locations= [];
  for(var i=0; i<input.length; i++){
    line = input[i];
    parsed = line.match(/(\D+) to (\D+) = (\d+)/);
    locations.push({from:parsed[1], to:parsed[2], value:parsed[3]});
  }
  return locations;
}

// create array of places and make permutations for them
function getPermutationsFromLocations(locations){ 
  var cities = [];
  _.map(locations, function(el){ cities.push(el.from); cities.push(el.to)});
  cities= _.uniq(cities);
  return permutate(cities);
}

function countDistance(possibleRoutes, locations){
  var route;
  possibleRoutes.forEach(function(el){
    route = null;
    el.dist = 0;
   for(var i=0; i<el.length-1;i++){
    route = _.findWhere(locations, {from:el[i], to:el[i+1]}) || _.findWhere(locations, {to:el[i], from:el[i+1]});    
    if(!route) return 0;
    el.dist = el.dist + parseInt(route.value);
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
  var min = possibleRoutes[0].dist;
  possibleRoutes.forEach(function(el){ if (el.dist < min) min = el.dist});
  return min;
}


function renderAllDistances(possibleRoutes){
  return  possibleRoutes.reduce(function(str, el){
   return str + el.reduce(function(st, place) { return st + ' -> ' + place; }, "") 
     + " = " + el.dist ; },'');
}