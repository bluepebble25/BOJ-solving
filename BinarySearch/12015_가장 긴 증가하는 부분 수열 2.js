const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');
const N = Number(input[0].trim());
const arr = input[1].trim().split(' ').map(Number);

function solution() {
  function binarySearch(target) {
    let left = 0;
    let right = LIS.length - 1;

    while (left < right) {
      let mid = Math.floor((left + right) / 2);

      if (LIS[mid] >= target) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    return right;
  }

  const LIS = [arr[0]];

  for (let i = 1; i < N; i++) {
    const top = LIS.length - 1;
    if (arr[i] > LIS[top]) {
      LIS.push(arr[i]);
    } else {
      const index = binarySearch(arr[i]);
      LIS[index] = arr[i];
    }
  }

  return LIS.length;
}

console.log(solution());

/*
  11053번 가장 긴 증가하는 부분 수열 (실버 2)와 동일한 문제이다.
  이 문제는 DP 혹은 이분탐색을 이용하는 두 가지 방법으로 풀 수 있다.
  이분탐색으로 풀어보자.
  그리고 앞으로 가장 긴 부분수열 (Longest Increasing Subsequence)을 LIS라고 부르자.
  
  예제로 나온 <10 20 10 30 20 50>은 중복값이 있는 건 훌륭한데 값이 다양하지 않음.
  임의로 다음과 같은 숫자가 있다고 하자.

  10 30 50 40 45 20 55 60

  전체를 for문으로 순서대로 순회
  1) 10을 만남. 배열에 넣기 => [10]
  2) 30을 만남. 10보다 크므로 배열에 넣기 => [10, 30]
  3) 50을 만남. 30보다 크므로 배열에 넣기 => [10, 30, 50]
  4) 40을 만남. 마지막 수인 50보다 작으므로 40보다 크면서 가장 가까운 수의 인덱스를 구하고, 그 자리를 대체한다.
    => [10, 30, 40]
  5) 45를 만남. 40보다 크므로 배열에 넣기 => [10, 30, 40, 45]
  6) 20을 만남. 마지막 수인 45보다 작으므로 본인보다 크면서 가장 가까운 수인 30 대신 20을 넣음
    => [10, 20, 40, 45]
  7) 55, 60
    => [10, 20, 40, 45, 55, 60]
  
  가장 긴 부분수열은 [10, 30, 40, 45, 55, 60] 이 돼야 하는거 아닌가? 하고 생각할 수 있다.
  전혀 순서에 맞지 않는 원소가 끼여있는 것처럼 보이지만,
  중간에 수를 대체하는 것은 미래에 LIS를 만들기 위한 행위이다.
  이 문제에서 구하라는 것은 LIS의 길이지 구성 원소가 아니다.
  [10, 30, 50]에서 [10, 30, 40]으로 갈아끼운 것도
  미래에 40과 촘촘한 숫자를 뒤에 덧붙일 것을 기대하며 갈아끼운 것이다.

  맨 마지막에 [10, 20, 40, 45, 55, 60]도 원래는
  [10, 30, 40, 45, 55, 60]가 되어야 하지만
  30을 20으로 바꾸어, 뒤에 25같은 더 20과 촘촘한 숫자로 갈아끼워 나갈 것을 기대하며 바꾼 것이고,
  LIS의 길이에는 변함이 없으므로 상관없다.

  2. 이분탐색으로 어떤 수보다 크면서 가장 가까운 수의 위치를 어떻게 찾을까?

  - LIS는 앞의 수보다 큰 수를 계속 push해 놓은 배열이므로 항상 sort된 배열이다.
    그대로 이분탐색을 적용해 위치를 찾으면 된다.
  - 어떤 수를 갈아끼우려고 해도 본인과 같은 숫자가 있다면 그 자리를 대체하면 되고,
    본인보다 크면서 가장 가까운 수를 구해도 된다.

    10 20 25 30 40 50 60
    45가 들어갈 자리를 구해보자.
    - arr[mid]인 30이 45보다 작다. (arr[mid] < 45) 더 오른쪽에서 큰 값을 찾아야 하므로
      left = mid + 1
    - 그 다음 40 50 60에서 arr[mid]인 50은 45보다 크므로 (arr[mid] > 45)
      크면서 가장 가까운 범위를 좁히기 위해 right를 mid로 좁히면
      right = mid
    - 근데 만약 arr[mid] === target로 대체되어야 하는 값과 갈아끼울 값이 같은 경우도 있다.
      그래서 arr[mid] >= target일 때 right = mid라고 종합할 수 있다.
    - 후에 최종적으로 right를 반환하면 답이 된다.

    while(left <= right)문은 if(arr[mid] === target)에서 return 하기 때문에 종료가 되는건데 없으므로
    종료를 위해 while(left < right)로 하자.
*/
