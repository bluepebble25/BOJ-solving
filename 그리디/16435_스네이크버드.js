const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');
const [N, L] = input[0].trim().split(' ').map(Number);
const h = input[1]
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);

function solution() {
  let height = L;

  for (let i = 0; i < N; i++) {
    if (height >= h[i]) {
      height++;
    } else {
      break;
    }
  }

  return height;
}

console.log(solution());

/*
  초기 몸 길이는 L, 과일의 개수는 N

  - h를 정렬한다.
  - 맨 처음부터 for문으로 N만큼 과일을 먹는다.
    스네이크버드의 height가 h[i]보다 크거나 같다면 먹을 수 있으므로 height++을 한다.
    만약 먹지 못하는 경우가 생기면 break 한다.
  - 최종적으로 height를 return한다.
*/
