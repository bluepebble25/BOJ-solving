const fs = require('fs');
const [[N, M], ...prices] = fs
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));

function solution() {
  const eachNum = N % 6;
  const setNum = Math.floor(N / 6);
  let minEach = Number.MAX_SAFE_INTEGER;
  let minSet = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < M; i++) {
    minEach = Math.min(minEach, prices[i][1]);
    minSet = Math.min(minSet, prices[i][0]);
  }

  if (minEach * 6 < minSet) {
    return N * minEach;
  } else {
    return (
      setNum * minSet +
      (minEach * eachNum < minSet ? minEach * eachNum : minSet)
    );
  }
}

console.log(solution());

/*
  N은 사야하는 기타줄의 수
  M은 브랜드 개수 (N, M 이후로 M만큼의 줄이 주어진다)

  [N, M] 이후로 [패키지 가격, 낱개 가격]이 M줄 주어짐
  한 패키지에는 6개가 들어있다.

  패키지의 개수 - Math.floor(N / 6)
  낱개 개수 - N % 6

  가격을 고려할 때는 여러 브랜드를 사는 경우를 고려하지 않아도 된다.
  예를 들어 A, B, C 브랜드가 있을 때
  B 브랜드의 낱개의 개수가 가장 싸다면 굳이 B와 C를 섞어서 살 이유가 없기 때문이다.
  이 중 가장 싼 낱개의 가격(minEach)과 가장 싼 세트의 가격(minSet)을 구한다.

  1) 세트 한 개의 가격보다 낱개로 6개 사는게 더 이득이면 모든 것을 낱개로 사고,
  2) 그렇지 않다면 부분적으로는 세트로 사고 나머지는 낱개로 사는 것을 고려해본다.
    다만 몇개까지는 세트보다는 낱개로 사는게 더 쌀 수도 있다.
    그것을 위해 '세트 가격 + 낱개를 살 때 낱개와 세트 중 뭐가 더 이득인지 비교한 가격'
    을 반환한다.
*/
