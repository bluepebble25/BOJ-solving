const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');
const T = Number(input.shift().trim());

function solution() {
  for (let i = 0; i < T; i++) {
    const numbers = input[i * 4 + 1]
      .trim()
      .split(' ')
      .map(Number)
      .sort((a, b) => a - b);
    const question = input[i * 4 + 3].trim().split(' ').map(Number);

    const result = question.map((q) => binarySearch(numbers, q));
    console.log(result.join('\n'));
  }
}

function binarySearch(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (numbers[mid] === target) {
      return 1;
    } else if (numbers[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return 0;
}

solution();
