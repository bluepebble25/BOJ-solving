const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim().split('\n');
const [N, L] = input.shift().trim().split(' ').map(Number);
const loc = input[0].trim().split(' ').map(Number);

function solution() {
  loc.sort((a, b) => a - b);
  const spacing = L - 1;
  let left = 0;
  let count = 1;

  for (let i = 0; i < N - 1; i++) {
    if (loc[i + 1] - loc[left] > spacing) {
      count++;
      left = i + 1;
    }
  }

  return count;
}

console.log(solution());

/*
  - 물이 새는 곳은 1 이상 1000 이하의 자연수이며 N 곳이 있다.
  - 테이프는 무한개 있고 길이는 L, 자르지는 못하지는 겹칠 수는 있다.
  - 테이프는 최소 새는 지점으로부터 좌우 0.5만큼의 간격이 있어야 한다.
    그러니까 1과 2 지점에 물이 새면 길이가 1인 테이프로는 구멍 2개를 각각 막아야 한다는 말이다.
    겹치는 것은 걱정할 필요 없다.

  4 2
  1 2 100 101

  1과 2의 간격은 1이다. 두 지점을 다 덮으려면 1의 왼쪽으로 0.5, 2의 오른쪽으로 0.5만큼 테이프를 덮어야 하므로
  0.5 + 1 + 0.5 = 2만큼의 테이프가 필요하므로 길이가 2인 테이프로 덮을 수 있다.

  N과 L은 1000보다 작거나 같은 자연수라고 했으므로 i, i+1끼리 비교하는 식으로 전부 순회해도 시간복잡도에 문제가 되지 않는다.
  테이프의 최소 개수를 구해야 하므로 한 테이프로 가능한 많은 위치를 막는게 좋다.
  테이프 중 0.5+0.5 = 1 만큼은 언제나 테이프 붙인 곳의 좌우 간격을 위해 쓰여야 한다.

  L에서 1을 미리 뺀 값이 바로 가능한 구멍 사이의 간격의 합이다.

  - 물이 새는 곳의 위치를 정렬한다.
  - L에서 1을 뺀 값을 spacing으로 저장한다.
  - left로 왼쪽 지점을 가리킨다.
    i+1와 left 지점 사이의 거리가 spacing보다 크면 count++을 하고 i+1을 새로운 left로 지정한다.
    맨 마지막까지 spacing보다 작거나 같아서 count++을 하지 못하게 될 수도 있으므로 count의 초기값을 1로 지정하고 시작한다.
*/
