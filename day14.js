function findBestReindeer(){
	var input = $('#input').val().split("\n");
	var testTime = 1000;
	var time = 2503;

	var deers = createDeersFromInput(input);
	//part 1
	//var winnerDeer = _.max(deers, function(deer){ return deer.distance = deer.countDistanceAtTime(time) });

	//part 2
	var winnerDeer = raceForTime(deers, time);

	$("#res").text('The winner is '+ winnerDeer.name+ ' with result ' + winnerDeer.racingPoints);
}



function createDeersFromInput (input) {
	var deers = [], parsedLine;
	input.forEach(function(line){
		parsedLine = line.match(/(\D+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./);
		deers.push(new Reindeer(parsedLine[1], parsedLine[2], parsedLine[3], parsedLine[4]));
	});
	return deers;
}

function raceForTime(deers,time){
	var winner;
	for(var i=0;i<time; i++){
		winner = _.max(deers, function(deer){		
		 if(!deer.isRestingNow(i)){
		 	deer.distance = deer.distance + deer.speed;
		 }
		 return deer.distance;
		});
		winner.racingPoints++;
	}
	return _.max(deers, function(deer){ return deer.racingPoints});	 
}


function Reindeer(name, speed, runTime, restingTime){
	this.name =  name;
	this.speed = parseInt(speed);
	this.runTime = parseInt(runTime);
	this.restingTime = parseInt(restingTime);
	//part 2
	this.distance = 0;
	this.racingPoints = 0;	
}

Reindeer.prototype.countDistanceAtTime = function(time){
	var kms = 0;
	while(time > this.runTime){
		kms = kms + this.speed*this.runTime;
		time= time - this.runTime - this.restingTime;
	}
	if(time>0){
		kms = kms+ time*this.speed;
	}
	return kms;
}

Reindeer.prototype.isRestingNow = function(currTimeInSec){
	var iteration = this.runTime + this.restingTime;
	var iterationCount = Math.floor(currTimeInSec/iteration);

	var time = currTimeInSec - iteration* iterationCount;
	if(time< this.runTime){
		return false;
	}
	else{
		if(this.name=="Comet")
		console.log(this.name+" " + this.distance);
	} return true;
}

