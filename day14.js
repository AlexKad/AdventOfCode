function findBestReindeer(){
	var input = $('#input').val().split("\n");
	var testTime = 1000;
	var time = 2503;

	var deers = createDeersFromInput(input);
	//part 1
	//var winnerDeer = _.max(deers, function(deer){ return deer.distance = deer.countDistanceAtTime(time) });

	//part 2
	var winnerDeer = raceForTime(deers, testTime);

	$("#res").text('The winner is '+ winnerDeer.name+ ' with result ' + winnerDeer.racingPoints);
}



function createDeersFromInput (input) {
	var deers = [], parsedLine;
	input.forEach(function(line){
		parsedLine = line.match(/(\D+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./);
		deers.push(new Reinder(parsedLine[1], parsedLine[2], parsedLine[3], parsedLine[4]));
	});
	return deers;
}

function raceForTime(deers,time){
	var winner;
	for(var i=1;i<=time; i++){
		winner = _.max(deers, function(deer){	 	
		 if(deer.actionTime % deer.stopAt != 0 || deer.restingTime == deer.stopLength){
		 	deer.distance = deer.distance + parseInt(deer.speed);
		 	deer.actionTime++;
		 	deer.restingTime=0;
		 }
		 else{
		 	deer.restingTime++;
		 }
		 return deer.distance;
		});
		winner.racingPoints++;
	}
	return _.max(deers, function(deer){ return deer.racingPoints});	 
}


function Reinder(name, speed, stopAt, stopLength){
	this.name =  name;
	this.speed = speed;
	this.stopAt = stopAt;
	this.stopLength = stopLength;
	//part 2
	this.distance = 0;
	this.racingPoints = 0;
	this.actionTime = 1;
	this.restingTime = 1;
}

Reinder.prototype.countDistanceAtTime = function(time){
	var kms = 0;
	while(time > this.stopAt){
		kms = kms + this.speed*this.stopAt;
		time= time - this.stopAt - this.stopLength;
	}
	if(time>0){
		kms = kms+ time*this.speed;
	}
	return kms;
}

