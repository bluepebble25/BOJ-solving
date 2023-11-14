const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim().split('\n');
const N = Number(input[0].trim());

const graph = Array.from({ length: N + 1 }, () => []);
const parents = Array(N + 1).fill(0);

for (let i = 1; i < input.length; i++) {
  const [from, to] = input[i].trim().split(' ').map(Number);
  graph[from].push(to);
  graph[to].push(from);
}

function dfs(parent, visited) {
  visited[parent] = true;

  graph[parent].forEach((next) => {
    if (!visited[next]) {
      parents[next] = parent;
      dfs(next, visited);
    }
  });
}

let answer = '';
const visited = Array(N + 1).fill(false);
dfs(1, visited);

for (let i = 2; i < parents.length; i++) {
  answer += parents[i] + '\n';
}
console.log(answer);

/*
  dfs를 통해 어떤 노드로 방문하게 된다면 무조건 거기로 이동하게 한 노드가 부모노드이다.
  왜냐하면 1이 부모 노드이므로 무조건 그 자식은 1이 부모 노드,
  1의 자식 노드를 타고 이동한 깊이가 3인 노드도 깊이가 2인 노드가 부모일 것이기 때문
  방문 여부를 visited로 검사한 다음 dfs로 이동
*/
