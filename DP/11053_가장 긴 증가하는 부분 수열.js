const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim().split('\n');
const N = Number(input[0].trim());
const A = input[1].split(' ').map(Number);

function solution() {
  const dp = Array(N).fill(0);
  dp[0] = 1;

  for (let i = 1; i < N; i++) {
    let maxDp = 0;
    for (let j = 0; j < i; j++) {
      if (A[i] > A[j]) {
        maxDp = Math.max(maxDp, dp[j]);
      }
    }
    dp[i] = maxDp ? maxDp + 1 : 1;
  }

  return Math.max(...dp);
}

console.log(solution());

/*
  증가하는 부분 수열이라는 말은
  어떤 수가 앞에서 선택한 수보다 크면 계속 선택해 나가는 것을 말한다.

  <예시>
  예를 들어 다음과 같은 수가 있을 때
  30 10 20 40 50
  '30 40 50'을 선택하든지 '10 20 40 50'을 선택하는 수열을 만들 수 있다.
  무조건 앞에 있는 숫자라고 해서 선택하는 것이 아니고, 뒤에 오는 숫자부터 선택해서 최선의 경우가 될 수도 있다.
  
  <풀이>
  10 20 10 30 20 50
  자신보다 작은 수가 앞에 존재하는지 (바로 직전이 아니어도 된다) 검사하고,
  존재한다면 dp중에 최대값에 1을 더한 값을 저장, 존재하지 않으면 자신부터 선택되었다고 생각하고 dp[i]에 1을 저장한다.
  dp중 최대값이 바로 가장 긴 증가하는 부분수열의 길이이다.
*/
