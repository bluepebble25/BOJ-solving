const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim().split('\n');
const N = Number(input.shift().trim());
const painting = input.map((line) => line.trim().split(''));

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

function dfs(x, y, color, visited, isWeak) {
  visited[y][x] = true;

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx >= 0 && nx < N && ny >= 0 && ny < N && !visited[ny][nx]) {
      // 색맹이고 빨간색 혹은 녹색이라면 같게 취급
      if (isWeak && color !== 'B' && painting[ny][nx] !== 'B') {
        dfs(nx, ny, color, visited, isWeak);
      }
      if (color === painting[ny][nx]) {
        dfs(nx, ny, color, visited, isWeak);
      }
    }
  }
}

function countAreas(isWeak) {
  let count = 0;
  const visited = Array.from({ length: N }, () => []).map(() =>
    Array(N).fill(false)
  );

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (!visited[y][x]) {
        count++;
        dfs(x, y, painting[y][x], visited, isWeak);
      }
    }
  }

  return count;
}

function solution() {
  const normalCount = countAreas(false);
  const weakCount = countAreas(true);

  console.log(`${normalCount} ${weakCount}`);
}

solution();
