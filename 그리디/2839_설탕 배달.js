const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();

const N = Number(input);

function solution(N) {
  let count = 0;
  while (N >= 0) {
    if (N % 5 === 0) {
      count += N / 5;
      return count;
    } else {
      N = N - 3;
      count++;
    }
  }

  return N === 0 ? count : -1;
}

console.log(solution(N));
