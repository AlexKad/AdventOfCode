function createSchema(){
	var input = $('#input').val().split('\n');
	var schema = new Schema();
	schema.setSignals(input);
	var res = schema.getSignal('a');
	$("#res").text("Result is " + res);
}

function Schema () {
	this.input = [];
	this.signals = [];	
}

Schema.prototype.setSignals = function(input){
	this.input = input;
	var lines = this.input;
	var line, operator,target, formula;

	for(var i=0; i< lines.length; i++){
		line = lines[i];
		operator = this.getOperator(line);		
		formula = (line.split(' -> ')[0]).trim();
		target = (line.split(' -> ')[1]).trim();
		this.setSignal(formula,target, operator);
	}
}

Schema.prototype.getOperator = function(line){  //operations always uppercase
	var operator = line.match(/[A-Z]/g);
	if(operator) return operator.join('');
	return false;
}

Schema.prototype.setSignal = function(formula, target, operator){
	var res;
	if(operator){
		res = this.operate(formula, operator);
	}
	else{
		if(!isNaN(parseInt(formula))) {
			res = parseInt(formula);
		}
		else {
		    res = this.signals[formula];
		}
	}
	
	if(res!=undefined) this.signals[target] = res;
}

Schema.prototype.getSignal = function(target){
	return this.signals[target];
}

Schema.prototype.getSignals = function(){	
	return this.signals;
}

Schema.prototype.operate = function(formula, operator){
	var args = formula.split(' '), arg1, arg2, res;
	var max = 65535;
	var signals = this.signals;
	arg1 = signals[args[0]];
	arg2 = signals[args[2]];

     switch(operator){
     	case 'AND':
     		if(arg1==undefined || arg2==undefined) return undefined;
     		res = arg1&arg2;
     		break;
     	case 'OR':
     		if(arg1==undefined || arg2==undefined) return undefined;
     		res = arg1|arg2;
     		break;
     	case 'LSHIFT':
     		if(arg1==undefined) return undefined;
     		res = arg1<<args[2];
     		break;
     	case 'RSHIFT':
     		if(arg1==undefined) return undefined;
     		res = arg1>>args[2];
     		break;
     	case 'NOT':
     		if(signals[args[1]]==undefined) return undefined;
     		res = signals[args[1]]^max;
     		break;	     	
     }
     return res;
}