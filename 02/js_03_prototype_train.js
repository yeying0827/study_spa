var proto = {
	sentence: 4,
	probation: 3
};

var makePrisoner = function( name, id ) { // 工厂函数，创建了囚犯对象。封装了创建方式。
    var prisoner = Object.create( proto );
    prisoner.name = name;
    prisoner.id = id;

    return prisoner;
}
var firstPrisoner = makePrisoner( 'Joe', 12 );
var secondPrisoner = makePrisoner( 'Sam', 34 );

console.log( firstPrisoner.sentence );
console.log( firstPrisoner.__proto__.sentence );
firstPrisoner.sentence = 10;

console.log( firstPrisoner.sentence );

console.log( firstPrisoner.__proto__.sentence );
delete firstPrisoner.sentence; // 为了使获取到的属性回到原型的值，将属性从对象上删除

console.log( firstPrisoner.sentence );
console.log( firstPrisoner.__proto__.sentence );
console.log( secondPrisoner.sentence );

proto.sentence = 5;
console.log( firstPrisoner.sentence );
console.log( secondPrisoner.sentence );

console.log( '===========================================' );
console.log( firstPrisoner ); // { name: 'Joe', id: 12 }
console.log( firstPrisoner.__proto__ ); // { sentence: 5, probation: 3 }
console.log( firstPrisoner.__proto__.__proto__ ); // {}
console.log( firstPrisoner.__proto__.__proto__.__proto__ ); // null
console.log( firstPrisoner.__proto__.__proto__.__proto__.__proto__ ); // TypeError: Cannot read property '__proto__' of null