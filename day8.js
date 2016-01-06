function countChars(){
	var input = $('#input').val().split('\n');

	var line, realLength=0, length=0;
	for(var i=0; i<input.length; i++){
		line = input[i];
		length = length + line.length;
		realLength = realLength + eval(line).length;		
	}
	res = length - realLength;
	$("#res").text("Result is " + res + '\n');
}