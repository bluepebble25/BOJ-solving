const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim();
const S = Number(input);

/*
  1부터 시작해 1씩 증가하며 계속 S에서 값을 빼서 remain을 만들되,
  만들어진 remain이 현재 빼고 있는 숫자보다 작거나 같다면 빼지 않은 remain이 마지막 자연수이다.
  최종 숫자까지 포함해 count++ 하고 끝낸다.
*/

function solution(S) {
  let remain = S;
  let count = 0;

  for (let i = 1; i <= S; i++) {
    count++;
    if (remain - i <= i) break;
    remain -= i;
  }
  return count;
}

console.log(solution(S));
