const fs = require('fs');
const N = Number(fs.readFileSync('./input.txt').toString().trim());

function solution() {
  const dp = Array(N + 1).fill(0);
  dp[1] = 1;
  dp[2] = 3;

  for (let i = 3; i <= N; i++) {
    dp[i] = (dp[i - 1] % 10007) + ((2 * dp[i - 2]) % 10007);
  }

  return dp[N] % 10007;
}

console.log(solution());

/*
  타일 맨 위의 한줄만 놓고 보면 N을 1, 2로 쪼개는 경우의 수를 구하는 문제이다.
  그리고 가로로 2짜리인 블럭은 다시 2x2, 2x1인 경우로 나눌 수 있다.
  2짜리인 타일은 하나당 2개의 가능성을 품고 있으므로 가로 2짜리 타일의 개수만큼 2의 제곱을 해주면 된다.

  가로로 1, 2로 쪼개고 가로 길이가 2인 타일은 2가지 경우로 계산하는 경우의 수
  i = 1
  1

  i=2
  1 1 -> 1
  2   -> 2^1

  i=3
  1 2 -> dp[2]
  2 1 -> 2^1 * dp[1]

  i=4
  1 3 -> dp[3]
  2 2 -> 2^1 * dp[2]

  i=5
  1 4 -> dp[4]
  2 3 -> 2^1 * dp[3]

  앞쪽을 1,2로 쪼개고 뒤의 나머지 수는 이전 dp를 사용하면 된다.

  점화식은
  dp[i] = dp[i-1] + 2 * dp[i-2]
*/
