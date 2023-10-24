/*
  걸리는 시간을 오름차순으로 정렬
  sum, time
*/

const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim().split('\n');
const P = input[1].split(' ').map((n) => Number(n));

function solution(P) {
  let sum = 0;
  let time = 0;
  P.sort((a, b) => a - b);

  P.forEach((p) => {
    time += p;
    sum += time;
  });
  return sum;
}

console.log(solution(P));
