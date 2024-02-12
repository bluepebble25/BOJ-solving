const fs = require('fs');
const [T, ...testCase] = fs
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

function solution(C) {
  const count = Array(4).fill(0);
  const coins = [25, 10, 5, 1];

  for (let i = 0; i < 4; i++) {
    count[i] = Math.floor(C / coins[i]);
    C = C % coins[i];
  }
  return count.join(' ');
}

const result = testCase.map((C) => solution(C));
console.log(result.join('\n'));
