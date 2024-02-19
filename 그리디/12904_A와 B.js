const fs = require('fs');
const [S, T] = fs
  .readFileSync('./input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.trim().split(''));

function solution() {
  const Tlen = T.length;

  for (let i = 0; i < Tlen; i++) {
    if (S.length === T.length) {
      break;
    }
    const last = T.pop();
    if (last === 'B') {
      T.reverse();
    }
  }

  return S.join('') === T.join('') ? 1 : 0;
}

console.log(solution());

/*
  예를 들어 예시로
  B
  ABBA
  이렇게 있다면 B에서 ABBA를 만드는 것보다는 ABBA에서 거꾸로 B가 만들어지는지 해보는게 더 쉬울 것이다.

  T의 맨 뒤를 pop해서 나온 게 A라면 pass, B라면 B가 pop된 상태에서 reverse
  이것을 T와 S의 길이가 같아질 때까지 하고 만약 그때 비교해서 서로 다르면 return 0, 같으면 1
*/
