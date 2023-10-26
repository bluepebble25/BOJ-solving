const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim();

/*
  -를 기준으로 split하면 -로 나누어진 뭉텅이가 생긴다.
  그 뭉텅이를 괄호로 감싼다고 생각하고 내부의 숫자들을 모두 더한다.
  최종적으로 생긴 뭉텅이들의 합을 맨 앞에서 차례로 누적해 뺀다.
 */

function solution() {
  const chunks = input.split('-');
  const numbers = chunks.map((chunk) =>
    chunk.split('+').reduce((acc, curr) => acc + Number(curr), 0)
  );

  let [first, ...rest] = numbers;
  return rest.reduce((acc, curr) => acc - curr, first);
}

console.log(solution());
