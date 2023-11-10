const fs = require('fs');
const input = fs
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

// 12시 방향부터 시계방향으로
const dx = [0, 1, 1, 1, 0, -1, -1, -1];
const dy = [1, 1, 0, -1, -1, -1, 0, 1];

let i = 0;
while (input[i][0] !== 0 && input[i][1]) {
  const [w, h] = input[i];
  const map = input.slice(i + 1, i + h + 1);

  testCase(w, h, map);

  i += h + 1;
}

function dfs(w, h, start, map) {
  const [x, y] = start;
  map[y][x] = 0;

  for (let i = 0; i < dx.length; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx >= 0 && nx < w && ny >= 0 && ny < h && map[ny][nx] === 1) {
      dfs(w, h, [nx, ny], map);
    }
  }
}

function testCase(w, h, map) {
  let count = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (map[y][x] === 1) {
        count++;
        dfs(w, h, [x, y], map);
      }
    }
  }

  console.log(count);
}
