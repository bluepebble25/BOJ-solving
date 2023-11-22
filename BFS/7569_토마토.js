const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim().split('\n');
const [M, N, H] = input.shift().trim().split(' ').map(Number);

const dx = [0, 0, -1, 1, 0, 0];
const dy = [1, -1, 0, 0, 0, 0];
const dz = [0, 0, 0, 0, 1, -1];

const box = Array.from({ length: H }, () =>
  Array.from({ length: N }, () => Array(M).fill(0))
);

/*
  모두 익지 않은지 여부 검사 - unripeCount > 0

  토마토 익히는 방법
  bfs는 시작할 토마토 뭉치들을 배열로 받는다.
  토마토 뭉치를 순회하면서 next 토마토 배열에 조건에 일치하는 6방향의 토마토를 넣음.
  queue가 비었다면 queue를 next 토마토 배열로 대체한다.

  주의!) 처음에 queue.shift() 방식으로 bfs를 구현했는데 시간초과가 뜸.
  어차피 순회를 토마토 뭉치 단위로 하므로 forEach 방식으로 바꿨더니 통과
*/

function bfs(start, unripeCount) {
  let day = 0;
  const nextTomatoes = start;

  while (true) {
    const currTomatoes = nextTomatoes.splice(0);
    currTomatoes.forEach((tomato) => {
      const [x, y, z] = tomato;
      for (let i = 0; i < 6; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        const nz = z + dz[i];

        if (nx < 0 || nx >= M || ny < 0 || ny >= N || nz < 0 || nz >= H)
          continue;
        if (box[nz][ny][nx] === 0) {
          nextTomatoes.push([nx, ny, nz]);
          box[nz][ny][nx] = 1;
          unripeCount--;
        }
      }
    });

    if (nextTomatoes.length === 0) break;
    day++;
  }

  return unripeCount > 0 ? -1 : day;
}

function solution() {
  let unripeCount = 0;
  let prevTomatoes = [];

  for (let z = 0; z < H; z++) {
    for (let y = 0; y < N; y++) {
      const line = input[N * z + y].split(' ').map(Number);
      for (let x = 0; x < M; x++) {
        const tomato = line[x];
        box[z][y][x] = tomato;

        if (tomato === 0) {
          unripeCount++;
        }
        if (tomato === 1) {
          prevTomatoes.push([x, y, z]);
        }
      }
    }
  }

  if (unripeCount === 0) return 0;

  return bfs(prevTomatoes, unripeCount);
}

console.log(solution());
