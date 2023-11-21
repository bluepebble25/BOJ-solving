const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim().split('\n');

const n = Number(input[0].trim());
const [start, target] = input[1].trim().split(' ').map(Number);
const m = Number(input[2].trim());
const graph = Array.from({ length: n + 1 }, () => []);

for (let i = 3; i < m + 3; i++) {
  const [from, to] = input[i].trim().split(' ').map(Number);
  graph[from].push(to);
  graph[to].push(from);
}

const visited = Array(n + 1).fill(false);

function bfs(start) {
  const queue = [[start, 0]];
  visited[start] = true;

  while (queue.length > 0) {
    const [curr, count] = queue.shift();
    if (curr === target) return count;

    graph[curr].forEach((next) => {
      if (!visited[next]) {
        visited[next] = true;
        queue.push([next, count + 1]);
      }
    });
  }

  return -1;
}

console.log(bfs(start));
