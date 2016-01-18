function countIngridients(){
	var input = $('#input').val().split('\n');

	measureIngridients(input);
	var res="";
	$('#res').text('Result is ' + res);
}

function measureIngridients(input){
	var parsedIngridientsWithProperties = parseInput(input);
	findBestAmount(parsedIngridientsWithProperties);
}


function parseInput(input){
	var ing = [], line, parsed;
	for(var i=0; i<input.length; i++){
		line = input[i];
		parsed = line.match(/(\D+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/);
		ing.push({ ing: parsed[1],
		           capacity: parseInt(parsed[2]),
		           durability: parseInt(parsed[3]),
		           flavor: parseInt(parsed[4]),
		           texture: parseInt(parsed[5]),
		           calories: parseInt(parsed[6]),
		           amount:0
		       });
	}
	return ing;
}

function findBestAmount(ingr){

}