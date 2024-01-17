const fs = require('fs');
const [N, ...books] = fs
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.trim());

function solution() {
  const list = new Map();
  let max = 0;
  let maxName = 0;

  books.forEach((book) =>
    list.set(book, list.has(book) ? list.get(book) + 1 : 1)
  );

  for (let [book, count] of list) {
    if (count > max) {
      max = count;
      maxName = book;
    } else if (count === max && book < maxName) {
      maxName = book;
    }
  }

  return maxName;
}

console.log(solution());

/*
  가장 많이 팔린 책의 목록은 어떻게 저장할 것이냐
  (key, value)쌍을 순회하며 value가 max값보다 크다면 새로운 max로 대입,
  책의 이름도 maxName에 저장한다.
  만약 value와 max값이 같다면 책의 이름과 maxName을 비교해 사전순으로 앞서있다면 대체한다.
*/
