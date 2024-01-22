const fs = require('fs');
const str = fs.readFileSync('input.txt').toString().trim();

function solution() {
  const mid = Math.floor(str.length / 2);
  let left = str.slice(0, mid);
  let right = str.slice(str.length % 2 !== 0 ? mid + 1 : mid, str.length);
  return left === right.split('').reverse().join('') ? 1 : 0;
}

console.log(solution());

/*
  mid = Math.floor(str.length / 2);
  1) 홀수면
  mid에 있는 요소를 기준으로 양 옆을 검사하면 된다.
  str.slice(0, mid), str.slice(mid + 1, str.length).split('').reverse().join('')이 같은지

  2) 짝수면
  mid를 기준으로 반으로 가른다.
  str.slice(0, mid), str.slice(mid, str.length).split('').reverse().join('') 비교
*/
