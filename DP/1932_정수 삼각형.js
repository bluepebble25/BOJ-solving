const fs = require('fs');
const tree = fs
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));
const N = tree[0][0];

function solution() {
  for (let i = N; i >= 2; i--) {
    for (let j = 0; j < tree[i].length - 1; j++) {
      const largerNum = Math.max(tree[i][j], tree[i][j + 1]);
      tree[i - 1][j] += largerNum;
    }
  }

  return tree[1][0];
}

console.log(solution());

/*
  단기적으로는 두개의 가지 중에서 더 큰쪽을 선택하면 되지만,
  결과적으로는 작은 쪽을 선택했을 때 다음에 더 큰 수를 선택할 수 있었을지도 모른다.
  하지만 맨 끝 줄에서부터 시작해서 두 노드 중 더 큰 쪽을 선택해 윗칸에 더해주는
  bottom-up 방식으로 푼다면 확실하게 큰 값만 선택할 수 있게 된다.

  dp[i-1][j] += Math.max(dp[i][j], dp[i][j+1]);
*/
