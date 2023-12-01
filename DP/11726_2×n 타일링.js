const fs = require('fs');
const N = Number(fs.readFileSync('input.txt').toString().trim());

function solution() {
  const dp = Array(N + 1).fill(0);
  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i <= N; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % 10007;
  }

  return dp[N];
}

console.log(solution());

/*
  세로 길이는 상관 X, 2x1 타일을 두개 붙이면 위 아래로 두 칸을 차지하지만 옆으로도 두 칸 차지하는 특징이 있다.
  타일의 개수가 아니고 방법의 개수를 묻는 문제이므로 옆으로만 신경쓰면 된다. 타일이 세로로 한줄만 있다고 생각하고 보면
  n을 1, 2만 사용해 쪼개는 경우의 수와 같은 문제다.

  dp[1] = 1, dp[2] = 2

  n=3
  1 + 2 -> dp[2]
  2 + 1 -> dp[1]

  n=4
  1 + 3 -> dp[3]
  2 + 2 -> dp[2]

  점화식은
  dp[i] = dp[i-1] + dp[i-2]

  !주의 ) n=1000 일 때의 결과가 너무 커서 dp[i] = BigInt(dp[i-1]) + BigInt(dp[i-2]) 구한 다음
  마지막에 dp[i] % 10007로 해봤는데 숫자가 커서 시간이 너무 오래 걸린다.
  dp[i] = (dp[i-1] + dp[i-2]) % 10007 처럼 매번 10007의 나머지를 구해주고 마지막에 dp[N] 만 출력해주면 시간이 단축된다.
*/
