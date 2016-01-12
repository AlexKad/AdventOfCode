function countNumbersInJSON(){
	var input = $('#input').val();
	var res = "";

	res  = countSum(JSON.parse(input));

	$('#res').text("Result is " + res);
}


function countSum(obj){	
	var sum = 0;

	if(typeof(obj) === 'number') return obj;

	if(Array.isArray(obj)){
		sum = obj.reduce(function(sum,el){ 			
			return sum + countSum(el);			
		},0)
		return sum;
	}	

	if(typeof(obj) === 'object'){
		sum = Object.keys(obj).reduce(function(sum, el){			
			return sum + countSum(obj[el]); 
		}, 0);
	}
	return sum;
}
