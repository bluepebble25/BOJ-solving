const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim().split('\n');

const [M, N, K] = input[0].trim().split(' ').map(Number);
const map = Array.from({ length: M }, () => Array(N).fill(0));

for (let i = 1; i <= K; i++) {
  const line = input[i].trim().split(' ').map(Number);
  const [lx, ly, rx, ry] = line;

  for (let y = ly; y < ry; y++) {
    for (let x = lx; x < rx; x++) {
      map[y][x] = 1;
    }
  }
}

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

function dfs(x, y) {
  map[y][x] = 1;
  count++;

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx < 0 || nx >= N || ny < 0 || ny >= M || map[ny][nx] === 1) continue;

    if (map[ny][nx] === 0) {
      dfs(nx, ny);
    }
  }
}

let district = 0;
let count = 0;
const result = [];

for (let y = 0; y < M; y++) {
  for (let x = 0; x < N; x++) {
    if (map[y][x] === 0) {
      count = 0;
      dfs(x, y);
      district++;
      result.push(count);
    }
  }
}

result.sort((a, b) => a - b);
console.log(district + '\n' + result.join(' '));
