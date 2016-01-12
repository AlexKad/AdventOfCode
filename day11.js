function findPassword(){
	var input = $("#input").val();
	var res = "";
	while(!isValidPassword(input)){
		input = incrementStr(input);		
	}
	res=input;
	$("#res").text("Result is "+ res);
}


function incrementStr(input){
	var alphabet="abcdefghijklmnopqrstuvwxyz".split('');
	var lastChar, index;
	input = input.trim().toLowerCase();

	lastChar = input[input.length-1];
    index = alphabet.indexOf(lastChar);

	if(index+1 < alphabet.length){			
		return input.slice(0, input.length-1) + alphabet[index+1];
	}
	else{ // iteratively increment previous char
		return incrementStr(input.slice(0, input.length-1)) + alphabet[0];
	}
}

function isValidPassword(input){
	var is3IncreasingChain = false,
		deprecatedFound = false,
		differentPairsCount = 0,
		pairs = [];
		deprecated = ['i','o','l'];

   	if(input.length < 4 ){   		
   		return false;
   	}
	deprecated.forEach(function(el){ if(input.indexOf(el)>-1) deprecatedFound = true;});
	if(deprecatedFound) { return false; }

	for(var i=0; i<input.length; i++){
		if(input[i] == input[i+1] && pairs.indexOf(input[i])=== -1) {
			pairs.push(input[i]);
			differentPairsCount++;
		}		
	}

	for(var i=0; i<input.length-2; i++){		
		if(input[i] == String.fromCharCode(input.charCodeAt([i + 1]) - 1) && 
		   input[i] == String.fromCharCode(input.charCodeAt([i + 2]) - 2)) {
			is3IncreasingChain = true;
			break;
		}
	}
	if(is3IncreasingChain && differentPairsCount>1){
		return true;
	}	
	return false;
}