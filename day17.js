function fillingContainers(){
	containers = $('#input').val().split('\n').map(cont => parseInt(cont));
	var liters = 150;	
	var res = findCombinations(liters, containers.length);	
	$('#res').text('There are '+ res+ ' combinations');
}

var containers;

function findCombinations(liters, length, i){
	i = i || 0;
	if(length<0){
		return 0;
	} else if(liters ===0){
		return 1;
	}
	else if(i === containers.length || liters < 0){
		return 0;
	} else {
		return findCombinations(liters, length, i+1) + findCombinations(liters - containers[i], length-1, i+1);
	}
}