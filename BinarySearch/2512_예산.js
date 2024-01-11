const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');
const N = Number(input[0].trim());
const arr = input[1]
  .trim()
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);
const total = Number(input[2].trim());

function solution() {
  let left = 0;
  let right = arr[N - 1];

  while (left <= right) {
    const mid = Math.floor((left + right) / 2); // 예산 상한선
    const sum = arr.reduce((acc, curr) => acc + (curr > mid ? mid : curr), 0);

    if (sum > total) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return right;
}

console.log(solution());

/*
  - 일단 예산들의 중간값을 예산 상한선으로 설정해본다.
  - 예산의 합을 계산하고
    if 예산이 남으면 상한선을 올리고
    if 예산이 부족하면 상한선을 내린다.
  - 예산의 상한선을 조정하는 것은 이진탐색으로 한다.
  - 조정하고 -> 계산 해야 하기 때문에
    바깥쪽에 while문으로 중간값 구하고, 안쪽에는 mid를 바탕으로 예산의 합 계산
    left, right를 조정해 mid를 다시 구하고 그것을 바탕으로 또 예산 계산 반복
*/
