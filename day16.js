function findAunt(){
	var input = $('#input').val().split('\n');
	
	var aunts = input.map(createAunt); 
	//part 1
	var auntSue = aunts.filter(findSue);
	//part2
	var auntSue = aunts.filter(findSue_part2);

	if(auntSue.length == 1){
		$("#res").text("Aunt Sue number " + auntSue[0].number);
	}
	else{
		$("#res").text('Aunt not founded');
	}
}

var tickerTape = {
	children:3,
	cats: 7,
	samoyeds: 2,
	pomeranians: 3,
	akitas: 0,
	vizslas: 0,
	goldfish: 5, 
	trees: 3,
	cars: 2,
	perfumes: 1
};

function createAunt(line){
	var parsed = line.match(/Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)/);
	//match(/Sue (\d+)/)[1];
	//.split(', ').map(a=> a.match(/(\w+)/));
	var aunt = {
		number: parseInt(parsed[1])
	}

	aunt[parsed[2]] = parseInt(parsed[3]);
	aunt[parsed[4]] = parseInt(parsed[5]);
	aunt[parsed[6]] = parseInt(parsed[7]);

	return aunt;
}

function findSue(aunt){
	var flag = false;
	Object.keys(aunt).forEach(function(prop){
		if(prop === 'number') return;//number of sue
		if(aunt[prop]!= undefined && aunt[prop] != tickerTape[prop]) flag=true;
	});
	return !flag;
}

function findSue_part2(aunt){
	var flag = false;
	Object.keys(aunt).forEach(function(prop){
		if(prop === 'number') return;//number of sue		
		switch(prop){
			case 'cats':
      		case 'trees':
                if(aunt[prop]!=undefined && aunt[prop] <= tickerTape[prop]) flag = true;
        		break;
            case 'pomeranians':
            case 'goldfish':
        		if(aunt[prop]!=undefined && aunt[prop] >= tickerTape[prop]) flag = true;
        		break;
      		default:
        	 	if(aunt[prop]!=undefined && aunt[prop] != tickerTape[prop]) flag = true;
        		break;
    		}
		}); 
	return !flag;
}


function sueFilter(sue) {
  var fail = false;
  Object.keys(sue).forEach( function(k){ 
    if(k=='number')return; 
    if(sue[k]!=undefined && sue[k] != tickerTape[k]) fail = true;
  });
  return !fail;
}







