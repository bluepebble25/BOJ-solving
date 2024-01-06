const fs = require('fs');
const str = fs.readFileSync('./input.txt').toString().trim();

let answer = '';
for (let i = 0; i < str.length; i += 10) {
  answer += str.slice(i, i + 10) + '\n';
}
console.log(answer.trim());
