const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');
const cards = new Set(input[1].trim().split(' ').map(Number));
const list = input[3].trim().split(' ').map(Number);

function solution() {
  const result = list.map((el) => (cards.has(el) ? 1 : 0));
  console.log(result.join(' '));
}

solution();
