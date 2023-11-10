const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim().split('\n');
const N = Number(input[0].trim());
const map = [];

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

for (let i = 1; i <= N; i++) {
  const line = input[i].trim().split(' ');
  map.push(line.map(Number));
}

function dfs(start, height, visited) {
  const [x, y] = start;
  visited[y][x] = true;

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (
      nx >= 0 &&
      nx < N &&
      ny >= 0 &&
      ny < N &&
      !visited[ny][nx] &&
      map[ny][nx] > height
    ) {
      dfs([nx, ny], height, visited);
    }
  }
}

function solution() {
  let max = 0;

  for (let height = 0; height <= 100; height++) {
    const visited = Array.from({ length: N }, () => Array(N).fill(false));
    let count = 0;

    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        if (!visited[y][x] && map[y][x] > height) {
          count++;
          dfs([x, y], height, visited);
        }
      }
    }

    max = Math.max(max, count);
  }

  console.log(max);
}

solution();
