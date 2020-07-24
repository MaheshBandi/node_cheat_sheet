//Example1
const calc = require('./modules');
const calcobj = new calc();
console.log(calcobj.add(2,3));

//Example2
const calcusingClassExpression = require('./modules-using-classexpression');
const calcusingClassExpressionObj = new calcusingClassExpression();
console.log(calcusingClassExpressionObj.add(2,3));

//Example3
//const calc2 = require('./modules-using-exports'); 
//console.log(calc2.add(2,3));
//or
const {add,multiply} = require('./modules-using-exports'); 
console.log(add(2,3));

//Example4
// we observe that the module is loaded only one time and it is cached.
// alternatively we can assign the below statement to a const and can call the same
require('./modules-using-caching')();
require('./modules-using-caching')();
require('./modules-using-caching')();