const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim().split('\n');
const T = Number(input[0].trim());

const dx = [1, 2, 2, 1, -1, -2, -2, -1];
const dy = [2, 1, -1, -2, -2, -1, 1, 2];

for (let i = 1; i < T * 3 - 1; i += 3) {
  const TC = input.slice(i, i + 3);
  solution(TC);
}

function bfs(I, board, start, target) {
  const queue = [];
  queue.push([start, 0]);

  while (queue.length > 0) {
    const [curr, count] = queue.shift();
    const [x, y] = curr;

    if (x === target[0] && y === target[1]) {
      return count;
    }

    for (let i = 0; i < 8; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (nx >= 0 && nx < I && ny >= 0 && ny < I && board[ny][nx] === 0) {
        board[ny][nx] = 1;
        queue.push([[nx, ny], count + 1]);
      }
    }
  }
}

function solution(TC) {
  const I = Number(TC.shift().trim());
  const board = Array.from({ length: I }, () => Array(I).fill(0));
  const [start, target] = TC.map((line) => line.trim().split(' ').map(Number));

  console.log(bfs(I, board, start, target));
}
