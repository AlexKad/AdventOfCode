function fillingContainers(){
	var containers = $('#input').val().split('\n');
	var liters = 150;

	findCombinations(containers,liters);

	var res = 0;
	$('#res').text('There are '+ res+ ' combinations');
}

var sum = arr => arr.reduce((a, b) => a + b, 0);

function findCombinations(containers, liters){
	var res = [];
}