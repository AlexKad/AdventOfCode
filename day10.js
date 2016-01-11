function playLookAndSay(){
  var input = $('#input').val();
   
  var resStr = playManyTimes(input, 50); 

  $("#res").text("Result is " + resStr.length + '\n');

}

function countString(input){
	var newStr = "", flag = 0, currNum = input[0];
	for(var i=0; i<input.length; i++){
		if(currNum == input[i]){
			flag++;
		}
		else{
			newStr = newStr + flag + currNum;
			currNum = input[i];
			flag = 1;
		}	
	}
	newStr = newStr + flag + currNum;
	return newStr;	
}

function playManyTimes(input,times){
	var str = input;
	for(var i=0; i<times; i++){
		str = countString(str);
		//console.log(str);
	}
	return str;
}

