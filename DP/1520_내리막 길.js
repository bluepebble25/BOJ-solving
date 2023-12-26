const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim().split('\n');
const [M, N] = input[0].trim().split(' ').map(Number);
const map = [];

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

for (let i = 1; i <= M; i++) {
  map.push(input[i].trim().split(' ').map(Number));
}

function solution() {
  const dp = Array.from({ length: M }, () => Array(N).fill(-1));

  function dfs(x, y) {
    if (x === N - 1 && y === M - 1) return 1;
    if (dp[y][x] !== -1) return dp[y][x];
    dp[y][x] = 0;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

      if (map[y][x] > map[ny][nx]) {
        dp[y][x] += dfs(nx, ny);
      }
    }

    return dp[y][x];
  }

  return dfs(0, 0);
}

console.log(solution());

/*
  1. DP로 풀어야 하는 이유
  50 45 37 32 30
  35 50 40 20 25
  30 30 25 17 28
  27 24 22 15 10
  
  시작점에서 도착점까지 가는 방법 중 아래의 경우를 보자.
  둘다 똑같이 중간에 32를 거친다.
  그 다음에는 또 공통적으로 20을 거치고 20 이후의 경로는 같다.
  만약 DFS로 탐색을 한다면 20 이후의 경로가 같더라도 중복해서 탐색해나갈 것이다.
  그것도 4방향으로 재귀를 중복적으로 실시할 것이기 때문에 시간복잡도가 기하급수적으로 증가할 것이다.
  따라서 dp를 사용해 경로를 작은 단위로 쪼개서 구한 다음 합치면 된다.

  50→45→37→32→30
  35 50 40 20←25
  30 30 25 17 28
  27 24 22 15→10

  50→45→37→32 30
  35 50 40 20 25
  30 30 25 17 28
  27 24 22 15→10

  2. 중간에 경로의 수를 저장하는 방법
  dfs + dp이기 때문에 visited 여부와 경로의 수를 저장할(dp) 배열이 필요하다.
  dp map 하나로 이 두가지를 모두 해결하자.
  visited 여부는 -1, 0으로, 경로의 수는 숫자로 저장

  그런데 확통에서 길찾기 경우의 수를 찾는 방식대로 하려면 앞에서부터 차례대로 수를 더해가야 하는데
  bfs가 아니라 dfs라는 특성상 주변의 경우의 수를 취합해 저장하는 것은 불가능하고,
  유효한 경로의 경우의 수를 구하는 것이므로 목적지에 도달한 경우에 1을 더해야 한다.
  dfs의 맨 마지막 스택이 종료되는 시점부터 거꾸로 되짚어가며 경우의 수를 저장해야 한다는 결론이 나온다.
  따라서 dp[y][x]를 (0, 0)부터 (x, y)까지의 경우의 수가 아니라, (x, y)부터 (N-1, M-1) 지점까지 가는 방법의 수라고 정의하자.
  그렇게 되면 dp에는 도착지점인 (N-1, M-1)부터 시작지점 방향으로 거꾸로 숫자가 채워져서 답은 dp[0][0]에 저장되어 있을 것이다.
  
  - 본인보다 더 작은 숫자라면 다음 dfs를 실행한다.
  - 이동하면서 0을 대입하며 지나간 흔적을 만들자.
    그래야 뒤에서부터 1을 더해도 -1이 아니라 0부터 더할 수 있고 visited 여부를 표시할 수 있다.
  - 목적지에 도착하면 1을 return해 바로 직전 dp에 더할 수 있게 한다.
    그러려면 4방향 for문에서 이런 형식으로 dp를 저장해야 한다.
    dp[y][x] += dfs(x, y);
  - 목적지가 아닌 지점에서 dfs가 종료될 때는 본인의 값을 그 이전 지점에 누적시키기 위해
    dfs 함수의 마지막 줄에서 return dp[y][x];를 한다.
  - 이런식으로 dfs 스택이 종료되면서 직전 dp[y][x]을 더해가다보면 (0, 0)에 답이 있다.
  - 이미 방문했던 지점을 또 방문했다면 (-1이 아닌 경우)
    그 지점 이후의 경로는 이미 다 구해놓은 부분집합이라는 뜻이므로 그 지점인 dp[y][x]을 그대로 return 해준다.
*/
