const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim().split(' ');
const [N, K] = input.map((el) => Number(el.trim()));
const MAX_POSITION = 100000;
const dx = [-1, 1, 2];

/*
  - 1차원 좌표계 (수직선) 상에 위치한 두 점 사이에서 최단거리를 찾는 문제이다.
  - 왼쪽/오른쪽으로 한칸씩 또는 오른쪽으로 현재 좌표의 두배되는 위치 총 세가지의 가능성이 있으므로
    한 노드에 세 개의 노드가 달려있고 최단거리를 찾는 문제이다. 따라서 BFS
*/

function bfs(start, target) {
  const queue = [[start, 0]];
  const visited = Array(MAX_POSITION + 1).fill(false);
  visited[start] = true;

  while (queue.length > 0) {
    const [x, move] = queue.shift();
    if (x === target) return move;

    for (let i = 0; i < 3; i++) {
      const nx = i === 2 ? x * dx[i] : x + dx[i];

      if (nx >= 0 && nx <= MAX_POSITION && !visited[nx]) {
        visited[nx] = true;
        queue.push([nx, move + 1]);
      }
    }
  }
}

console.log(bfs(N, K));
