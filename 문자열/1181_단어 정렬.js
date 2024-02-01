const fs = require('fs');
const [N, ...words] = fs
  .readFileSync('./input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.trim());

const wordSet = new Set(words);
const answer = Array.from(wordSet).sort(
  (a, b) => a.length - b.length || a.localeCompare(b)
);

console.log(answer.join('\n'));
