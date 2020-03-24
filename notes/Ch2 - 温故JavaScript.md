变量作用域、函数提升（function hoisting）和执行环境对象 

作用域链（scope chain） 

使用原型（prototype）创建JavaScript对象 

自执行匿名函数 

使用模块模式和私有变量 

闭包 

**编码标准和JavaScript语法** 

变量声明语块（variable declaration block）和对象字面量（object literal） 

关于变量声明语块的最佳格式：本书优先考虑在顶部声明变量但不进行定义，其次才是声明变量的同时又定义它。 

对象字面量：是指用大括号括起来的、一组以逗号分隔的属性所定义的对象。可以将属性的值设置为函数来定义方法。 

#### 2.1 变量作用域 

在JavaScript中，变量的作用域由函数限定，它们要么是全局的，要么是局部的。 

**JavaScript 1.7、1.8、1.9+和块作用域** 

兼容问题 

第一个关于JavaScript作用域的陷阱可能是，可以在函数中声明全局变量，只要省略var关键字即可。 

本书更喜欢在函数的顶部声明变量的写法，因为此时变量的作用域是相当清晰的。 

``` javascript
// 提倡写法 
function prison() { 
	var prisoner = 'I am local!', 
		warden = 'I am local too!', 
		guards = 'I am local three!' 
	; 
} 
```

使用逗号将局部变量的定义合并在一起，使之一目了然，并且可能更重要的是，不大可能会发生无意的拼写错误以及创建了全局变量而不是局部变量。同时提升可读性和可理解性。 

#### 2.2 变量提升 

在JavaScript中，当变量被声明时，声明会被提升到它所在函数的顶部，并被赋予undefined值。 

因为变量声明总是被提升到函数作用域的顶部，所以在函数的顶部声明变量总是最好的做法，更好的是使用单个var语句。 

变量如果未在局部作用域内声明，然后JavaScript引擎检查全局作用域，这叫沿着作用域链往上查找。 

#### 2.3 高级变量提升和执行环境对象 

##### 2.3.1 提升 

JavaScript引擎在进入作用域时，会对代码分两轮处理： 

第一轮，初始化变量； 

第二轮，执行代码。 

```javascript 
function myFunction( arg1, arg2 ) { // 1) 
    var local_var = 'foo', 
        a_function = function () { 
        	console.log('a function'); 
        }; // 2) 
    function inner () { // 3) 
        console.log('inner'); 
    } 
} 
myFunction( 1, 2); 
```

在第一轮，JavaScript引擎分析代码，并做了以下3件事情： 

1）声明并初始化函数参数； 

2）声明局部变量，包括将匿名函数赋给一个局部变量，但并不初始化它们； 

3）声明并初始化函数。 

在第一轮， 

局部变量并未被赋值，因为可能需要在代码执行后才能确定它的值，而第一轮不会执行代码。 

参数被赋值了，因为在向函数传递参数之前，任何决定参数值的代码都已经运行了。 

JavaScript引擎把变量作为属性保存在一个对象上，这个对象称为执行环境对象。 

##### 2.3.2 执行环境和执行环境对象 

每当函数```被调用```的时候，就会产生一个新的执行环境。 

执行环境是一种概念，是运行中的函数的意思，它不是对象。 

执行环境由函数在执行时发生的所有事物组成。 

**对比：** 

函数声明描述了当函数执行的时候会发生什么事情。 

执行环境是指函数的执行。 

**作用域和执行环境：** 

所有在函数中定义的变量和函数都是执行环境的一部分。 

在开发人员谈论函数的作用域时，执行环境也是其所指的一部分。 

如果变量在当前执行环境中可访问，则变量在作用域内。 

等同于 

如果在函数运行时变量可访问，则该变量在作用域内。 

**执行环境对象：** 

> 属于执行环境部分的变量和函数，被保存在执行环境对象中，执行环境对象是对执行环境的``ECMA标准实现``。 

> 在JavaScript引擎中，执行环境对象是一种对象，并且``不是``在JavaScript中可以直接访问的变量(?)。 

