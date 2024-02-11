const fs = require('fs');
const input = fs
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.trim().split(' ').map(Number));
const T = input.shift()[0];

function main() {
  const answer = [];
  let index = 0;
  for (let i = 0; i < T; i++) {
    const N = input[index++][0];
    const score = input.slice(index, index + N);
    index += N;
    answer.push(solution(N, score));
  }

  console.log(answer.join('\n'));
}

function solution(N, score) {
  score.sort((a, b) => a[0] - b[0]);
  let count = 1;
  let prev = score[0][1];

  for (let i = 1; i < N; i++) {
    if (prev > score[i][1]) {
      count++;
      prev = score[i][1];
    }
  }
  return count;
}

main();

/*
  ** 입력을 받는 방법 **
  바깥 for문으로 T만큼 테스트케이스를 반복
  index로 N의 지점을 가리킴
  index++ 로 N 다음 지점을 가리킨 다음, slice(index, index + N)로 성적들을 잘라서 저장

  ** 문제 분석 **
  성적은 순위로 주어져 있고, 1이 가장 좋은 성적이다.
  N명이 있으면 N위가 가장 낮은 점수이다.
  순위는 [서류, 면접] 순이다.

  7
  3 6
  7 3
  4 2
  1 4
  5 7
  2 5
  6 1

  을 서류 성적으로 오름차순 정렬하면
  [ 1, 4 ] ✅
  [ 2, 5 ]
  [ 3, 6 ]
  [ 4, 2 ] ✅
  [ 5, 7 ]
  [ 6, 1 ] ✅
  [ 7, 3 ]


  풀이1) (X) 시간초과
  서류 성적순이 낮은 맨 뒤부터 검사를 해보면
  자신보다 앞의 요소 중 면접 성적도 더 좋은 사람(숫자가 작은 사람)을 만나면 탈락이므로 break로 넘어가고,
  끝까지 훑어서 통과라면 count++한다...라고 하고 싶었는데
  실제 구현해보니 for문을 break 한 다음 바깥에 count++를 하면 break 여부와 상관없이 모든 순간에 count++이 된다.
  따라서 count = N으로 초기화해놓고 탈락했을 때 count--를 해서 탈락자를 반영해 주고 break를 하도록 구현했다.

  풀이2) 통과
  서류 성적 순위를 기준으로 내림차순 정렬을 한다.
  서류 성적 1위는 무조건 합격이다.
  그 이후의 사람들은 무조건 서류 성적이 1등인 사람보다 서류순위가 낮다.
  그렇다면 면접 점수에서 1등인 사람을 이기면 된다.

  이렇게 해서 두번째 사람이 뽑혔다.
  다음으로 갈수록 서류점수가 무조건 더 낮기 때문에 면접 점수가 더 좋아야 한다.
  두번째로 뽑힌 사람의 면접 순위는 첫번째로 뽑힌 사람보다 더 좋다.

  세번째 사람을 뽑을 차례인데 여태까지 가장 면접 점수가 좋은 사람은 두번째 사람이다.
  비슷한 방식으로 세번째로 뽑은 사람도 두번째로 뽑은 사람보다 면접 점수가 더 좋아야 한다.
  계속 이런 식으로 뽑는다면 바로 직전 사람이 여태까지의 사람보다 면접 점수가 가장 특출나기 때문에
  모든 사람을 검사하지 않고 바로 직전 사람의 면접 점수만 이기면 뽑힐 수 있는 것이다.
*/
