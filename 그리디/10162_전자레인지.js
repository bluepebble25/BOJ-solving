const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim();

function solution() {
  let T = Number(input);
  const btns = [300, 60, 10];
  const count = [];
  if (T % 10 !== 0) {
    return -1;
  }
  for (let i = 0; i < 3; i++) {
    count.push(Math.floor(T / btns[i]));
    T %= btns[i];
  }

  return count.join(' ');
}
console.log(solution());
/*
  A   B  C
  300 60 10

  마지막 자리의 수가 0이 아니면 10으로 나누어 떨어지지 않으므로 -1을 return

  T를 300으로 나눈 몫을 A에 넣고, 나머지를 다시 60으로 나누고 몫을 B에 넣고,
  나머지를 다시 10으로 나눈 몫을 C에 집어넣는다.
  만약 몫이 나누어떨어지지 않으면(나머지가 0이 아니면) -1을 return한다.
*/
