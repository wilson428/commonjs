//log-base-N
function logN (N, base) {
	base = typeof (base) !== "undefined" ? base : 10;
	return Math.log(N) / Math.log(base);
}

//random integer
function randInt(N) {
	return Math.floor(N * Math.random());
}
