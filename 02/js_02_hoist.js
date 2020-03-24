function hoisted () {
	console.log(v);
	// console.log(a);
	var v = 1;
}
hoisted();

function hoisted_1 () {
	console.log(a);
	console.log(v);
	let v = 1;
}
// hoisted_1();

function hoisted_2 () {
	let v;
	console.log(v);
}
hoisted_2();

var regular_joe = 'regular joe is assigned';
function prison () {
	console.log(regular_joe);
	var regular_joe;
}
prison();

var regular_joe_1 = 'regular joe 1 is assigned';
function prison_1 ( regular_joe_1 ) {
	console.log( regular_joe_1 );
	var regular_joe_1;
	console.log( regular_joe_1 );
}
prison_1('the regular_joe_1 argeument');