const fs = require('fs');
const input = fs
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .map((line) => line.trim());

function solution() {
  const N = Number(input[0].trim());
  const startMap = new Map();
  input.slice(1, N + 1).forEach((car, i) => startMap.set(car, i));
  const end = input.slice(N + 1, 2 * N + 1);

  let count = 0;

  for (let i = 0; i < N - 1; i++) {
    for (let j = i + 1; j < N; j++) {
      if (startMap.get(end[i]) > startMap.get(end[j])) {
        count++;
        break;
      }
    }
  }

  return count;
}

console.log(solution());

/*
  -- start --
  ZG431SN - 1
  ZG5080K - 2
  ST123D - 3
  ZG206A - 4

  -- end --
  ZG206A - 1
  ZG431SN - 2
  ZG5080K - 3
  ST123D - 4

  들어갈 때 순서와 나올 때 순서가 다르다면 어떻게 앞지른 차를 구별할 수 있을까?
  순서가 늦어지는 것은 앞에 다른 차가 끼어드는 경우에 얼마든지 뒤로 밀릴 수 있다.
  하지만 순서가 빨라지는 경우는 앞으로 끼어들었을 때 뿐이다.

  그렇다면 본인의 start와 end일 때의 순서를 비교해야 할까?
  들어갈때보다 나올 때 순서가 더 작아졌는지 검사? No!

  ABCDE
  C가 추월 -> CABDE
  B도 추월 -> CBADE

  B는 A보다 앞에 있기 때문에 추월했다는게 명백하지만
  본인의 원래 위치 그대로를 유지하고 있다.

  ABCDE -> CBADE
  일 때 CBADE 배열을 순회하며 검사해보자.
  C의 뒤에 있는 B는 C보다 앞 순서이므로 추월했다고 판단,
  B도 뒤에 A라는 요소가 있으므로 추월했다고 판단한다.
  바깥 for문으로 요소를 순회하며, 안쪽 for문으로 본인의 뒤 요소를 순회,
  순서가 작은 요소를 발견하면 count++ 하고 중단한다.
*/
