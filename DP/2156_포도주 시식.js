const fs = require('fs');
const A = fs
  .readFileSync('./input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

function solution() {
  const N = A[0];
  const dp = Array(N + 1).fill(0);

  switch (N) {
    case 1:
      return A[1];
    case 2:
      return A[1] + A[2];
  }

  dp[1] = A[1];
  dp[2] = A[1] + A[2];

  for (let i = 3; i <= N; i++) {
    dp[i] = Math.max(A[i] + A[i - 1] + dp[i - 3], A[i] + dp[i - 2], dp[i - 1]);
  }

  return dp[N];
}

console.log(solution());

/*
  6 10 13 9 8 1

  꼭 마지막 잔을 마시지 않아도 된다.

  포도주가
  1 2 3 4 5 6 7 8 ... 이런 식으로 담겨져 있고
  i개의 포도주가 있다고 생각하면

  i=1 -> 1
  1

  i=2 -> 3
  1 2

  i=3
  3번째를 선택하지 않고 1 2 선택
  3번째를 선택하고 2 혹은 1 둘 중 더 큰 것을 선택

  i=4
  4번째를 선택하지 않으면 3번까지 선택한 것과 같은 상황이므로 dp[3], 따라서 점화식은 dp[i]
  4번째를 선택하면 점화식은 Math.max(A[i-1] + dp[i-3], dp[i-2])

  정리하면
  1. i번째 안마시기 -> dp[i-1]
  2. i번째 마시고 바로 직전거 마시고 (A[i-1]), 하나 건너뛰고 마시기 (dp[i-3]) OXOO
    -> A[i] + A[i-1] + dp[i-3]
  3. i번째 마시고 하나 건너뛰고 마시기 ?OXO -> A[i] + dp[i-2]

  이 셋 중 최대값이 dp[i]가 됨.
*/
