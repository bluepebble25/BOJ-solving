const fs = require('fs');
const N = fs.readFileSync('input.txt').toString().trim();

function solution() {
  let coin = 0;
  let remain = 0;

  coin = Math.floor(N / 5);
  remain = N % 5;

  if (remain % 2 == 0) {
    return (coin += remain / 2);
  } else {
    if (coin === 0) return -1;
    coin -= 1;
    remain += 5;
    if (remain % 2 === 0) {
      coin += remain / 2;
    } else {
      return -1;
    }
  }

  return coin;
}

console.log(solution());

/*
  1 3 4 6 7 8 9
  11 13 14 16 17 18 19
  21 23 24 26 27 28 29
  
  5로 나누어 떨어지지 않는 숫자를 나열하면 규칙에 의거해
  5원짜리 동전을 한 개 제외하면 2로 나누어질 수 있다는 것을 알 수 있다.
  5원짜리를 2개 이상 뺄 필요는 없으므로 while문으로 반복해 뺄 필요는 없다.
  절차 지향적으로 작성하자.

  5원짜리 - Math.floor(N/5)
  N % 5 로 나머지를 구하고, 그 나머지를 2로 나눈다.
  
  2로 나누고, 나누어 떨어지면 최종 동전 수 반환
  2로 나누어 떨어지지 않으면서
    - 5원짜리 동전 수가 0개라면 -1 return
    - 5원짜리가 0개 이상이라면 5원짜리 동전 수에서 1을 빼고,
      나머지에 5를 더한 후, 그것을 2로 나누어서 나누어떨어지면 반환, 아니면 -1 return
*/