间接地访问执行环境对象：每次使用变量，就是在访问执行环境对象的属性。 

**执行环境对象的生命周期 以及创建它的JavaScript代码** 

```javascript 
outer(1); // 1-1) 2-1） 

function outer ( arg) { // 1-2) 
    var local_var = 'foo'; // 1-3) 
    function inner () { // 1-4) 2-2） 
    	console.log('inner'); 
	} 
	inner(); // 1-5) 2-3） 
} 
```

第一轮： 

1) {} 

当调用outer时，创建了一个空的执行环境对象 

2) {arg: 1} 

声明参数并赋值 

3) {arg:1, local_var: undefined} 

声明局部变量，但没有赋值 

4) {arg:1, local_var: undefined, inner: function () {console.log('inner');}} 

声明函数并赋值，但不执行 

5) {arg:1, local_var: undefined, inner: function () {console.log('inner');}} 

没有什么发生，在第一轮，代码没执行 

第二轮： 

1) {arg:1, local_var: undefined, inner: function () {console.log('inner');}} 

2) {arg:1, local_var: 'foo', inner: function () {console.log('inner');}} 

代码执行时，局部变量被赋值 

3) {arg:1, local_var: 'foo', inner: function () {console.log('inner');}} 

执行环境对象上表示变量的属性保持不变，但当函数inner被调用时，在这内部会创建一个新的执行环境对象 

> 在执行环境中调用函数，会创建一个新的嵌套在已存在的执行环境内的执行环境。 

![image](<../images/2-1.png>) 

1）在<script>标签内的所有东西都在全局执行环境中 

2）调用first_function，会在全局执行环境中创建一个新的执行环境。 

在first_function运行时，它有权限访问在调用它时创建的执行环境里面的变量。 

first_function有权限访问全局执行环境中定义的变量 以及 内部的局部变量。可以说：这些变量在作用域中。 

3）调用second_function，会在f_f的执行环境中创建一个新的执行环境。 

s_f有权限访问f_f的执行环境中的变量（译者注：表述有误，s_f的定义不在f_f内，无法访问f_f中的局部变量），也有权限访问全局执行环境中定义的变量，以及s_f中定义的局部变量。 

4）全局执行环境中调用s_f。``没有``权限访问f_f的执行环境中的变量. 

这里的s_f执行环境也没有权限访问先前调用的s_f中的变量，因为它们发生在不同的执行环境中。 

> JavaScript引擎在执行环境对象中访问作用域内的变量，查找的顺序叫做作用域链，它和原型链一起，描述了JavaScript访问变量和属性的顺序。 

#### 2.4 作用域链 

嵌套 

当在查找变量的定义时，JavaScript引擎首先在局部执行环境对象上查找。如果没有定义，则跳出作用域链，到创建它的执行环境中去，并且在该执行环境对象中查找变量的定义，以此类推，直到找到定义或者到达全局作用域为止。（使用找到的第一次匹配并停止查找。） 

![image](<../images/2-2.png>) 

在运行期，JavaScript会检索作用域层级来解析变量名。-> 在层级更深的嵌套作用域中的变量，会使用它们的当前作用域替换更加全局的作用域，从而隐藏更加全局的作用域中的变量。-> 在实际代码中，应当尽力使得变量名是唯一的。 

```javascript 
var regular_joe = 'I am here to save the day'; 

// log 'I am here to save the day' 
console.log(regular_joe); 

function supermax() { 
	var regular_joe = 'regular_joe is assigned'; 
    
	// log 'regular_joe is assigned' 
	console.log(regular_joe); 
	function prison() { 
		var regular_joe; 

		// log undefined 
		console.log(regular_joe); 
	} 
	prison(); 
} 
supermax(); 
```

> 在查找一个变量的值时，结果可能来自于作用域链上的任何地方。 

**全局变量和window对象** 

全局变量：执行环境顶层对象的属性。 

