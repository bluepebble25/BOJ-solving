const fs = require('fs');
const str = fs.readFileSync('./input.txt').toString().trim().split('');
const count = Array(26).fill(0);

for (let s of str) {
  const i = s.charCodeAt() - 97;
  count[i]++;
}

console.log(count.join(' '));
