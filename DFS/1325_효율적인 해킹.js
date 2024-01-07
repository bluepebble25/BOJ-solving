// const fs = require('fs');
// const input = fs.readFileSync('input.txt').toString().trim().split('\n');
// const [N, M] = input[0].trim().split(' ').map(Number);
// const graph = Array.from({ length: N + 1 }, () => []);

// for (let i = 1; i <= M; i++) {
//   const [A, B] = input[i].trim().split(' ').map(Number);
//   graph[B].push(A);
// }

// function solution() {
//   let visited = Array(N + 1).fill(false);
//   let count = 0;
//   const result = Array(N).fill(0);

//   function dfs(node) {
//     visited[node] = true;
//     count++;

//     graph[node].forEach((next) => {
//       if (!visited[next]) {
//         dfs(next);
//       }
//     });
//   }

//   for (let i = 1; i <= N; i++) {
//     visited = Array(N + 1).fill(false);
//     count = 0;
//     dfs(i);
//     result[i] = count;
//   }

//   let maxCount = Math.max(...result);
//   let answer = [];
//   result.forEach((num, i) => {
//     if (maxCount === num) answer.push(i);
//   });

//   console.log(answer.join(' '));
// }

// solution();

const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim().split('\n');
const [N, M] = input[0].trim().split(' ').map(Number);
const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 1; i <= M; i++) {
  const [A, B] = input[i].trim().split(' ').map(Number);
  graph[B].push(A);
}

function solution() {
  const result = [];

  function dfs(start) {
    const visited = Array(N + 1).fill(false);
    const stack = [start];
    let count = 0;

    visited[start] = true;

    while (stack.length > 0) {
      const curr = stack.pop();
      count++;

      graph[curr].forEach((next) => {
        if (!visited[next]) {
          visited[next] = true;
          stack.push(next);
        }
      });
    }

    return count;
  }

  for (let i = 1; i <= N; i++) {
    result.push(dfs(i));
  }

  let maxCount = Math.max(...result);
  const answer = [];

  result.forEach((count, i) => {
    if (maxCount === count) answer.push(i + 1);
  });

  console.log(answer.join(' '));
}

solution();
