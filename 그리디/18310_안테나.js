const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim().split('\n');
const N = Number(input[0].trim());
const loc = input[1]
  .trim()
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);

console.log(loc[Math.floor((N - 1) / 2)]);

/*
  양쪽 끝에 설치하는 것은 불리하다.
  최선은 중간에 설치하는 것이다.

  짝수나 홀수여도 걱정할 것이 없는게
  '안테나를 설치할 수 있는 위치 값으로 여러 개의 값이 도출될 경우 가장 작은 값을 출력한다.'
  라고 했으므로 가장 작은 중간 인덱스는 홀짝 관계 없이 Math.floor((N-1) / 2)이다.
  주의해야 할 게 N/2가 아니라 0번 인덱스부터 시작하므로 N-1을 2로 나눠야 한다.
*/
