const fs = require('fs');
const A = fs
  .readFileSync('input.txt')
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
    dp[i] = A[i] + Math.max(A[i - 1] + dp[i - 3], dp[i - 2]);
  }

  return dp[N];
}

console.log(solution());

/*
조건) 마지막 계단은 반드시 밟아야 한다.
- 연속된 계단 세 개를 밟을 수는 없다.
- 한번에 다음칸, 혹은 다음다음 칸을 밟을 수 있다.
- 계단의 개수는 300 이하의 자연수, 계단에 적힌 정수는 10,000 이하의 자연수
총 점수의 최대값은?

계단이 다음과 같이 있다고 하자.
1 2 3 4 5 6 ...

i번째 계단에 도착했을 때 얻을 수 있는 최대값

계단을 한 개로 줄여보자.
i=1 -> 1
1

계단이 두 개만 있다고 해보자.
i=2 -> 3
1, 2

계단이 세 개만 있다고 해보자.
i=3 -> 5
2, 3

연속으로 세개를 밟지 못하기 때문에 앞의 두 개중 하나만 선택해야 한다.
둘 중 더 큰 수인 2를 선택

i=4 -> 8
1 3 4
i-1번째와 i-3번째 계단을 밟거나, i-2번째를 밟는 경우가 있다.
i-2번째를 밟는 경우는 반드시 i-2를 밟고, 거기까지 이르는 과정은 자유라는 뜻이다.
거기까지의 최대값은 저장해놓은 dp값을 이용하면 된다.
(A[i-1] + dp[i-3])와 dp[i-2] 둘 중 최대값과 A[i]번째 수를 더한 것을 dp[i]에 저장
dp[i] = A[i] + Math.max(A[i-1] + dp[i-3], dp[i-2])

*/
