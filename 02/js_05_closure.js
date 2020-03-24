var prison = {
	name: 'Josh Powell and Mike Mikowski',
	who: function () {
		$.ajax({
			success: function () {
				console.log( this.name );
				console.log( this );
			}
		});
	}
};

// prison.who();

// ------------------ 代码清单 2-12 ----------------------- //
var curryLog, logHello, logStayinAlive, logGoodbye;
curryLog = function ( arg_text ) {
	var log_it = function () { console.log( arg_text ); };
	return log_it;
};

logHello = curryLog( 'hello' );
logStayinAlive = curryLog( 'stayin alive' );
logGoodbye = curryLog( 'good bye' );

// this creates no reference to the execution context.
curryLog( 'fred' );

logHello();
logStayinAlive();
logGoodbye();
logHello();

delete window.logHello;

delete window.logStayinAlive;

logGoodbye();
logStayinAlive(); // undefined - execution context destroyed.   ----- 未达到预期
// JavaScript中通过var声明的变量是不能通过delete操作符来删除的。