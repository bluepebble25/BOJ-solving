const fs = require('fs');
const [N, ...input] = fs
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split('\n');

function solution() {
  const alpha = {};
  let sum = 0;

  for (let i = 0; i < N; i++) {
    let digit = 1;
    const word = input[i].trim();
    for (let j = word.length - 1; j >= 0; j--) {
      const s = word[j];
      alpha[s] = (alpha[s] || 0) + digit;
      digit *= 10;
    }
  }

  const sorted = Object.values(alpha).sort((a, b) => b - a);
  for (let i = 0; i < sorted.length; i++) {
    sum += sorted[i] * (9 - i);
  }

  return sum;
}

console.log(solution());

/*
  ACDEB
    GCF

  각 알파벳을 어떤 숫자로 치환할지는 각 알파벳이 이 덧셈에서 가지는 의미를 계산해보면 된다.
  A는 A * 10^4와 같은 의미를 지니고
  B는 B * 10^0
  C는 C * (10^3+1)
  이런 식으로 {'A': 10000, 'B': 1, 'C': 1001, ...} 형태로 key와 값을 저장해놓으면
  가장 value가 큰 순서대로 내림차순 정렬을 하여 문자에 9부터 내림차순으로 숫자를 부여하면 된다.
  
  한 문자의 가중치를 구하는 방법은?
  - 각 단어를 순회한다.
  - digit=1 변수로 자릿수를 나타내고, 단어의 뒤에서부터 시작해서
    alpha[key] = alpha[key] + digit를 더한다.
    다음 for문으로 넘어가기 전 digit * 10을 해서 자릿수를 증가시켜준다.
  새 단어로 넘어가면 digit=1로 다시 초기화

  이렇게 각 문자의 가중치를 구했다면 내림차순으로 정렬할 필요가 있는데 굳이 key와 value 모두 정렬할 필요 없이
  value 순으로 내림차순 정렬을 한 뒤 차례로 9, 8, ... 씩 곱해주면 된다.
*/
