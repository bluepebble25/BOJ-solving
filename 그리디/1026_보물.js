const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim().split('\n');

const [N, A, B] = input.map((line) =>
  line
    .trim()
    .split(' ')
    .map((el) => Number(el))
);

/*
  A는 오름차, B는 내림차로 정렬해서 곱하면 되겠지만,
  문제에서 제시한대로 정직하게 B는 냅두고 A만 재배열해 풀어보자.

  B의 최대값은 A의 최소값, B의 최소값은 A의 최대값과 곱해야한다.
  B는 냅둬야하므로 B를 기준으로 A를 정렬하자.

  1. A만 오름차순 정렬
    A - 1 1 1 6 0 -> 0 1 1 1 6 (오름차순 정렬)
    B - 2 7 8 3 1 -> 2 7 8 3 1 (그대로)
    
  2. 길이가 N인 빈 배열(newA)과 B의 복사본을 준비한다.
  3. 바깥 for문으로 A의 가장 작은 값부터 차례대로 선택,
    안쪽 for문에서 B의 max와 그 index를 구하고, 빈 배열에 같은 위치에 값을 집어넣으면 됨
    ex) A의 첫번째 값인 0은 빈 배열의 newA[2]에 집어넣음. 왜냐하면 max인 8이 2번 인덱스니까
  4. B의 max 자리는 -1로 바꿔서 다음 max를 구하기 쉽도록 한다.
  5. 그 다음은 1을 다음 max인 7이랑 같은 위치에 해당하도록 빈 배열에 집어넣음

  직접 이 과정을 해보면 마지막에 A는 [1, 1, 0, 1, 6]이 된다.
*/

function solution(N, A, B) {
  A.sort((a, b) => a - b);
  const newA = Array.from({ length: N }, () => 0);
  const bCopy = B.slice();

  A.forEach((v) => {
    let max = -1;
    let maxIndex = 0;
    for (let i = 0; i < N; i++) {
      if (max < bCopy[i]) {
        max = bCopy[i];
        maxIndex = i;
      }
    }

    newA[maxIndex] = v;
    bCopy[maxIndex] = -1;
  });

  return newA.reduce((acc, curr, i) => acc + curr * B[i], 0);
}

console.log(solution(N, A, B));
