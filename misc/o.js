const helpers = require("../solutions/lib/helpers/objects.js");
const array = [
    { name: "John", age: 12 },
    { name: "Jane", age: 10 },
  ];
  
console.log("true",helpers.existsWithAttrs(array, { name: "John" }));
console.log("false",helpers.existsWithAttrs(array, { name: "Jill" }));  
console.log("true",helpers.existsWithAttrs(array, { name: "John", age: 12 }));
console.log("false",helpers.existsWithAttrs(array, { name: "John", age: 10 }));

