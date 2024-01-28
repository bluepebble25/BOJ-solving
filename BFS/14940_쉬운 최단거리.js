const fs = require('fs');
const input = fs
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

const [[N, M], ...map] = input;

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

function solution() {
  const d = Array.from({ length: N }, () => Array(M).fill(-1));

  function bfs(start) {
    const queue = [[...start, 0]];

    while (queue.length > 0) {
      const [x, y, count] = queue.shift();
      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (nx < 0 || nx >= M || ny < 0 || ny >= N || d[ny][nx] !== -1)
          continue;

        if (map[ny][nx] === 0) {
          d[ny][nx] = 0;
        } else {
          d[ny][nx] = count + 1;
          queue.push([nx, ny, count + 1]);
        }
      }
    }
  }

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (map[y][x] !== 1) d[y][x] = 0;
      if (map[y][x] === 2) bfs([x, y]);
    }
  }

  return d.map((line) => line.join(' ')).join('\n');
}

console.log(solution());

/*
  목표지점에서부터 거꾸로 출발점을 향해 나아간다.
  거리와 방문 여부를 저장할 distance 배열을 만들고,
  방문했는데 원래 갈 수 없는 땅이면 0을, 아니면 거리를 저장한다.
  bfs를 이용해 count++을 하며 나아간다.

  여러번 틀렸는데 틀린 이유가
  1) visited 겸 distance 저장용 배열인 d를 초기화할 때 가로와 세로의 크기를 반대로 썼음.
    => 주어진 예제는 15x15인데 자꾸 틀려서 test case를 2x3 처럼 배열 길이 다르게 해봤더니 잡아냄
  2) 4방향 검사 for문에서 map[ny][nx] === 0 인지 검사해서 0을 넣는 구조였는데, 아래 예제처럼
    2가 갇혀서 아예 for문이 시작되지도 못했을 때는 먼 곳에 있는 0 자리에는 0을 못 채워서 -1이 채워져있었다.
    => 시작점인 2를 탐색할 때 0을 만나면 0을 채워넣는 로직을 추가

  5 5
  1 0 1 1 0
  1 1 1 0 2
  1 1 0 0 0
  1 1 1 1 1
  1 1 1 1 1

*/
