function testPerformance(yourFunc, howLong) {
	if (typeof howLong != 'number')
		howLong = 1000;// one second
	var startTime = new Date().getTime();
	var endTime = startTime + howLong;
	for (var i = 0; startTime < endTime; i++) {
		yourFunc();
		startTime = new Date().getTime();
	}
	var secondes = parseInt(howLong / 1000, 10);
	return (i/secondes).toFixed(2)+' f/s';
}