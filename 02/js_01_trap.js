/**
 * 可以在函数中声明全局变量，只要省略var关键字即可
 */

// wrong
/*function prison () {
	for ( i = 0; i < 10; i ++ ) {
		// ...
	}
}
prison();
console.log(i);
delete global.i;*/

// permissible
/*function prison () {
	for ( var i = 0; i < 10; i ++ ) {
		// ...
	}
}
prison();
console.log(i);*/

// best
/*function prison () {
	var i;
	for ( i = 0; i < 10; i ++ ) {
		// ...
	}
}
prison();
console.log(i);*/