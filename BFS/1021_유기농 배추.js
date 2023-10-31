const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim().split('\n');
const T = Number(input.shift().trim());
const answer = [];

const dxy = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
];

// 지렁이가 밭 탐색하는 함수
function bfs(start, field, M, N) {
  const queue = [start];

  while (queue.length > 0) {
    const [x, y] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const nx = x + dxy[i][0];
      const ny = y + dxy[i][1];

      if (nx < M && nx >= 0 && ny < N && ny >= 0 && field[ny][nx] === 1) {
        field[ny][nx] = 0;
        queue.push([nx, ny]);
      }
    }
  }
}

// 테스트 케이스 반복
for (let i = 0; i < T; i++) {
  const [M, N, K] = input.shift().trim().split(' ').map(Number);
  const cabbages = input.splice(0, K);
  let count = 0;

  // 배추밭 만들기
  const field = Array.from({ length: N }, () => Array(M).fill(0));
  for (let j = 0; j < K; j++) {
    const [cx, cy] = cabbages[j].trim().split(' ').map(Number);
    field[cy][cx] = 1;
  }

  // 지렁이가 각 배추뭉치를 탐색
  for (let j = 0; j < N; j++) {
    for (let k = 0; k < M; k++) {
      if (field[j][k]) {
        field[j][k] = 0;
        bfs([k, j], field, M, N);
        count++;
      }
    }
  }

  // 각 테스트 케이스의 답을 answer에 저장
  answer.push(count);
}

answer.forEach((a) => console.log(a));
