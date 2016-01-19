

function countIngridients(){
	var input = $('#input').val().split('\n');
	var spoonNum = 100;

	var res = measureIngridients(input, spoonNum);	
	
	$('#res').text('Result is ' + res);
}

function parseInput(input){
	var ing = [], parsed;
	for(var i=0; i<input.length; i++){		
		parsed = input[i].match(/-?\d+/g); //find all numbers
		ing.push(parsed);
	}
	return ing;
}

function measureIngridients(input, spoonNum){
	var ingrs = parseInput(input);
	return findBestAmount(ingrs, spoonNum);
}



var sum = arr => arr.reduce((a, b) => a + b, 0);

// return array with array.Length = arrLength, sum of elements == total 
function* measure(total, arrLength, res) {	
    if(res === undefined) res = [];

    var partialSum = sum(res);
    for (var i = 1; i < total - partialSum - (arrLength - 1) + 1; i++) {
        var resNew = [...res, i]; //first elem of array
        if (arrLength > 2) {
            yield* measure(total, arrLength - 1, resNew);
        } else {
            resNew.push(total - partialSum - i);
            //console.log( resNew.reduce(function(str, el){ return str+ ' ' + el}, "") );
            yield resNew;
        }
    }
}



function findBestAmount(ingrs, spoonNum) {
    var max = -Infinity,
    	countedIngrs, propSum, score, calories;

    for (var spoonsAmount of measure(spoonNum, ingrs.length)) {

		countedIngrs = ingrs.map((ingr, i) => ingr.map(prop => prop * spoonsAmount[i]));
        calories = countedIngrs.map(ingr => ingr.pop()); //exclude calories

        
        propSum = countedIngrs.reduce((sum, el) => sum.map((prop, i) => prop + el[i]));
        score = propSum.reduce((acc, propSum) => acc * Math.max(propSum, 0), 1);

        if (score > max) {
            max = score;
        }
    }

    return max;
}