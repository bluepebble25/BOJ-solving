const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');
const N = Number(input[0]);
const A = input[1]
  .trim()
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);

function binarySearch(target) {
  let left = 0;
  let right = N - 1;

  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    if (A[mid] === target) {
      return 1;
    } else if (target < A[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return 0;
}

const TC = input[3].trim().split(' ').map(Number);
const result = TC.map((testCase) => binarySearch(testCase));
console.log(result.join('\n'));

/*
  1. A[N] 배열을 먼저 sort 한다.

  2. 이진탐색 로직을 짠다.
  - left, right가 필요함
  - 초기값으로 left=0, right=N-1
  - mid = Math.floor((left + right) / 2);
  - 만약 A[mid] === target이라면 return 1;
  - 만약 target < A[mid]라면 right = mid - 1이 되고,
    만약 target > A[mid]라면 left = mid + 1
  - 이 반복문은 left <= right인 동안에만 유효하다. left < right 뿐만 아니라
    left===right이 같아지는 순간 다음 while문으로 넘어갔을 때
    반복문이 멈추지 않고 left===right===mid가 된 상황도 계산하기 위함이다.
    while(left <= right)으로 이진탐색 해주자.
  - 저렇게 탐색해도 없다면 반복문 종료되고 return 0
  
  3. M의 각 숫자를 테스트케이스라고 생각하고 TC.map(testCase => binarySearch(testCase))으로 결과값을 구한다.

  4. 출력값은 \n으로 join하는 것 잊지 말자!
*/
