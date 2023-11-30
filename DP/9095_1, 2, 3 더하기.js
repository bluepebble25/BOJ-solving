const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim().split('\n');
const TC = input.slice(1).map(Number);

function solution(N) {
  const dp = Array(N + 1).fill(0);
  dp[1] = 1;
  dp[2] = 2;
  dp[3] = 4;

  for (let i = 4; i <= N; i++) {
    dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
  }

  return dp[N];
}

const result = TC.map((N) => solution(N));
console.log(result.join('\n'));

/*
  n=1   n=2   n=3
  1     1 1   1 1 1
        2     1 2
              2 1
              3
  
  각각 1, 2, 4가지
  
  이보다 더 큰 숫자인 경우 DP의 원리를 이용해 숫자를 작은 문제로 쪼개보면 다음과 같은 점화식을 얻을 수 있다.
  dp[i] = dp[i-1] + dp[i-2] + dp[i-3]

  --------
  n = 4
  1 + 3 -> dp[3] 개
  2 + 2 -> dp[2] 개
  3 + 1 -> dp[1] 개
  ----------

  n=3인 경우의 수 옆에 1이 추가되어 손을 붙잡는다고 해도 줄의 개수는 같기 때문에
  1 + 3과 3을 만드는 경우의 수는 같다고 할 수 있다.

  1 + (1 1 1)
  1 + (1 2)
  1 + (2 1)
  1 + (3)

  따라서 1 + 3 = dp[3]

  ---------
  n = 5
  1 + 4 -> dp[4]
  2 + 3 -> dp[3]
  3 + 2 -> dp[2]
  --------

  그리고 왜 n=5에서 5를 4 + 1로도 쪼갤 수 있는데 안쪼개느냐 하면 
  수 쪼개기에 사용할 수 있는 수가 1, 2, 3뿐이기 때문이다.
  왼쪽에 1, 2, 3을 따로 빼놓고 나머지 수는 이전 dp에 저장해놓은 것을 쓰기 때문에
  4 + 1로는 쪼갤 수 없는 것이다.
*/
