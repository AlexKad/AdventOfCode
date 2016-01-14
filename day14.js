function findBestReindeer(){
	var input = $('#input').val().split("\n");
	var time = 2503;

	var deers = createDeersFromInput(input);
	//part 1
	//var winnerDeer = _.max(deers, function(deer){ return deer.res = deer.countDistanceAtTime(time) });

	//part 2
	var winnerDeer = raceForTime(deers, time);
	$("#res").text('The winner is '+ winnerDeer.name+ ' with result ' + winnerDeer.res);
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
	for(var i=0;i<deers.length; i++){
		deers[i].res = deers[i].countDistanceAtTime(time);
		console.log(deers[i].name + " " + deers[i].res);
	}
	 return _.max(deers, function(deer){ return deer.res }).name;
}


function Reinder(name, speed, stopAt, stopLength){
	this.name =  name;
	this.speed = speed;
	this.stopAt = stopAt;
	this.stopLength = stopLength;
	//part 2
	this.racingPoints = 0;
	this.timeForAction = this.stopAt;
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

