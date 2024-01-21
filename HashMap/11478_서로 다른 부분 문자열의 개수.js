const fs = require('fs');
const S = fs.readFileSync('input.txt').toString().trim();

function solution() {
  const strSet = new Set();
  for (let k = 1; k <= S.length; k++) {
    for (let i = 0; i < S.length - k + 1; i++) {
      strSet.add(S.substring(i, i + k));
    }
  }
  return strSet.size;
}

console.log(solution());

/*
  두 방법으로 풀어봤는데 결과적으로는 1번 풀이는 780ms, 2번 방법은 2024ms로,
  substring하는 방법이 몇배나 빨랐음. slice로 풀어도 substring과 걸리는 시간이 비슷함
  아마 문자열을 덧셈해서 덧붙이는 과정에서 시간이 오래 걸리는 것 같음
  그냥 문자열 substring으로 풀자

  1. <첫번째 풀이>
  S.substring(i, i + k)으로 k 길이만큼 문자열을 잘라내어 부분 문자열을 만든다.
  바깥 for문으로 k개의 문자열을 자르는 상황을 만들고,
  안쪽 for문의 i로 순회하며 문자열을 자른다.
  자른 문자열은 Set에 넣어 중복을 제거한다.

  2. <두번째 풀이>
  다른 방법을 생각해봤는데 부분문자열의 순서가 중요한 건 아니니까
  ababc에서 {a, ab, aba, abab, ababc} 이런 식으로 i번째 인덱스에서부터 S.length까지 돌며
  이전 문자열에 한 글자씩 추가하는 식으로 부분문자열을 구할 수 있을 것 같음.
  Set에 추가하는 건 1번 풀이와 같음

  function solution() {
    const subSeqSet = new Set();
    for (let i = 0; i < S.length; i++) {
      let subSeq = '';
      for (let j = i; j < S.length; j++) {
        subSeq += S[j];
        subSeqSet.add(subSeq);
      }
    }

    return subSeqSet.size;
  }
*/
