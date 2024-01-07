const fs = require('fs');
const input = fs
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

const [N, M] = input[0];
const map = input.splice(1);

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

function solution() {
  const countMap = Array.from({ length: N }, () => Array(M).fill(0));

  function bfs(start) {
    const queue = [[start, 0]];

    while (queue.length > 0) {
      const [[x, y], count] = queue.shift();
      countMap[y][x] = count;
      map[y][x] = 0;

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx < 0 || nx >= M || ny < 0 || ny >= N || map[ny][nx] === 0) {
          continue;
        }

        map[ny][nx] = 0;
        queue.push([[nx, ny], count + 1]);
      }
    }
  }

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (map[y][x] === 2) {
        bfs([x, y]);
      }
    }
  }

  const answer = countMap.map((line) => line.join(' ')).join('\n');
  return answer;
}

console.log(solution());
