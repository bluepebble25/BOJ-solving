const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim().split('\n');

const [N, M] = input[0].trim().split(' ').map(Number);
const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 1; i <= M; i++) {
  const [from, to] = input[i].trim().split(' ').map(Number);
  graph[from].push(to);
  graph[to].push(from);
}

function dfs(start, visited) {
  graph[start].forEach((next) => {
    if (!visited[next]) {
      visited[next] = true;
      dfs(next, visited);
    }
  });
}

function solution() {
  let count = 0;
  const visited = Array(N + 1).fill(false);

  for (let i = 1; i <= N; i++) {
    if (!visited[i]) {
      count++;
      visited[i] = true;
      dfs(i, visited);
    }
  }

  return count;
}

console.log(solution());
