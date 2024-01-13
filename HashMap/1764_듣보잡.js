const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');
const [N, M] = input[0].trim().split(' ').map(Number);

function solution() {
  const list = new Set();
  const result = [];

  for (let i = 1; i <= N; i++) {
    const name = input[i].trim();
    list.add(name);
  }

  for (let i = N + 1; i < input.length; i++) {
    const name = input[i].trim();
    if (list.has(name)) {
      result.push(name);
    }
  }

  result.sort((a, b) => a.localeCompare(b));

  return result.length + '\n' + result.join('\n');
}

console.log(solution());

/*
  방법 2 (for문 대신 slice랑 filter 함수를 써봤는데 속도는 방법 1이 8ms 약간 더 빠르다. 별 차이 안남)
*/

// const fs = require('fs');
// const input = fs
//   .readFileSync('./input.txt')
//   .toString()
//   .trim()
//   .split('\n')
//   .map((line) => line.trim());
// const [N, M] = input[0].split(' ').map(Number);

// function solution() {
//   const listA = new Set(input.slice(1, N + 1));
//   const listB = input.slice(N + 1, N + M + 1);
//   const result = listB
//     .filter((name) => listA.has(name))
//     .sort((a, b) => a.localeCompare(b));
//   return result.length + '\n' + result.join('\n');
// }

// console.log(solution());
