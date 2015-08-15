// function sum (first, second) {
  // return first+second;
// }

// var cinque = sum(2, 3);


//var sum = function(first, second) {
  //return first + second;
//};
//
//var cinque = sum(2, 3);
//var fun = sum;
//var sei = fun(2,4);

// Closure
var sum = function(first, second) {
  var ret = function() {
    console.log(first + second);
    };
  return ret;
};

var result1 = sum(5, 8);
var result2 = sum(4, 2);
var result3 = sum(6, 1);

result1(); // 13
result2(); // 6
result3(); // 7

function Rectangle( height, width ) {
  this.height = height;
  this.width = width;
  this.logArea = function() {
    console.log(this.height*this.width);
  };
}

var ret = new Rectangle(10, 20);
ret.logArea();
var ret2 = new Rectangle(49, 123);
ret2.logArea();