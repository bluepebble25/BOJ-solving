const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');
const N = Number(input[0].trim());
const A = input[1].trim().split(' ').map(Number);
console.log(A);
/*
  11053번 가장 긴 증가하는 부분 수열 (실버 2)와 동일한 문제이다.
  이 문제는 DP 혹은 이분탐색을 이용하는 두 가지 방법으로 풀 수 있다.

  이분탐색으로 풀어보자.

  10 20 10 30 20 50
*/
