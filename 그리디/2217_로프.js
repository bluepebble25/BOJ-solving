const fs = require('fs');
const [N, ...ropes] = fs
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

function solution() {
  ropes.sort((a, b) => a - b);
  let max = ropes[0] * N;
  for (let i = 1; i < N; i++) {
    max = Math.max(max, ropes[i] * (N - i));
  }
  return max;
}

console.log(solution());

/*
  N=2
  10 15

  이렇게 로프가 두 개 있고 각각 10, 15만큼의 무게를 감당할 수 있다고 하면
  각 로프가 10만큼의 중량을 감당하게 하여 10*2 총 20만큼의 물건을 드는 게 최선의 결과이다.

  N=3
  10 50 20
  이런 상황이라면 어떨까?
  모든 로프를 사용하지 않아도 된다고 했으니
  최소값인 10에 맞출 경우 10*3=30
  10을 사용 안하고 20에 맞추면 20*2=40
  50만 사용하면 50

  정리하자면 오름차정렬해서
  10 20 50
  10 * 3
  20 * 2
  50
  이런 식으로 차례로 i번째 이하의 로프를 사용하지 않는 경우를 가정하여 더해보고 max값을 return한다.
*/