浏览器的顶层对象是window对象；在nodejs中顶层对象是global。 

```javascript 
var regular_joe = 'Global variable'; 
console.log(regular_joe); 
console.log(window.regular_joe); 
console.log(regulart_joe === window.regular_joe); // true
```

#### 2.5 JavaScript对象和原型链 

JavaScript对象是基于原型(prototype-based)的，而当今其他广泛使用的语言全部都使用基于类(class-based)的对象。 

基于类的对象定义：使用类来描述它是什么样的。 

基于原型的对象：我们创建的对象，看起来要像我们想要的所有这种类型的对象那样，然后告诉JavaScript引擎，我们想要更多像这样的对象。 

**类比：** 

基于类：建筑师会先画出房子的蓝图->按蓝图建造 

基于原型：建筑师会先建一所房子->将房子都建成这种模样 

**简单对象创建：** 

```java 
// 基于对象 
public class Prisoner { 
    public int sentence = 4; 
    public int probation = 2; 
    public string name = 'Joe'; 
    public int id = 1234; 
} 
Prisoner prisoner = new Prisoner(); 
```

```javascript 
// 基于原型 
var prisoner = { 
    sentence: 4, 
    probation: 2, 
    name: 'Joe', 
    id: 1234 
}; 
```

基于原型的对象更简单，并且当只有一个对象实例时，编写更快。 

**多个对象共享相似的特性：** 

```java 
// 基于对象 
public class Prisoner { 
    public int sentence = 4; 
    public int probation = 2; 
    public string name; 
    public int id; 
    
    public Prisoner(string name, int id) { 
        this.name = name; 
        this.id = id; 
	} 
} 

Prisoner firstPrisoner = new Prisoner( 'Joe', 12 ); 
Prisoner secondPrisoner = new Prisoner( 'Sam', 34 ); 
```

```javascript 
// 基于原型 
var proto = { 
    sentence: 4, 
    probation: 2 
}; 
var Prisoner = function(name, id) { 
    this.name = name; 
    this.id = id; 
} 
Prisoner.prototype = proto; 
var firstPrisoner = new Prisoner( 'Joe', 12 ); 
var secondPrisoner = new Prisoner( 'Sam', 34 ); 
```

> 分析： 

> 首先-创建了对象的模板。在基于类的编程中叫做类，在基于原型的编程中叫做原型对象。作用：作为创建对象的结构。 

> 然后-创建构造函数。在JavaScript中，对象的构造函数和原型是分开设置的，需要额外多一步来将它们连接在一起。 

> 最后-实例化对象。JavaScript使用了new操作符，这违背了它基于原型的核心思想（容易让人混乱）。 -> ``Object.create方法`` 

```javascript 
var proto = { 
    sentence: 4, 
    probation: 2 
} 
var firstPrisoner = Object.create( proto ); 
firstPrisoner.name = 'Joe'; 
firstPrisoner.id = 12; 
```

繁琐重复的代码。-> 使用Object.create的常见模式是使用工厂函数来创建并返回最终的对象。 

```javascript 
var proto = { 
    sentence: 4, 
    probation: 2 
} 

var makePrisoner = function( name, id ) { // 工厂函数，创建了囚犯对象。封装了创建方式。 
    var prisoner = Object.create( proto ); 
    prisoner.name = name; 
    prisoner.id = id; 
    
    return prisoner; 
} 

var firstPrisoner = makePrisoner( 'Joe', 12 ); 
var secondPrisoner = makePrisoner( 'Sam', 34 ); 
```

```javascript 
// 兼容 
// Cross-browser method to support Object.create() 
var objectCreate = function ( arg ) { 
    if ( !arg ) { return {}; } 
    function obj () {}; 
    obj.prototype = arg; 
    return new obj; 
} 

Object.create = Object.create || objectCreate; 
```

##### 原型链 

JavaScript引擎是如何实现查找对象的属性值的。 

-> JavaScript使用原型链来解析属性值。 

> 1.原型链描述了JavaScript引擎如何从对象查找到原型以及原型的原型，来定位对象的属性值。 

