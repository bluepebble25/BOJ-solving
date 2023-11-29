const fs = require('fs');
const X = Number(fs.readFileSync('input.txt').toString().trim());

function solution() {
  const dp = Array(X + 1).fill(0);

  for (let i = 2; i <= X; i++) {
    dp[i] = dp[i - 1] + 1;

    if (i % 2 === 0) {
      dp[i] = Math.min(dp[i], dp[i / 2] + 1);
    }

    if (i % 3 === 0) {
      dp[i] = Math.min(dp[i], dp[i / 3] + 1);
    }
  }

  return dp[X];
}

console.log(solution());

/*
  dp[x]라는 것은 x가 1이 되기까지 얼마나 연산을 해야하는지 연산 횟수를 의미하는 것이다.
  dp[1] = 0인데, 1은 1이 되기까지 필요한 연산횟수가 0이기 때문이다.
  따라서 x=2부터 구하면 된다.
  for문으로 x=2인 경우부터 1씩 증가하며 이전 연산횟수 (dp[x-1])을 이용해 다음 연산횟수 (dp[x])를 구해준다.
  (bottom-up 방식)

  규칙을 찾아보면

  X       1을 빼는 경우 dp[x]
  2       1
  3       2
  4       3
  ...     dp[x-1] + 1

  X       2로 나누는 경우 dp[x]
  2       1
  4       2
  6       3
  8       dp[4] + 1
  ...     dp[x/2] + 1

  2로 나누는 것에서 주목할 점이 있다. X=6일 때 2로 나눠서 연산 횟수가 +1이 됐다. 그래서 X=3이 되었다. X=3의 연산횟수는 dp[3]이다.
  dp[6] = dp[6/2] + 1이다. dp[3]은 이전에 구해놓은 것을 사용하면 된다.

  마찬가지 원리로 3으로 나누는 경우의 점화식은 dp[x/3] + 1이 된다.

  X       3으로 나누는 경우 dp[x]
  ...     dp[x/3] + 1

  그런데 만약 6처럼 2와 3의 공배수인 경우 어떤 수로 우선 나눠야 할까? 최소 연산횟수를 구하는 것이 목적이므로
  if(x % 2 === 0)과 if(x % 3 === 0) 두 가지 경우의 dp[x]를 모두 구하고 그 중 최소값을 dp[x]에 저장하면 된다.
 */
