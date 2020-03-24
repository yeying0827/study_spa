(function () {
    var private_variable = "private";

    console.log(private_variable);
})();

(function () {
    console.log(local_var);
    
    var local_var = 'Local Variable';
    
    console.log(local_var);
}());

(function (what_to_eat) {
    var sentence = 'I am going to eat a ' + what_to_eat;

    console.log(sentence);
})('sandwich');

(function ( $ ) {
	console.log( $ );
})( jQuery );