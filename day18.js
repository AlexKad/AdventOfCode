function turnLights(){
	var input = $('#input').val().split('\n');
	var iteration = 100;

	var res = iterate(input, iteration);	
	$('#res').text("There are " + res + " lights turn on.");
}

function countState(i,j, arr){
	var currentState = arr[i][j];
	var flag = 0;

	//part 2 corners always turned on
	if(i == 0 && j==0 ||
		i==0 && j==arr.length-1 ||
		i==arr.length-1 && j==0 ||
		i==arr.length-1 && j==arr.length-1){
			return '#';
	}
	
	//part 1
	for(var k=i-1; k <= i+1; k++){
		for(var m=j-1; m <= j+1; m++){
			if(k==i && m == j || arr[k]==undefined) continue;
			else{
				if(currentState == '#' && arr[k][m] == "#") flag++;
				else if(currentState == "." && arr[k][m] == "#") flag++;
			}
		}
	}

	if(currentState == '#' && (flag==2 || flag==3)) return "#";
	if(currentState == '.' && flag == 3) return '#';
	return '.';
}

function iterate(arr, iteration){
	var sum = 0;
	var newArr = arr.slice(0);
	for(var i=0; i<iteration; i++){
		for(var a=0; a<arr.length;a++){
			for(var b=0; b<arr.length; b++){
				newArr[a] = newArr[a].substr(0, b) + countState(a,b, arr) + newArr[a].substr(b+ 1);				
				if(i==iteration-1 && newArr[a][b] == '#') sum++;
			}
		}
		arr = newArr.slice(0);
		console.log(arr.reduce(function(sum, el){return sum+el+'\n';},""));		
	}
	return sum;
}