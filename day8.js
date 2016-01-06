function countChars(){
	var input = $('#input').val().split('\n');

	res = countFirstPart(input);
	//res = countSecondPart(input);

	$("#res").text("Result is " + res + '\n');
}


// the number of characters of code for string literals
// minus the number of characters in memory for the values of the strings
function countFirstPart(input){
	var line, realLength=0, length=0;
	for(var i=0; i<input.length; i++){
		line = input[i];
		length = length + line.length;
		realLength = realLength + eval(line).length;		
	}
	return length - realLength;
}

// the total number of characters to represent the 
// newly encoded strings minus the number of characters of code in each original string literal
function countSecondPart(input){
	var line, encodedLength=0, length=0;
	for(var i=0; i<input.length; i++){
		line = input[i];
		length = length + line.length;
		encodedLength = encodedLength + JSON.stringify(line).length;		
	}
	return encodedLength - length;
}

