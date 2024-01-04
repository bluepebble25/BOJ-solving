const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');
const [N, C] = input[0].trim().split(' ').map(Number);
const house = input
  .slice(1)
  .map((line) => Number(line.trim()))
  .sort((a, b) => a - b);

function solution() {
  let left = 0;
  let right = house[N - 1];

  while (left <= right) {
    let count = 1; // 설치한 공유기 개수 저장, 맨 첫번째 집에 설치하고 시작하므로 1
    let prev = house[0]; // 공유기 설치한 이전 집의 인덱스 저장

    let d = Math.floor((left + right) / 2);

    for (let i = 1; i < N; i++) {
      if (house[i] - prev >= d) {
        count++;
        prev = house[i];
      }
    }

    if (count >= C) {
      left = d + 1;
    } else {
      right = d - 1;
    }
  }

  return right;
}

console.log(solution());

/*
  집 배열 정렬하면
  5 3
  1 2 4 8 9
  
  가장 인접한 공유기 사이의 거리(최소 거리)가 최대여야 함
  
  최소거리가 1이라고 해보자.
  첫번째 집인 1에 설치, 다음 집인 2에도 설치 가능, ... 모든 집에 설치할 수 있다.

  최소거리가 3일 때
  1에 설치, 4에 설치, 8 혹은 9에 설치 가능
  근데 가능하면 8에 설치하는게 좋다. 왜냐하면 지금은 설치해야 하는 공유기 개수가 3개이고
  이후의 집이 더 없지만 만약 공유기의 개수와 집이 더 많았다면 되도록 앞부분에 있는 집에 설치해야
  뒤에 있는 집들끼리 최소거리 기준을 만족시키기 쉽기 때문이다.
  만약 정해진 수만큼의 공유기를 설치했는데 뒤에 집들이 더 남아있다면
  최소거리로 설치된 공유기 말고 다른 공유기는 분배해서 설치했다고 상상해도 된다.

  그러므로 공유기 설치는 맨 처음 집부터 무조건 설치하고,
  공유기를 설치한 집과 현재 검사하고 있는 집 사이의 거리가 최소거리보다 크거나 같으면 공유기를 설치한다.

  최소거리를 결정하는 방법은 파라메트릭 서치 (upper bound, lower bound)로 풀자
  - 공유기를 C보다 많이 설치할 수 있으면 최소거리를 더 늘려도 된다는 것이므로 left = mid + 1
  - 아니면 right = mid - 1
  - return right
*/
