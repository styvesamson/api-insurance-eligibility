exports.randomNumber = (length) => {
	var text = "";
	var possible = "123456789";
	for (var i = 0; i < length; i++) {
		var sup = Math.floor(Math.random() * possible.length);
		text += i > 0 && sup == i ? "0" : possible.charAt(sup);
	}
	return Number(text);
};


exports.baseScore = (riskQuestion) => {
	let baseScore = 0;
	for (var i = 0; i < 3; i++) {
		baseScore += riskQuestion[i];
	}
	return baseScore;
};

exports.updateStatus = (obj, elt, value) => {
	obj.map(function (item) {
		if (item.name === elt) {
			item.status = value;
		}
		return item;
	});
	return obj;
};

exports.updateAllScore = (obj, value, increase = false) => {
	obj.map(function (item) {
		if (increase) {
			item.score += value;
		} else {
			item.score -= value;
		}
		return item;
	});
	return obj;
};

exports.updateScore = (obj, elt, value, increase = false) => {
	obj.map(function (item) {
		if (item.name === elt) {
			if(increase){
				item.score += value;
			}else{
				item.score -= value;
			}
		}
		return item;
	});
	return obj;
};


exports.scoreResult = (obj) => {
	obj.map(function (item) {
		if(item.status === ""){
			if (item.score <= 0 ) {
				item.status =  "economic";
			}
			if (1 <= item.score <= 2 ) {
				item.status =  "regular";
			}
			if (item.score >= 3 ) {
				item.status =  "responsible";
			}
		}
		return item;
	});
	return obj;
};


// Format Response
exports.formatResponse = (obj) => {
	let resp = {};
	for (var key in obj) {
		resp[obj[key].name] = obj[key].status;
	}
	return resp;
};
