function turnLights(){
	var input = $('#input').val().split('\n');
	var iteration = 100;

	var res = iterate(input, iteration);	
	$('#res').text("There are " + res + " lights turn on.");
}

function countState(i,j, arr){
	var currentState = arr[i][j];
	var flag = 0;
	var startStateX = i-1<0 ? i: i-1;
	var endStateX = (i+1)<arr.length ? i+1 : i;
	var startStateY = j-1<0 ? j : j-1;
	var endStateY = (j+1)<arr.length ? j+1 : j;

	for(var k=startStateX; k <= endStateX; k++){
		for(var m=startStateY; m <= endStateY; m++){
			if(k==i && m == j) continue;
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
				if(i==iteration-1 && arr[a][b] == '#') sum++;
			}
		}
		arr = newArr.slice(0);
		console.log(arr.reduce(function(sum, el){return sum+el+'\n';},""));		
	}
	return sum;
}