function createSchema(){
	var input = $('#input').val().split('\n');
	var schema = new Schema();
	schema.readInput(input);
	var res = schema.getSignal('a');
	$("#res").text("Result is " + res);

	schema.resetSignals();
	var newInput = $('#input').val().split('\n');
	schema.readInput(newInput);
	$("#res").text("Result is " + res+ '\n'+ 'New signal ' + schema.getSignal('a'));
}

function Schema () {
	this.input = [];
	this.signals = [];	
}

Schema.prototype.readInput = function(input) {
	this.input = input;
	while(!this.setSignals()){
		this.setSignals();
		//console.log(input.length);
	}
};

Schema.prototype.setSignals = function(){
	var line, operator, target, formula, signal;

	for(var i=0; i< this.input.length; i++){
		line = this.input[i];
		operator = this.getOperator(line);		
		formula = (line.split(' -> ')[0]).trim();
		target = (line.split(' -> ')[1]).trim();
		signal = this.setSignal(formula, operator);
		if (typeof (signal) !== "undefined") {
			this.signals[target] = signal;
			this.input.splice(i, 1);
        }
	}
	return this.input.length===0;	
}

Schema.prototype.getOperator = function(line){  //operations always uppercase
	var operator = line.match(/[A-Z]/g);
	if(operator) return operator.join('');
	return false;
}

Schema.prototype.setSignal = function(formula, operator){
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
	return res;
}

Schema.prototype.getSignal = function(target){
	return this.signals[target];
}

Schema.prototype.getSignals = function(){	
	return this.signals;
}

Schema.prototype.resetSignals = function(){	
	var me = this;
	Object.keys(me.signals).forEach(function(key) {
		me.signals[key] = undefined;
	});
	this.signals['a'] = 956;
	this.signals['b'] = 956;
}

Schema.prototype.operate = function(formula, operator){
	var args = formula.split(' '), arg1, arg2, res;
	var max = 65535;
	var signals = this.signals;
	arg1 = isNaN(parseInt(args[0])) ? signals[args[0]]:parseInt(args[0]);
	arg2 = isNaN(parseInt(args[2])) ? signals[args[2]]:parseInt(args[2]);

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
     		arg1 = isNaN(parseInt(args[1])) ? signals[args[1]]:parseInt(args[1]); 
     		if(arg1==undefined) return undefined;
     		res = arg1^max;
     		break;	     	
     }
     return res;
}