const fs = require('fs');
const [N, str] = fs
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.trim());

function solution() {
  if (str.length === 1) {
    return str;
  }

  const DNA = new Map([
    ['AA', 'A'],
    ['AG', 'C'],
    ['AC', 'A'],
    ['AT', 'G'],
    ['GA', 'C'],
    ['GG', 'G'],
    ['GC', 'T'],
    ['GG', 'G'],
    ['GC', 'T'],
    ['GT', 'A'],
    ['CA', 'A'],
    ['CG', 'T'],
    ['CC', 'C'],
    ['CT', 'G'],
    ['TA', 'G'],
    ['TG', 'A'],
    ['TC', 'G'],
    ['TT', 'T'],
  ]);

  let tmp = DNA.get(`${str[Number(N) - 2]}${str[Number(N) - 1]}`);
  for (let i = str.length - 3; i >= 0; i--) {
    tmp = DNA.get(str[i] + tmp);
  }
  return tmp;
}

console.log(solution());

/*
  AA: A, AG: C 처럼 HashMap 형태로 key-value를 저장한다.
  An-1 An 순서대로 나열해야 한다.
  Map에 저장하는 이유는 염기 서열의 길이의 조건 N(1 ≤ N ≤ 1,000,000)에 따라
  최악의 상황에는 약 백만번 조회할 수 있기 때문이다.

  그리고 DNA를 검사할 때는 원본 문자열의 뒤의 두 부분을 잘라내고 덧붙여야 한다고 생각할 수 있는데,
  그럴 필요 없다.
  초기에만 두 개를 하나로 압축한 문자열을 구하고 temp에 저장한다.
  그 다음에는 temp와 주어진 문자열의 끝을 하나씩 합하며 새로운 temp에 집어넣고 검사해나가면 된다.
  그러면 충분히 O(n)으로 해결할 수 있다.
*/
