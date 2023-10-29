const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim();
const N = Number(input);

const money = [500, 100, 50, 10, 5, 1];
let count = 0;
let remain = 1000 - N;

for (let i = 0; i < money.length; i++) {
  if (remain < money[i]) continue;
  count += Math.floor(remain / money[i]);
  remain = remain % money[i];
  if (remain === 0) break;
}

console.log(count);
