const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');
const N = Number(input[0].trim());
const cards = input[1]
  .trim()
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);
const list = input[3].trim().split(' ').map(Number);

function binarySearch(target) {
  let left = 0;
  let right = N - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (cards[mid] === target) {
      return 1;
    }

    if (cards[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return 0;
}

const result = list.map((target) => binarySearch(target));
console.log(result.join(' '));

/*
  1. 카드를 정렬한다.
  2. whlie(left <= right)인 동안 리스트에 있는 요소가 카드 목록에 있는지 탐색한다.
*/
