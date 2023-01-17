//library test
/*
var math = require('mathjs');
var expr = 'x^2 + y^2';
var x = math.parse('x');
var y = math.parse('y');
var f = math.parse(expr);
var partial_derivative = math.derivative(f, x);
var partial_derivative = math.derivative(f, y);
console.log(partial_derivative.toString());
*/

var math = require('mathjs');

// Define the volume function (z*(y-b)+((0.7z+z)*b)/2)*x=202320
var volumeFunc = math.parse('(z*(y-b)+((0.7z+z)*b)/2)*x-202320');

// Define the cost function
var costFunc = math.parse('(0.7/144)*(2((z*(y-b))+(b*(0.7z+z))/2)+(x-2*0.1046)(0.7z+(72*sqrt(15^2+12^2)/x))+(x-2*0.1046)*z)+(0.9/144)*((x-2*0.1046)*(y-2*0.1046))+(0.18/6)*(c+0.7z)+(0.18/6)*(z)+(0.18/6)(y-2*0.1046+x-2*0.1046)+50');

// Define the gradient of volume function
var gradVolumeFunc = [math.derivative(volumeFunc, 'x'), math.derivative(volumeFunc, 'y'), math.derivative(volumeFunc, 'z'),math.derivative(volumeFunc, 'b')];

// Define the gradient of cost function
var gradCostFunc = [math.derivative(costFunc, 'x'), math.derivative(costFunc, 'y'), math.derivative(costFunc, 'z'),math.derivative(costFunc, 'b'),math.derivative(costFunc, 'c')];

// define b and c in terms of x
/*
var b = math.sqrt(math.divide(math.multiply(72,math.sqrt(math.add(math.pow(15,2),math.pow(12,2)))),math.subtract(x,math.pow(9,2))));
var c = math.divide(math.multiply(72,math.sqrt(math.add(math.pow(15,2),math.pow(12,2)))),x);
*/

// Create an object with the function, constraints and gradients
var obj = {
  f: costFunc,
  g: [volumeFunc],
  gradF: gradCostFunc,
  gradG: [gradVolumeFunc],
};

// Optimize the cost function subject to the constraint using math.optimize
var sol = math.optimize.lbfgs(obj, [72, 58, 50, 12, 225]);

console.log(sol);



console.log("hi");
