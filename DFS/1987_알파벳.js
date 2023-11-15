const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let R = null;
let C = null;
let board = [];
let count = 0;

rl.on('line', function (line) {
  if (!R && !C) {
    [R, C] = line.trim().split(' ').map(Number);
  } else {
    board.push(line.trim().split(''));
    count++;

    if (count === R) {
      rl.close();
    }
  }
}).on('close', function () {
  solution();
});

function solution() {
  const dx = [0, 0, -1, 1];
  const dy = [1, -1, 0, 0];
  const visited = Array(26).fill(false);
  let maxCount = 1;

  function dfs(x, y, count) {
    visited[board[y][x].charCodeAt(0) - 65] = true;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || nx >= C || ny < 0 || ny >= R) {
        continue;
      }

      if (!visited[board[ny][nx].charCodeAt(0) - 65]) {
        dfs(nx, ny, count + 1);
        visited[board[ny][nx].charCodeAt(0) - 65] = false;
      }
    }
    maxCount = Math.max(maxCount, count);
  }

  dfs(0, 0, 1);
  console.log(maxCount);
}
