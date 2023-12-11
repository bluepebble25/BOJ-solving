const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');
const TC = input.slice(1).map((line) => line.trim().split(' ').map(Number));

function solution(N, M) {
  const n = M;
  const r = N;
  const dp = Array.from({ length: n + 1 }, () => Array(r + 1).fill(0));

  // nC0, nCn = 1로 초기화
  for (let i = 1; i <= n; i++) {
    dp[i][0] = 1;
    dp[i][i] = 1;
  }

  for (let i = 2; i <= n; i++) {
    for (let j = 1; j <= Math.floor(i / 2); j++) {
      const combi = dp[i - 1][j - 1] + dp[i - 1][j];
      dp[i][j] = combi;
      dp[i][i - j] = combi;
    }
  }
  return dp[n][r];
}

const result = TC.map((testCase) => solution(testCase[0], testCase[1]));
console.log(result.join('\n'));

/*
  M개 중 N개를 선택하고 N이 배치된 순서대로 그대로 짝지어주면 다리가 교차하는 것을 신경쓰지 않아도 된다.
  이 경우는 조합 (nCr)과 같다.

  nCr의 공식은 n(n-1)(n-2)... (r개) / r!이다.
  그런데 저렇게 곱하다보면 분자는 엄청 커질 것이고 r!도 기하급수적으로 커진다.
  우리가 실제로 필요한 수는 작은데 말이다. BigInt로 계산해야 하므로 속도가 느려질 것이다.

  해결 방법은 바로 조합을 구하는 과정을 쪼개보는 것이다.
  하나를 먼저 뽑고 나머지를 뽑는 방식으로 쪼갤 수 있다.

  (1 2 3) 3개 중에 2개를 뽑는 3C2 과정을 쪼개보자.

  3을 먼저 뽑아놓고 1 2 중 1개를 뽑는 경우 -> n-1Cr-1
  3을 뽑지 않고 1 2 중에 2개를 뽑는 경우 -> n-1Cr
  1 2
  1 3
  2 3

  어떤 한 수를 먼저 뽑아놓고 나머지에서 고르느냐, 그 수를 제외하고 나머지 수 중에서 고르느냐에 따라 경우의 수가 나뉜다.
  공식을 정리하면 이렇다.
  nCr = n-1Cr-1 + n-1Cr

  이를 dp로 구하기 위해 dp[n][r] 배열을 만든다.
  왜 하필 [n][r] 크기의 2차원 배열이냐하면 직관적으로 [n][r], [n-1][r-1], [n-1][r]을 저장하기에 좋기 때문이다.
  또한 조합을 구할 때 nCr = nCn-r인 것을 이용해 계산 시간을 단축해준다.
*/
