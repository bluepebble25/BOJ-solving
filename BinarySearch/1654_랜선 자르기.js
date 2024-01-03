const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split('\n');
const [K, N] = input[0].trim().split(' ').map(Number);
const lines = input.slice(1).map((line) => Number(line.trim()));

function solution() {
  let left = 0;
  let right = Math.max(...lines);
  let size = 1;

  while (left <= right) {
    let sum = 0;
    size = Math.floor((left + right) / 2);

    for (let i = 0; i < K; i++) {
      sum += Math.floor(lines[i] / size);
    }

    if (sum >= N) {
      left = size + 1;
    } else {
      right = size - 1;
    }
  }

  return right;
}

console.log(solution());

/*
  <파라메트릭 서치>
  일단 랜선의 길이를 임의의 값으로 결정해놓은 다음, 이분탐색으로 점차 조정해나가는 방법으로 풀자.

  랜선 길이의 중간값을 size에 저장하고, while(left <= right)로 후보를 좁혀나간다.
  1) 랜선 배열을 for문을 돌며 각 랜선을 size로 나눈 몫을 sum에 더한다.
  2) sum >= N이면 필요보다 많이 만들었다는 뜻이니까 개수를 줄여도 됨. size를 늘리자
    -> left = size + 1
  3) sum < N 이면 더 잘게 잘라야 하므로 size를 줄여야 한다.
      -> right = size - 1
*/