> 2.当JavaScript到达通用的(generic)Object的原型，原型链就结束了。 

> 3.如果JavaScript在原型链上的所有地方都找不到请求的属性，则返回undefined。 

> 原型：保存在对象的__proto__属性中。generic object prototype has no prototype 

![image](<../images/2-3.png>) 

可以使用__proto__属性，手动地在原型链上”往上爬“。 

```javascript 
console.log( firstPrisoner ); // { name: 'Joe', id: 12 } 
console.log( firstPrisoner.__proto__ ); // { sentence: 5, probation: 3 } 
console.log( firstPrisoner.__proto__.__proto__ ); // {} 
console.log( firstPrisoner.__proto__.__proto__.__proto__ ); // null
```



**更改原型** 

原型上的属性：类似静态变量 

```javascript 
proto.sentence = 5; 
console.log( firstPrisoner.sentence ); // 5 
console.log( secondPrisoner.sentence ); // 5 
```

使用原型从其他对象继承属性 

#### 2.6 函数——更深入的窥探 

函数是JavaScript中的第一类（first-class)对象。 

* 可以保存在变量中，可以有属性，可以作为参数传给调用函数。 

* 用于控制变量作用域 以及 提供私有变量和方法。 

##### 2.6.1 函数和匿名函数 

函数的一个重要特性：它是一个对象。 

```javascript 
function prison () {} 

// 可以使用变量来保存函数 
var prison = function prison () {}; 

// 使用匿名函数，减少冗余（以及减小名字不匹配的几率），它只是声明没有名字的函数的标签。 
var prison = function () {}; 
```

##### 2.6.2 自执行匿名函数 

* 不想共享变量 

* 容易覆盖 

* 难以诊断 

```javascript 
(function () { 
	var private_variable = "private"; 
})(); 
```

> 自执行匿名函数：定义它时没有名字并且没有保存给变量，但却立即执行了。 

> 被用于控制变量的作用域，阻止变量泄露到代码中的其他地方。 

> 可用于创建JavaScript插件，不会和应用代码冲突 —— 不会向全局名字空间添加任何变量。 

> 更加高级的用法：模块模式（module pattern） 

> 模块模式： 

> 使有办法定义私有变量和私有方法。 

```javascript 
(function () { 
    console.log(local_var); 
    
    var local_var = 'Local Variable'; 
    
    console.log(local_var); 
}()); 
```

变量污染了全局名字空间，就会有产生冲突的风险。``全局名字空间污染`` 

``使用自执行匿名函数``，避免全局变量被无意覆盖。 

将值作为参数传给自执行匿名函数，就可以保证这个参数的值在执行环境中是你所期望的值，因为外部代码不能影响到它。 

```javascript 
(function (what_to_eat) { 
    var sentence = 'I am going to eat a ' + what_to_eat; 

    console.log(sentence); 
})('sanwich'); 
```

```javascript 
// 避免$被Prototype库占用 
( function ( $ ) { 
	console.log( $ )； 
})( jQuery ); 
```

##### 2.6.3 模块模式——将私有变量引入JavaScript 

可以把应用封装在自执行匿名函数中，使应用免受第三方库（和我们自己）的影响 ——> 单页应用很庞大，不能定义在一个文件中 ——> 将该文件分成一个个的模块，每个模块都有自己的私有变量 

在稍大一点的模块中，减少全局变量很重要。 

```javascript 
var prison = (function() { 
    var prisoner_name = 'Mike', 
    	jail_term = '20 year term'; 
    return { 
        prisoner: prisoner_name + '-' + jail_term, 
        sentence: jail_term 
	}; 
})(); 
// jail_term不是prison对象或者原型上的属性，它是执行环境中创建的对象变量 
```

```javascript 
// 能更新
var prison = (function() {
    var prisoner_name = 'Mike',
        jail_term = '20 year term';
    return {
        prisoner: function () {
            return prisoner_name + '-' + jail_term;
        },
        setJailTerm: function (term) {
            jail_term = term;
        }
    };
})();
```

