const fs = require('fs');
const input = fs
  .readFileSync('./input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));
const N = Number(input[0]);

function solution() {
  const dp = Array(N + 1).fill(0);
  let maxP = 0;

  for (let i = 1; i <= N; i++) {
    const [T, P] = input[i];
    dp[i] = Math.max(dp[i], maxP);
    if (i + T <= N) {
      dp[i + T] = Math.max(dp[i + T], dp[i] + P);
    }
    maxP = Math.max(maxP, dp[i]);
  }

  return maxP;
}

console.log(solution());

/*
  상담을 하고 N일까지 얻을 수 있는 최대 수익이라는 것은 쪼갤 수 있는 개념이다.
  i일의 상담을 진행할 때 얻을 수 있는 최대값을 dp에 저장하고,
  i+1일까지 상담했을 때 얻을 수 있는 최대값을 dp에 저장하는 방식으로 이전값을 기반으로 최적값을 누적해 구하면 된다.

  N=7일 때
  i T P
  1 3 10
  2 5 20
  3 1 10
  4 1 20
  5 2 15
  6 4 40
  7 2 200

  1일차에 잡힌 상담이 하루가 걸린다면 1+1인 2일차에 끝나므로 돈은 i + T[i]일에 받는다고 생각해야 한다.
  i dp
  1 0 -> 1일차의 상담은 3일이 걸리므로 4일째에 P1=10를 받게 된다. dp[4]의 값은 현재까지 10
  2 0 -> 2일차의 상담료는 7일차에 P2=20을 받게 된다. dp[7]의 max값은 현재까지 20
  3 0 -> 이날의 상담료는 4일차에 P3=10을 받게 된다. dp[4]의 max값은 현재까지 10
  4 10 -> i=1과 i=3 모두 i=4일차에 10을 받게 되어있다. Math.max()를 해보면 10
  5 30 -> i=4와 dp[4]의 합
  6 30
  7 45 -> 30 + 15

  i=1 (T,P)=(3,10)
  i   1 2 3 4  5 6 7
  dp  0 0 0 10 0 0 0

  i=2 (5,20)
  i   1 2 3 4  5 6 7
  dp  0 0 0 10 0 0 20

  i=3 (1,10)
  i   1 2 3 4  5 6 7
  dp  0 0 0 10 0 0 20
  (2일차와 3일차 모두 dp[4]가 10이므로 그대로 놔둔다)

  i=4 (1,20)
  i   1 2 3 4  5  6 7
  dp  0 0 0 10 30 0 20 (5일차에 dp[4] + P[4] = 10 + 20 = 30)

  i=5 (2,15)
  i   1 2 3 4  5  6 7
  dp  0 0 0 10 30 0 45 (7일차에 dp[5] + P[5])

  i=6 (4, 40) X
  i   1 2 3 4  5  6 7
  dp  0 0 0 10 30 30 20 (6일차에 상담을 새로 시작할 수 없다고 해도 여태가지의 수입은 30이었으므로 30 대입)

  i=7도 불가X

  점화식은 dp[i + T] = dp[i] + P[i]인데, 이전에 dp[i + T]에 들어있던 값이 더 클 수도 있으므로
  dp[i+T] = Math.max(dp[i+T], dp[i]+P[i])
  
  그런데 i=6 경우를 보면 dp[i+T]와 여태까지의 수입 중 여태까지의 수입이 더 크다면 그 값을 대입해야 하는 경우가 있다.
  dp[i+T]에 여태가지의 max값과 dp[i+T] 중 최대값을 대입하는 과정도 필요하다.
  maxP = Math.max(maxP, dp[i])로 여태까지의 최대값을 구해준다.
*/
