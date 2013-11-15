var timeInfo = function(goalFPS) {
	var FPS = 0, paused = true, totalFPS = 0, oldTime = 0, totalCoeff = 0, counter = 0;
	return ({
		getInfo: function() {
			if (paused === true) {
				paused = false;
				oldTime = +new Date();
				return {
					elapsed: 0,
					FPS: 0,
					avgFPS: 0,
					coeff: 0,
					avgCoeff: 0
				};
			}
			var newTime = +new Date();
			var elapsed = newTime - oldTime;
			var FPS = 1000 / elapsed;
			totalFPS += FPS;
			var coeff = goalFPS / FPS;
			totalCoeff += coeff;
			counter++;
			return {
				elapsed: elapsed,
				FPS: FPS,
				avgFPS: totalFPS / counter,
				coeff: coeff,
				avgCoeff: totalCoeff / counter
			};
		},
		pasue: function() {
			paused = true;
		}
	});
};