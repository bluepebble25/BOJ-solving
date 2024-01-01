const fs = require('fs');
const input = fs
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

const N = input[0][0];
const cards = input[1].sort((a, b) => a - b);
const TC = input[3];

function binarySearch(target) {
  function getLowerBound() {
    let left = 0;
    let right = N;

    while (left < right) {
      mid = Math.floor((left + right) / 2);

      if (target <= cards[mid]) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    return left;
  }

  function getUpperBound() {
    let left = 0;
    let right = N;
    let mid = 0;

    while (left < right) {
      mid = Math.floor((left + right) / 2);

      if (target < cards[mid]) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    return left;
  }

  const lowerBound = getLowerBound();
  const upperBound = getUpperBound();
  return upperBound - lowerBound;
}

const result = TC.map((testCase) => binarySearch(testCase));
console.log(result.join(' '));

/*
  방법 1) 이분탐색1 (X 실패, 시간초과)
  -10 -10 2 4 4 4 4 4 10 10 10
  1. 숫자 카드를 정렬한다.
  2. binarySearch(target) 함수를 작성한다.
    - binarySerach 함수로 보통의 이분탐색처럼 mid를 좁혀나가며 값을 찾지만,
      좌우로도 같은 값이 몇 개 있는지 센다.
    - 중앙값 찾는 while문 그 안에
    - 좌측으로 인덱스 -1 해가며 같은 값 카운팅하는 while문,
    - 우측으로 인덱스 +1 하는 while문

  -> 생각해보니 최악의 상황에는 500,000개(N)의 숫자카드가 모두 같은 개수일 수 있고,
     개수를 찾아야 할 숫자의 개수가 500,000개(M) 이므로 시간초과가 발생할 수 있다.
  
  방법 2) 이분탐색2 - lower bound, upper bound
  배열 속에 같은 숫자들이 연속으로 있을 때 가장 처음 인덱스와 나중 인덱스를 빼서 나온 길이를 구하자.

  target보다 크거나 같은 수의 인덱스를 lower bound,
  target보다 큰 수 중 처음으로 맞이하는 수의 인덱스를 upper bound라고 하자.

  예를 들면
  1 2 3 4 5 5 6 7 8
  target이 5라면 lower bound는 5의 인덱스인 4, upper bound는 6의 인덱스 6이다.
  6-4 =2이므로 연속된 수는 2개라고 구할 수 있다.

  만약 찾는 수가 없는 경우라면?
  1 2 3 4 6 7 8 이 있고 target이 5라고 해보자.
  lower bound인 6과 upper bound인 6의 인덱스가 같아
  찾는 수가 없으므로 인덱스의 길이가 0이 되는 경우에 부합한다.

  그게 바로 upper bound를 찾는 수보다 큰 수로 채택하는 이유이다.

  1) lower bound 구하는 법
  -> right 포인터를 왼쪽으로 좁히자
  target <= cards[mid] 이면 right=mid
  target > cards[mid] 이면 left=mid + 1

  2) upper bound 구하는 법
  -> left 포인터를 오른쪽으로 좁히자
  target < cards[mid] 이면 right = mid
  target >= cards[mid] 이면 left = mid + 1

  단 right를 N-1로 하면 upper bound의 정의 (맨 마지막 인덱스보다 큰 수)에 부합하지 않으므로
  right를 N (배열의 length)로 해야 한다.
*/
