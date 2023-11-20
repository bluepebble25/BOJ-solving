const fs = require('fs');
const [A, B] = fs
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

/*
  각 수마다 2 곱하기 또는 1을 추가하는 두 가지 경우의 수가 있으므로 이진 트리와 같다.
  필요한 연산의 횟수를 세는 것은 트리의 깊이를 세는것과 같다.
  따라서 각 숫자를 방문하는 횟수가 아니라 최단거리 찾기처럼 숫자 스스로 얼마나 이동했는지 배열에 move를 함께 갖고 있어야 한다.
*/

function bfs(start, target) {
  const queue = [[start, 1]];

  while (queue.length > 0) {
    const [curr, count] = queue.shift();
    if (curr === target) return count;

    if (!(curr * 2 > target)) {
      queue.push([curr * 2, count + 1]);
    }

    if (!(Number(curr + '1') > target)) {
      queue.push([Number(curr + '1'), count + 1]);
    }
  }

  return -1;
}

console.log(bfs(A, B));
