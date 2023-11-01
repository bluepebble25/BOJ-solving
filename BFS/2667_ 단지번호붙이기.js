const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim().split('\n');

const N = Number(input[0]);
const map = input.splice(1).map((line) => line.trim().split('').map(Number));

// 상하좌우
const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

// bfs로 단지 내 집의 수를 세기
function countHouses(start) {
  let count = 0;
  const queue = [start];

  while (queue.length > 0) {
    const [x, y] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && nx < N && ny >= 0 && ny < N && map[ny][nx] === 1) {
        map[ny][nx] = 0;
        queue.push([nx, ny]);

        count++;
      }
    }
  }

  return count;
}

function solution(N, map) {
  let houses = [];

  for (let i = 0; i < N; i++) {
    for (let k = 0; k < N; k++) {
      if (map[i][k] === 1) {
        map[i][k] = 0;
        houses.push(countHouses([k, i]) + 1);
      }
    }
  }
  houses.sort((a, b) => a - b);

  console.log(houses.length);
  houses.forEach((num) => console.log(num));
}

solution(N, map);
