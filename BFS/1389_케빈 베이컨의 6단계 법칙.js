const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim().split('\n');
const [N, M] = input[0].trim().split(' ').map(Number);

const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 1; i <= N; i++) {
  const [from, to] = input[i].trim().split(' ').map(Number);
  graph[from].push(to);
  graph[to].push(from);
}

const bacon = [];

function bfs(start) {
  const queue = [[start, 0]]; // 시작 노드, 거리
  const visited = Array(N + 1).fill(false);
  let sum = 0;

  visited[start] = true;

  while (queue.length > 0) {
    let [curr, count] = queue.shift();

    graph[curr].forEach((next) => {
      if (!visited[next]) {
        visited[next] = true;
        sum += count + 1;
        queue.push([next, count + 1]);
      }
    });
  }

  return sum;
}

function solution() {
  for (let i = 1; i <= N; i++) {
    bacon.push(bfs(i));
  }

  const min = Math.min(...bacon);
  const minIndex = bacon.indexOf(min) + 1;

  console.log(minIndex);
}

solution();
