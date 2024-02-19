const fs = require('fs');
const input = fs
  .readFileSync('./input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => Number(line.trim()));
const N = input[0];
const score = input.slice(1);

function solution() {
  let count = 0;
  for (let i = N - 1; i >= 1; i--) {
    if (score[i - 1] >= score[i]) {
      const d = score[i - 1] - score[i] + 1;
      count += d;
      score[i - 1] -= d;
    }
  }

  return count;
}

console.log(solution());
