function findAunt(){
	var input = $('#input').val().split('\n');

	var res ="";
	$("#res").text("Aunt number " + res);
}

var tickerTape = {
	children:3,
	cats: 7,
	pomeranians: 3,
	akitas: 0,
	vizslas: 0,
	goldfish: 5, 
	trees: 3,
	cars: 2,
	perfumes: 1
};

function parse(line){
	var parsed = line.match(/Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)/);
	//match(/Sue (\d+)/)[1];
	//.split(', ').map(a=> a.match(/(\w+)/));
	var aunt = {
		number: parseInt(parsed[1])
	}

	aunt[parsed[2]] = parseInt(parsed[parsed[3]]);
	aunt[parsed[4]] = parseInt(parsed[parsed[5]]);
	aunt[parsed[6]] = parseInt(parsed[parsed[7]]);

	return aunt;
}

function findSue(aunts){
	var findedAunt;
	
	Object.keys(aunt).forEach(prop => 
		if(prop === 'number') return;//number of sue
		if(aunt[prop] && aunt[prop] == tickerTape[prop]) {
			findedAunt = aunt;
			return;
		}
	})

}