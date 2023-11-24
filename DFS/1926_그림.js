const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim().split('\n');
const [N, M] = input.shift().trim().split(' ').map(Number);

const map = input.map((line) => line.trim().split(' ').map(Number));

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

function solution() {
  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  const sizeArr = [];
  let size = 0;

  function dfs(node) {
    const [x, y] = node;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (
        nx >= 0 &&
        nx < M &&
        ny >= 0 &&
        ny < N &&
        map[ny][nx] === 1 &&
        !visited[ny][nx]
      ) {
        visited[ny][nx] = true;
        size++;
        dfs([nx, ny]);
      }
    }
  }

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (map[y][x] === 1 && !visited[y][x]) {
        size = 1;
        visited[y][x] = true;
        dfs([x, y]);
        sizeArr.push(size);
      }
    }
  }

  let count = sizeArr.length;
  let maxSize = count === 0 ? 0 : Math.max(...sizeArr);
  console.log(`${count} ${maxSize}`);
}

solution();
