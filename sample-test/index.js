const calc = require("sample-package"); // 1. sample-package 불러오기

const a = 1;
const b = 3;

console.log("a + b = ", calc.add(a, b)); // 2. 더하기
console.log("a - b = ", calc.sub(a, b)); // 3. 빼기
console.log("a * b = ", calc.multi(a, b)); // 4. 곱하기
console.log("a / b = ", calc.div(a, b)); // 5. 나누기
