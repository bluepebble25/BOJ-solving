const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim().split('\n');

const [N, K] = input[0]
  .trim()
  .split(' ')
  .map((el) => Number(el));
const A = input.splice(1).map((el) => Number(el.trim()));

/*
  가격이 큰 동전부터 반복해서 나눠본다. 1이 있으니까 최후에는 어떻게든 된다.
  K원보다 동전 가치가 크다면 pass, 작다면 나누고 몫은 count에, remain에는 나머지를 저장
*/

function solution(N, K, A) {
  let count = 0;
  let remain = K;

  A.sort((a, b) => b - a);

  for (price of A) {
    if (price > remain) continue;
    if (remain === 0) {
      break;
    }

    count += Math.floor(remain / price);
    remain = K % price;
  }
  return count;
}

console.log(solution(N, K, A));
