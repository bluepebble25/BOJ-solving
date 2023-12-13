const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');
const N = Number(input[0].trim());
const A = input.slice(1).map((line) => line.trim().split(' ').map(Number));
A.unshift(Array(3).fill(0));

function solution() {
  const dp = Array.from({ length: N + 1 }, () => Array(3).fill(0));

  for (let i = 1; i <= N; i++) {
    dp[i][0] = A[i][0] + Math.min(dp[i - 1][1], dp[i - 1][2]);
    dp[i][1] = A[i][1] + Math.min(dp[i - 1][0], dp[i - 1][2]);
    dp[i][2] = A[i][2] + Math.min(dp[i - 1][0], dp[i - 1][1]);
  }

  return Math.min(dp[N][0], dp[N][1], dp[N][2]);
}

console.log(solution());

/*
  N >= 2 이므로 집은 최소 두개는 있다.
  그리고 이전 집을 최소값으로 칠했다고 해서 다음 집을 최소비용으로 칠할 수 있다는 보장은 없다.
  1 40 83
  2 1000 57
  이 상황이라면 (1, 1000)보다는 (40, 2)를 선택할 것이다.

  R  G  B
  26 40 83
  49 60 57
  13 89 99

  그렇다면 i번째를 최소값으로 만들어주는 조건은 무엇일까?
  이전에 집을 칠한 모든 선택이 최선인 경우이다. 따라서 dp로 풀 수 있는 문제인 것이다.
  이전 dp가 최선이라고 쳤을 때 현재 선택할 수 있는 경우의 수는 총 세가지이다.
  따라서 dp는 현재 선택할 수 있는 경우의 수에 맞춰 dp[N][3] 배열에 저장해야 한다.

  dp[i][0] = A[i][0] + Math.min(dp[i-1][1], dp[i-1][2])
  이런 식으로 i번째에 어떤 수를 선택했으면 이전 dp는 현재 선택한 수가 아닌 것 중에서 골라야 한다.

  점화식
  dp[i][0] = A[i][0] + Math.min(dp[i-1][1], dp[i-1][2]);
  dp[i][1] = A[i][1] + Math.min(dp[i-1][0], dp[i-1][2]);
  dp[i][2] = A[i][2] + Math.min(dp[i-1][0], dp[i-1][1]);
*/