**闭包** 

是阻止垃圾回收器将变量从内存中移除的方法，使得在创建变量的执行环境的外面能够访问到该变量。 

```javascript 
var prison = (function() {
    var prisoner = 'Josh';
    
    return {
        prisoner: function () {
            return prisoner;
        }
    }
})();
```

在prionser函数被保存到prison对象上时，一个闭包就创建了。 

闭包因保存函数而被创建，在执行环境的外面，可以动态访问prisoner变量，这就阻止了垃圾回收器将prisoner变量从内存中移除。 

另一种使用闭包的常见情况，保存变量以便在Ajax请求返回时使用。 

如果使用jQuery来发送Ajax请求的方法，则this不再指向对象，它指向Ajax请求对象。 

```javascript 
var prison = {
    name: 'Josh',
    who: function () {
        $.ajax({
            success: function () {
                console.log( this.name );
            }
        });
    }
};
// outputs: undefined, 'this' is the ajax object
prison.who(); 
```

> 闭包由函数创建，该函数在当前执行环境中访问了某个变量，并将该函数保存给当前执行环境外的一个变量。 

```javascript 
// 通过把this保存给that，在函数中访问that，从而创建了一个闭包
var prison = {
    name: 'Josh',
    who: function () {
        var that = this;
        $.ajax({
            success: function () {
                // 尽管在Ajax请求返回的时候，who()已经执行完毕，但是that变量不会被垃圾回收
                console.log( that.name );
            }
        });
    }
};
prison.who();
```

##### 2.6.4 闭包 

```javascript 
var makePrison = function ( prisoner ) {
    return function () {
        return prisoner;
    }
};
var joshPrison = makePrison( 'Josh' );
var mikePrison = makePrison( 'Mike' );
// 此时有两个指针分别指向两个执行环境对象，两者的引用计数都是1

console.log( joshPrison() );
console.log( mikePrison() );
```

当调用makePrison时，为这次特定的调用创建了一个执行环境对象，将传入的值赋予prisoner。 

当我们把结果 **赋予** joshPrison变量的时候，这个特定的执行环境对象的引用计数置为1，因为引用计数大于0，所以JavaScript引擎会保留这个特定的执行环境对象。 

如果再次调用joshPrison，它会使用“在调用makePrison时所创建的并保存给joshPrison的执行环境对象”上设置的值。 

> 清除保存的执行环境对象的唯一方法（除了关闭网页），就是删除joshPrison变量。> 这个执行环境对象的引用计数降为0，然后JavaScript引擎会知道要对这个对象进行垃圾回收。 

>

> ！！运行本例代码2-12，使用delete方法无法删除，置为null应该可行，对这个执行环境对象不引用（引用计数会降为0） 

> 每次调用函数时，**都**会创建一个唯一的执行环境对象。 

> 函数执行完后，执行对象*就*会被丢弃，**除非**调用者引用了它。 

> 如果函数返回的是数字，就不能引用函数的执行环境对象。 

> 但！如果函数返回的是一个更复杂的结构，譬如函数、对象、或者数组，将返回值保存到一个变量上，就创建了一个对执行环境的引用。 

好处：e.g.对象继承 

坏事：可能会导致内存使用失控，内存泄漏 

参考：**附录A中的约定和工具** 避免无意形成闭包 

#### 2.7 小结 

理解执行环境对象 > 理解“作用域和提升是如何工作的” 

对于构建单页应用，本书将使用基于原型的模型，两个原因： 

对于我们的使用案例来说更加简单， 

并且这是JavaScript的方式，我们是用JavaScript在编码。 

编写自执行匿名函数 > 控制变量作用域 > 防止无意间污染全局名字空间，防止与其他库冲突 

理解模块模式和使用私有变量，允许你精心制作对象的公开API。保持API的美观和简洁，哪些需要消化学习，哪些是内部辅助方法，一目了然。 

闭包。 