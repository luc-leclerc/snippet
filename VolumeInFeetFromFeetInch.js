/**
 * Lame function to calculate cubed cube from feet+inch dimensions
 * 
 * @param feet1
 * @param inch1
 * @param feet2
 * @param inch2
 * @param feet3
 * @param inch3
 * @returns
 */
function vol(feet1, inch1, feet2, inch2, feet3, inch3) {
	d1 = feet1 * 12 + inch1;
	d2 = feet2 * 12 + inch2;
	d3 = feet3 * 12 + inch3;
	v = d1 * d2 * d3 / (12 * 12 * 12);
	console.log(v);
	return v;
}