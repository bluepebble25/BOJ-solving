const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');

const N = Number(input[0].trim());
const A = input[1].trim().split(' ').map(Number);

function solution() {
  const dp = Array(N).fill(0);

  dp[0] = A[0];

  for (let i = 1; i < N; i++) {
    dp[i] = Math.max(A[i] + dp[i - 1], A[i]);
  }

  return Math.max(...dp);
}

console.log(solution());

/*
  10
  10 -4 3 1 5 6 -35 12 21 -1

  i번째 수까지 선택했을 때 최대값

  i=1
  10
  O

  i=2
  10 + (-4)와 10 중 최대값인 10 선택
  XO
  OO

  OX는 i=1번째까지 선택했을 때와 똑같다.
  따라서 i번째까지 선택했다는 말은 그 수를 반드시 선택했다는 것을 가정하자. 마지막은 꼭 O로 끝나는 걸로 하자.

  i=3
  XXO -> A[i]
  XOO -]이 둘은 dp[i-1] + A[i]과 같다.
  OOO -]

  i=4
  XXXO
  XXOO
  XOOO
  OOOO
  
  마찬가지. 최종 점화식은 dp[i] = Math.max(A[i] + dp[i-1], A[i]),
  dp중 최대값이 답
*/
