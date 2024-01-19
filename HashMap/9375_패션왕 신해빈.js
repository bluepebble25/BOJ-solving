const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');
const T = Number(input[0].trim());
let index = 1;
const result = [];

function solution(TC) {
  const clothes = new Map();
  TC.forEach((line) => {
    const type = line.trim().split(' ')[1];
    clothes.set(type, clothes.has(type) ? clothes.get(type) + 1 : 1);
  });
  return [...clothes.values()].reduce((acc, value) => acc * (value + 1), 1) - 1;
}

for (let i = 0; i < T; i++) {
  const N = Number(input[index++]);
  const TC = input.slice(index, index + N);
  result.push(solution(TC));
  index += N;
}

console.log(result.join('\n'));

/*
  의상의 이름은 중복되지 않으므로 각 타입의 의상이 몇 개 있는지 숫자만 있으면 경우의 수를 구하는데 충분하다.
  Map 오브젝트를 이용해 key-value를 의상type-개수 형태로 저장하자.

  {A => 2, B => 1, C => 3} 형태의 Map을 만들었다고 하자.
  어떤 옷을 입지 않는 경우도 옷을 입는 한 가지 방법이라고 친다면
  3 * 2 * 4이 되고, 이 중 ABC 모두 입지 않는 알몸인 경우 1을 빼주면 된다.
*/
