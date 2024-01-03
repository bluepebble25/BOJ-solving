const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');
const [N, M] = input[0].trim().split(' ').map(Number);
const trees = input[1]
  .trim()
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);

function solution() {
  let left = 0;
  let right = trees[N - 1];
  let H = 0;

  while (left <= right) {
    let sum = 0;
    H = Math.floor((left + right) / 2);

    for (let i = 0; i < N; i++) {
      if (trees[i] > H) sum += trees[i] - H;
    }

    if (sum >= M) {
      left = H + 1;
    } else {
      right = H - 1;
    }
    console.log(left, right);
  }

  return right;
}

console.log(solution());

/*
  이분탐색을 이용하는 <파라메트릭 서치> 문제

  자른 나무의 합이 '적어도' M이 되도록 하는 톱의 높이의 '최대값'을 구하는 문제이다.
  꼭 나무를 자를 때 합이 M이 되지 않아도 되고 나무의 합은 M보다 크거나 같으면 된다.
  20 15 10 17
  
  나무가 7만큼 필요함. 일단 정렬
  10 15 17 20

  톱의 높이를 H라고 하자.
  예를 들어 H가 9라고 하면 특정 나무만 골라서 자를 수 있는게 아니고 전체가 잘리게 된다.
  따라서 H보다 키가 작거나 같은 나무를 배제해서 일정 지점의 오른쪽 나무들만 베는 이미지를 상상하자.
  
  처음에는 이 문제를 이진탐색을 생각하고 인덱스를 중심으로 mid를 구할 생각을 했는데
  mid라는 인덱스는 소용없고 H 중심으로 생각해야 한다.
  예를 들어 맨 처음 나무가 5m, 끝 나무가 15m일 때 그 중간값인 10으로 H를 설정하고 나무를 베어보는게 제일 효율적인데
  나무가 H보다 큰지 알기 위해서는 인덱스는 소용 없고 직접 베어보는 수밖에 없다.
  그래서 mid라는 인덱스는 필요 없고 처음부터 모두 베어보는 것이다. for문 안에 if문을 두어 trees[i] > H일 때만 베도록 한다.

  자른 나무의 합이
  - M보다 크거나 같으면 높이를 조금 높여봐도 된다. -> left = H + 1
  - 작으면 -> right = H - 1

  ** 정리 **
  1. 정렬
  2. left = 0, right = 마지막 나무 길이, 둘을 합해 반으로 나눠 중간값 구하기
    (처음에 left를 trees[0]이 아니라 0으로 초기화 하는 이유는 최악의 경우에 H가 0인 것을 대비하기 위함이다.)

  3. while(left <= right)으로 자르기 시작하는 점이 하나로 좁혀질때까지 이분탐색으로 H를 찾는다.
    H = Math.floor((left + right) / 2)
    자른 나무의 합이
  - M보다 크거나 같으면 높이를 조금 높여봐도 된다. -> left = H + 1
  - 작으면 -> right = H - 1

  4. while(left <= right)로 left, right가 하나로 수렴되면 right 반환
    (left가 아니라 right를 반환하는 이유는
    left는 전체 나무의 합을 줄이는 방향으로 나가고, right는 늘리는 방향으로 가게 하는 변수이기 때문이다.
    보수적인 수치인 right를 반환하자.)
*/
