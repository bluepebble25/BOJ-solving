const fs = require('fs');
const N = fs.readFileSync('input.txt').toString().trim();

function solution() {
  const num = N.split('');
  if (!num.includes('0')) {
    return -1;
  } else {
    const sum = num.reduce((acc, curr) => acc + Number(curr), 0);
    if (sum % 3 === 0) {
      return num.sort((a, b) => b - a).join('');
    } else {
      return -1;
    }
  }
}

console.log(solution());

/*
  30의 배수이면서 가장 큰 수를 구해야 한다.

  1. 30의 배수는 끝자리가 0으로 끝나기 때문에 0을 포함하지 않으면 -1을 return
  2. 3의 배수인지 판정하는 법은 각 자릿수의 수를 모두 더해서 3의 배수인지 알아보는 것이다.
    각 자릿수를 모두 더해 3으로 나누어떨어지는지 확인한다.
    3의 배수가 아니라면 -1 return
  3. 3의 배수라면 가장 큰 수를 반환해야 하기 때문에 내림차순으로 sort한 후 join한다.
    내림차순으로 sort하면 어차피 맨 마지막 숫자가 0이 되므로 가장 큰 30의 배수가 된다.
*/
