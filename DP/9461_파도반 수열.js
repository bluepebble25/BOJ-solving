const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');
const TC = input.slice(1).map((line) => Number(line.trim()));

function solution(N) {
  const P = Array(N + 1).fill(0);
  P[1] = P[2] = 1;

  for (let i = 3; i <= N; i++) {
    P[i] = P[i - 3] + P[i - 2];
  }
  return P[N];
}

const result = TC.map((testCase) => solution(testCase));
console.log(result.join('\n'));

/*
  N=10
  1, 1, 1, 2, 2, 3, 4, 5, 7, 9

  규칙성이 보이는 유의미한 지점은 P(4)인 2부터이다.
  P(i-3) + P(i-2)와 같이 한칸 떨어진 앞의 수를 두개씩 묶은 게 바로 P(N)의 값이 된다.
  그런데 만약 인덱스와 N의 일치를 위해 배열을 Array(N+1)로 만든다면 N=3 지점도 0 + 1이라서 법칙이 성립한다.
  for문은 3부터 시작해도 된다.
*/
